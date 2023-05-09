# この通りに記述した -> https://qiita.com/ppco/items/87682b3a14ceb3702dbb
FROM ubuntu:22.04

RUN apt update && \
  apt install -y curl openjdk-17-jdk && \
  curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
  apt install -y nodejs

RUN npm install -g firebase-tools