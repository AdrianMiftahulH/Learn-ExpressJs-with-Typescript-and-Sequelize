import express from "express";

import RoleController from "../controllers/RoleController";

const router = express.Router();

// memanggil semua data
router.get("/role", RoleController.GetRole);
// membuat sebuah data
router.post("/role", RoleController.CreateRole);
// mengupdate data sesuai id
router.post("/role/:id", RoleController.UpdateRole);
// menghapus data sesuai id
router.delete("/role/:id", RoleController.DeleteRole);
// memanggil data sesuai id
router.get("/role/:id", RoleController.GetRoleById);

export default router;