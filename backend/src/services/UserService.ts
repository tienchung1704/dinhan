import { User } from "@entities/User";
import { AppDataSource } from "@database/data-source";
const userRepository = AppDataSource.getRepository(User);
class UserService {

  static async loginUser(data: any): Promise<any> {
    const user =  await userRepository.findOne({
      where: {
        email : data,
      },
    });
    return user;
  }
static async GiamGia(userId: string, TongTien: number, discount: number): Promise<any> {
  const user = await userRepository.findOne({
    where: { id: userId }
  });

  if (user) {
    const currentGiamGia = Number(user.giamGia) || 0; 
    const diemThuong = Number(TongTien) || 0;
    const giamTru = Number(discount) || 0;

    user.giamGia = (currentGiamGia + (diemThuong*2650)) - (giamTru*26500);
    await userRepository.save(user);
  }
}

  static async ktEmail(email: any): Promise<any>{
    return await userRepository.findOne({
      where:{
        id: email,
      }
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
