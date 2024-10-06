import { ErrorHandler } from "../utils/utility.js";
import jwt from 'jsonwebtoken'

const isLoggedIn = (req, res, next) => {
    try {
        const token = req.header('Tangy-token');
        if (!token) {
            return next(new ErrorHandler("Please login", 401));
        }
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.user = data._id;
        next();
    } catch (error) {
        console.log("Fetch token error")
    }
}

export { isLoggedIn }