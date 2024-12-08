import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGO_DB_CONNECTION_STRING
    );
    console.log(`mongodb connected to: ${connect.connection.host}`);
  } catch (error) {
    console.log(`mongodb connected to: ${error.message}`);
    process.exit(1);
  }
};
