FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install


COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist /app/dist

COPY package*.json ./
RUN npm install


EXPOSE 4000

CMD ["sh", "-c", "npm run run-prod"]
