import express from "express";
import { placeOrder, getMyOrders } from "../controller/orderController.js";
import authenticateUser from "../middleware/authMiddleWare.js";

const orderRouter = express.Router();

orderRouter.post("/place", authenticateUser, placeOrder);
orderRouter.get("/my-orders", authenticateUser, getMyOrders);

export default orderRouter;