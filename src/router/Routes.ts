import express from "express";

// Controllers
import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";

// Middlewares
import UserValidation from "../middleware/validation/UserValidation"

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

// Router User
// Jadi kegunaan middleware itu untuk memvalidasi dahulu bila berhasil maka akan dilanjutkan ke Controller. Bila tidak akan di stop di middleware tidak akan di lanjutkan ke controller
router.post("/user/register", UserValidation.RegisterValidation, UserController.Register)

export default router;