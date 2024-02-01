// packages imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// files imports
import connectDB from './config/db.js';
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

//config
dotenv.config();

//DB Connection
connectDB();

//rest object
const app = express()

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


//routes
app.use('/app/v1/test', testRoutes);
app.use('/app/v1/auth', authRoutes);
app.use('/app/v1/user', userRoutes);
app.use('/app/v1/job', jobRoutes);

//Validation middleware
app.use(errorMiddleware)


app.get('/', (req, res) => {
    res.json({ message: "working" });
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);

})