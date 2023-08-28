FROM node:18

RUN mkdir /app

WORKDIR /app

RUN apt-get update && apt-get install build-essential

COPY src/* .

RUN yarn install

CMD npx hardhat node
