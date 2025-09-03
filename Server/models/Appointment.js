import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    timeSlot: {
        start: { type: String, required: true },
        end: { type: String, required: true }
    },
    type: {
        type: String,
        enum: ['consultation', 'follow-up', 'emergency', 'routine-checkup'],
        default: 'consultation'
    },
    mode: {
        type: String,
        enum: ['video', 'audio', 'chat', 'in-person'],
        default: 'video'
    },
    status: {
        type: String,
        enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'],
        default: 'scheduled'
    },
    symptoms: [String],
    notes: {
        patient: String,
        doctor: String
    },
    prescription: {
        medications: [{
            name: String,
            dosage: String,
            frequency: String,
            duration: String,
            instructions: String
        }],
        tests: [String],
        followUpDate: Date,
        additionalNotes: String
    },
    consultationFee: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentId: String,
    meetingLink: String,
    reminderSent: {
        type: Boolean,
        default: false
    },
    rating: {
        patientRating: { type: Number, min: 1, max: 5 },
        doctorRating: { type: Number, min: 1, max: 5 },
        patientFeedback: String,
        doctorFeedback: String
    },
    duration: {
        type: Number, // in minutes
        default: 30
    },
    triageScore: {
        type: Number,
        min: 1,
        max: 10
    },
    urgencyLevel: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    }
}, {
    timestamps: true
});

// Index for efficient queries
appointmentSchema.index({ patientId: 1, appointmentDate: 1 });
appointmentSchema.index({ doctorId: 1, appointmentDate: 1 });
appointmentSchema.index({ status: 1 });

// Virtual for appointment duration in human readable format
appointmentSchema.virtual('appointmentDuration').get(function() {
    const start = new Date(`1970-01-01T${this.timeSlot.start}:00`);
    const end = new Date(`1970-01-01T${this.timeSlot.end}:00`);
    const diffMs = end - start;
    return Math.round(diffMs / (1000 * 60)); // duration in minutes
});

appointmentSchema.set('toJSON', { virtuals: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
