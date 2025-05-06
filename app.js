const path = require('node:path');
const fs = require('node:fs'); // Import the file system module

// Define envPath here
const envPath = path.join(__dirname, '.env');

// Initialize dotenv
require('dotenv').config({ path: envPath });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');

// Import your configuration file
const config = require('./src/configuration/config');

// console.log('MongoDB URI from config:', config.MONGODB_URI); // Commented out
// console.log(path.join(__dirname, 'src/configuration/config')); // Commented out
const errorMiddleware = require('./src/middleware/errorMiddleware');
const authRoutes = require('./src/routes/authenticationRoutes');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const sellerRoutes = require('./src/routes/sellerRoutes');
const cartRoutes = require('./src/routes/cartRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Session configuration
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: config.MONGODB_URI,
        mongoOptions: {},
    }),
    cookie: {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

// Define a route for the root path '/'
app.get('/', (req, res) => {
  res.send('Welcome to your API!'); // You can customize this message
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api', categoryRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/cart', cartRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

const port = config.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));