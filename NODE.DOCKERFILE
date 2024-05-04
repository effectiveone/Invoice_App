FROM node:14
WORKDIR "/appnode"
COPY ./appnode/package.json ./
RUN yarn install
COPY ./appnode/ .
ENV API_PORT=5002
ENV MONGO_URI=mongodb://mongodb:27017/InvoiceApp
ENV TOKEN_KEY=hereShouldGoStrongTokenKey

CMD ["yarn", "start"]