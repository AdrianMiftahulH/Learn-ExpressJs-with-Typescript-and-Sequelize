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

export default { ResponseData}