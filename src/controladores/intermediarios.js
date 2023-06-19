const { banco, contas } = require("../bancodedados");
const {
  validarEmailCpf_DRY,
  validarConta_DRY,
  validarExistenciaConta_DRY,
  validarDadosTransacao_DRY,
  localizarConta_DRY,
  validarSenhaUsuario_DRY,
} = require("./validacoesDry");

//////////// Validações endpoints ////////////////

const validarSenha = (req, res, next) => {
  const { senha_banco } = req.query;

  if (banco.senha == senha_banco) {
    next();
  } else {
    return res.status(403).json({ message: "Senha incorreta" });
  }
};

const validarCampos = (req, res, next) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({ message: "Preecha todos os campos" });
  }

  if (validarEmailCpf_DRY(cpf, email)) {
    return res.status(400).json({ message: "CPF ou EMAIL já cadastrados" });
  }

  next();
};

const validarAlteracao = (req, res, next) => {
  const { numero_conta } = req.params;
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (validarEmailCpf_DRY(cpf, email)) {
    return res.status(400).json({ message: "CPF ou EMAIL já cadastrados" });
  }

  if (validarConta_DRY(numero_conta)) {
    return res.status(400).json({ message: "Conta invalida" });
  }

  if (validarExistenciaConta_DRY(numero_conta)) {
    return res
      .status(400)
      .json({ message: "Não há usuário cadastrado para esse número de conta" });
  }

  if (nome || cpf || data_nascimento || telefone || email || senha) {
    next();
  } else {
    return res
      .status(400)
      .json({ message: "Preencha ao menos um campo que deseja alterar" });
  }
};

const validarDelete = (req, res, next) => {
  const { numero_conta } = req.params;

  if (validarConta_DRY(numero_conta)) {
    return res.status(400).json({ message: "Conta invalida" });
  }

  if (validarExistenciaConta_DRY(numero_conta)) {
    return res
      .status(400)
      .json({ message: "Não há usuário cadastrado com essa conta" });
  }

  const conta = localizarConta_DRY(numero_conta, contas);

  if (conta.saldo == 0) {
    next();
  } else {
    return res.status(400).json({
      message: "Não é possivel deletar uma conta com saldo diferente de 0",
    });
  }
};

////////////// Validações transações /////////////

const validarDeposito = (req, res, next) => {
  const { numero_conta, valor } = req.body;

  if (validarDadosTransacao_DRY(numero_conta, valor)) {
    return res
      .status(400)
      .json({ message: "Preencha conta e valor a depositar" });
  }

  if (validarConta_DRY(numero_conta)) {
    return res.status(400).json({ message: "Conta invalida" });
  }

  if (validarExistenciaConta_DRY(numero_conta)) {
    return res
      .status(400)
      .json({ message: "Não há usuário cadastrado com essa conta" });
  }

  if (valor <= 0) {
    return res.status(400).json({ message: "Valor inválido para depósito" });
  }
  next();
};

const validarSaque = (req, res, next) => {
  const { numero_conta, valor, senha } = req.body;

  if (validarDadosTransacao_DRY(numero_conta, valor)) {
    return res.status(400).json({ message: "Preencha conta e valor a sacar" });
  }

  if (validarConta_DRY(numero_conta)) {
    return res.status(400).json({ message: "Conta invalida" });
  }

  if (validarExistenciaConta_DRY(numero_conta)) {
    return res
      .status(400)
      .json({ message: "Não há usuário cadastrado com essa conta" });
  }

  const conta = localizarConta_DRY(numero_conta, contas);

  if (validarSenhaUsuario_DRY(conta.usuario.senha, senha)) {
    return res.status(400).json({ message: "Senha inválida" });
  }

  if (valor > conta.saldo) {
    return res.status(400).json({ message: "Valor inválido para Saque" });
  }

  next();
};

const validarTransferencia = (req, res, next) => {
  const { numero_conta, numero_conta_destino, senha, valor } = req.body;

  if (
    validarConta_DRY(numero_conta) ||
    validarConta_DRY(numero_conta_destino)
  ) {
    return res.status(400).json({ message: "Conta invalida" });
  }

  if (
    validarExistenciaConta_DRY(numero_conta) ||
    validarExistenciaConta_DRY(numero_conta_destino)
  ) {
    return res
      .status(400)
      .json({ message: "Não há usuário cadastrado com essa conta" });
  }

  if (validarDadosTransacao_DRY(numero_conta, valor)) {
    return res
      .status(400)
      .json({ message: "Preencha conta e valor a depositar" });
  }

  const conta = localizarConta_DRY(numero_conta, contas);

  if (validarSenhaUsuario_DRY(conta.usuario.senha, senha)) {
    return res.status(400).json({ message: "Senha inválida" });
  }

  if (valor > conta.saldo) {
    return res
      .status(400)
      .json({ message: "Valor inválido para transferência" });
  }

  next();
};

const validarSaldo = (req, res, next) => {
  const { numero_conta, senha } = req.query;

  if (validarDadosTransacao_DRY(numero_conta, senha)) {
    return res.status(400).json({ message: "Preencha conta e senha" });
  }

  if (validarConta_DRY(numero_conta)) {
    return res.status(400).json({ message: "Conta invalida" });
  }

  if (validarExistenciaConta_DRY(numero_conta)) {
    return res
      .status(400)
      .json({ message: "Não há usuário cadastrado com essa conta" });
  }

  const conta = localizarConta_DRY(numero_conta, contas);

  if (validarSenhaUsuario_DRY(conta.usuario.senha, senha)) {
    return res.status(400).json({ message: "Senha inválida" });
  }

  next();
};

module.exports = {
  validarSenha,
  validarCampos,
  validarAlteracao,
  validarDelete,
  validarDeposito,
  validarSaque,
  validarTransferencia,
  validarSaldo,
};
