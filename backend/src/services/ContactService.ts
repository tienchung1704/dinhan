import { Contact } from "@entities/Contact";
import { AppDataSource } from "@database/data-source";

const contactRepository = AppDataSource.getRepository(Contact);

class ContactService {
  static async getContactList(): Promise<any> {
    return await contactRepository.find();
  }

  static async addContact(data: any): Promise<any> {
    const firstname = data.firstnameContact;
    const lastname = data.lastnameContact;
    const email = data.emailContact;
    const phone = data.phoneContact;
    const detail = data.detailContact;
    await contactRepository.save({ firstname , lastname , email , phone , detail });
  }

  static async removeContact(id : string): Promise<any>{
    return await contactRepository.delete({id});
  }
}

export default ContactService;
