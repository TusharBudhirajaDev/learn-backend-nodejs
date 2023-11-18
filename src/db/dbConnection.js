import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const Connection_DB = async () => {
  try {
    const ConnectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `\n MongoDb Connected !! DB hosted at : ${ConnectionInstance.connection.host} `
    );
  } catch (error) {
    console.error("MongoDb Connection Failed Error ->", error);
    process.exit(1);
    // throw error
  }
};

export default Connection_DB;