import * as mongoose from 'mongoose';

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface Users extends mongoose.Document {
    name: string;
    phone: number;
    updatedAt?: Date;
    createdAt?: Date;
}

export const UsersSchema = new mongoose.Schema<Users>({
    name: { type: String, required: true },
    phone: { type: Number, required: true },

    updatedAt: { type: Date, required: false, default: new Date() },
    createdAt: { type: Date, required: false, default: new Date() }
});

UsersSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    return next();
});

UsersSchema.methods.toJSON = function () {
    return {
        id: this._id,
        name: this.name,
        phone: this.phone,
    };
};

export const Users = mongoose.model<Users>('Users', UsersSchema);