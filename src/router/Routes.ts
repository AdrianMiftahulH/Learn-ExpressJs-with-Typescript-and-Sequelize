import express from "express";

// Controllers
import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";

// Middlewares
import UserValidation from "../middleware/validation/UserValidation"
import Authorization from "../middleware/Authorization";
const router = express.Router();

// memanggil semua data
// Menambahakan middleware Authorization untuk user bila ingin akses tapi belom login maka tidak bisa
router.get("/role", Authorization.Authenticated , RoleController.GetRole);
// membuat sebuah data
router.post("/role",Authorization.Authenticated, Authorization.AdminRole, RoleController.CreateRole);
// mengupdate data sesuai id
router.post("/role/:id",Authorization.Authenticated, Authorization.AdminRole, RoleController.UpdateRole);
// menghapus data sesuai id
router.delete("/role/:id", Authorization.Authenticated, Authorization.SuperUser , RoleController.DeleteRole);
// memanggil data sesuai id
router.get("/role/:id",Authorization.Authenticated, RoleController.GetRoleById);

// Router Register
// Jadi kegunaan middleware itu untuk memvalidasi dahulu bila berhasil maka akan dilanjutkan ke Controller. Bila tidak akan di stop di middleware tidak akan di lanjutkan ke controller
router.post("/user/register", UserValidation.RegisterValidation, UserController.Register)

// Router Login
router.post("/user/login", UserController.UserLogin)
// Router Refresh Token
router.get("/user/refresh-token", UserController.RefreshToken);

// Logout
router.get("/user/current-user", Authorization.Authenticated, UserController.UserDetail)
router.get("/user/logout", Authorization.Authenticated, UserController.UserLogout)
export default router;