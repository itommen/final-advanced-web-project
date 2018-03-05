import 'dotenv-extended/config';
import mongoose from 'mongoose';
import mongooseConfig from './config/mongoose';
import express from 'express';
import expressConfig from './config/express';
import socket from 'socket.io';

// DEBUG ONLY!
import process from 'process';
console.log(process.pid);
//process.children.map(console.log);

mongooseConfig(mongoose);

mongoose.connect(process.env.MONGO_URI);

const app = express();
const server = app.listen(process.env.PORT);

console.log('Express listening on port %s', process.env.PORT);

const io = socket.listen(server);

expressConfig(app, io);

export default app;