import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import './services/Secrets'
import { doctorsRouter } from './routes/doctors';
import { usersRouter } from './routes/users';
import { appointmentsRouter } from './routes/appointment';
import { errorHandler } from './errors/ErrorHandler';
import { runNotifications } from './notifications';

export const app = express();

app.use(json());
app.use(cors());

app.use(doctorsRouter);
app.use(usersRouter);
app.use(appointmentsRouter);

app.use(errorHandler);

const start = async () => {

    await mongoose.connect(process.env.MONGODB_CONNECTION_URL!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Connected to mongodb!');

    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Listening on port ${port}.`);
    });

    console.log("runNotifications...");
    runNotifications()
}

start();