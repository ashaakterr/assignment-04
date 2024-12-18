import UsersModel from "../model/UsersModel.js";
import { TokenEncode } from "../utility/tokenUtility.js";

// Register a new user

export const Registration=async(req,res)=>{
    try {
        let reqBody=req.body;
        await UsersModel.create(reqBody)
        return res.json({status:"success","Message":"User registered successfully"})
    }catch(err){
        return res.json({status:"fail","Message":err.toString()})
    }
}


// User login

export const Login = async (req, res) => {
    try {
        // Extract user credentials from the request body
        const reqBody = req.body;

        // Find the user in the database
        const data = await UsersModel.findOne({ email: reqBody.email, password: reqBody.password });

        if (data === null) {
            // If no user found, return an error response
            return res.json({
                status: "fail",
                message: "User not found",
            });
        } else {
            // If user is found, generate JWT token
            const token = TokenEncode(data.email, data._id);

            // Set token in cookies
            res.cookie("token", token, {
                httpOnly: true, // Secure the cookie (not accessible via client-side scripts)
                secure: false,  // Set to 'true' in production (requires HTTPS)
                sameSite: "Strict", // CSRF protection
                maxAge: 3600000, // Cookie expiration time (1 hour)
            });

            // Return success response with token
            return res.json({
                status: "success",
                token: token,
                message: "User login successfully",
            });
        }
    } catch (err) {
        // Return error response on failure
        return res.json({
            status: "fail",
            message: err.toString(),
        });
    }
};

// Get a single user's profile
export const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await UsersModel.findById(id);
        if (!user) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        return res.status(200).json({ status: "success", data: user });
    } catch (err) {
        return res.status(500).json({ status: "fail", message: err.message });
    }
};

// Get all user profiles
export const getAllUsers = async (req, res) => {
    try {
        const users = await UsersModel.find();

        return res.status(200).json({ status: "success", data: users });
    } catch (err) {
        return res.status(500).json({ status: "fail", message: err.message });
    }
};

// Update a single user's profile
export const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Update user by ID
        const updatedUser = await UsersModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        return res.status(200).json({ status: "success", message: "User updated successfully", data: updatedUser });
    } catch (err) {
        return res.status(500).json({ status: "fail", message: err.message });
    }
};

// Delete a single user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete user by ID
        const deletedUser = await UsersModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        return res.status(200).json({ status: "success", message: "User deleted successfully" });
    } catch (err) {
        return res.status(500).json({ status: "fail", message: err.message });
    }
};
