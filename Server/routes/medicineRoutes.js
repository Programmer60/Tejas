import express from 'express';
import { authenticateToken } from './authRoutes.js';

const router = express.Router();

// Mock medicine data
const mockMedicines = [
    {
        id: 'med001',
        name: 'Paracetamol',
        genericName: 'Acetaminophen',
        manufacturer: 'PharmaCorp',
        price: 45.50,
        description: 'Pain reliever and fever reducer',
        category: 'Pain Relief',
        prescription: false,
        inStock: true,
        quantity: 150
    },
    {
        id: 'med002',
        name: 'Amoxicillin',
        genericName: 'Amoxicillin',
        manufacturer: 'MediLabs',
        price: 120.00,
        description: 'Antibiotic for bacterial infections',
        category: 'Antibiotics',
        prescription: true,
        inStock: true,
        quantity: 75
    },
    {
        id: 'med003',
        name: 'Lisinopril',
        genericName: 'Lisinopril',
        manufacturer: 'CardioMed',
        price: 180.25,
        description: 'ACE inhibitor for high blood pressure',
        category: 'Cardiovascular',
        prescription: true,
        inStock: true,
        quantity: 60
    }
];

// Mock delivery data
let mockDeliveries = [
    {
        id: 'del001',
        orderId: 'ord001',
        patientId: 'user001',
        medicines: [
            { medicineId: 'med001', quantity: 2, name: 'Paracetamol 500mg' },
            { medicineId: 'med002', quantity: 1, name: 'Amoxicillin 250mg' }
        ],
        deliveryMethod: 'drone',
        status: 'in-transit',
        estimatedDelivery: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        currentLocation: {
            latitude: 28.6139,
            longitude: 77.2090,
            address: 'Sector 15, Dwarka, New Delhi'
        },
        destination: {
            latitude: 28.5355,
            longitude: 77.3910,
            address: 'Noida, Uttar Pradesh'
        },
        trackingId: 'TRK001',
        deliveryAgent: {
            name: 'Drone Alpha-7',
            phone: 'N/A',
            type: 'drone'
        },
        orderDate: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
    },
    {
        id: 'del002',
        orderId: 'ord002',
        patientId: 'user002',
        medicines: [
            { medicineId: 'med003', quantity: 1, name: 'Lisinopril 10mg' }
        ],
        deliveryMethod: 'agent',
        status: 'delivered',
        estimatedDelivery: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        deliveredAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        currentLocation: {
            latitude: 28.7041,
            longitude: 77.1025,
            address: 'Rohini, New Delhi'
        },
        destination: {
            latitude: 28.7041,
            longitude: 77.1025,
            address: 'Rohini, New Delhi'
        },
        trackingId: 'TRK002',
        deliveryAgent: {
            name: 'Rajesh Kumar',
            phone: '+91-9876543210',
            type: 'agent'
        },
        orderDate: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
    }
];

// Search medicines
router.get('/search', async (req, res) => {
    try {
        const { query, category, prescription, page = 1, limit = 10 } = req.query;
        
        let filteredMedicines = [...mockMedicines];

        // Apply filters
        if (query) {
            const searchTerm = query.toLowerCase();
            filteredMedicines = filteredMedicines.filter(med => 
                med.name.toLowerCase().includes(searchTerm) ||
                med.genericName.toLowerCase().includes(searchTerm) ||
                med.description.toLowerCase().includes(searchTerm)
            );
        }

        if (category) {
            filteredMedicines = filteredMedicines.filter(med => 
                med.category.toLowerCase() === category.toLowerCase()
            );
        }

        if (prescription !== undefined) {
            const needsPrescription = prescription === 'true';
            filteredMedicines = filteredMedicines.filter(med => 
                med.prescription === needsPrescription
            );
        }

        // Apply pagination
        const startIndex = (parseInt(page) - 1) * parseInt(limit);
        const endIndex = startIndex + parseInt(limit);
        const paginatedMedicines = filteredMedicines.slice(startIndex, endIndex);

        res.json({
            medicines: paginatedMedicines,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(filteredMedicines.length / parseInt(limit)),
                totalMedicines: filteredMedicines.length,
                hasNextPage: endIndex < filteredMedicines.length,
                hasPrevPage: parseInt(page) > 1
            }
        });
    } catch (error) {
        console.error('Error searching medicines:', error);
        res.status(500).json({ error: 'Failed to search medicines' });
    }
});

// Get medicine by ID
router.get('/:id', async (req, res) => {
    try {
        const medicine = mockMedicines.find(med => med.id === req.params.id);
        
        if (!medicine) {
            return res.status(404).json({ error: 'Medicine not found' });
        }

        res.json({ medicine });
    } catch (error) {
        console.error('Error fetching medicine:', error);
        res.status(500).json({ error: 'Failed to fetch medicine details' });
    }
});

