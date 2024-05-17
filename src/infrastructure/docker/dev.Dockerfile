FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN npm install copyfiles -g
RUN npm run build

## this is stage two , where the app actually runs
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY --from=builder /app/dist .
EXPOSE 80
CMD ["npm", "run", "start:dev"]