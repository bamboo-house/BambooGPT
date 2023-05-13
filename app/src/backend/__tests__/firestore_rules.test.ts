import * as fs from 'fs';
import {
  RulesTestEnvironment,
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc } from 'firebase/firestore';
import { v4 } from 'uuid';

const projectID = v4();
let testEnv: RulesTestEnvironment;
const uid = v4();
const otherUid = v4();

beforeAll(async () => {
  // テストプロジェクト環境の作成
  testEnv = await initializeTestEnvironment({
    projectId: projectID,
    firestore: {
      rules: fs.readFileSync('./firestore.rules', 'utf8'),
      port: 8080,
      host: 'localhost',
    },
  });
});

beforeEach(async () => {
  // Firestore エミュレータ用に構成された projectId に属する Firestore データベースのデータをクリアします。
  await testEnv.clearFirestore();
});

afterAll(async () => {
  //テスト終了後テスト環境で作成されたすべての RulesTestContexts を破棄します。
  await testEnv.cleanup();
});

const getDB = () => {
  // ログイン情報つきのContextを作成し、そこから Firestore インスタンスを得る。
  // authenticatedContextは引数をUIDにもつ認証済みContextを返す。
  const authenticatedContext = testEnv.authenticatedContext(uid);
  const clientDB = authenticatedContext.firestore();

  // ゲストContextを作成し、そこから Firestore インスタンスを得る。
  // unauthenticatedContextは未認証Contextを返す。
  const unauthenticatedContext = testEnv.unauthenticatedContext();
  const guestClientDB = unauthenticatedContext.firestore();
  return { clientDB, guestClientDB };
};

describe('users collection', () => {
  describe('get', () => {
    it('get: 未認証のとき、取得できない', async () => {
      const { guestClientDB } = getDB();
      await assertFails(getDoc(doc(guestClientDB, 'users', uid)));
    });

    it('get: 認証済み + uidとドキュメントIDが異なるとき、所得できない', async () => {
      const { clientDB } = getDB();
      await assertFails(getDoc(doc(clientDB, 'users', otherUid)));
    });

    it('get: 認証済み + uidとドキュメントIDが同じとき、取得できる', async () => {
      const { clientDB } = getDB();
      await assertSucceeds(getDoc(doc(clientDB, 'users', uid)));
    });
  });
});
