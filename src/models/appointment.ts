import * as mongoose from 'mongoose';

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface Appointments extends mongoose.Document {
    user_id: string;
    doctor_id: string;
    time_from: Date,
    time_to: Date,
    duration: number,
    notifiedTwoHoursBefore: boolean,
    notifiedOneDayBefore: Boolean,
    updatedAt?: Date;
    createdAt?: Date;
}

export const AppointmentsSchema = new mongoose.Schema<Appointments>({
    user_id: { type: String, required: true },
    doctor_id: { type: String, required: true },
    time_from: { type: Date, required: true },
    time_to: { type: Date, required: true },
    duration: { type: Number, required: true },
    notifiedTwoHoursBefore: { type: Boolean, required: true },
    notifiedOneDayBefore: { type: Boolean, required: true },
    updatedAt: { type: Date, required: false, default: new Date() },
    createdAt: { type: Date, required: false, default: new Date() }
});

AppointmentsSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    return next();
});

AppointmentsSchema.methods.toJSON = function () {
    return {
        id: this._id,
        user_id: this.user_id,
        doctor_id: this.doctor_id,
        time_from: this.time_from,
        time_to: this.time_to,
        duration: this.duration,
        notifiedTwoHoursBefore: this.notifiedTwoHoursBefore,
        notifiedOneDayBefore: this.notifiedOneDayBefore
    };
};

export const Appointments = mongoose.model<Appointments>('Appointments', AppointmentsSchema);