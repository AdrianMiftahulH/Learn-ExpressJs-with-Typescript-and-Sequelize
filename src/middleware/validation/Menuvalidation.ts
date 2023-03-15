import { NextFunction, Request, Response } from "express";
import Validator from "validatorjs";
import MasterMenu from "../../db/models/MasterMenu";
import Helper from "../../helpers/Helper";


const CreateMenuValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, icon, ordering} = req.body;

        const data = {
            name, icon, ordering
        };

        const rules: Validator.Rules = {
            "name": "required|string|max:50",
            "icon": "string",
            "ordering": "required",
        }

         // Untuk membuat data yang sudah di validasi 
        const validate = new Validator(data, rules);

        // Kondisi data salah/tidak terpenuhi
        if (validate.fails()) {
            return res.status(400).send(Helper.ResponseData(400, "Bad Request", validate.errors, null));
        }

        next();
    } catch (error: any) {
        // Kondisi Error
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}

const CreateSubMenuValidation = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, masterMenuId, url, title, icon, ordering, isTarget} = req.body;

        const data = {
            name, masterMenuId, url, title, icon, ordering, isTarget
        };

        const rules: Validator.Rules = {
            "name": "required|string|max:50",
            "masterMenuId": "required|number",
            "url": "required|string",
            "title": "required|string|max:50",
            "icon": "required|string",
            "ordering": "required|number",
            "isTarget": "required|boolean",
        }

         // Untuk membuat data yang sudah di validasi 
        const validate = new Validator(data, rules);

        // Kondisi data salah/tidak terpenuhi
        if (validate.fails()) {
            return res.status(400).send(Helper.ResponseData(400, "Bad Request", validate.errors, null));
        }

        const menu = await MasterMenu.findOne({
            where:{
                id: masterMenuId,
                active:true
            }
        })
        if(!menu){
            const errorData ={
                errors: {
                    masterMenuId: [
                        "Master Menu Not Found"
                    ]
                }
            }

            return res.status(400).send(Helper.ResponseData(400, "Bad Request", errorData, null)); 
        }
        next();
    } catch (error: any) {
        // Kondisi Error
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}

export default {CreateMenuValidation, CreateSubMenuValidation};