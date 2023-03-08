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

const UserLogin = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Request Email dan password
        const {email, password} = req.body;

        // Mencari data User sesuai email 
        const user = await User.findOne({
            where: {
                email: email
            }
        })    

        // Kondisi jika user tidak di temukan
        if(!user){
            return res.status(401).send(Helper.ResponseData(401, "Unauthorized", null, null))
        }

        // Mengcompare / membandingkan password dari request dengan data user sama atau tidak
        const matched = await PasswordHelper.PasswordCompare(password, user.password);
        
        // Kondisi bila password request tidak sama password di data user 
        if (!matched) {
            return res.status(401).send(Helper.ResponseData(401, "Unauthorized", null, null))
        }
        
        // membuat variabel dengan value data-data user
        const dataUser = {
            name: user.name,
            email: user.email,
            roleId: user.roleId,
            active: user.active,
            verified: user. verified
        }

        // memebuat variabel token yang valuenya Helper dengan property GenerateToken yang parameter nya diambil dari var dataUser 
        const token = Helper.GenerateToken(dataUser)
        // memebuat variabel RefreshToken yang valuenya Helper dengan property GenerateRefreshToken yang parameter nya diambil dari var dataUser 
        const refreshToken = Helper.GenerateRefreshToken(dataUser);

        // data user access berisi refreshToken
        user.accessToken = refreshToken;
        // menympan data user
        await user.save()

        // membuat response cookie di header dengan nama refreshCookie dengan value refreshToken di tambah httpOnly dan waktu habisnya
        res.cookie('refreshCookie', refreshToken, {
            httpOnly: true,
            maxAge: 24*60*60*1000
        })

        // membuat variabel dengan value data-data user lagi tapi di tambah property token
        const responseUser = {
            name: user.name,
            email: user.email,
            roleId: user.roleId,
            active: user.active,
            verified: user. verified,
            token: token
        }

        // mengembalikan response
        return res.status(200).send(Helper.ResponseData(200, "OK", null, responseUser))
    } catch (error: any) {
        // Kondisi bila Error
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}

export default {Register, UserLogin}