import mongoose from "mongoose";
import dotenv from 'dotenv'
// import { ClientOptions } from "openai/index.mjs";

dotenv.config({
    path: 'src/.env'
})
type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const dbConnect = async() => {
    if (connection.isConnected){
        console.log("Already connected ot database")
        return
    }

    try {
        console.log(process.env.MONGODB_URI)
        const db = await mongoose.connect(process.env.MONGODB_URI || '',{})
        await mongoose.connection.db.admin().command({ping: 1})
        console.log(db)//todo

        connection.isConnected = db.connections[0].readyState

        console.log("DB Connected Successfully")

    } catch (error) {

        console.log("Database connection failed",error)
        process.exit(1)
    }
}

export default dbConnect