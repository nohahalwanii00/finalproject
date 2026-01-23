const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/db');
const User = require('./src/models/User');
const Patient = require('./src/models/Patient'); // Added for transaction test
const authRoutes = require('./src/routes/authRoutes');
const patientRoutes = require('./src/routes/patientRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/config/swagger');
const errorHandler = require('./src/middleware/errorMiddleware');
const AppError = require('./src/utils/AppError');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Global Rate Limiting
const limiter = rateLimit({
  max: 3,
  windowMs: 1000,
  message: 'Too many requests from this IP, please try again in a second!',
  skip: (req) => req.method === 'OPTIONS'
});
app.use('/api', limiter);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);

// Test Error Route
app.get('/api/error-test', (req, res, next) => {
  const err = new Error('This is a test error to demonstrate global error handling!');
  next(err);
});

// Test Transaction Route
app.get('/api/transaction-test', async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    // 1. Create a dummy patient
    await Patient.create({
      patient_name: 'Rollback Bobby',
      doctor_name: 'Dr. Who',
      date: '2030-01-01',
      time: '12:00:00',
      status: 'Pending'
    }, { transaction: t });

    console.log('User created in transaction (pending commit)...');

    // 2. Simulate an error
    throw new Error('Oops! Something went wrong before commit.');

    // 3. Commit (This line will never be reached)
    await t.commit();
    res.json({ message: 'Transaction committed (Should not happen)' });

  } catch (error) {
    // 4. Rollback
    await t.rollback();
    console.log('Transaction rolled back due to error:', error.message);
    
    // 5. Verify if data exists
    const check = await Patient.findOne({ where: { patient_name: 'Rollback Bobby' } });
    res.json({ 
      status: 'Transaction Rolled Back', 
      error_message: error.message,
      was_data_saved: !!check // Should be false
    });
  }
});

// Handle unhandled routes
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

sequelize.sync({ force: false }).then(async () => {
  console.log('Database connected');

  
  const admin = await User.findOne({ where: { username: 'admin' } });
  if (!admin) {
    await User.create({ username: 'admin', password: 'password123', role: 'admin' });
    console.log('Default admin user created: admin / password123');
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => console.log(err));