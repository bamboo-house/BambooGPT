import * as fs from 'fs';
import {
  RulesTestEnvironment,
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
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
  // beforeEachは、itの前に実行される。
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

describe('usersコレクション', () => {
  describe('get', () => {
    it('「認証済み」 + 「ログインユーザのuidとドキュメントIDが同じ」とき、取得できる', async () => {
      const { clientDB } = getDB();
      await assertSucceeds(getDoc(doc(clientDB, 'users', uid)));
    });

    it('「未認証」のとき、取得できない', async () => {
      const { guestClientDB } = getDB();
      await assertFails(getDoc(doc(guestClientDB, 'users', uid)));
    });

    it('「認証済み」 + 「ログインユーザのuidとドキュメントIDが異なる」とき、所得できない', async () => {
      const { clientDB } = getDB();
      await assertFails(getDoc(doc(clientDB, 'users', otherUid)));
    });
  });

  describe('create', () => {
    const sampleUser = { name: 'Takeuchi Shuto', image: 'https://sample.com' };

    it('「認証済み」 + 「ログインユーザのuidとドキュメントIDが同じ」とき、作成できる', async () => {
      const { clientDB } = getDB();
      await assertSucceeds(setDoc(doc(clientDB, 'users', uid), sampleUser));
    });

    it('「未認証」のとき、作成できない', async () => {
      const { guestClientDB } = getDB();
      await assertFails(setDoc(doc(guestClientDB, 'users', uid), sampleUser));
    });

    it('「認証済み」 + 「ログインユーザのuidとドキュメントIDが異なる」とき、作成できない', async () => {
      const { clientDB } = getDB();
      await assertFails(setDoc(doc(clientDB, 'users', otherUid), sampleUser));
    });
  });

  describe('update', () => {
    const sampleUser = { name: 'Takeuchi Shuto', image: 'https://sample.com' };
    beforeEach(async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const noRuleDB = context.firestore();
        await setDoc(doc(noRuleDB, 'users', uid), sampleUser);
      });
    });

    it('「認証済み」 + 「ログインユーザのuidとドキュメントIDが同じ」とき、更新できる', async () => {
      const { clientDB } = getDB();
      await assertSucceeds(updateDoc(doc(clientDB, 'users', uid), { name: 'changeName' }));
    });

    it('「未認証」のとき、更新できない', async () => {
      const { guestClientDB } = getDB();
      await assertFails(updateDoc(doc(guestClientDB, 'users', uid), { name: 'changeName' }));
    });

    it('「認証済み」 + 「ログインユーザのuidとドキュメントIDが異なる」とき、更新できない', async () => {
      const { clientDB } = getDB();
      await assertFails(updateDoc(doc(clientDB, 'users', otherUid), { name: 'changeName' }));
    });
  });
});

describe('threads collection', () => {
  describe('create', () => {
    // 作成者とログインユーザーが同じであること
  });

  describe('read, update', () => {
    // オーナーがログインユーザーであること
  });
});
