FROM node:22.14

RUN mkdir /app

WORKDIR /app

COPY src/* ./

RUN yarn install

ENV NODE_OPTIONS=--max_old_space_size=4096

CMD npx hardhat node
