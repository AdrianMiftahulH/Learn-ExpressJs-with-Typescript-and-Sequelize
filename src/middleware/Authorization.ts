import { NextFunction, Request, Response } from "express";
import Helper from "../helpers/Helper";

const Authenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        // membuat var authToken dengan value request dari header dengan name authorization
        const authToken = req.headers["authorization"];
        // membuat var token dengan value authToken dan authToken yang di split(data string yang dibagi menjadi array dan di return arra baru) ;au memilih array 1
		const token = authToken && authToken.split(" ")[1];

        // kondisi token null
        if (token === null) {
            return res.status(401).send(Helper.ResponseData(401, "Unautorized", null, null));
        }
        const result = Helper.ExtractToken(token!);
        if (result === null) {
            return res.status(401).send(Helper.ResponseData(401, "Unautorized", null, null));
        }
        res.locals.userId = result?.email;
        res.locals.roleId = result?.roleId;
        next();
    } catch (err: any) {
        return res.status(500).send(Helper.ResponseData(500, "", err, null));
    }
}

const SuperUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleId = res.locals.roleId;
        if(roleId !== 1){
            return res.status(403).send(Helper.ResponseData(403, "Forbiden", null, null));
        }

        next();
    } catch (err: any) {
        return res.status(500).send(Helper.ResponseData(500, "", err, null));
    }
}
const AdminRole = (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleId = res.locals.roleId;
        if(roleId !== 2){
            return res.status(403).send(Helper.ResponseData(403, "Forbiden", null, null));
        }

        next();
    } catch (err: any) {
        return res.status(500).send(Helper.ResponseData(500, "", err, null));
    }
}
const BasicUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleId = res.locals.roleId;
        if(roleId !== 3){
            return res.status(403).send(Helper.ResponseData(403, "Forbiden", null, null));
        }

        next();
    } catch (err: any) {
        return res.status(500).send(Helper.ResponseData(500, "", err, null));
    }
}

export default { Authenticated, SuperUser, AdminRole, BasicUser }