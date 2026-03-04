import express from "express"

import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controller/productController.js"
import authenticateUser from "../middleware/authMiddleWare.js"
import { multerMiddleware } from "../config/cloudinary.js"

const productRouter = express.Router()

productRouter.post("/add-product",authenticateUser,multerMiddleware.single("image"),addProduct)
productRouter.get("/getAllProducts",authenticateUser,getAllProducts)
productRouter.get("/getProductById/:id",authenticateUser,getProductById)
productRouter.patch("/updateProduct/:id",authenticateUser,multerMiddleware.single("image"),updateProduct)
productRouter.delete("/deleteProduct/:id",authenticateUser,deleteProduct)

export default productRouter