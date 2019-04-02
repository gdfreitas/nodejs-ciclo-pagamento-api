const errorHandler = require('../../common/error-handler')

const { INTERNAL_SERVER_ERROR } = require('http-status-codes')

const CicloPagamento = require('./ciclo-pagamento')

// define os métodos http pelo node-restful
CicloPagamento.methods(['get', 'post', 'put', 'delete']) // 'patch' não é suportado por padrão, porém há plugins que implementam

// configurações de atualizacao
CicloPagamento.updateOptions({
    new: true, // toda vez que atualiza um objeto retornar o objeto novo. padrão retorna o antigo
    runValidators: true // rodar as validações também nos updates. padrão não executa nenuhma validação
})

// interceptar as requisicoes após método para tratar as mensagens de erro
CicloPagamento.after('post', errorHandler).after('put', errorHandler)

// rota customizada para contador
CicloPagamento.route('count', (req, res, next) => {
    CicloPagamento.count((error, value) => {
        if (error) {
            res.status(INTERNAL_SERVER_ERROR).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

CicloPagamento.route('summary', (req, res, next) => {
    // fluxo de agregação  (pipeline aggregation)
    // docs: https://docs.mongodb.com/manual/reference/operator/aggregation
    CicloPagamento.aggregate(
        {
            $project: {
                // projeção
                credit: { $sum: '$credits.value' }, // credit (soma do atributo value da coleção $credits)
                debt: { $sum: '$debts.value' } // debt (soma do atributo value da coleção $debts)
            }
        },
        {
            $group: {
                _id: null, // api do mongo exige que tenha o _id
                credit: { $sum: '$credit' }, // agrupa todos os credit que totalizaram na projeção
                debt: { $sum: '$debt' } // agrupa todos os debt que totalizaram na projeção
            }
        },
        {
            $project: {
                // 0 - remover; 1 manter na projeção;
                _id: 0,
                credit: 1,
                debt: 1
            }
        },
        (error, result) => {
            if (error) {
                res.status(INTERNAL_SERVER_ERROR).json({ errors: [error] })
            } else {
                res.json(result[0] || { credit: 0, debt: 0 })
            }
        }
    )
})

module.exports = CicloPagamento
