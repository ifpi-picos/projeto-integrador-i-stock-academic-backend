import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = getCustomRepository(UserRepository);
    }

    async create(name: string): Promise<any> {
        try {
            const user = this.userRepository.create({ name });

            await this.userRepository.save(user);

            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
}
