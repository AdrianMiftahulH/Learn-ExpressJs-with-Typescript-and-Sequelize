import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./router/Routes";

dotenv.config();

const app = express();

// Untuk menerima data bersifat json
app.use(express.json())

// menghubungkan ke router
app.use(router);

app.get("/", (req:Request, res: Response) => {
    return res.status(200).send({
        respnse: "This use Typescript"
    })
})

// mengecek ke terminal bahwa port ini berhasil berjalan
app.listen(process.env.APP_PORT, () => {
    console.log(`${process.env.APP_NAME}, Running on port ${process.env.APP_PORT}`);
})