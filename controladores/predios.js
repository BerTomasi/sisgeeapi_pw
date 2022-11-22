const { pool } = require('../config');

const getPredios = (request, response) => {
    pool.query('SELECT * FROM predios ORDER BY codigo',
    (error, results) => {
        if(error){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao consultar prédio: '+ error
            })
        }
        response.status(200).json(results.rows);
    } 
    )
}

const addPredios = (request, response) => {
    const {nome, descricao, sigla} = request.body;
    pool.query(`INSERT INTO predios (nome, descricao, sigla)
    VALUES ($1, $2, $3) RETURNING codigo, nome, descricao, sigla`,
    [nome, descricao, sigla], 
    (error, results) => {
        if(error){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao inserir o prédio: '+ error
            })
        }
        response.status(200).json({
            status : 'sucess', message : 'PREDIO CRIADO',
            objeto : results.rows[0]
        })
    })
}

const updatePredios = (request, response) => {
    const {codigo, nome, descricao, sigla} = request.body;
    pool.query(`UPDATE predios SET nome = $1, descricao = $2, sigla = $3
    WHERE codigo = $4 RETURNING codigo, nome, descricao, sigla`,
    [nome, descricao, sigla, codigo], 
    (error, results) => {
        if(error){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao alterar o prédio: '+ error
            })
        }
        response.status(200).json({
            status : 'sucess', message : 'PREDIO ALTERADO',
            objeto : results.rows[0]
        })
    })
}

const deletePredios = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM predios WHERE codigo = $1`,
    [codigo], 
    (error, results) => {
        if(error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao remover o prédio: '+ 
                (error ? error : 'NENHUMA LINHA REMOVIDA')
            })
        }
        response.status(200).json({
            status : 'sucess', message : 'PREDIO REMOVIDO',
            objeto : results.rows[0]
        })
    })
}

const getPrediosPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM predios WHERE codigo = $1`,
    [codigo], 
    (error, results) => {
        if(error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao recuperar o prédio: '+ 
                (error ? error : 'NENHUMA LINHA ENCONTRADA')
            })
        }
        response.status(200).json(results.rows[0])
    })
}

module.exports = {getPredios, addPredios, updatePredios, deletePredios, getPrediosPorCodigo}