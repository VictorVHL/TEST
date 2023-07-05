import { addHours, addDays } from 'date-fns';
import { Appointments } from '../models/appointment';
import { Doctors } from '../models/doctors';
import { Users } from '../models/users';

export async function scheduleNotifications() {
    const now = new Date();

    const oneDayBefore = addDays(now, 1);
    const twoHoursBefore = addHours(now, 2);


    const appointmentsTwoHoursBefore = await Appointments.find({
        time_from: {
            $gte: now,
            $lte: twoHoursBefore,
        },
        notifiedTwoHoursBefore: false
    })

    const appointmentsOneDayBefore = await Appointments.find({
        time_from: {
            $lte: oneDayBefore,
            $gte: twoHoursBefore,
        },
        notifiedOneDayBefore: false
    })


    for (const appointment of appointmentsTwoHoursBefore) {
        await sendNotification(appointment, true);
        await Appointments.updateOne({ _id: appointment._id }, { notifiedTwoHoursBefore: true });
    }


    for (const appointment of appointmentsOneDayBefore) {
        await sendNotification(appointment, false);
        await Appointments.updateOne({ _id: appointment._id }, { notifiedOneDayBefore: true });
    }

}


const sendNotification = async (appointment: any, type: boolean) => {
    const { user_id, doctor_id, time_from } = appointment;

    const time = new Date(time_from);
    const hours = time.getHours();
    const minutes = time.getMinutes();

    const user = await Users.findById(user_id);

    const doctor = await Doctors.findById(doctor_id);

    if (user && doctor) {
        if (type == true) {
            console.log(`Hello ${user.name}! You have an appointment to ${doctor.speciality} in 2 hours at ${hours}:${minutes}!`);
        } else {
            console.log(`Hello ${user.name}! Remember that you have an appointment to  ${doctor.speciality} tomorrow at ${hours}:${minutes}!`);
        }
    }
}