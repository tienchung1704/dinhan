import UserAdminService from "@services/UserAdminService";
import e, { Request, Response } from "express";
import { console } from "inspector";
import validator from "validator";

class UserAdminController {
  static async loginUser(req: Request, res: Response): Promise<any> {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const user = await UserAdminService.loginUser(email);
      console.log("123", user);
      if (user.email != email) {
        return res.json({ success: false, message: "User does not exist" });
      } else {
        if (user.password != password) {
          return res.json({ success: false, message: "Incorrect password" });
        } else {
          res.json({
            success: true,
            message: "Dang nhap thanh cong",
            data: user,
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: (err as Error).message });
    }
  }
  static async fetchListUser(req: Request, res: Response): Promise<any> {
    const id = req.headers["userid"];
    try {
      const list = await UserAdminService.ktEmail(id);
      if (list) {
        res.json({ success: true, data: list });
      }
    } catch (err) {
      res.json({ success: false, message: (err as Error).message });
    }
  }
  static async resgisterUser(req: Request, res: Response): Promise<any> {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try {
      const exists = await UserAdminService.loginUser(email);
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Invalid email" });
      }
      if (password.length < 6) {
        return res.json({
          success: false,
          message: "Password must be atleast 6 characters",
        });
      }
      if (!exists) {
        const user = await UserAdminService.addNewUser({
          name,
          email,
          password,
        });
        console.log(user);
        res.json({ success: true, message: "Dang ky thanh cong" });
      } else {
        return res.json({ success: false, message: "User already exists" });
      }
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: (err as Error).message });
    }
  }
}

export default UserAdminController;
