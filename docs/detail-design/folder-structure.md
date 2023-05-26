# ディレクトリ構成

## app/src/backend

- **backend**
  - **tests**
    - テストを記述（2023/5/24 firestore のセキュリティルールのみ）
  - **application**
    - 〇〇 Service.ts
      - ドメインロジックとユースケースを記述（Service ではなくドメイン：domail/model と ユースケース：application/usecase に分ける方法もある）
    - **fetures**
      - 〇〇 Feature.ts
      - 特定の機能を表し、独自のロジックや振る舞いを記述
        - 多分、ある程度複雑であればクラスや関数どっちで記述してもいい
  - **infrastructure**
    - 〇〇 Gateway.ts
      - DB とやりとりするメソッドを記述
    - 〇〇 Record.ts
      - DB のレコードを表すクラス（データの入れ物）を記述
  - **utils**
    - アプリケーション全体で使用する低レベルで抽象化された関数を記述
      - 日付操作、文字列処理、ファイル操作、データ変換など
