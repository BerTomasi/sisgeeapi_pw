const { Router } = require('express');

const controlePredios = require('./controladores/predios');

const rotas = new Router();

rotas.route('/predios')
    .get(controlePredios.getPredios)
    .post(controlePredios.addPredios)
    .put(controlePredios.updatePredios)

rotas.route('/predios/:codigo')
    .delete(controlePredios.deletePredios)
    .get(controlePredios.getPrediosPorCodigo)

module.exports = rotas;