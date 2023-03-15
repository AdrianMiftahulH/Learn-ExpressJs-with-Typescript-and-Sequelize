import { Request, Response } from "express";
import SubMenu from "../db/models/SubMenu";
import Helper from "../helpers/Helper";

const CreateSubMenu =async (req:Request, res: Response): Promise<Response> => {
    try {
        const {name, masterMenuId, url, title, icon, ordering, isTarget} = req.body

        const subMenu = SubMenu.create({
            name,
            masterMenuId,
            url,
            title,
            icon,
            ordering,
            isTarget,
            active:true
        })

        return res.status(201).send(Helper.ResponseData(201, "Created", null, subMenu))
    } catch (error: any) {
        // Kondisi bila Error
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}
const GetListSubMenu =async (req:Request, res: Response): Promise<Response> => {
    try {
        const menu = await SubMenu.findAll({
            where:{
                active: true
            }
        })
        return res.status(200).send(Helper.ResponseData(200, "OK", null, menu))
    } catch (error: any) {
        // Kondisi bila Error
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}
const GetAllSubMenu =async (req:Request, res: Response): Promise<Response> => {
    try {
        const menu = await SubMenu.findAll();

        return res.status(200).send(Helper.ResponseData(200, "OK", null, menu))
    } catch (error: any) {
        // Kondisi bila Error
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}
const GetDetailSubMenu =async (req:Request, res: Response): Promise<Response> => {
    try {
        const {id} = req.params;

        const menu = await SubMenu.findOne({
            where:{
                id: id,
                active: true
            }
        })
        if (!menu) {
            return res.status(404).send(Helper.ResponseData(404, "Data Not Found", null, null))
        }
        return res.status(200).send(Helper.ResponseData(200, "OK", null, menu))
    } catch (error: any) {
        // Kondisi bila Error
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}
const UpdateSubMenu =async (req:Request, res: Response): Promise<Response> => {
    try {
        const {id} = req.params;
        const {name, masterMenuId, url, title, icon, ordering, isTarget} = req.body

        const submenu = await SubMenu.findOne({
            where: {
                id:id,
                active:true
            }
        })

        if (!submenu) {
            return res.status(404).send(Helper.ResponseData(404, "Data Not Found", null, null))
        }

        submenu.name = name;
        submenu.masterMenuId = masterMenuId;
        submenu.url = url;
        submenu.title = title;
        submenu.icon= icon;
        submenu.ordering = ordering;
        submenu.isTarget = isTarget;
        
        await submenu.save();

        return res.status(200).send(Helper.ResponseData(200, "Updated", null, null))
    } catch (error: any) {
        // Kondisi bila Error
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}
const SoftDeleteSubMenu =async (req:Request, res: Response): Promise<Response> => {
    try {
        const {id} = req.params;
        const menu = await SubMenu.findOne({
            where: {
                id:id,
                active:true
            }
        })

        if (!menu) {
            return res.status(404).send(Helper.ResponseData(404, "Data Not Found", null, null))
        }

        menu.active = false;

        await menu.save();
        
        return res.status(200).send(Helper.ResponseData(200, "Remove Success", null, null))
    } catch (error: any) {
        // Kondisi bila Error
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    } 
}
const DeletePermanentSubMenu =async (req:Request, res: Response): Promise<Response> => {
    try {
        const {id} = req.params;

        const menu = await SubMenu.findOne({
            where: {
                id:id,
                active:true
            }
        })

        if (!menu) {
            return res.status(404).send(Helper.ResponseData(404, "Data Not Found", null, null))
        }

        await menu.destroy();

        return res.status(200).send(Helper.ResponseData(200, "Data Delete Permanent", null, null))
    } catch (error: any) {
        // Kondisi bila Error
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}

export default {CreateSubMenu, GetListSubMenu, GetAllSubMenu, GetDetailSubMenu, UpdateSubMenu, SoftDeleteSubMenu, DeletePermanentSubMenu};