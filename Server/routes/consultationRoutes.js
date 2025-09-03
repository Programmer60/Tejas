import express from 'express';
import Appointment from '../models/Appointment.js';
import { authenticateToken } from './authRoutes.js';

const router = express.Router();

// Start video consultation
router.post('/start/:appointmentId', authenticateToken, async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const appointment = await Appointment.findById(appointmentId)
            .populate('doctorId', 'userId')
            .populate('patientId', 'firstName lastName');

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        // Check if user has access to this consultation
        const userId = req.user.userId;
        const isPatient = appointment.patientId._id.toString() === userId;
        const isDoctor = appointment.doctorId.userId.toString() === userId;

        if (!isPatient && !isDoctor) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Update appointment status and generate meeting link
        appointment.status = 'in-progress';
        appointment.meetingLink = `https://meet.telemedicine.com/room/${appointmentId}`;
        
        await appointment.save();

        res.json({
            message: 'Consultation started',
            meetingLink: appointment.meetingLink,
            appointmentId: appointment._id,
            participants: {
                doctor: appointment.doctorId,
                patient: appointment.patientId
            }
        });
    } catch (error) {
        console.error('Error starting consultation:', error);
        res.status(500).json({ error: 'Failed to start consultation' });
    }
});

// End consultation
router.post('/end/:appointmentId', authenticateToken, async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { duration, notes } = req.body;

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        // Check if user has access
        const userId = req.user.userId;
        const isPatient = appointment.patientId.toString() === userId;
        
        let isDoctor = false;
        if (req.user.role === 'doctor') {
            const Doctor = (await import('../models/Doctor.js')).default;
            const doctor = await Doctor.findOne({ userId });
            isDoctor = doctor && appointment.doctorId.toString() === doctor._id.toString();
        }

        if (!isPatient && !isDoctor) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Update appointment
        appointment.status = 'completed';
        appointment.duration = duration || 30;
        
        if (notes) {
            if (req.user.role === 'doctor') {
                appointment.notes.doctor = notes;
            } else {
                appointment.notes.patient = notes;
            }
        }

        await appointment.save();

        res.json({
            message: 'Consultation ended successfully',
            appointment: {
                id: appointment._id,
                status: appointment.status,
                duration: appointment.duration
            }
        });
    } catch (error) {
        console.error('Error ending consultation:', error);
        res.status(500).json({ error: 'Failed to end consultation' });
    }
});

// Get consultation history
router.get('/history', authenticateToken, async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        let query = { status: 'completed' };

        // Determine user role and filter accordingly
        if (req.user.role === 'patient') {
            query.patientId = req.user.userId;
        } else if (req.user.role === 'doctor') {
            const Doctor = (await import('../models/Doctor.js')).default;
            const doctor = await Doctor.findOne({ userId: req.user.userId });
            if (!doctor) {
                return res.status(404).json({ error: 'Doctor profile not found' });
            }
            query.doctorId = doctor._id;
        }

        const consultations = await Appointment.find(query)
            .populate('doctorId', 'userId specialization')
            .populate({
                path: 'doctorId',
                populate: {
                    path: 'userId',
                    select: 'firstName lastName profilePicture'
                }
            })
            .populate('patientId', 'firstName lastName profilePicture')
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Appointment.countDocuments(query);

        res.json({
            consultations,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalConsultations: total,
                hasNextPage: skip + consultations.length < total,
                hasPrevPage: parseInt(page) > 1
            }
        });
    } catch (error) {
        console.error('Error fetching consultation history:', error);
        res.status(500).json({ error: 'Failed to fetch consultation history' });
    }
});

// Get consultation details
router.get('/:appointmentId', authenticateToken, async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const consultation = await Appointment.findById(appointmentId)
            .populate('doctorId', 'userId specialization experience rating')
            .populate({
                path: 'doctorId',
                populate: {
                    path: 'userId',
                    select: 'firstName lastName profilePicture phone email'
                }
            })
            .populate('patientId', 'firstName lastName email phone profilePicture address');

        if (!consultation) {
            return res.status(404).json({ error: 'Consultation not found' });
        }

        // Check access permissions
        const userId = req.user.userId;
        const isPatient = consultation.patientId._id.toString() === userId;
        const isDoctor = consultation.doctorId.userId._id.toString() === userId;

        if (!isPatient && !isDoctor) {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.json({ consultation });
    } catch (error) {
        console.error('Error fetching consultation:', error);
        res.status(500).json({ error: 'Failed to fetch consultation details' });
    }
});

// Add consultation notes
router.post('/:appointmentId/notes', authenticateToken, async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { notes } = req.body;

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        // Check access permissions
        const userId = req.user.userId;
        const isPatient = appointment.patientId.toString() === userId;
        
        let isDoctor = false;
        if (req.user.role === 'doctor') {
            const Doctor = (await import('../models/Doctor.js')).default;
            const doctor = await Doctor.findOne({ userId });
            isDoctor = doctor && appointment.doctorId.toString() === doctor._id.toString();
        }

        if (!isPatient && !isDoctor) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Add notes based on user role
        if (req.user.role === 'doctor') {
            appointment.notes.doctor = notes;
        } else {
            appointment.notes.patient = notes;
        }

        await appointment.save();

        res.json({
            message: 'Notes added successfully',
            notes: appointment.notes
        });
    } catch (error) {
        console.error('Error adding consultation notes:', error);
        res.status(500).json({ error: 'Failed to add consultation notes' });
    }
});

// Rate consultation
router.post('/:appointmentId/rate', authenticateToken, async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { rating, feedback } = req.body;

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        if (appointment.status !== 'completed') {
            return res.status(400).json({ error: 'Can only rate completed consultations' });
        }

        // Check access permissions
        const userId = req.user.userId;
        const isPatient = appointment.patientId.toString() === userId;
        
        let isDoctor = false;
        if (req.user.role === 'doctor') {
            const Doctor = (await import('../models/Doctor.js')).default;
            const doctor = await Doctor.findOne({ userId });
            isDoctor = doctor && appointment.doctorId.toString() === doctor._id.toString();
        }

        if (!isPatient && !isDoctor) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Add rating based on user role
        if (req.user.role === 'doctor') {
            appointment.rating.doctorRating = rating;
            appointment.rating.doctorFeedback = feedback;
        } else {
            appointment.rating.patientRating = rating;
            appointment.rating.patientFeedback = feedback;
        }

        await appointment.save();

        res.json({
            message: 'Rating submitted successfully',
            rating: appointment.rating
        });
    } catch (error) {
        console.error('Error rating consultation:', error);
        res.status(500).json({ error: 'Failed to rate consultation' });
    }
});

export default router;
