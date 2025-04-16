import { NextFunction, Response , Request } from "express"
import jwt from "jsonwebtoken";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    const token = req.headers.token as string | undefined;
    if (!token) {
        return res.json({
            success: false,
            message: "Not Authorized Login Again"
        });
    }
    try {
        const token_decode = jwt.verify(token, "random#secret") as jwt.JwtPayload;
        req.body.userId = token_decode.userId;
        next();
    }catch(err: any){
        console.error("JWT Verification Error:", err);
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token expired" });
        }
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}   