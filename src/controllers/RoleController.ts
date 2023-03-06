import { Request, Response } from "express";
import Role from "../db/models/Role";


// Memanggil semua data dari databases
// membuat sebuah func async
const GetRole = async (req: Request, res: Response): Promise<Response> => {
	try {
        // membuat sebuah variabel dengan berisi class Role (findAll, memanggil semua) tapi hanya active: true
		const roles = await Role.findAll({
			where: {
				active: true
			}
		});

        // kondisi bila hasil true/benar/ada/tidak error
		return res.status(200).send({
			status: 200,
			message: 'OK',
			data: roles
		});
	} catch (error: any) {
        // kondisi bila error tersebut tidak null
		if (error != null && error instanceof Error) {
			return res.status(500).send({
				status: 500,
				message: error.message,
				errors: error
			});
		}

		// mengembalikan response bila terdapat error dari database(seperti database tidak terhubung/error dari database)
		return res.status(500).send({
			status: 500,
			message: "Internal server error",
			errors: error
		});
	}
};

// Membuat data role ke sebuah database
const CreateRole = async (req: Request, res: Response): Promise<Response> => {
	try {
        // membuat var yang berisi value dari request body/form
		const { roleName, active } = req.body;

        // membuat sebuah var create dengan berisi class Role
		const create = await Role.create({
			roleName,
			active
		});
		// mengirim response dengan data dari database
		return res.status(201).send({
			status: 201,
			message: "Created",
			data: create
		});
	} catch (error:any) {
		// kondisi bila error tersebut tidak null
		if (error != null && error instanceof Error) {
			return res.status(500).send({
				status: 500,
				message: error.message,
				errors: error
			});
		}

		// mengembalikan response bila terdapat error dari database(seperti database tidak terhubung/error dari database)
		return res.status(500).send({
			status: 500,
			message: "Internal server error",
			errors: error
		});
	}
}

// Update data role dari database sesuai id
const UpdateRole = async (req: Request, res: Response): Promise<Response> => {
	try {
		// mengambil id dari params url
		const { id } = req.params;
		// mengambil nama role dan active dari body
		const { roleName, active } = req.body;

		// membuat variabel dengan value yang memanggil class Role dan mendapatkan data sesuai id
		const role = await Role.findByPk(id);

		// kondisi jika data role tersebut tidak ada
		if (!role) {
			return res.status(404).send({
				status: 404,
				message: "Data Not Found",
				data: null
			});
		}

		// membuat property role.roleName dengan value dari roleName
		role.roleName = roleName;
		// membuat property role.active dengan value dari active
		role.active = active;

		// menyimpan data terbaru
		await role.save();

		// mengembalikan response bila data berhasil
		return res.status(200).send({
			status: 200,
			message: "OK",
			data: role
		});
	} catch (error: any) {
		// kondisi bila error tersebut tidak null
		if (error != null && error instanceof Error) {
			return res.status(500).send({
				status: 500,
				message: error.message,
				errors: error
			});
		}

		// mengembalikan response bila terdapat error dari database(seperti database tidak terhubung/error dari database)
		return res.status(500).send({
			status: 500,
			message: "Internal server error",
			errors: error
		});
	}
};

// Menghapus data role sesuai id
const DeleteRole = async (req: Request, res: Response): Promise<Response> => {
	try {
		// membuat var id dengan value request params
		const { id } = req.params;

		// membuat variabel dengan value yang memanggil class Role dan mendapatkan data sesuai id
		const role = await Role.findByPk(id);

		// kondisi jika data role tersebut tidak ada
		if (!role) {
			return res.status(404).send({
				status: 404,
				message: "Data Not Found",
				data: null
			});
		}

		// aksi mengahapus data role
		await role.destroy();

		// mengembalikan response bila data berhasil/true
		return res.status(200).send({
			status: 200,
			message: "Deleted",
			data: null
		});
	} catch (error:any) {
		// kondisi bila error tersebut tidak null
		if (error != null && error instanceof Error) {
			return res.status(500).send({
				status: 500,
				message: error.message,
				errors: error
			});
		}

		// mengembalikan response bila terdapat error dari database(seperti database tidak terhubung/error dari database)
		return res.status(500).send({
			status: 500,
			message: "Internal server error",
			errors: error
		});
	}
}

// Mengambil data sesuai id
const GetRoleById = async (req: Request, res: Response): Promise<Response> => {
	try {
		// membuat var id dengan value request params
		const { id } = req.params;

		// membuat variabel dengan value yang memanggil class Role dan mendapatkan data sesuai id
		const role = await Role.findByPk(id);

		// kondisi jika data role tersebut tidak ada
		if (!role) {
			return res.status(404).send({
				status: 404,
				message: "Data Not Found",
				data: null
			});
		}

		// mengembalikan response bila data berhasil/true
		return res.status(200).send({
			status: 200,
			message: "OK",
			data: role
		});
	} catch (error:any) {
		// kondisi bila error tersebut tidak null
		if (error != null && error instanceof Error) {
			return res.status(500).send({
				status: 500,
				message: error.message,
				errors: error
			});
		}

		// mengembalikan response bila terdapat error dari database(seperti database tidak terhubung/error dari database)
		return res.status(500).send({
			status: 500,
			message: "Internal server error",
			errors: error
		});
	}
}

export default { GetRole, CreateRole, UpdateRole, DeleteRole, GetRoleById };