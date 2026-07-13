import { FirebaseAuth } from "~/services/firebase-auth";
import type { IUserRepository } from "./user-repository";
import type { IUser, IUserCredentials } from "../../entities/user";

export class UserRepositoryImpl implements IUserRepository {
  constructor(private remote: FirebaseAuth) {}

  async signIn(credentials: IUserCredentials): Promise<IUser> {
    return await this.remote.signIn(credentials);
  }

  async signUp(credentials: IUserCredentials): Promise<IUser> {
    return await this.remote.signUp(credentials);
  }

  async logout(): Promise<void> {
    await this.remote.logout();
  }
}
