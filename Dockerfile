FROM node:12-alpine
ENV NODE_ENV production
WORKDIR /home/node/app
# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
# USER node

RUN npm install --production --silent
COPY . .

EXPOSE 5000
CMD ["npm", "run", "start"]