import express from "express";
const router = express.Router();
import * as UsersController from "../app/controllers/UsersController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";


router.post("/Registration", UsersController.Registration);
router.post("/Login",UsersController.Login);
router.get("/getUserProfile/:id",AuthMiddleware, UsersController.getUserProfile);
router.get("/getAllUsers", AuthMiddleware, UsersController.getAllUsers);
router.put("/updateUserProfile/:id", AuthMiddleware, UsersController.updateUserProfile);
router.delete("/deleteUser/:id", AuthMiddleware,UsersController.deleteUser);




export default router;