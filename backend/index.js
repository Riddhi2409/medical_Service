const express=require('express');
const cookieParser = require('cookie-parser');
const cors=require('cors');
// const mongoose=require('moongoose');
require('dotenv').config();
const connectdb=require('./mongodb/connect');

const authRoutes = require('./Routes/auth')
const userRoutes = require('./Routes/user');
const doctorRoutes = require('./Routes/doctor');
const reviewRoutes = require('./Routes/review');
const bookingRoutes = require('./Routes/booking')

const app=express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/doctors',doctorRoutes)
app.use('/api/v1/reviews',reviewRoutes)
app.use('/api/v1/bookings',bookingRoutes)

const startServer = async () => {
    try {
      connectdb.connectdb(process.env.MONGO_URL);
      app.listen(port, () => console.log('Server started on port 8080'));
    } catch (error) {
      console.log(error);
    }
  };

startServer();

app.get('/api/v1/',(req,res)=>{
    res.send('hello world')
})
