const { contas } = require("../bancodedados");

///////////// Don't Repeat Yourself - DRY ////////////

const validarEmailCpf_DRY = (cpf, email) => {
  for (let conta of contas) {
    if (conta.usuario.cpf == cpf || conta.usuario.email == email) {
      return true;
    }
  }
};

const validarConta_DRY = (numero_conta) => {
  if (isNaN(numero_conta)) {
    return true;
  }
};

const validarExistenciaConta_DRY = (numero_conta) => {
  const conta = contas.find((conta) => {
    return conta.numero == numero_conta;
  });

  if (!conta) {
    return true;
  }
};

const validarDadosTransacao_DRY = (numero_conta, valor) => {
  if (!numero_conta || !valor) {
    return true;
  }
};

const localizarConta_DRY = (numero_conta, contas) => {
  const conta = contas.find((conta) => {
    return conta.numero == numero_conta;
  });

  return conta;
};

const validarSenhaUsuario_DRY = (contaSenha, senha) => {
  if (contaSenha != senha) {
    return true;
  }
};

module.exports = {
  validarEmailCpf_DRY,
  validarConta_DRY,
  validarExistenciaConta_DRY,
  validarDadosTransacao_DRY,
  localizarConta_DRY,
  validarSenhaUsuario_DRY,
};
