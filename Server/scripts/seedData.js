import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/telemedicine';

// Sample data
const sampleUsers = [
    {
        firstName: 'Dr. Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@hospital.com',
        password: 'password123',
        phone: '+91-9876543210',
        dateOfBirth: new Date('1980-05-15'),
        gender: 'female',
        role: 'doctor',
        address: {
            street: '123 Medical Center',
            city: 'Delhi',
            state: 'Delhi',
            zipCode: '110001',
            country: 'India'
        }
    },
    {
        firstName: 'Dr. Rajesh',
        lastName: 'Patel',
        email: 'rajesh.patel@clinic.com',
        password: 'password123',
        phone: '+91-9876543211',
        dateOfBirth: new Date('1975-08-22'),
        gender: 'male',
        role: 'doctor',
        address: {
            street: '456 Health Plaza',
            city: 'Mumbai',
            state: 'Maharashtra',
            zipCode: '400001',
            country: 'India'
        }
    },
    {
        firstName: 'Dr. Priya',
        lastName: 'Sharma',
        email: 'priya.sharma@hospital.com',
        password: 'password123',
        phone: '+91-9876543212',
        dateOfBirth: new Date('1985-03-10'),
        gender: 'female',
        role: 'doctor',
        address: {
            street: '789 Care Center',
            city: 'Bangalore',
            state: 'Karnataka',
            zipCode: '560001',
            country: 'India'
        }
    },
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        password: 'password123',
        phone: '+91-9876543213',
        dateOfBirth: new Date('1990-01-15'),
        gender: 'male',
        role: 'patient',
        address: {
            street: '321 Residential Area',
            city: 'Delhi',
            state: 'Delhi',
            zipCode: '110002',
            country: 'India'
        },
        medicalHistory: [
            {
                condition: 'Hypertension',
                diagnosedDate: new Date('2020-01-15'),
                status: 'active'
            }
        ],
        allergies: ['Peanuts', 'Dust'],
        medications: [
            {
                name: 'Lisinopril',
                dosage: '10mg',
                frequency: 'Once daily',
                startDate: new Date('2020-01-15')
            }
        ]
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@gmail.com',
        password: 'password123',
        phone: '+91-9876543214',
        dateOfBirth: new Date('1988-07-20'),
        gender: 'female',
        role: 'patient',
        address: {
            street: '654 Garden Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            zipCode: '400002',
            country: 'India'
        },
        allergies: ['Shellfish']
    }
];

const sampleDoctors = [
    {
        specialization: 'Cardiology',
        licenseNumber: 'MH12345',
        experience: 15,
        education: [
            {
                degree: 'MBBS',
                institution: 'AIIMS Delhi',
                year: 2005
            },
            {
                degree: 'MD Cardiology',
                institution: 'AIIMS Delhi',
                year: 2008
            }
        ],
        certifications: ['Board Certified Cardiologist', 'Echo Cardiography'],
        languages: ['English', 'Hindi', 'Punjabi'],
        consultationFee: 800,
        availability: {
            monday: {
                isAvailable: true,
                slots: [
                    { start: '09:00', end: '12:00' },
                    { start: '14:00', end: '17:00' }
                ]
            },
            tuesday: {
                isAvailable: true,
                slots: [
                    { start: '09:00', end: '12:00' },
                    { start: '14:00', end: '17:00' }
                ]
            },
            wednesday: {
                isAvailable: true,
                slots: [
                    { start: '09:00', end: '12:00' }
                ]
            },
            thursday: {
                isAvailable: true,
                slots: [
                    { start: '09:00', end: '12:00' },
                    { start: '14:00', end: '17:00' }
                ]
            },
            friday: {
                isAvailable: true,
                slots: [
                    { start: '09:00', end: '12:00' },
                    { start: '14:00', end: '17:00' }
                ]
            },
            saturday: {
                isAvailable: true,
                slots: [
                    { start: '09:00', end: '13:00' }
                ]
            },
            sunday: {
                isAvailable: false,
                slots: []
            }
        },
        rating: {
            average: 4.8,
            totalReviews: 156
        },
        hospitalAffiliation: {
            name: 'Apollo Hospital',
            address: '123 Medical Center, Delhi',
            city: 'Delhi'
        },
        isVerified: true,
        totalConsultations: 1250
    },
    {
        specialization: 'General Medicine',
        licenseNumber: 'MH12346',
        experience: 10,
        education: [
            {
                degree: 'MBBS',
                institution: 'Grant Medical College',
                year: 2010
            },
            {
                degree: 'MD Internal Medicine',
                institution: 'KEM Hospital',
                year: 2013
            }
        ],
        certifications: ['Internal Medicine Board Certification'],
        languages: ['English', 'Hindi', 'Marathi'],
        consultationFee: 600,
        availability: {
            monday: {
                isAvailable: true,
                slots: [
                    { start: '10:00', end: '13:00' },
                    { start: '15:00', end: '18:00' }
                ]
            },
            tuesday: {
                isAvailable: true,
                slots: [
                    { start: '10:00', end: '13:00' },
                    { start: '15:00', end: '18:00' }
                ]
            },
            wednesday: {
                isAvailable: false,
                slots: []
            },
            thursday: {
                isAvailable: true,
                slots: [
                    { start: '10:00', end: '13:00' },
                    { start: '15:00', end: '18:00' }
                ]
            },
            friday: {
                isAvailable: true,
                slots: [
                    { start: '10:00', end: '13:00' },
                    { start: '15:00', end: '18:00' }
                ]
            },
            saturday: {
                isAvailable: true,
                slots: [
                    { start: '10:00', end: '14:00' }
                ]
            },
            sunday: {
                isAvailable: false,
                slots: []
            }
        },
        rating: {
            average: 4.6,
            totalReviews: 89
        },
        hospitalAffiliation: {
            name: 'Lilavati Hospital',
            address: '456 Health Plaza, Mumbai',
            city: 'Mumbai'
        },
        isVerified: true,
        totalConsultations: 850
    },
    {
        specialization: 'Gynecology',
        licenseNumber: 'KA12347',
        experience: 12,
        education: [
            {
                degree: 'MBBS',
                institution: 'Bangalore Medical College',
                year: 2008
            },
            {
                degree: 'MS Gynecology',
                institution: 'St. Johns Medical College',
                year: 2012
            }
        ],
        certifications: ['Gynecological Oncology', 'Laparoscopic Surgery'],
        languages: ['English', 'Hindi', 'Kannada', 'Tamil'],
        consultationFee: 750,
        availability: {
            monday: {
                isAvailable: true,
                slots: [
                    { start: '08:00', end: '12:00' },
                    { start: '16:00', end: '19:00' }
                ]
            },
            tuesday: {
                isAvailable: true,
                slots: [
                    { start: '08:00', end: '12:00' },
                    { start: '16:00', end: '19:00' }
                ]
            },
            wednesday: {
                isAvailable: true,
                slots: [
                    { start: '08:00', end: '12:00' }
                ]
            },
            thursday: {
                isAvailable: true,
                slots: [
                    { start: '08:00', end: '12:00' },
                    { start: '16:00', end: '19:00' }
                ]
            },
            friday: {
                isAvailable: true,
                slots: [
                    { start: '08:00', end: '12:00' },
                    { start: '16:00', end: '19:00' }
                ]
            },
            saturday: {
                isAvailable: true,
                slots: [
                    { start: '08:00', end: '13:00' }
                ]
            },
            sunday: {
                isAvailable: false,
                slots: []
            }
        },
        rating: {
            average: 4.9,
            totalReviews: 203
        },
        hospitalAffiliation: {
            name: 'Manipal Hospital',
            address: '789 Care Center, Bangalore',
            city: 'Bangalore'
        },
        isVerified: true,
        totalConsultations: 1100
    }
];

