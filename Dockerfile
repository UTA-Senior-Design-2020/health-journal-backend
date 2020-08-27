FROM node:12-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
# USER node
RUN npm install -g nodemon
RUN npm install
RUN echo yo
COPY --chown=node:node . .
EXPOSE 4000
CMD ["npm", "run", "start"]