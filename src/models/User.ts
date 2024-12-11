import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs'

// Define the interface for User fields
export interface IUser {
    email: string;
    username: string;
    password: string;
    role: 'admin' | 'user';
    matchPassword(enteredPassword: string): Promise<boolean>;
}


export interface IUserModel extends IUser, Document {}

// Create the User schema
const UserSchema: Schema = new Schema<IUserModel>(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'user'], default: 'user' },
    },
    {timestamps: true}
);

// Method to compare password
UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this.password);
};

// Pre-save middleware to hash the password before saving
UserSchema.pre('save', async function (next:any) {
    const user = this as IUserModel;

    // If the password hasn't been modified, skip hashing
    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Export the User model
export default mongoose.model<IUserModel>('User', UserSchema);