async function seedDatabase() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('🧹 Clearing existing data...');
        await User.deleteMany({});
        await Doctor.deleteMany({});
        await Appointment.deleteMany({});

        // Create users
        console.log('👥 Creating users...');
        const createdUsers = await User.insertMany(sampleUsers);
        console.log(`✅ Created ${createdUsers.length} users`);

        // Create doctors (link to user accounts)
        console.log('👨‍⚕️ Creating doctor profiles...');
        const doctorUsers = createdUsers.filter(user => user.role === 'doctor');
        
        for (let i = 0; i < sampleDoctors.length && i < doctorUsers.length; i++) {
            const doctorData = {
                ...sampleDoctors[i],
                userId: doctorUsers[i]._id
            };
            await Doctor.create(doctorData);
        }
        
        console.log(`✅ Created ${Math.min(sampleDoctors.length, doctorUsers.length)} doctor profiles`);

        // Create sample appointments
        console.log('📅 Creating sample appointments...');
        const patients = createdUsers.filter(user => user.role === 'patient');
        const doctors = await Doctor.find({}).populate('userId');
        
        if (patients.length > 0 && doctors.length > 0) {
            const sampleAppointments = [
                {
                    patientId: patients[0]._id,
                    doctorId: doctors[0]._id,
                    appointmentDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
                    timeSlot: { start: '10:00', end: '10:30' },
                    type: 'consultation',
                    mode: 'video',
                    symptoms: ['Chest pain', 'Shortness of breath'],
                    consultationFee: doctors[0].consultationFee,
                    status: 'scheduled'
                },
                {
                    patientId: patients[1] ? patients[1]._id : patients[0]._id,
                    doctorId: doctors[1] ? doctors[1]._id : doctors[0]._id,
                    appointmentDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
                    timeSlot: { start: '15:00', end: '15:30' },
                    type: 'follow-up',
                    mode: 'video',
                    symptoms: ['Fever', 'Headache'],
                    consultationFee: doctors[1] ? doctors[1].consultationFee : doctors[0].consultationFee,
                    status: 'confirmed'
                }
            ];
            
            await Appointment.insertMany(sampleAppointments);
            console.log(`✅ Created ${sampleAppointments.length} sample appointments`);
        }

        console.log('🎉 Database seeding completed successfully!');
        console.log('\n📊 Summary:');
        console.log(`   Users: ${await User.countDocuments()}`);
        console.log(`   Doctors: ${await Doctor.countDocuments()}`);
        console.log(`   Appointments: ${await Appointment.countDocuments()}`);
        
        console.log('\n🔐 Test Login Credentials:');
        console.log('   Doctor: sarah.johnson@hospital.com / password123');
        console.log('   Patient: john.doe@gmail.com / password123');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
        process.exit(0);
    }
}

// Run the seed function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    seedDatabase();
}

export default seedDatabase;
