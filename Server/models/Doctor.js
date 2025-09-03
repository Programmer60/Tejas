import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true
    },
    experience: {
        type: Number,
        required: true,
        min: 0
    },
    education: [{
        degree: String,
        institution: String,
        year: Number
    }],
    certifications: [String],
    languages: [String],
    consultationFee: {
        type: Number,
        required: true,
        min: 0
    },
    availability: {
        monday: {
            isAvailable: { type: Boolean, default: false },
            slots: [{ start: String, end: String }]
        },
        tuesday: {
            isAvailable: { type: Boolean, default: false },
            slots: [{ start: String, end: String }]
        },
        wednesday: {
            isAvailable: { type: Boolean, default: false },
            slots: [{ start: String, end: String }]
        },
        thursday: {
            isAvailable: { type: Boolean, default: false },
            slots: [{ start: String, end: String }]
        },
        friday: {
            isAvailable: { type: Boolean, default: false },
            slots: [{ start: String, end: String }]
        },
        saturday: {
            isAvailable: { type: Boolean, default: false },
            slots: [{ start: String, end: String }]
        },
        sunday: {
            isAvailable: { type: Boolean, default: false },
            slots: [{ start: String, end: String }]
        }
    },
    rating: {
        average: { type: Number, default: 0, min: 0, max: 5 },
        totalReviews: { type: Number, default: 0 }
    },
    reviews: [{
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        date: { type: Date, default: Date.now }
    }],
    hospitalAffiliation: {
        name: String,
        address: String,
        city: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    totalConsultations: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    }
}, {
    timestamps: true
});

// Calculate and update average rating
doctorSchema.methods.updateRating = function() {
    if (this.reviews.length === 0) {
        this.rating.average = 0;
        this.rating.totalReviews = 0;
    } else {
        const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        this.rating.average = (totalRating / this.reviews.length).toFixed(1);
        this.rating.totalReviews = this.reviews.length;
    }
};

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
