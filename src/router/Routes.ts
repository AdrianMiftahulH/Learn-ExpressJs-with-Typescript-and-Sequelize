import express from "express";

// Controllers
import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";
import MasterMenuController from "../controllers/MasterMenuController";

// Middlewares
import UserValidation from "../middleware/validation/UserValidation"
import Authorization from "../middleware/Authorization";
import Menuvalidation from "../middleware/validation/Menuvalidation";
import SubMenuController from "../controllers/SubMenuController";

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

// Router Master Menu
router.post("/menu", Menuvalidation.CreateMenuValidation, Authorization.Authenticated, Authorization.AdminRole, MasterMenuController.CreateMenu);
router.get("/menu", Authorization.Authenticated, Authorization.AdminRole, MasterMenuController.GetListMenu);
router.get("/menu/get/all", Authorization.Authenticated, Authorization.SuperUser, MasterMenuController.GetAllMenu);
router.get("/menu/:id", Authorization.Authenticated, Authorization.AdminRole, MasterMenuController.GetDetailMenu);
router.patch("/menu/:id", Menuvalidation.CreateMenuValidation, Authorization.Authenticated, Authorization.AdminRole, MasterMenuController.UpdateMenu);
router.delete("/menu/:id", Authorization.Authenticated, Authorization.AdminRole, MasterMenuController.SoftDeleteMenu);
router.delete("/menu/permanent/:id", Authorization.Authenticated, Authorization.SuperUser, MasterMenuController.DeletePermanentMenu);

// Router Sub Menu
router.post("/sub-menu", Menuvalidation.CreateSubMenuValidation, Authorization.Authenticated, Authorization.AdminRole, SubMenuController.CreateSubMenu);
router.get("/sub-menu", Authorization.Authenticated, Authorization.AdminRole, SubMenuController.GetListSubMenu);
router.get("/sub-menu/get/all", Authorization.Authenticated, Authorization.SuperUser, SubMenuController.GetAllSubMenu);
router.get("/sub-menu/:id", Authorization.Authenticated, Authorization.AdminRole, SubMenuController.GetDetailSubMenu);
router.patch("/sub-menu/:id", Menuvalidation.CreateSubMenuValidation, Authorization.Authenticated, Authorization.AdminRole, SubMenuController.UpdateSubMenu);
router.delete("/sub-menu/:id", Authorization.Authenticated, Authorization.AdminRole, SubMenuController.SoftDeleteSubMenu);
router.delete("/sub-menu/permanent/:id", Authorization.Authenticated, Authorization.SuperUser, SubMenuController.DeletePermanentSubMenu);
export default router;