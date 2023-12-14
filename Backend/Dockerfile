FROM node:18.17.1-alpine

WORKDIR /app
COPY . .

ENV PORT=5000

RUN ["npm","install"]

EXPOSE 5000

CMD ["node","api.js"]