import cookieParser from "cookie-parser";
import express from "express";
import dotev from "dotenv";
import { dbConnect } from "./db/dbConnection.js";
import {error } from './middlewares/error.js'
import cors from 'cors'
import userRouter from './router/user.routes.js'
import productRouter from './router/product.routes.js'

const app = express();
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

dotev.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads',express.static('uploads'))

app.use(cors({
  method: ['POST', 'GET',  'PUT', 'DELETE'],
  origin: [process.env.ORIGIN, 'http://localhost:5173'],
  credentials: true,
}));
// app.use(cors());

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)



app.get('/', (req, res) =>{
  res.send('Server is running')
})



// Database connection
dbConnect();

//server started
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});

app.use(error);

