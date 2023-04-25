import { getAuth } from 'firebase-admin/auth';
import { UserGateway } from '../infrastructure/userGateway';
import { UserRecord } from '../infrastructure/userRecord';
import { GoogleUserInfo } from '@/bff/types/firestore/usersCollection';

export class LoginService {
  private _usersGateway: UserGateway;
  constructor() {
    this._usersGateway = new UserGateway();
  }

  async loginWithGoogle(googleUserInfo: GoogleUserInfo): Promise<UserRecord> {
    const decodedToken = await getAuth().verifyIdToken(googleUserInfo.idToken);
    const { uid } = decodedToken;
    if (uid !== googleUserInfo.uid) {
      throw new Error('IDトークンの検証に失敗しました');
    }

    let userRecord = await this._usersGateway.getUser(uid);
    if (userRecord === undefined) {
      userRecord = await this._usersGateway.create(
        uid,
        googleUserInfo.displayName,
        null,
        googleUserInfo.photoURL,
        googleUserInfo
      );
    }

    return userRecord;
  }
}
