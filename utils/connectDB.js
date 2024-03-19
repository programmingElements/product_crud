import mongoose from "mongoose";

async function connectDB(db_url, db_name) {
    try {
        const connection = await mongoose.connect(`${db_url}/${db_name}`);
        console.log(`DB Connection Successfully!! HOST NAME: ${connection.connection.host}`);
    } catch (error) {
        console.log(`DB Connection Failed!! ${error}`);
        process.exit(1);
    }
}

export { connectDB };