import express, { Request, Response } from "express";

import { body } from "express-validator";
import moment from 'moment';
import { validateRequest } from "../errors/ValidateRequest";
import { Users } from "../models/users";

const router = express.Router();

router.post(
    "/api/v1/users",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("phone").notEmpty().withMessage("Phone is required"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const name: string = req.body.name;
        const phone = req.body.phone;

        const user = new Users({
            name: name,
            phone: phone,
            createdAt: new Date(),
        });

        const response = await user.save();

        res.status(201).send(response);
    }
);

export { router as usersRouter };

