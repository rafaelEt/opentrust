FROM node:20-alpine AS base
WORKDIR /app
COPY package.json tsconfig.base.json ./
COPY packages/core/package.json packages/core/
COPY packages/react/package.json packages/react/
COPY packages/demo/package.json packages/demo/
RUN npm install

FROM base AS build
COPY . .
RUN npm run build

FROM node:20-alpine AS demo
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000
CMD ["npm", "run", "dev", "--workspace=packages/demo"]
