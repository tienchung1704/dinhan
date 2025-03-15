import { User } from "@entities/User";
import { AppDataSource } from "@database/data-source";
const userRepository = AppDataSource.getRepository(User);
class UserService {

  static async loginUser(data: any): Promise<any> {
    const { email } = data;
    return await userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  static async addNewUser(data: any): Promise<any> {
    const { name, email, password} = data;
    return await userRepository.save({ name, email, password });
  }

  static async changePassword(data: any): Promise<any>{
    const {newpassword , userId} = data;
    const user = await userRepository.findOne({where:{
      id: userId,
    }})
    if(user){
      user.password = newpassword;
      await userRepository.save(user);
    }
  }


}

export default UserService;
