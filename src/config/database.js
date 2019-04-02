const mongoose = require('mongoose')

// Atribui promise do Node.js ao objeto de Promise do mongoose 
mongoose.Promise = global.Promise

// Define mensagens padrões de erros, priorizando traduções da API padrão do mongoose
mongoose.Error.messages.Number.required = `O atributo '{PATH}' deve ser informado.`
mongoose.Error.messages.Number.min = `'{VALUE}' informado é menor que o limite mínimo de '{MIN}'.`
mongoose.Error.messages.Number.max = `'{VALUE}' informado é maior que o limite máximo de '{MAX}'.`
mongoose.Error.messages.String.enum = `'{VALUE}' não é valido para o atributo '{PATH}'.`

const MongooseConnection = mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

module.exports = MongooseConnection;