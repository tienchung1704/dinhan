import UserService from "@services/UserService";
import e, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (userId: string) => {
  return jwt.sign({ userId }, "random#secret");
};


class UserController {
  static async loginUser(req: Request, res: Response): Promise<any> {
    const email = req.body.email;     
    const password = req.body.password;
    try {
      const user = await UserService.loginUser(email);
      if (user.email != email) {
        return res.json({ success: false, message: "User does not exist" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ success: false, message: "Incorrect password" });
      }else{
        const token = createToken(user.id);
        res.json({ success: true, token: token });
      }

    } catch (err) {
      console.log(err);
      res.json({ success: false, message: (err as Error).message });
    }
  }
  static async changePassword(req: Request, res: Response): Promise<any>{
    const {password , newpassword , userId} = req.body;
    try{
      const user = await UserService.loginUser(userId);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Incorrect password" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newpassword, salt);
      await UserService.changePassword({ userId, newpassword: hashedNewPassword });
      res.status(200).json({ success: true, message: "Password updated successfully" });
    }catch(err){
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }

  }

  static async resgisterUser(req: Request, res: Response): Promise<any> {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try {
      const exists = await UserService.loginUser(email);
      console.log("eca",exists);
      if (!exists) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await UserService.addNewUser({
          name,
          email,
          password: hashedPassword,
        });

        const token = createToken(user.id);
        res.json({ success: true, token: token });
      } else {
        return res.json({ success: false, message: "User already exists" });
      }
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Invalid email" });
      }
      if (password.length < 6) {
        return res.json({
          success: false,
          message: "Password must be atleast 6 characters",
        });
      }
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: (err as Error).message });
    }
  }
}

export default UserController;
