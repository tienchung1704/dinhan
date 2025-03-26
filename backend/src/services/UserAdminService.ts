import { UserAdmin } from "@entities/UserAdmin";
import { AppDataSource } from "@database/data-source";
const UserAdminRepository = AppDataSource.getRepository(UserAdmin);
class UserAdminService {

  static async loginUser(data: any): Promise<any> {
    const { email } = data;
    return await UserAdminRepository.findOne({
      where: {
        email: email,
      },
    });
  }
  static async ktEmail(email: any): Promise<any>{
    return await UserAdminRepository.find({
      where:{
        email: email,
      }
    });
  }

  static async addNewUser(data: any): Promise<any> {
    const { name, email, password} = data;
    return await UserAdminRepository.save({ name, email, password });
  }

  static async changePassword(data: any): Promise<any>{
    const {newpassword , userId} = data;
    const user = await UserAdminRepository.findOne({where:{
      id: userId,
    }})
    if(user){
      user.password = newpassword;
      await UserAdminRepository.save(user);
    }
  }


}

export default UserAdminService;
