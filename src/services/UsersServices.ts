import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { AppError } from "../errors/AppError";

export class UsersServices {
  async create(name: string, email: string) {
      console.log('>>>>>>>>>>', name)

    try {
      const usersRepository = getCustomRepository(UsersRepository);
      const userAlreadExists = await usersRepository.findOne({
        email,
      });

      if (userAlreadExists) {
        throw new AppError("User alread exists!");
      }

      const user = usersRepository.create({
        name,
        email,
      });

      await usersRepository.save(user);

      return user;
    } catch (error) {
      throw new AppError(error);
    }
  }
}
