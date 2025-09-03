import mongoose from 'mongoose';

const triageSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    symptoms: [{
        symptom: String,
        severity: {
            type: Number,
            min: 1,
            max: 10
        },
        duration: String,
        frequency: String
    }],
    vitalSigns: {
        temperature: Number,
        bloodPressure: {
            systolic: Number,
            diastolic: Number
        },
        heartRate: Number,
        respiratoryRate: Number,
        oxygenSaturation: Number,
        bloodSugar: Number
    },
    medicalHistory: {
        chronicConditions: [String],
        currentMedications: [String],
        allergies: [String],
        recentSurgeries: [String],
        familyHistory: [String]
    },
    assessmentAnswers: [{
        question: String,
        answer: String,
        weight: Number
    }],
    triageScore: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    urgencyLevel: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical', 'emergency'],
        required: true
    },
    recommendedAction: {
        type: String,
        enum: [
            'self-care',
            'schedule-routine-appointment',
            'schedule-urgent-appointment',
            'seek-immediate-care',
            'call-emergency-services'
        ],
        required: true
    },
    aiRecommendation: {
        specialistType: String,
        reasoning: String,
        suggestedTests: [String],
        timeframe: String,
        precautions: [String]
    },
    isEmergency: {
        type: Boolean,
        default: false
    },
    followUpRequired: {
        type: Boolean,
        default: false
    },
    followUpDate: Date,
    status: {
        type: String,
        enum: ['in-progress', 'completed', 'referred', 'emergency-escalated'],
        default: 'in-progress'
    },
    completedAt: Date,
    referredDoctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    appointmentCreated: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }
}, {
    timestamps: true
});

// Index for efficient queries
triageSchema.index({ patientId: 1, createdAt: -1 });
triageSchema.index({ urgencyLevel: 1 });
triageSchema.index({ sessionId: 1 });

// Calculate triage score based on symptoms and vital signs
triageSchema.methods.calculateTriageScore = function() {
    let score = 0;
    
    // Symptom severity contribution (40% weight)
    if (this.symptoms.length > 0) {
        const avgSeverity = this.symptoms.reduce((sum, s) => sum + s.severity, 0) / this.symptoms.length;
        score += avgSeverity * 0.4;
    }
    
    // Vital signs contribution (30% weight)
    const vitals = this.vitalSigns;
    let vitalScore = 0;
    let vitalCount = 0;
    
    if (vitals.temperature) {
        if (vitals.temperature > 101.3 || vitals.temperature < 95) vitalScore += 8;
        else if (vitals.temperature > 100.4 || vitals.temperature < 97) vitalScore += 5;
        else vitalScore += 2;
        vitalCount++;
    }
    
    if (vitals.bloodPressure && vitals.bloodPressure.systolic) {
        if (vitals.bloodPressure.systolic > 180 || vitals.bloodPressure.systolic < 90) vitalScore += 9;
        else if (vitals.bloodPressure.systolic > 140 || vitals.bloodPressure.systolic < 100) vitalScore += 6;
        else vitalScore += 2;
        vitalCount++;
    }
    
    if (vitals.heartRate) {
        if (vitals.heartRate > 120 || vitals.heartRate < 50) vitalScore += 8;
        else if (vitals.heartRate > 100 || vitals.heartRate < 60) vitalScore += 4;
        else vitalScore += 1;
        vitalCount++;
    }
    
    if (vitalCount > 0) {
        score += (vitalScore / vitalCount) * 0.3;
    }
    
    // Assessment answers contribution (30% weight)
    if (this.assessmentAnswers.length > 0) {
        const weightedAnswers = this.assessmentAnswers.reduce((sum, a) => sum + a.weight, 0);
        score += (weightedAnswers / this.assessmentAnswers.length) * 0.3;
    }
    
    this.triageScore = Math.min(Math.max(Math.round(score), 1), 10);
    
    // Determine urgency level based on score
    if (this.triageScore >= 9) {
        this.urgencyLevel = 'emergency';
        this.recommendedAction = 'call-emergency-services';
        this.isEmergency = true;
    } else if (this.triageScore >= 7) {
        this.urgencyLevel = 'critical';
        this.recommendedAction = 'seek-immediate-care';
    } else if (this.triageScore >= 5) {
        this.urgencyLevel = 'high';
        this.recommendedAction = 'schedule-urgent-appointment';
    } else if (this.triageScore >= 3) {
        this.urgencyLevel = 'medium';
        this.recommendedAction = 'schedule-routine-appointment';
    } else {
        this.urgencyLevel = 'low';
        this.recommendedAction = 'self-care';
    }
    
    return this.triageScore;
};

const Triage = mongoose.model('Triage', triageSchema);

export default Triage;
