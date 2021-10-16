import { Request, Response } from "express";

import * as yup from "yup";
import { AppError } from "../errors/AppError";
import { UsersServices } from "../services/UsersServices";

const usersServices = new UsersServices();
class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error);
    }

    try {
      const user = await usersServices.create(name, email);

      return response.status(201).json(user);
    } catch (error) {
      console.log(">>>>>>>>>>>>>", error);

      throw new AppError(error);
    }
  }
}

export { UserController };
