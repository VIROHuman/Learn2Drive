import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin';
import studentRoutes from './routes/student';
import superAdminRoutes from './routes/super-admin';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Learn2Drive Academy API',
    status: 'running',
    version: '1.0.0'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Admin routes
app.use('/api', adminRoutes);

// Student routes
app.use('/api', studentRoutes);

// Super Admin routes
app.use('/api', superAdminRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`   - GET  /api/courses`);
  console.log(`   - POST /api/courses`);
  console.log(`   - GET  /api/categories`);
  console.log(`   - GET  /api/sales`);
  console.log(`   - POST /api/sales/invite`);
});
