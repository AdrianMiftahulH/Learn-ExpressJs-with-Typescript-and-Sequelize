import { Request, Response, response } from "express";
import Role from "../db/models/Role";

const GetRole = async(req:Request, res:Response): Promise<Response> => {

    try {
        const roles = await Role.findAll()        

        return response.status(200).send({
            status: 200,
            message: 'OK',
            data: roles
        })
    } catch (error: any) {
        if(error != null && error instanceof Error){
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error
            })
        }

        return res.status(500).send({
            status: 500,
            message: "internal server error",
            errors: error
        })
    }
}

export default{ GetRole }