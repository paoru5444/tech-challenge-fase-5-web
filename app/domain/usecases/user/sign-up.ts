import type { IUser, IUserCredentials } from "../../entities/user";
import { validatePassword } from "../../entities/user";
import type { IUserRepository } from "../../repositories/user/user-repository";

export class SignUp {
  constructor(private repository: IUserRepository) {}

  async execute(credentials: IUserCredentials): Promise<IUser | void> {
    const isPasswordsValid = validatePassword(credentials);

    if (isPasswordsValid) {
      return await this.repository.signUp(credentials);
    } else {
      throw new Error("Passwords must be the same.");
    }
  }
}
