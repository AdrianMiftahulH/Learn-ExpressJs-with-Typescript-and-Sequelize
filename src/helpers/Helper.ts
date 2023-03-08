import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

interface userData{
    name: string | null,
    email: string | null,
    roleId: string | null,
    verified: boolean | null,
    active: boolean | null,
}

const ResponseData = (status:number, message: string | null, error: any | null, data: any | null) => {
    // kondisi bila error tersebut tidak null
		if (error != null && error instanceof Error) {
			const response = {
                status: status,
                message: error.message,
                errors: error,
                data: null
            }
            
            return response;
		}

		// mengembalikan response bila terdapat error dari database(seperti database tidak terhubung/error dari database)
		const res = {
            status,
            message,
            errors: error,
            data: data
        }

        return res
}

const GenerateToken = (data: any): string =>{
    // membuat sebuah refresh token dengan jsonwebtoken di tambah waktu expired 10 menit
    const token = jwt.sign(data, process.env.JWT_TOKEN as string,{
        expiresIn: "10m"
    });

    return token;
}

const GenerateRefreshToken = (data: any): string =>{
    // membuat sebuah refresh token dengan jsonwebtoken di tambah waktu expired 1 hari
    const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string,{
        expiresIn: "1d"
    });

    return token;
}   

const ExtractToken = (token: string): userData | null => {
    // Membuat sebuah kata kunci dengan value env JWT TOKEN
    const secretKey: string = process.env.JWT_TOKEN as string;

    let resData: any;

    // memverifikasi 
    const res = jwt.verify(token, secretKey, (err, decoded) => {
        if (err){
            resData = null
        }else{
            resData = decoded
        }

        if (resData){
            const result: userData = <userData>(resData);

            return result;
        }
    })

    return null;
}

const ExtractRefreshToken = (token: string): userData | null => {
    const secretKey: string = process.env.JWT_REFRESH_TOKEN as string;

    let resData: any;

    const res = jwt.verify(token, secretKey, (err, decoded) => {
        if (err){
            resData = null
        }else{
            resData = decoded
        }

        if (resData){
            const result: userData = <userData>(resData);

            return result;
        }
    })

    return null;
}

export default { ResponseData, GenerateToken, GenerateRefreshToken, ExtractToken, ExtractRefreshToken}