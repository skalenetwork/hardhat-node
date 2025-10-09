FROM node:24-slim

WORKDIR /app

COPY src/package.json ./

RUN yarn install --frozen-lockfile --production=false && \
    yarn cache clean

COPY src/ ./

ENV NODE_OPTIONS=--max_old_space_size=4096

CMD ["npx", "hardhat", "node"]
