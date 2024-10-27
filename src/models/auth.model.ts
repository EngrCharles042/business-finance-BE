import { DataTypes } from "sequelize";
import { sequelize } from "../index";
import { IPasswordModel } from "../interface/auth.interface";
import bcrypt from "bcrypt";

const Password = IPasswordModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validatePassword(value: string) {
          if (!value.match(/\d/) || !value.match(/[a-zA-z]/)) {
            throw new Error(
              `Password must contain at least one letter and one number`
            );
          }
        },
      },
    },
  },
  {
    sequelize,
    tableName: "passwords",
    timestamps: true,
    hooks: {
      // Hash the password before saving it
      async beforeSave(password) {
        if (password.changed("password")) {
          password.password = await bcrypt.hash(password.password, 10);
        }
      },
    },
  }
);

export default Password;
