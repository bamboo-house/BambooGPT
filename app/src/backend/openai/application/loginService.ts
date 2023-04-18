import { UsersGateway } from "../infrastructure/usersGateway";

export class LoginService {
  private _usersGateway: UsersGateway;
  constructor() {
    this._usersGateway = new UsersGateway();
  }
}