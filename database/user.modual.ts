import { model,models, Schema } from "mongoose";
import { unique } from "next/dist/build/utils";

export interface IUser {
    name: string,
    userName: string,
    email: string,
    bio?: string,
    image: string,
    loction?: string,
    portfolio?: string,
    reputation?: number
}

const UserSchema = new Schema ({
    name: {type: String, require: true},
    userName: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    bio: {type: String},
    image: {type: String, require: true},
    loction: {type: String},
    portfolio: {type: String},
    reputation: {type: Number, default: 0}
},
{timestamps: true})

const User = models?.user || model<IUser>("User", UserSchema) ;

export default User;