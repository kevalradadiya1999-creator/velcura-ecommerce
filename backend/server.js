const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const paymentRoutes = require('./routes/paymentRoute');
const orderRoutes = require('./routes/orderRoute');

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173', 
  'https://velcurahygiene.in', 
  'https://www.velcurahygiene.in',
  'https://velcurahygiene.com',
  'https://www.velcurahygiene.com',
  'https://velcurahygine.in',
  'https://www.velcurahygine.in',
  'https://velcura.vercel.app'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());

// Routes
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);

// Base route for testing
app.get('/', (req, res) => {
  res.send('Velcura API is running...');
});

// Uptime monitoring route (prevents cold starts)
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
