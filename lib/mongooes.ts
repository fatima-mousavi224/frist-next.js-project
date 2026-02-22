import { error } from "console";
import mongoose, {Mongoose} from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL as string;

if(!MONGODB_URI) {
    throw new Error("MONGODB URI is not exest")
}

interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

declare global {
    var mongoose: MongooseCache;
}

let cached = global.mongoose;


if(!cached) {
    cached= global.mongoose = {conn: null, promise: null}
}


const dbConnect = async () : Promise<Mongoose> => {
    if(cached.conn) {
        return cached.conn
    }

    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: "davflow"
        }).then((result) => {
            console.log("Conected to mongodb ");
            return result;
        }).catch((error) => {
            console.error("Error to conecting mongodb", error);
            throw error;
        })
    }

    cached.conn = await cached.promise;

    return cached.conn;
}

export default dbConnect;