// Place medicine order
router.post('/order', authenticateToken, async (req, res) => {
    try {
        const { medicines, deliveryAddress, deliveryMethod = 'agent', prescriptionImage } = req.body;
        const patientId = req.user.userId;

        // Validate medicines exist and calculate total
        let totalAmount = 0;
        const orderMedicines = [];

        for (const item of medicines) {
            const medicine = mockMedicines.find(med => med.id === item.medicineId);
            if (!medicine) {
                return res.status(400).json({ error: `Medicine ${item.medicineId} not found` });
            }

            if (medicine.prescription && !prescriptionImage) {
                return res.status(400).json({ error: `Prescription required for ${medicine.name}` });
            }

            if (item.quantity > medicine.quantity) {
                return res.status(400).json({ error: `Insufficient stock for ${medicine.name}` });
            }

            totalAmount += medicine.price * item.quantity;
            orderMedicines.push({
                medicineId: medicine.id,
                name: medicine.name,
                quantity: item.quantity,
                price: medicine.price,
                total: medicine.price * item.quantity
            });
        }

        // Create order
        const orderId = `ord_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
        const trackingId = `TRK_${Date.now()}`;

        const order = {
            id: orderId,
            patientId,
            medicines: orderMedicines,
            totalAmount,
            deliveryAddress,
            deliveryMethod,
            prescriptionImage,
            status: 'confirmed',
            orderDate: new Date(),
            estimatedDelivery: new Date(Date.now() + (deliveryMethod === 'drone' ? 2 : 4) * 60 * 60 * 1000),
            trackingId
        };

        // Create delivery tracking entry
        const delivery = {
            id: `del_${Date.now()}`,
            orderId,
            patientId,
            medicines: orderMedicines,
            deliveryMethod,
            status: 'processing',
            estimatedDelivery: order.estimatedDelivery,
            currentLocation: {
                latitude: 28.6139,
                longitude: 77.2090,
                address: 'Central Pharmacy, Delhi'
            },
            destination: {
                latitude: deliveryAddress.latitude || 28.7041,
                longitude: deliveryAddress.longitude || 77.1025,
                address: deliveryAddress.address || deliveryAddress.street
            },
            trackingId,
            deliveryAgent: {
                name: deliveryMethod === 'drone' ? `Drone-${Math.floor(Math.random() * 100)}` : 'Agent Assignment Pending',
                phone: deliveryMethod === 'drone' ? 'N/A' : 'Pending',
                type: deliveryMethod
            },
            orderDate: order.orderDate
        };

        mockDeliveries.push(delivery);

        res.status(201).json({
            message: 'Order placed successfully',
            order,
            trackingId
        });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Failed to place order' });
    }
});

// Track delivery
router.get('/delivery/track/:trackingId', authenticateToken, async (req, res) => {
    try {
        const { trackingId } = req.params;
        
        const delivery = mockDeliveries.find(del => del.trackingId === trackingId);
        
        if (!delivery) {
            return res.status(404).json({ error: 'Delivery not found' });
        }

        // Check if user has access to this delivery
        if (delivery.patientId !== req.user.userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Simulate real-time location updates
        if (delivery.status === 'in-transit') {
            // Simulate movement towards destination
            const progress = Math.random() * 0.5 + 0.3; // 30-80% progress
            delivery.currentLocation = {
                latitude: delivery.currentLocation.latitude + (delivery.destination.latitude - delivery.currentLocation.latitude) * progress,
                longitude: delivery.currentLocation.longitude + (delivery.destination.longitude - delivery.currentLocation.longitude) * progress,
                address: `En route to ${delivery.destination.address}`
            };
        }

        res.json({ delivery });
    } catch (error) {
        console.error('Error tracking delivery:', error);
        res.status(500).json({ error: 'Failed to track delivery' });
    }
});

// Get user's delivery history
router.get('/delivery/history', authenticateToken, async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const patientId = req.user.userId;

        let userDeliveries = mockDeliveries.filter(del => del.patientId === patientId);

        if (status) {
            userDeliveries = userDeliveries.filter(del => del.status === status);
        }

        // Sort by order date (newest first)
        userDeliveries.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

        // Apply pagination
        const startIndex = (parseInt(page) - 1) * parseInt(limit);
        const endIndex = startIndex + parseInt(limit);
        const paginatedDeliveries = userDeliveries.slice(startIndex, endIndex);

        res.json({
            deliveries: paginatedDeliveries,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(userDeliveries.length / parseInt(limit)),
                totalDeliveries: userDeliveries.length,
                hasNextPage: endIndex < userDeliveries.length,
                hasPrevPage: parseInt(page) > 1
            }
        });
    } catch (error) {
        console.error('Error fetching delivery history:', error);
        res.status(500).json({ error: 'Failed to fetch delivery history' });
    }
});

// Get all active deliveries (for dashboard)
router.get('/delivery/active', authenticateToken, async (req, res) => {
    try {
        const activeStatuses = ['processing', 'picked-up', 'in-transit', 'out-for-delivery'];
        const activeDeliveries = mockDeliveries.filter(del => 
            activeStatuses.includes(del.status) && del.patientId === req.user.userId
        );

        res.json({ deliveries: activeDeliveries });
    } catch (error) {
        console.error('Error fetching active deliveries:', error);
        res.status(500).json({ error: 'Failed to fetch active deliveries' });
    }
});

// Update delivery status (for admin/agent use)
router.patch('/delivery/:deliveryId/status', authenticateToken, async (req, res) => {
    try {
        const { deliveryId } = req.params;
        const { status, location } = req.body;

        const deliveryIndex = mockDeliveries.findIndex(del => del.id === deliveryId);
        
        if (deliveryIndex === -1) {
            return res.status(404).json({ error: 'Delivery not found' });
        }

        const delivery = mockDeliveries[deliveryIndex];

        // Update status
        delivery.status = status;
        
        if (location) {
            delivery.currentLocation = location;
        }

        if (status === 'delivered') {
            delivery.deliveredAt = new Date();
        }

        mockDeliveries[deliveryIndex] = delivery;

        res.json({
            message: 'Delivery status updated successfully',
            delivery
        });
    } catch (error) {
        console.error('Error updating delivery status:', error);
        res.status(500).json({ error: 'Failed to update delivery status' });
    }
});

// Get medicine categories
router.get('/meta/categories', async (req, res) => {
    try {
        const categories = [...new Set(mockMedicines.map(med => med.category))];
        res.json({ categories: categories.sort() });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

export default router;
