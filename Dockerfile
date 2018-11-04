FROM node:8.11.3

ENV HOME=/home/app

COPY package.json package-lock.json $HOME/ciclo-pagamento-api/

WORKDIR $HOME/ciclo-pagamento-api

RUN npm install --silent --progress=false && npm cache clean --force

COPY . $HOME/ciclo-pagamento-api

CMD ["npm", "start"]