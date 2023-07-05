import express, { Request, Response } from "express";

import { body } from "express-validator";
import { Doctors } from "../models/doctors";
import moment from 'moment';
import { validateRequest } from "../errors/ValidateRequest";

const router = express.Router();

router.post(
  "/api/v1/doctors",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("speciality").notEmpty().withMessage("Speciality is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const name: string = req.body.name;
    const speciality = req.body.speciality;

    const doctor = new Doctors({
      name: name,
      speciality: speciality,
      createdAt: new Date(),
    });

    const response = await doctor.save();

    res.status(201).send(response);
  }
);

export { router as doctorsRouter };

