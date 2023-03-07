import { Request, Response } from "express";
import User from "../db/models/User";
import Helper from "../helpers/Helper";
import PasswordHelper from "../helpers/PasswordHelper";

const Register = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Memanggil request body
        const { name, email, password, confirmPassword } = req.body;
        
        // Membuat Password hash
        const hashed = await PasswordHelper.PasswordHashing(password);

        // Membuat User / register dengan sequelize
        const user = await User.create({
            name: name,
            email: email,
            password: hashed,
            active: true,
            verified: true,
            roleId: 1
        });

        // Kondisi bila hasil nya berhasil / true
        return res.status(201).send(
            Helper.ResponseData(201, "Create", null, user)
        );
    } catch (error: any) {
        // Kondisi bila Error
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}

export default {Register}