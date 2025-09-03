import express from 'express';
import Triage from '../models/Triage.js';
import { authenticateToken } from './authRoutes.js';

const router = express.Router();

// Start new triage session
router.post('/start', authenticateToken, async (req, res) => {
    try {
        const patientId = req.user.userId;
        const sessionId = `triage_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const triage = new Triage({
            patientId,
            sessionId,
            symptoms: [],
            vitalSigns: {},
            medicalHistory: {},
            assessmentAnswers: [],
            triageScore: 1,
            urgencyLevel: 'low',
            recommendedAction: 'self-care',
            status: 'in-progress'
        });

        await triage.save();

        res.status(201).json({
            message: 'Triage session started',
            sessionId,
            triageId: triage._id
        });
    } catch (error) {
        console.error('Error starting triage:', error);
        res.status(500).json({ error: 'Failed to start triage session' });
    }
});

// Update triage with symptoms
router.patch('/:sessionId/symptoms', authenticateToken, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { symptoms } = req.body;

        const triage = await Triage.findOne({ 
            sessionId, 
            patientId: req.user.userId,
            status: 'in-progress'
        });

        if (!triage) {
            return res.status(404).json({ error: 'Triage session not found' });
        }

        triage.symptoms = symptoms;
        await triage.save();

        res.json({
            message: 'Symptoms updated successfully',
            symptoms: triage.symptoms
        });
    } catch (error) {
        console.error('Error updating symptoms:', error);
        res.status(500).json({ error: 'Failed to update symptoms' });
    }
});

// Update triage with vital signs
router.patch('/:sessionId/vitals', authenticateToken, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { vitalSigns } = req.body;

        const triage = await Triage.findOne({ 
            sessionId, 
            patientId: req.user.userId,
            status: 'in-progress'
        });

        if (!triage) {
            return res.status(404).json({ error: 'Triage session not found' });
        }

        triage.vitalSigns = { ...triage.vitalSigns, ...vitalSigns };
        await triage.save();

        res.json({
            message: 'Vital signs updated successfully',
            vitalSigns: triage.vitalSigns
        });
    } catch (error) {
        console.error('Error updating vital signs:', error);
        res.status(500).json({ error: 'Failed to update vital signs' });
    }
});

// Update triage with medical history
router.patch('/:sessionId/history', authenticateToken, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { medicalHistory } = req.body;

        const triage = await Triage.findOne({ 
            sessionId, 
            patientId: req.user.userId,
            status: 'in-progress'
        });

        if (!triage) {
            return res.status(404).json({ error: 'Triage session not found' });
        }

        triage.medicalHistory = { ...triage.medicalHistory, ...medicalHistory };
        await triage.save();

        res.json({
            message: 'Medical history updated successfully',
            medicalHistory: triage.medicalHistory
        });
    } catch (error) {
        console.error('Error updating medical history:', error);
        res.status(500).json({ error: 'Failed to update medical history' });
    }
});

// Submit assessment answers
router.patch('/:sessionId/assessment', authenticateToken, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { assessmentAnswers } = req.body;

        const triage = await Triage.findOne({ 
            sessionId, 
            patientId: req.user.userId,
            status: 'in-progress'
        });

        if (!triage) {
            return res.status(404).json({ error: 'Triage session not found' });
        }

        triage.assessmentAnswers = assessmentAnswers;
        await triage.save();

        res.json({
            message: 'Assessment answers updated successfully',
            assessmentAnswers: triage.assessmentAnswers
        });
    } catch (error) {
        console.error('Error updating assessment:', error);
        res.status(500).json({ error: 'Failed to update assessment' });
    }
});

// Complete triage and get recommendations
router.post('/:sessionId/complete', authenticateToken, async (req, res) => {
    try {
        const { sessionId } = req.params;

        const triage = await Triage.findOne({ 
            sessionId, 
            patientId: req.user.userId,
            status: 'in-progress'
        });

        if (!triage) {
            return res.status(404).json({ error: 'Triage session not found' });
        }

        // Calculate triage score and recommendations
        const triageScore = triage.calculateTriageScore();
        
        // Generate AI recommendations based on symptoms and score
        const aiRecommendation = generateAIRecommendation(triage);
        triage.aiRecommendation = aiRecommendation;
        
        triage.status = 'completed';
        triage.completedAt = new Date();

        await triage.save();

        res.json({
            message: 'Triage completed successfully',
            triageScore: triage.triageScore,
            urgencyLevel: triage.urgencyLevel,
            recommendedAction: triage.recommendedAction,
            aiRecommendation: triage.aiRecommendation,
            isEmergency: triage.isEmergency,
            sessionId: triage.sessionId
        });
    } catch (error) {
        console.error('Error completing triage:', error);
        res.status(500).json({ error: 'Failed to complete triage' });
    }
});

// Get triage session details
router.get('/:sessionId', authenticateToken, async (req, res) => {
    try {
        const { sessionId } = req.params;

        const triage = await Triage.findOne({ 
            sessionId, 
            patientId: req.user.userId 
        }).populate('patientId', 'firstName lastName email');

        if (!triage) {
            return res.status(404).json({ error: 'Triage session not found' });
        }

        res.json({ triage });
    } catch (error) {
        console.error('Error fetching triage:', error);
        res.status(500).json({ error: 'Failed to fetch triage session' });
    }
});

// Get user's triage history
router.get('/history/all', authenticateToken, async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const triages = await Triage.find({ 
            patientId: req.user.userId,
            status: 'completed'
        })
        .sort({ completedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select('sessionId triageScore urgencyLevel recommendedAction completedAt isEmergency');

        const total = await Triage.countDocuments({ 
            patientId: req.user.userId,
            status: 'completed'
        });

        res.json({
            triages,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalTriages: total,
                hasNextPage: skip + triages.length < total,
                hasPrevPage: parseInt(page) > 1
            }
        });
    } catch (error) {
        console.error('Error fetching triage history:', error);
        res.status(500).json({ error: 'Failed to fetch triage history' });
    }
});

// Helper function to generate AI recommendations
function generateAIRecommendation(triage) {
    const symptoms = triage.symptoms;
    const score = triage.triageScore;
    
    let specialistType = 'General Practitioner';
    let reasoning = 'Based on your symptoms and assessment';
    let suggestedTests = [];
    let timeframe = '1-2 weeks';
    let precautions = [];

    // Analyze symptoms to suggest specialist
    const symptomKeywords = symptoms.map(s => s.symptom.toLowerCase()).join(' ');
    
    if (symptomKeywords.includes('chest') || symptomKeywords.includes('heart')) {
        specialistType = 'Cardiologist';
        suggestedTests.push('ECG', 'Chest X-ray');
        precautions.push('Avoid strenuous activities', 'Monitor chest pain');
    } else if (symptomKeywords.includes('breathing') || symptomKeywords.includes('cough')) {
        specialistType = 'Pulmonologist';
        suggestedTests.push('Chest X-ray', 'Pulmonary Function Test');
        precautions.push('Avoid smoke and pollution', 'Stay hydrated');
    } else if (symptomKeywords.includes('stomach') || symptomKeywords.includes('nausea')) {
        specialistType = 'Gastroenterologist';
        suggestedTests.push('Blood tests', 'Ultrasound abdomen');
        precautions.push('Eat light meals', 'Avoid spicy food');
    } else if (symptomKeywords.includes('headache') || symptomKeywords.includes('dizziness')) {
        specialistType = 'Neurologist';
        suggestedTests.push('MRI Brain', 'Blood pressure check');
        precautions.push('Rest in dark room', 'Stay hydrated');
    }

    // Adjust timeframe based on urgency
    if (score >= 7) {
        timeframe = 'Within 24 hours';
    } else if (score >= 5) {
        timeframe = '2-3 days';
    } else if (score >= 3) {
        timeframe = '1 week';
    }

    return {
        specialistType,
        reasoning: `${reasoning}. Your triage score indicates ${triage.urgencyLevel} priority care.`,
        suggestedTests,
        timeframe,
        precautions
    };
}

export default router;
