const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/db');
const User = require('./src/models/User');
const authRoutes = require('./src/routes/authRoutes');
const patientRoutes = require('./src/routes/patientRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);

// Database sync and server start
sequelize.sync({ force: false }).then(async () => {
  console.log('Database connected');

  // Seed default user
  const admin = await User.findOne({ where: { username: 'admin' } });
  if (!admin) {
    await User.create({ username: 'admin', password: 'password123' });
    console.log('Default admin user created: admin / password123');
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => console.log(err));