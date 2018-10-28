const restful = require('node-restful') // forma simples de expor uma api rest para uma aplicação frontend
const mongoose = restful.mongoose

const creditoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'É obrigatório informar a descrição do crédito']
  },
  value: {
    type: Number,
    min: 0,
    required: [true, 'É obrigatório informar o valor']
  }
})

const debitoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'É obrigatório informar a descrição do débito']
  },
  value: {
    type: Number,
    min: 0,
    required: [true, 'É obrigatório informar o valor do débito']
  },
  status: {
    type: String,
    required: false,
    uppercase: true,
    enum: ['PAGO', 'PENDENTE', 'AGENDADO']
  }
})

const cicloPagamentoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'É obrigatório informar o nome do ciclo de pagamento']
  },
  month: {
    type: Number,
    min: 1,
    max: 12,
    required: [true, 'É obrigatório informar o mês']
  },
  year: {
    type: Number,
    min: 1970,
    max: 2100,
    required: [true, 'É obrigatório informar o ano']
  },
  credits: [creditoSchema],
  debts: [debitoSchema]
})

module.exports = restful.model('CicloPagamento', cicloPagamentoSchema)
