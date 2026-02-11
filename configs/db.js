'use strict';

import mongoose from "mongoose";

export const dbConnection = async() => {
    try{
        mongoose.connection.on('error', () =>{
            console.log('MongpDB | no se pudo conectar a mongoDB');
            mongoose.disconnect();
        });

        mongoose.connection.on('connnecting', () =>{
            console.log('MongpDB | intentando conectar a mongoDB');
        });

        mongoose.connection.on('connected', () =>{
            console.log('MongpDB | conectado a mongoDB');
        });

        mongoose.connection.on('open', () =>{
            console.log('MongpDB | conectado a la base de datos kinalsports');
        });

        mongoose.connection.on('reconnected', () =>{
            console.log('MongpDB | reconectado a mongoDB');
        });

        mongoose.connection.on('disconnected', () =>{
            console.log('MongpDB | desconectado a mongoDB');
        });
        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10
        })

    }catch (error){
        console.log('Error al conectar la db: ${error}');
    }

}
const gracefulShutdown = async(signal)=>{
    console.log('MongoDB | Received ${}.Closing database connection...');
    try {
        
        await mongoose.connection.close();
        console.log('MongoDB | Database connection closed succesfully');
        process.exit(0);
    } catch (error) {
  console.error('MongoDB | Error during graceful shutdown:', error.message);
  process.exit(1);
}

}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2'));