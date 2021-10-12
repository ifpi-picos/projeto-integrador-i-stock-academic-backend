import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    private userService = new UserService();
    async create(request: Request, response: Response) {
        const { name } = request.body;

        try {
            const userName = await this.userService.create(name);

            return response.status(201).json({ name: userName });
        } catch (error) {
            return response
                .status(400)
                .json({ message: error.message || "Erro inesperado" });
        }
    }
}
