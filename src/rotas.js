const express = require("express");
const rotas = express();
const {
  listarContas,
  adicionarConta,
  atualizarUsuarioConta,
  deletarConta,
  depositarValor,
  sacarValor,
  transferenciaValor,
  saldo,
  extrato,
} = require("./controladores/controladores");
const {
  validarSenha,
  validarCampos,
  validarAlteracao,
  validarDelete,
  validarDeposito,
  validarSaque,
  validarTransferencia,
  validarSaldo,
} = require("./controladores/intermediarios");

rotas.get("/contas", validarSenha, listarContas);
rotas.post("/contas", validarCampos, adicionarConta);
rotas.put("/contas/:numero_conta/usuario", validarAlteracao, atualizarUsuarioConta);
rotas.delete("/contas/:numero_conta", validarDelete, deletarConta);

rotas.post("/transacoes/depositar", validarDeposito, depositarValor);
rotas.post("/transacoes/sacar", validarSaque, sacarValor);
rotas.post("/transacoes/transferencia", validarTransferencia, transferenciaValor);
rotas.get("/contas/saldo", validarSaldo, saldo);
rotas.get("/contas/extrato", validarSaldo, extrato);

module.exports = rotas;
