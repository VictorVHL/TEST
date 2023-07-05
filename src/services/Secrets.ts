import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")){
    dotenv.config({ path: ".env" });
}

else{
    throw new Error('Env file is missing');  
}

if (!process.env.MONGODB_CONNECTION_URL){
    throw new Error('MONGODB_CONNECTION_URL must be defined');
}

