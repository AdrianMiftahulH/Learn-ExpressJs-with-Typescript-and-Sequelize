import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

// membuat interface
interface UserAttributes {
    id?: number,
    name?: string | null,
    email?: string | null,
    password?: string | null,
    roleId?: number | null,
    accessToken?: string | null,
    verified?: boolean | null,
    active?: boolean | null,

    createdAt?: Date,
    updatedAt? : Date
}

export interface UserInput extends Optional<UserAttributes, 'id'>{ }
export interface UserOutput extends Required<UserAttributes>{ }

// membuat class implements dari interface UserAttributes
class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number;
    public name!: string | null;
    public email!: string | null;
    public password!: string | null;
    public roleId!: number | null;
    public accessToken!: string | null;
    public verified!: boolean | null;
    public active!: boolean | null;

    public readonly createdAt!: Date;
    public readonly updatedAt! : Date;
}

User.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    roleId: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    accessToken: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
}, {
    timestamps: true,
    sequelize: connection,
    underscored: false
})

export default User