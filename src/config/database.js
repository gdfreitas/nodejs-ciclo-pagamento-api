// responsavel por fazer conexao com o mongo e mapeamento dos objetos para os documentos do mongo
const mongoose = require('mongoose')

// sobrescreve api de promise do mongoose com a do node
mongoose.Promise = global.Promise

// exporta conexão
const url = process.env.MONGODB_URI || 'mongodb://localhost/ciclospagamentos'

module.exports = mongoose.connect(
  url,
  { useMongoClient: true }
)

// define mensagens padrões de erros
mongoose.Error.messages.Number.required = `O atributo '{PATH}' deve ser informado.` // neste caso o required, que por padrão está em inglês
mongoose.Error.messages.Number.min = `'{VALUE}' informado é menor que o limite mínimo de '{MIN}'.`
mongoose.Error.messages.Number.max = `'{VALUE}' informado é maior que o limite máximo de '{MAX}'.`
mongoose.Error.messages.String.enum = `'{VALUE}' não é valido para o atributo '{PATH}'.`
