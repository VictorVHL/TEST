import * as mongoose from 'mongoose';

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface Doctors extends mongoose.Document {
    name: string;
    speciality: string;
    updatedAt?: Date;
    createdAt?: Date;
}

export const DoctorsSchema = new mongoose.Schema<Doctors>({
    name: { type: String, required: true },
    speciality: { type: String, required: true },

    updatedAt: { type: Date, required: false, default: new Date() },
    createdAt: { type: Date, required: false, default: new Date() }
});

DoctorsSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    return next();
});

DoctorsSchema.methods.toJSON = function () {
    return {
        id: this._id,
        name: this.name,
        speciality: this.speciality,
    };
};

export const Doctors = mongoose.model<Doctors>('Doctors', DoctorsSchema);