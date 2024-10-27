import { DataTypes } from "sequelize";
import { IUserModel } from "../interface/user.interface";
import { sequelize } from "../index";

const UserSchema = IUserModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Please enter a valid email address",
        },
        notEmpty: {
          msg: "Email address must not be empty",
        },
      },
    },
    phoneNumber: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    address: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    imadeUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "users",
  }
);
