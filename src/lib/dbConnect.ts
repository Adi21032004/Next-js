import mongoose from "mongoose";
// import dotenv from 'dotenv'
// import { ClientOptions } from "openai/index.mjs";

// dotenv.config({
//     path: '/.env.local.example'
// })
type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const dbConnect = async() => {
    if (connection.isConnected){
        console.log("Already connected to database")
        return
    }

    const uri = process.env.MONGODB_URI;
    console.log(uri)
    if (!uri) {
        const msg = 'MONGODB_URI is not set. Please add it to .env.local (see .env.local.example)';
        console.error(msg);
        throw new Error(msg);
    }

    try {
        console.log('Connecting to MongoDB...')
        const db = await mongoose.connect(uri, {})
        // await mongoose.connection.db
        console.log(db) // todo

        connection.isConnected = db.connections[0].readyState

        console.log("DB Connected Successfully")

    } catch (error) {
        console.error("Database connection failed", error)
        throw error
    }
}

export default dbConnect