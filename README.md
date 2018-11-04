# Ciclo Pagamento API

O projeto consiste em uma api didática de ciclo de pagamentos utilizando as tecnologias MongoDB, NodeJS, Express e Mongoose containerizado com Docker.

## Variáveis de ambientes

`"AUTH_SECRET"`: pode ser utilizada para definir a chave secreta utilizada pelo `jsonwebtoken`;

## Rodando aplicação Docker

`docker-compose up` ou `docker-compose -f docker-compose.dev.yml up`

## Recursos utilizados

[MongoDB](https://docs.mongodb.com/) - base de dados NoSQL, alta performance, sem esquemas e orientado à documentos.  
[NodeJS](https://nodejs.org/en/docs/) - interpretador de código javascript no lado servidor.
[express](http://expressjs.com/en/4x/api.html) - servidor web não organizado e minimalista para NodeJS  
[express-query-init](https://www.npmjs.com/package/express-query-int) - middleware auxiliar para fazer o parse de query parameters numéricos  
[mongoose](http://mongoosejs.com/docs/guide.html) - api de mapeamento dos objetos javascript para documentos (ODM - Object Data Mapping) e sistemas de conversão de tipos, validaÇão, criação de consultas e hooks para lógicas de negócio.  
[mongoose-paginate](https://github.com/edwardhotchkiss/mongoose-paginate) - auxiliar para montar paginações em consultas ao banco de dados.  
[noderestful](https://github.com/baugarten/node-restful) - biblioteca para auxiliar na criação de rotas para recursos no padrão REST no servidor `express`.  
[Lodash](https://lodash.com/docs/) - biblioteca contendo inúmeros métodos que auxiliam na manipulação de arrays, objetos, strings, etc em javascript.  
[body-parser](https://github.com/expressjs/body-parser) - middleware para fazer o parse do body das requests.  
[pm2](http://pm2.keymetrics.io/) - gerenciador de processos para aplicações NodeJ. Gerenciamento de memória, de cores, quedas na aplicação, etc.  
[nodemon](https://github.com/remy/nodemon) - utilitário para observer alterações em código e reiniciar servidor de desenvolvimento.

## Referências

[JsonWebToken implementation for node.js](https://github.com/auth0/node-jsonwebtoken)  
[What are requirements for HMAC secret key?](https://security.stackexchange.com/questions/95972/what-are-requirements-for-hmac-secret-key)  
[Conhecendo o JWT na teoria e na prática](https://imasters.com.br/desenvolvimento/json-web-token-conhecendo-o-jwt-na-teoria-e-na-pratica/?trace=1519021197&source=single)  
[Introdução ao mongoose](http://nodebr.com/nodejs-e-mongodb-introducao-ao-mongoose/)  

[Curso React Redux - Fundamentos @Udemy](https://www.udemy.com/react-redux-pt)  
[Curso Stack Mean @Udemy](https://www.udemy.com/mean-primeira-aplicacao-do-zero)

## Recursos públicos

`POST` @ /oapi/signup  (cadastra usuário)

```json
{
  "name": "Teste",
  "email": "teste@teste.com",
  "password": "Aa1234#",
  "confirm_password": "Aa1234#"
}
```

`POST` @ /oapi/login  (obtém o token de autorização)

```json
{
  "email": "teste@gmail.com",
  "password": "Aa123#!"
}
```

`POST` @ /oapi/authorize  (verifica se o token é valido)

```json
{
  "token": "<TOKEN>",
}
```

## Recursos autenticados

Estes recursos possuem a camada de autenticação, sendo necessário enviar o token de autorização. Este pode ser enviado através do body, queryParams como `token` ou através de header como `Authorization` ou  `authorization`

`GET` @ /api/ciclos-pagamentos  **(lista os ciclos de pagamentos)**  
`GET` @ /api/ciclos-pagamentos/{id}  **(recupera o ciclo pelo id)**  
`POST` @ /api/ciclos-pagamentos  **(cria um novo ciclo de pagamento)**  

```json
{
  "name": "Ciclo 1",
  "month": 1,
  "year": 2018,
  "credits": [
    {"name": "Crédito 1", "value": 1000}
  ],
  "debts": [
    { "name": "Débito 1", "value": 220, "status": "PENDENTE"}
  ]
}
```

`PUT` @ /api/ciclos-pagamentos/{id}  **(altera um ciclo de pagamento pelo id)**  
`DELETE` @ /api/ciclos-pagamentos/{id}  **(exclui um ciclo de pagamento pelo id)**  
`GET` @ /api/ciclos-pagamentos/count  **(contabiliza o total de registros)**  
`GET` @ /api/ciclos-pagamentos/summary  **(exibe um resumo de créditos/débitos cadastrados)**
