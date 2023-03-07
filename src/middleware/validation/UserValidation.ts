import { NextFunction, Request, Response } from "express";
import Validator from "validatorjs";
import Helper from "../../helpers/Helper";
import User from "../../db/models/User";

const RegisterValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Mengambil Request body 
        const {name, email, password, confirmPassword} = req.body;

        // Membuat var data dengan value req.body
        const data = {
            name,
            email,
            password,
            confirmPassword
        }
    
        // membuat rule validation yang harus di penuhi
        const rules:Validator.Rules = {
            "name": "required|string|max:50",
            "email": "required|email",
            "password": "required|min:8",
            "confirmPassword": "required|same:password",
        }

        // Untuk membuat data yang sudah di validasi 
        const validate = new Validator(data, rules);
    
        // Kondisi data salah/tidak terpenuhi
        if (validate.fails()) {
            return res.status(400).send(Helper.ResponseData(400, "Bad Request", validate.errors, null));
        }
    
        // Menemukan data email sesuai dengan data.email
        const user = await User.findOne({
            where: {
                email: data.email
            }
        })

        // kondisi bila data email ditemukan / true
        if (user){
            const errorData ={
                errors: {
                    email: [
                        "Email Already"
                    ]
                }
            }
            return res.status(400).send(Helper.ResponseData(400, "Bad Request", errorData, null))
        }

        // Untuk melanjutkan ke Contoroller
        next(); 
    } catch (error: any) {
        // Kondisi Error
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}

export default {RegisterValidation}