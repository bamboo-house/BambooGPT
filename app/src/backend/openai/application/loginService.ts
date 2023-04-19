import { getAuth } from "firebase-admin/auth";
import { UsersGateway } from "../infrastructure/usersGateway";
import { GoogleUserInfo, User } from "@/bff/types/firestore/usersCollection";


export class LoginService {
  private _usersGateway: UsersGateway;
  constructor() {
    this._usersGateway = new UsersGateway();
  }

  async loginWithGoogle(googleUserInfo: GoogleUserInfo): Promise<User> {
    const decodedToken = await getAuth().verifyIdToken(googleUserInfo.idToken);
    const { uid } = decodedToken;
    if (uid !== googleUserInfo.uid) {
      throw new Error('IDトークンの検証に失敗しました');
    }

    let user = await this._usersGateway.getUser(uid);
    if (user === null) {
      await this._usersGateway.create(uid, googleUserInfo.displayName, null, googleUserInfo.photoURL, googleUserInfo);
      user = {name: googleUserInfo.displayName || null, description: null , image: googleUserInfo.photoURL, googleUserInfo: googleUserInfo}
    }

    return user
  }
}