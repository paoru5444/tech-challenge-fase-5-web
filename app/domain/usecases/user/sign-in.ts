import type { IUserCredentials } from "../../entities/user";
import type { IUserRepository } from "../../repositories/user/user-repository";

export class SignIn {
  constructor(private repository: IUserRepository) {}

  async execute(credentials: IUserCredentials) {
    return await this.repository.signIn(credentials);
  }
}
