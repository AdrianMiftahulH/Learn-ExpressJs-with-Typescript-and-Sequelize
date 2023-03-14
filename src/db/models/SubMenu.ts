import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

// membuat iterface
interface SubMenuAttributes {
    id?: number,
    name?: string | null,
    masterMenuId?: string | null,
    url?: string | null,
    title?: string | null,
    icon?: string | null,
    ordering?: number | null,
    isTarget?: boolean | null, 
    active?: boolean | null,

    createdAt?: Date,
    updatedAt? : Date
}

export interface SubMenuInput extends Optional<SubMenuAttributes, 'id'>{ }
export interface SubMenuOutput extends Required<SubMenuAttributes>{ }

// membuat class implements dari interface SubMenuAttributes
class SubMenu extends Model<SubMenuAttributes, SubMenuInput> implements SubMenuAttributes {
    public id!: number;
    public name!: string;
    public masterMenuId!: string;
    public url!: string;
    public title!: string;
    public icon!: string;
    public ordering!: number;
    public isTarget!: boolean;
    public active!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt! : Date;
}

SubMenu.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT
    },
    name: {
        allowNull: true,
        type: DataTypes.STRING
    },
    masterMenuId: {
        allowNull: true,
        type: DataTypes.STRING
    },
    url: {
        allowNull: true,
        type: DataTypes.STRING
    },
    title: {
        allowNull: true,
        type: DataTypes.STRING
    },
    icon: {
        allowNull: true,
        type: DataTypes.TEXT
    },
    ordering: {
        allowNull: true,
        type: DataTypes.INTEGER
    },
    isTarget: {
        allowNull: true,
        type: DataTypes.BOOLEAN
    },
    active: {
        allowNull: true,
        type: DataTypes.BOOLEAN
    }
    }, {
    timestamps: true,
    sequelize: connection,
    underscored: false
});

export default SubMenu;