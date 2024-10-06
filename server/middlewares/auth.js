import { ErrorHandler } from "../utils/utility.js";
import jwt from 'jsonwebtoken'


const isLoggedIn =  (req, res, next) => {
    const token = req.cookies['Tangy-token'];
    if (!token) {
        return next(new ErrorHandler("Please login", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded._id
    console.log({User:req.user})
    next()
}

export { isLoggedIn }