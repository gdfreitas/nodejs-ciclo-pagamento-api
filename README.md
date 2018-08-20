# Ciclo Pagamento API

O projeto consiste em uma api didática de ciclo de pagamentos utilizando as tecnologias MongoDB, NodeJS, Express e Mongoose.

## Recursos públicos

`POST` @ /oapi/signup  
`POST` @ /oapi/login  
`POST` @ /oapi/validateToken  

## Recursos autenticados

`GET` @ /api/ciclos-pagamentos  
`GET` @ /api/ciclos-pagamentos/{id}  
`POST` @ /api/ciclos-pagamentos  
`PUT` @ /api/ciclos-pagamentos/{id}  
`DELETE` @ /api/ciclos-pagamentos/{id}  
`GET` @ /api/ciclos-pagamentos/count  
`GET` @ /api/ciclos-pagamentos/summary  

## Configuração

`/.env` - Deve ser configurada uma chave secreta que será utilizada pelo `jsonwebtoken` para gerar o token de autenticação do usuário.

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