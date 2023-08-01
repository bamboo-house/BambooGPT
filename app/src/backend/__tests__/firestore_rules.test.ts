import * as fs from 'fs';
import {
  RulesTestEnvironment,
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { v4 } from 'uuid';

const projectID = 'bamboogpt';
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

// ※ guestClientDBはテスト実行時に警告が出るが、無視して良い
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

describe('threadsコレクション', () => {
  describe('create', () => {
    it('「作成者とログインユーザーが同じ」とき、作成できる', async () => {
      const { clientDB } = getDB();
      const userDocRef = doc(clientDB, 'users', uid);
      const threadDocRef = doc(collection(clientDB, 'threads'));
      await assertSucceeds(
        setDoc(threadDocRef, {
          user: userDocRef,
          name: 'new Thread',
        })
      );
    });

    it('「作成者とログインユーザーが異なる」とき、作成できない', async () => {
      const { clientDB } = getDB();
      const userDocRef = doc(clientDB, 'users', 'loginUsertokotonaruUIDdesu');
      const threadDocRef = doc(collection(clientDB, 'threads'));
      await assertFails(
        setDoc(threadDocRef, {
          user: userDocRef,
          name: 'new Thread',
        })
      );
    });
  });

  describe('get', () => {
    beforeEach(async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const noRuleDB = context.firestore();
        const sampleUser = { name: 'Takeuchi Shuto', image: 'https://sample.com' };
        // usersコレクションにユーザーを作成する
        await setDoc(doc(noRuleDB, 'users', uid), sampleUser);
        await setDoc(doc(noRuleDB, 'users', otherUid), sampleUser);
        await setDoc(doc(noRuleDB, 'threads', 'sampleThreadId'), {
          user: doc(noRuleDB, 'users', uid),
          name: 'new Thread',
        });
        await setDoc(doc(noRuleDB, 'threads', 'sampleThreadId2'), {
          user: doc(noRuleDB, 'users', otherUid),
          name: 'new Thread',
        });
      });
    });

    it('「認証済み」+「オーナーとログインユーザーが同じ」とき、取得できる', async () => {
      const { clientDB } = getDB();
      await assertSucceeds(getDoc(doc(clientDB, 'threads', 'sampleThreadId')));
    });

    it('「認証済み」+「オーナーとログインユーザーが異なる」とき、取得できない', async () => {
      const { clientDB } = getDB();
      await assertFails(getDoc(doc(clientDB, 'threads', 'sampleThreadId2')));
    });

    it('「未認証」+「オーナーとログインユーザーが異なる」とき、取得できない', async () => {
      const { guestClientDB } = getDB();
      await assertFails(getDoc(doc(guestClientDB, 'threads', 'sampleThreadId2')));
    });
  });

  describe('list', () => {
    beforeEach(async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const noRuleDB = context.firestore();

        // threadsコレクションにスレッドを作成する
        await setDoc(doc(noRuleDB, 'threads', 'sampleThreadId'), {
          user: doc(noRuleDB, 'users', uid),
          name: 'new Thread',
        });
      });
    });

    it('「認証済み」+「ユーザー作成済み」のとき、取得できる ', async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const noRuleDB = context.firestore();

        // usersコレクションにユーザーを作成する
        const sampleUser = { name: 'Takeuchi Shuto', image: 'https://sample.com' };
        await setDoc(doc(noRuleDB, 'users', uid), sampleUser);
      });

      const { clientDB } = getDB();
      const q = query(collection(clientDB, 'threads'));
      await assertSucceeds(getDocs(q));
    });

    it('「認証済み」+「ユーザー未作成」のとき、取得できない ', async () => {
      const { clientDB } = getDB();
      const q = query(collection(clientDB, 'threads'));
      await assertFails(getDocs(q));
    });

    it('「未認証」+「ユーザー未作成」のとき、取得できない ', async () => {
      const { guestClientDB } = getDB();
      const q = query(collection(guestClientDB, 'threads'));
      await assertFails(getDocs(q));
    });
  });

  describe('update', () => {
    // Todo: 認証済み + オーナーがログインユーザーであること
  });
});

