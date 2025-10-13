FROM oven/bun:1-alpine

WORKDIR /app

COPY package.json bun.lockb* ./

RUN bun install --frozen-lockfile --production && \
    rm -rf /root/.bun/install/cache

COPY src/ ./

CMD ["bun", "x", "hardhat", "node", "--network", "hardhat"]
