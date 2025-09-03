import express from 'express';
import Doctor from '../models/Doctor.js';
import User from '../models/User.js';
import { authenticateToken } from './authRoutes.js';

const router = express.Router();

// Get all doctors with search and filter
router.get('/', async (req, res) => {
    try {
        const {
            search,
            specialization,
            city,
            minRating,
            sortBy = 'rating',
            page = 1,
            limit = 10
        } = req.query;

        // Build query
        let query = { status: 'active', isVerified: true };
        
        // Build aggregation pipeline
        let pipeline = [
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userInfo'
                }
            },
            {
                $unwind: '$userInfo'
            }
        ];

        // Add filters
        let matchStage = { ...query };

        if (search) {
            matchStage.$or = [
                { 'userInfo.firstName': { $regex: search, $options: 'i' } },
                { 'userInfo.lastName': { $regex: search, $options: 'i' } },
                { specialization: { $regex: search, $options: 'i' } }
            ];
        }

        if (specialization) {
            matchStage.specialization = { $regex: specialization, $options: 'i' };
        }

        if (city) {
            matchStage['userInfo.address.city'] = { $regex: city, $options: 'i' };
        }

        if (minRating) {
            matchStage['rating.average'] = { $gte: parseFloat(minRating) };
        }

        pipeline.push({ $match: matchStage });

        // Add sorting
        let sortStage = {};
        switch (sortBy) {
            case 'rating':
                sortStage = { 'rating.average': -1 };
                break;
            case 'experience':
                sortStage = { experience: -1 };
                break;
            case 'fee':
                sortStage = { consultationFee: 1 };
                break;
            case 'name':
                sortStage = { 'userInfo.firstName': 1 };
                break;
            default:
                sortStage = { 'rating.average': -1 };
        }

        pipeline.push({ $sort: sortStage });

        // Add pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        pipeline.push({ $skip: skip });
        pipeline.push({ $limit: parseInt(limit) });

        // Project fields
        pipeline.push({
            $project: {
                firstName: '$userInfo.firstName',
                lastName: '$userInfo.lastName',
                profilePicture: '$userInfo.profilePicture',
                specialization: 1,
                experience: 1,
                consultationFee: 1,
                rating: 1,
                languages: 1,
                isOnline: 1,
                hospitalAffiliation: 1,
                availability: 1,
                totalConsultations: 1
            }
        });

        const doctors = await Doctor.aggregate(pipeline);

        // Get total count for pagination
        const totalPipeline = [
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userInfo'
                }
            },
            {
                $unwind: '$userInfo'
            },
            { $match: matchStage },
            { $count: 'total' }
        ];

        const totalResult = await Doctor.aggregate(totalPipeline);
        const total = totalResult.length > 0 ? totalResult[0].total : 0;

        res.json({
            doctors,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalDoctors: total,
                hasNextPage: skip + doctors.length < total,
                hasPrevPage: parseInt(page) > 1
            }
        });
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'Failed to fetch doctors' });
    }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id)
            .populate('userId', 'firstName lastName email phone profilePicture address')
            .populate('reviews.patientId', 'firstName lastName');

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        res.json({ doctor });
    } catch (error) {
        console.error('Error fetching doctor:', error);
        res.status(500).json({ error: 'Failed to fetch doctor details' });
    }
});

// Get doctor availability for a specific date
router.get('/:id/availability/:date', async (req, res) => {
    try {
        const { id, date } = req.params;
        const requestedDate = new Date(date);
        const dayOfWeek = requestedDate.toLocaleLowerCase().substring(0, 3);
        const dayMap = {
            'sun': 'sunday',
            'mon': 'monday',
            'tue': 'tuesday',
            'wed': 'wednesday',
            'thu': 'thursday',
            'fri': 'friday',
            'sat': 'saturday'
        };

        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        const dayName = dayMap[dayOfWeek];
        const dayAvailability = doctor.availability[dayName];

        if (!dayAvailability || !dayAvailability.isAvailable) {
            return res.json({ availableSlots: [] });
        }

        // Here you would typically check against existing appointments
        // For now, return the doctor's available slots
        res.json({
            availableSlots: dayAvailability.slots,
            date: date,
            dayOfWeek: dayName
        });
    } catch (error) {
        console.error('Error fetching availability:', error);
        res.status(500).json({ error: 'Failed to fetch availability' });
    }
});

// Add review for doctor
router.post('/:id/review', authenticateToken, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const doctorId = req.params.id;
        const patientId = req.user.userId;

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Check if patient has already reviewed this doctor
        const existingReview = doctor.reviews.find(
            review => review.patientId.toString() === patientId
        );

        if (existingReview) {
            // Update existing review
            existingReview.rating = rating;
            existingReview.comment = comment;
            existingReview.date = new Date();
        } else {
            // Add new review
            doctor.reviews.push({
                patientId,
                rating,
                comment,
                date: new Date()
            });
        }

        // Update average rating
        doctor.updateRating();
        await doctor.save();

        res.json({
            message: 'Review added successfully',
            averageRating: doctor.rating.average,
            totalReviews: doctor.rating.totalReviews
        });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
});

// Get specializations list
router.get('/meta/specializations', async (req, res) => {
    try {
        const specializations = await Doctor.distinct('specialization', { 
            status: 'active',
            isVerified: true 
        });
        
        res.json({ specializations: specializations.sort() });
    } catch (error) {
        console.error('Error fetching specializations:', error);
        res.status(500).json({ error: 'Failed to fetch specializations' });
    }
});

export default router;
