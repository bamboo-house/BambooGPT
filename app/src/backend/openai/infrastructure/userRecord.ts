import { GoogleUserInfo } from '@/bff/types/firestore/usersCollection';

export class UserRecord {
  constructor(
    public name: string | null,
    public description: string | null,
    public image: string | null,
    public googleUserInfo: GoogleUserInfo | null
  ) {}
}
