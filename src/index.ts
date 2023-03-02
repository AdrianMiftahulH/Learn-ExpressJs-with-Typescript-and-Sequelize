import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./router/Routes";
import RoleController from "./controllers/RoleController";

dotenv.config();

const app = express();


app.get("/role", RoleController.GetRole);
app.get("/", (req:Request, res: Response) => {
    return res.status(200).send({
        respnse: "This use Typescript"
    })
})

app.listen(process.env.APP_PORT, () => {
    console.log(`${process.env.APP_NAME}, Running on port ${process.env.APP_PORT}`);
})