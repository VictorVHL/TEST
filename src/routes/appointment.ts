import express, { Request, Response } from "express";

import { body } from "express-validator";
import moment from 'moment';
import { BadRequestError } from "../errors/BadRequestError";
import { validateRequest } from "../errors/ValidateRequest";
import { Appointments } from "../models/appointment";
import { Doctors } from "../models/doctors";
import { Users } from "../models/users";

const router = express.Router();

router.post(
    "/api/v1/appointments",
    [
        body("user_id").notEmpty().withMessage("User_id is required"),
        body("doctor_id").notEmpty().withMessage("Doctor_id is required"),
        body("duration").notEmpty().withMessage("Duration is required"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const user_id: string = req.body.user_id;
        const doctor_id: string = req.body.doctor_id;
        const duration: number = req.body.duration;
        const time_from: string = req.body.time_from;

        const customDateTime = new Date(time_from);
        const time_to = new Date(customDateTime.getTime() + duration * 60000);

        const user = await Users.findById(user_id);

        if (!user) {
            throw new BadRequestError('User is not defined')
        }

        const doctor = await Doctors.findById(doctor_id);

        if (!doctor) {
            throw new BadRequestError('Doctor is not defined')
        }

        const check = await Appointments.findOne({
            doctor_id: doctor_id,
            $and: [
                { time_from: { $lt: time_to } },
                { time_to: { $gt: time_from } },
            ]
        })

        if (check == undefined) {
            const appointment = new Appointments({
                user_id: user_id,
                doctor_id: doctor_id,
                time_from: time_from,
                time_to: time_to,
                duration: duration,
                notifiedOneDayBefore: false,
                notifiedTwoHoursBefore: false,
                createdAt: new Date(),
            });

            const response = await appointment.save();

            res.status(201).send(response);
        } else {
            throw new BadRequestError("Data already exists");
        }
    }
);

export { router as appointmentsRouter };

