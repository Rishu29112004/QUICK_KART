import express from "express";
import {
  addToCart,
  getMyCart,
  removeFromCart,
  updateCartQuantity,
} from "../controller/cartController.js";
import authenticateUser from "../middleware/authMiddleWare.js";

const cartRouter = express.Router();

cartRouter.post("/add", authenticateUser, addToCart);
cartRouter.get("/my-cart", authenticateUser, getMyCart);
cartRouter.delete("/remove/:productId", authenticateUser, removeFromCart);
cartRouter.put("/update/:productId", authenticateUser, updateCartQuantity);

export default cartRouter;