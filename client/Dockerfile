FROM node:14.17.3
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
