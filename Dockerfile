FROM node:16

ENV NODE_OPTIONS="--max-old-space-size=2048"

RUN mkdir /app

WORKDIR /app 

RUN apt-get update && apt-get install build-essential

COPY src/* .

RUN yarn install

CMD npx hardhat node
