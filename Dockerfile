FROM node:18

RUN mkdir /app

WORKDIR /app

COPY src/* .

RUN yarn install

CMD npx hardhat node
