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
    let userRecord = await this._usersGateway.getUser(googleUserInfo.uid);
    if (userRecord === undefined) {
      userRecord = await this._usersGateway.create(
        googleUserInfo.uid,
        googleUserInfo.displayName,
        null,
        googleUserInfo.photoURL,
        googleUserInfo
      );
    }

    return userRecord;
  }
}
