import mongoose from "mongoose";


const UsersSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    NIDNumber: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bloodGroup: { type: String, required: true }
}, { timestamps: true });


const UsersModel = mongoose.model("Users", UsersSchema);

export default UsersModel;
