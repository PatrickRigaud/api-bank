const banco = require("../bancodedados");
const { format } = require("date-fns");
const fs = require("fs");

const listarContas = (req, res) => {
  res.status(200).json({ message: banco.contas });
};

const adicionarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  const conta = {
    numero: banco.contadorContas++,
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };
  banco.contas.push(conta);

  registrarLog("Cadastrar Conta", conta);

  return res.status(201).json({ message: "Usuario criado com sucesso", conta });
};

const atualizarUsuarioConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  const { numero_conta } = req.params;

  const usuarioConta = banco.contas.find((conta) => {
    return conta.numero == numero_conta;
  });
  const { usuario } = usuarioConta;

  if (nome) {
    registrarLog("Alterar Conta", nome, usuario.nome);
    usuario.nome = nome;
  }
  if (cpf) {
    registrarLog("Alterar Conta", cpf, usuario.cpf);
    usuario.cpf = cpf;
  }
  if (data_nascimento) {
    registrarLog("Alterar Conta", data_nascimento, usuario.data_nascimento);
    usuario.data_nascimento = data_nascimento;
  }
  if (telefone) {
    registrarLog("Alterar Conta", telefone, usuario.telefone);
    usuario.telefone = telefone;
  }
  if (email) {
    registrarLog("Alterar Conta", email, usuario.email);
    usuario.email = email;
  }
  if (senha) {
    registrarLog("Alterar Conta", senha, usuario.senha);
    usuario.senha = senha;
  }

  return res.status(201).json({ message: "Conta atualizada com Sucesso!" });
};

const deletarConta = (req, res) => {
  const { numero_conta } = req.params;

  const index = banco.contas.findIndex((conta) => conta.numero == numero_conta);
  const contaDeletada = banco.contas.splice(index, 1)[0];

  registrarLog("Deletar Conta", contaDeletada);

  return res.status(200).json({ message: "Conta deletada com sucesso", contaDeletada });
};

const depositarValor = (req, res) => {
  const { numero_conta, valor } = req.body;

  const conta = banco.contas.find((conta) => {
    return conta.numero == numero_conta;
  });

  conta.saldo += valor;
  const horario = format(new Date(), "y-MM-dd kk:mm:ss");

  const deposito = {
    transacao: "Depósito",
    data: horario,
    numero_conta,
    valor,
  };

  banco.depositos.push(deposito);

  registrarLog("Depositar", deposito);

  return res.status(201).json({ message: "Depósito realizado com sucesso!" });
};

const sacarValor = (req, res) => {
  const { numero_conta, valor } = req.body;

  const conta = banco.contas.find((conta) => {
    return conta.numero == numero_conta;
  });

  conta.saldo -= valor;

  const horario = format(new Date(), "y-MM-dd kk:mm:ss");

  const saque = {
    transacao: "Saque",
    data: horario,
    numero_conta,
    valor,
  };

  banco.saques.push(saque);

  registrarLog("Sacar", saque);

  return res.status(200).json({ message: "Saque realizado com sucesso!" });
};

const transferenciaValor = (req, res) => {
  const { numero_conta, numero_conta_destino, valor } = req.body;

  const conta = banco.contas.find((conta) => {
    return conta.numero == numero_conta;
  });

  const contaDestino = banco.contas.find((conta) => {
    return conta.numero == numero_conta_destino;
  });

  const horario = format(new Date(), "y-MM-dd kk:mm:ss");

  conta.saldo -= valor;
  contaDestino.saldo += valor;

  const transferencia = {
    transacao: "Transferência",
    data: horario,
    numero_conta,
    numero_conta_destino,
    valor,
  };

  banco.transferencias.push(transferencia);

  registrarLog("Transferência", transferencia);

  return res
    .status(200)
    .json({ message: "Transferência realizada com sucesso!" });
};

const saldo = (req, res) => {
  const { numero_conta } = req.query;

  const conta = banco.contas.find((conta) => {
    return conta.numero == numero_conta;
  });

  const saldo = conta.saldo;

  return res.status(200).json({
    conta: conta.numero,
    Saldo: saldo,
  });
};

const extrato = (req, res) => {
  const { numero_conta } = req.query;

  const extratoDeposito = banco.depositos.filter((transacao) => {
    return transacao.numero_conta == numero_conta;
  });

  const extratoSaques = banco.saques.filter((transacao) => {
    return transacao.numero_conta == numero_conta;
  });

  const extratoTransferencias = banco.transferencias.filter((transacao) => {
    return transacao.numero_conta == numero_conta;
  });

  const extrato = [
    ...extratoDeposito,
    ...extratoSaques,
    ...extratoTransferencias,
  ];

  return res.status(200).json(extrato);
};

const registrarLog = (tipoDeOperacao, inserirDado, dado_anterior) => {
  try {
    const logOperacao = {
      data: format(new Date(), "y-MM-dd kk:mm:ss"),
      operacao: tipoDeOperacao,
      dado_anterior,
      registro: inserirDado,
    };

    const log = fs.readFileSync("./src/log.txt");

    const cadastrarLog = log + JSON.stringify(logOperacao);

    fs.writeFile("./src/log.txt", cadastrarLog, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  listarContas,
  adicionarConta,
  atualizarUsuarioConta,
  deletarConta,
  depositarValor,
  sacarValor,
  transferenciaValor,
  saldo,
  extrato,
  registrarLog,
};
