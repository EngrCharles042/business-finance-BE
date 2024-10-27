import { UUID } from 'crypto';
import {Model, Optional} from 'sequelize'
import bcrypt from "bcrypt";

interface IPassword {
    id: UUID;
    userId: string;
    userType: string;
    password?: string;
}

export interface IPasswordDoc extends Optional<IPassword, "id"> {}

export class IPasswordModel extends Model<IPasswordDoc, IPassword> {
  public password!: string;

  isPasswordMatch(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }

  // Override toJSON method to hide password field when serialized
  toJSON() {
    const values = { ...this.get() };
    delete values.password; 
    return values;
  }
}