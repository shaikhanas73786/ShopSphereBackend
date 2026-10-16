import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/connection.js';
import userRoute from './routes/userRoutes.js';
import productRoute from './routes/productRoutes.js';
import cartRoute from './routes/cartRoutes.js';
import orderRoute from './routes/orderRoutes.js';
import adminRoute from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);
app.use('/order', orderRoute);
app.use('/admin', adminRoute);


connectDB(process.env.MONGO_URL, process.env.MONGO_DB);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
