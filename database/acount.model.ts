import { model, models, Schema, Types } from "mongoose";

export interface IAcount {
    userId: Types.ObjectId,
    name: string,
    image: string,
    password: string,
    provider: string,  // facebook github ect...
    providerAccountId: string
} 

const AcountSchema = new Schema ({
    userId: {type: Schema.Types.ObjectId, ref:"User", require : true},
    name: {type: String, require: true},
    image: {type: String},
    password: {type: String},
    provider: {type: String, require: true},
    providerAccountId: {type: String, require: true}
},
{timestamps: true})

const Acount = models?.Acount || model<IAcount>("Acount", AcountSchema)

export default Acount;