var user = {
  user: "mongo",
  pwd: "mongo",
  roles: [
    {
      role: "dbOwner",
      db: "bamboogptDB",
    },
  ],
};

db.createUser(user);
db.createCollection("prompts");
