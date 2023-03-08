import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

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
    const token = jwt.sign(data, process.env.JWT_TOKEN as string,{
        expiresIn: "10m"
    });

    return token;
}

const GenerateRefreshToken = (data: any): string =>{
    const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string,{
        expiresIn: "1d"
    });

    return token;
}   

export default { ResponseData, GenerateToken, GenerateRefreshToken}