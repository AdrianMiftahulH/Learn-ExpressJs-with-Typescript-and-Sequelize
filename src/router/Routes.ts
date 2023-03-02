import express from "express";
import RoleController from "../controllers/RoleController";

const router = express.Router()

router.post("/role", RoleController.GetRole);

export default router