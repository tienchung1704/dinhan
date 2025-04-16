import { UserAdmin } from "@entities/UserAdmin";
import { AppDataSource } from "@database/data-source";
const UserAdminRepository = AppDataSource.getRepository(UserAdmin);
class UserAdminService {

  static async loginUser(data: any): Promise<any> {
    return await UserAdminRepository.findOne({
      where: {
        email: data,
      },
    });
  }
  static async ktEmail(id: any): Promise<any>{
    return await UserAdminRepository.findOne({
      where:{
        id: id,
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
