import mongoose from "mongoose";
import config from 'config';
import log from "./logger";

mongoose.set('strictQuery', false);

async function connectToDb() {
    const dbUri = config.get<string>('dbUri');

    try {
        await mongoose.connect(dbUri);
        log.info(`connected to db: ${dbUri}`)
    } catch (e) {
        process.exit(1);
    }
}

export default connectToDb;