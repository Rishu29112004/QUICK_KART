import express from "express";
import cors from "cors";
import { connectDb } from "./config/dbConnect.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js"
import productRouter from "./routes/productRoute.js";
import profileRouter from "./routes/userRouter.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";
dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://quick-kart-ecommerce.vercel.app",
  "https://quick-kart-ecommerce-cip778e7d-kumar-rishu-ritiks-projects.vercel.app",
  /^https:\/\/.*\.vercel\.app$/
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.some(allowed => 
        allowed instanceof RegExp ? allowed.test(origin) : allowed === origin
      )) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json())

app.use("/api/auth",authRouter)

app.use("/api/product", productRouter)

app.use("/api/profile", profileRouter)

app.use("/api/cart",cartRouter)

app.use("/api/order",orderRouter)

const PORT= process.env.PORT || 8000
const startServer = async ()=>{
    try{
        await connectDb()
        app.listen(PORT, ()=>{
            console.log(`server is running on http://localhost:${PORT}`)
        })
    }catch (error){
        console.log("Failed to connect to mongoDv, server not started",error)
        process.exit(1)
    }
}
startServer();