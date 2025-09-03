import express from 'express';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import User from '../models/User.js';
import { authenticateToken } from './authRoutes.js';

const router = express.Router();

// Create new appointment
router.post('/', authenticateToken, async (req, res) => {
    try {
        const {
            doctorId,
            appointmentDate,
            timeSlot,
            type = 'consultation',
            mode = 'video',
            symptoms,
            notes
        } = req.body;

        const patientId = req.user.userId;

        // Validate doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Check if time slot is available
        const existingAppointment = await Appointment.findOne({
            doctorId,
            appointmentDate: new Date(appointmentDate),
            'timeSlot.start': timeSlot.start,
            status: { $in: ['scheduled', 'confirmed', 'in-progress'] }
        });

        if (existingAppointment) {
            return res.status(400).json({ error: 'Time slot not available' });
        }

        // Create appointment
        const appointment = new Appointment({
            patientId,
            doctorId,
            appointmentDate: new Date(appointmentDate),
            timeSlot,
            type,
            mode,
            symptoms: symptoms || [],
            notes: { patient: notes || '' },
            consultationFee: doctor.consultationFee
        });

        await appointment.save();

        // Populate appointment details
        const populatedAppointment = await Appointment.findById(appointment._id)
            .populate('doctorId', 'userId specialization consultationFee')
            .populate({
                path: 'doctorId',
                populate: {
                    path: 'userId',
                    select: 'firstName lastName profilePicture'
                }
            })
            .populate('patientId', 'firstName lastName email phone');

        res.status(201).json({
            message: 'Appointment scheduled successfully',
            appointment: populatedAppointment
        });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error: 'Failed to create appointment' });
    }
});

// Get user appointments
router.get('/my-appointments', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { status, page = 1, limit = 10, upcoming = false } = req.query;

        let query = {};
        
        // Determine if user is patient or doctor
        if (req.user.role === 'patient') {
            query.patientId = userId;
        } else if (req.user.role === 'doctor') {
            // Find doctor profile
            const doctor = await Doctor.findOne({ userId });
            if (!doctor) {
                return res.status(404).json({ error: 'Doctor profile not found' });
            }
            query.doctorId = doctor._id;
        }

        if (status) {
            query.status = status;
        }

        if (upcoming === 'true') {
            query.appointmentDate = { $gte: new Date() };
            query.status = { $in: ['scheduled', 'confirmed'] };
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const appointments = await Appointment.find(query)
            .populate('doctorId', 'userId specialization consultationFee')
            .populate({
                path: 'doctorId',
                populate: {
                    path: 'userId',
                    select: 'firstName lastName profilePicture'
                }
            })
            .populate('patientId', 'firstName lastName email phone profilePicture')
            .sort({ appointmentDate: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Appointment.countDocuments(query);

        res.json({
            appointments,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalAppointments: total,
                hasNextPage: skip + appointments.length < total,
                hasPrevPage: parseInt(page) > 1
            }
        });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

// Get appointment by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('doctorId', 'userId specialization consultationFee experience rating')
            .populate({
                path: 'doctorId',
                populate: {
                    path: 'userId',
                    select: 'firstName lastName profilePicture phone email'
                }
            })
            .populate('patientId', 'firstName lastName email phone profilePicture address medicalHistory allergies');

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        // Check if user has access to this appointment
        const userId = req.user.userId;
        const isPatient = appointment.patientId._id.toString() === userId;
        const isDoctor = appointment.doctorId.userId._id.toString() === userId;

        if (!isPatient && !isDoctor) {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.json({ appointment });
    } catch (error) {
        console.error('Error fetching appointment:', error);
        res.status(500).json({ error: 'Failed to fetch appointment' });
    }
});

// Update appointment status
router.patch('/:id/status', authenticateToken, async (req, res) => {
    try {
        const { status } = req.body;
        const appointmentId = req.params.id;

        const validStatuses = ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        // Check permissions
        const userId = req.user.userId;
        const isPatient = appointment.patientId.toString() === userId;
        
        let isDoctor = false;
        if (req.user.role === 'doctor') {
            const doctor = await Doctor.findOne({ userId });
            isDoctor = doctor && appointment.doctorId.toString() === doctor._id.toString();
        }

        if (!isPatient && !isDoctor) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Update status
        appointment.status = status;
        if (status === 'completed') {
            appointment.completedAt = new Date();
        }

        await appointment.save();

        res.json({
            message: 'Appointment status updated successfully',
            appointment
        });
    } catch (error) {
        console.error('Error updating appointment status:', error);
        res.status(500).json({ error: 'Failed to update appointment status' });
    }
});

// Add prescription to appointment
router.post('/:id/prescription', authenticateToken, async (req, res) => {
    try {
        const { medications, tests, followUpDate, additionalNotes } = req.body;
        const appointmentId = req.params.id;

        // Only doctors can add prescriptions
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ error: 'Only doctors can add prescriptions' });
        }

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        // Verify doctor owns this appointment
        const doctor = await Doctor.findOne({ userId: req.user.userId });
        if (!doctor || appointment.doctorId.toString() !== doctor._id.toString()) {
            return res.status(403).json({ error: 'Access denied' });
        }

        appointment.prescription = {
            medications: medications || [],
            tests: tests || [],
            followUpDate: followUpDate ? new Date(followUpDate) : undefined,
            additionalNotes: additionalNotes || ''
        };

        await appointment.save();

        res.json({
            message: 'Prescription added successfully',
            prescription: appointment.prescription
        });
    } catch (error) {
        console.error('Error adding prescription:', error);
        res.status(500).json({ error: 'Failed to add prescription' });
    }
});

// Reschedule appointment
router.patch('/:id/reschedule', authenticateToken, async (req, res) => {
    try {
        const { appointmentDate, timeSlot } = req.body;
        const appointmentId = req.params.id;

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        // Check if user can reschedule
        const userId = req.user.userId;
        const isPatient = appointment.patientId.toString() === userId;
        
        let isDoctor = false;
        if (req.user.role === 'doctor') {
            const doctor = await Doctor.findOne({ userId });
            isDoctor = doctor && appointment.doctorId.toString() === doctor._id.toString();
        }

        if (!isPatient && !isDoctor) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Check if new time slot is available
        const existingAppointment = await Appointment.findOne({
            doctorId: appointment.doctorId,
            appointmentDate: new Date(appointmentDate),
            'timeSlot.start': timeSlot.start,
            status: { $in: ['scheduled', 'confirmed', 'in-progress'] },
            _id: { $ne: appointmentId }
        });

        if (existingAppointment) {
            return res.status(400).json({ error: 'Time slot not available' });
        }

        appointment.appointmentDate = new Date(appointmentDate);
        appointment.timeSlot = timeSlot;
        appointment.status = 'scheduled';
        appointment.reminderSent = false;

        await appointment.save();

        res.json({
            message: 'Appointment rescheduled successfully',
            appointment
        });
    } catch (error) {
        console.error('Error rescheduling appointment:', error);
        res.status(500).json({ error: 'Failed to reschedule appointment' });
    }
});

export default router;
