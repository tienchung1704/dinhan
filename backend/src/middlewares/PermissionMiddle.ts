import e, { NextFunction } from "express";

export const checkPermission = (req: any, res: any, next: NextFunction) => {
    const { userLogin } = req.session
    if(userLogin.role.id == 1) {
        next();
    } else {
        res.render('error/403')
    }
}