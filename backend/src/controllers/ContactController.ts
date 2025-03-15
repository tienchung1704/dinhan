import { Request, Response } from "express";
import ContactService from "@services/ContactService";

class ContactController{
    static async listContact(req: Request, res: Response): Promise<any>{
        try{
            const lists = await ContactService.getContactList();
            return res.json({ success: true, data: lists });
        }catch(err){
            console.log(err);
            return res.json({ success: false, message: "Error" });
        }
    }
    static async addContact(req: Request, res: Response): Promise<any>{

        const firstnameContact = req.body.firstnameContact;
        const lastnameContact = req.body.lastnameContact;
        const emailContact = req.body.emailContact;
        const phoneContact = req.body.phoneContact;
        const detailContact = req.body.detailContact;
        try{
            await ContactService.addContact({ firstnameContact,lastnameContact,emailContact,phoneContact,detailContact });
            res.json({ success: true, message: "Send Success" });
        }catch(err){
            console.log(err);
            res.json({ success: false, message: "Error" });
        }
        
    }

    static async removeContact(req: Request, res: Response): Promise<any>{
        const id = req.body.id;
        try{
            await ContactService.removeContact(id);
            res.json({success: true, message: "Post have been deleted"});
        }catch(err){
            res.json({success: false, message: "Error"});
        }
    }

}

export default ContactController;