describe('chatsコレクション', () => {
  const sampleChat = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'アホウドリ' },
      { role: 'assistant', content: 'アホウドリとは阿呆鳥のことです。' },
    ],
    temperature: 1,
    top_p: 1,
    n: 1,
    stream: true,
    stop: null,
    max_tokens: null,
    presence_penalty: 0,
    frequency_penalty: 0,
    logit_bias: null,
    user: null,
  };
  const updatedAt = serverTimestamp();
  const createdAt = serverTimestamp();

  describe('create', () => {
    it('「作成者とログインユーザーが同じ」とき、作成できる', async () => {
      const { clientDB } = getDB();
      const userDocRef = doc(clientDB, 'users', uid);
      const threadDocRef = doc(collection(clientDB, 'threads'));
      const chatDocRef = doc(collection(clientDB, 'chats'));

      await assertSucceeds(
        setDoc(chatDocRef, {
          user: userDocRef,
          thread: threadDocRef,
          chatContent: sampleChat,
          deletedAt: null,
          updatedAt: updatedAt,
          createdAt: createdAt,
        })
      );
    });

    it('「作成者とログインユーザーが異なる」とき、作成できない', async () => {
      const { clientDB } = getDB();
      const userDocRef = doc(clientDB, 'users', 'ififjiejfoanggAAI');
      const threadDocRef = doc(collection(clientDB, 'threads'));
      const chatDocRef = doc(collection(clientDB, 'chats'));
      await assertFails(
        setDoc(chatDocRef, {
          user: userDocRef,
          thread: threadDocRef,
          chatContent: sampleChat,
          deletedAt: null,
          updatedAt: updatedAt,
          createdAt: createdAt,
        })
      );
    });
  });

  describe('get', () => {
    beforeEach(async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const noRuleDB = context.firestore();

        // usersコレクションにユーザーを二人分作成する
        const sampleUser = { name: 'Takeuchi Shuto', image: 'https://sample.com' };
        await setDoc(doc(noRuleDB, 'users', uid), sampleUser);
        await setDoc(doc(noRuleDB, 'users', otherUid), sampleUser);

        // chatsコレクションにチャットを２つ作成する
        const { clientDB } = getDB();
        const threadDocRef = doc(collection(clientDB, 'threads'));
        await setDoc(doc(noRuleDB, 'chats', 'sampleChatId1'), {
          user: doc(noRuleDB, 'users', uid),
          thread: threadDocRef,
          chatContent: sampleChat,
          deletedAt: null,
          updatedAt: updatedAt,
          createdAt: createdAt,
        });
        await setDoc(doc(noRuleDB, 'chats', 'sampleChatId2'), {
          user: doc(noRuleDB, 'users', otherUid),
          thread: threadDocRef,
          chatContent: sampleChat,
          deletedAt: null,
          updatedAt: updatedAt,
          createdAt: createdAt,
        });
      });
    });

    it('「認証済み」+「オーナーとログインユーザーが同じ」とき、取得できる', async () => {
      const { clientDB } = getDB();
      await assertSucceeds(getDoc(doc(clientDB, 'chats', 'sampleChatId1')));
    });

    it('「認証済み」+「オーナーとログインユーザーが異なる」とき、取得できない', async () => {
      const { clientDB } = getDB();
      await assertFails(getDoc(doc(clientDB, 'chats', 'sampleChatId2')));
    });

    it('「未認証」+「オーナーとログインユーザーが同じ」とき、取得できない', async () => {
      const { guestClientDB } = getDB();
      await assertFails(getDoc(doc(guestClientDB, 'chats', 'sampleChatId1')));
    });
  });

  describe('list', () => {
    beforeEach(async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const noRuleDB = context.firestore();

        // chatsコレクションにチャットを作成する
        const { clientDB } = getDB();
        const threadDocRef = doc(collection(clientDB, 'threads'));
        await setDoc(doc(noRuleDB, 'chats', 'sampleChatId'), {
          user: doc(noRuleDB, 'users', uid),
          thread: threadDocRef,
          chatContent: sampleChat,
          deletedAt: null,
          updatedAt: updatedAt,
          createdAt: createdAt,
        });
      });
    });

    it('「認証済み」+「ユーザー作成済み」のとき、取得できる ', async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const noRuleDB = context.firestore();

        // usersコレクションにユーザーを作成する
        const sampleUser = { name: 'Takeuchi Shuto', image: 'https://sample.com' };
        await setDoc(doc(noRuleDB, 'users', uid), sampleUser);
      });

      const { clientDB } = getDB();
      const q = query(collection(clientDB, 'chats'));
      await assertSucceeds(getDocs(q));
    });

    it('「認証済み」+「ユーザー未作成」のとき、取得できない ', async () => {
      const { clientDB } = getDB();
      const q = query(collection(clientDB, 'chats'));
      await assertFails(getDocs(q));
    });

    it('「未認証」+「ユーザー未作成」のとき、取得できない ', async () => {
      const { guestClientDB } = getDB();
      const q = query(collection(guestClientDB, 'chats'));
      await assertFails(getDocs(q));
    });
  });

  describe('update', () => {
    // Todo: 認証済み + オーナーがログインユーザーであること
  });
});
