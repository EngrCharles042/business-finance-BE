import { UUID } from "crypto";
import { Model, Optional } from "sequelize";

interface IUser {
  id: UUID;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  imadeUrl: string;
}

interface IUserDoc extends Optional<IUser, "id" | "imadeUrl" | "address"> {}

export class IUserModel extends Model<IUserDoc> {
  static async isEmailTaken(email: string): Promise<boolean> {
    const user = await this.findOne({ where: { email } });
    return !!user;
  }
}
