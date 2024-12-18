import { TokenDecode } from "../utility/tokenUtility.js";

const authMiddleware = (req, res, next) => {
    try {
        // Extract token from cookies
        const token = req.cookies.token;

        // Check if token is missing
        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "Unauthorized: Token is missing",
            });
        }

        // Decode the token using the utility function
        const decoded = TokenDecode(token);

        // If decoding fails
        if (!decoded) {
            return res.status(401).json({
                status: "fail",
                message: "Unauthorized: Invalid or expired token",
            });
        }

        // Extract email and user_id from the decoded token
        const { email, user_id } = decoded;

        // Attach email and user_id to the request object
        req.email = email;
        req.user_id = user_id;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: "Server error during token verification",
            error: error.message,
        });
    }
};

export default authMiddleware;
