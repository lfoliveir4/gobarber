import path from "path";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

import uploadConfig from "@config/upload";

import User from "@modules/users/infra/typeorm/entities/User";

import InterfaceUsersRepository from "../repositories/InterfaceUsersRepository";
import InterfaceStorageProvider from "@shared/container/providers/StorageProvider/models/InterfaceStorageProvider";

interface Request {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: InterfaceUsersRepository,

    @inject("StorageProvider")
    private storageProvider: InterfaceStorageProvider
  ) {}

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError(
        "Only Authenticated users can change avatar",
        401,
        "upload-picture"
      );
    }

    if (user.avatar) {
      this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
