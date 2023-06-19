# API de Banco

Esta é uma API RESTful simples para gerenciar contas bancárias. Ela fornece vários endpoints para criar, atualizar, depositar, sacar, transferir valores, consultar saldo, emitir extrato e excluir contas bancárias. A API é construída usando Node.js e segue o padrão arquitetural REST.

## Funcionalidades

- Criar uma conta bancária
- Atualizar os dados do usuário da conta bancária
- Depositar valores em uma conta bancária
- Sacar valores de uma conta bancária
- Transferir valores entre contas bancárias
- Consultar o saldo de uma conta bancária
- Emitir um extrato bancário
- Excluir uma conta bancária

## Instalação

Para executar esta API localmente, siga os seguintes passos:

1. Clone o repositório: `git clone git@github.com:PatrickRigaud/api-bank.git`
2. Navegue até o diretório do projeto: `cd bank-api`
3. Instale as dependências: `npm install`
4. Inicie o servidor: `npm start`

Certifique-se de ter o Node.js e o npm instalados em sua máquina.

## Endpoints da API

A API oferece os seguintes endpoints:

- `GET /contas` - Listar contas, passar em query senha de administrador
- `POST /contas` - Criar uma nova conta bancária
- `PUT /contas/:accountId/usuario` - Atualizar os dados do usuário de uma conta bancária
- `POST /contas/transacoes/depositar` - Depositar valores em uma conta bancária
- `POST /contas/transacoes/sacar` - Sacar valores de uma conta bancária
- `POST /contas/transacoes/transferencia` - Transferir valores entre contas bancárias
- `GET /contas/:transacoes/saldo` - Consultar o saldo de uma conta bancária
- `GET /contas/extrato` - Emitir um extrato bancário de uma conta bancária
- `DELETE /contas/:accountId` - Excluir uma conta bancária

Substitua `:accountId` pelo ID real da conta bancária na qual você deseja realizar as operações.

## Persistência de Dados

Os dados são armazenados em um arquivo JavaScript chamado `bancodedados.js` dentro do projeto. Esse arquivo atua como um banco de dados simulado para a API. Ele fornece as estruturas de dados e funções necessárias para lidar com as operações de conta bancária.

## Registro de Log

A API inclui um recurso de registro que registra as operações realizadas nas contas bancárias. Os logs são armazenados em um arquivo de log localizado no diretório do projeto.

## Dependências

As seguintes dependências são utilizadas neste projeto:

- `date-fns` - Fornece funções de utilidade para datas, como formatação e manipulação.
- `express` - Um framework web rápido e minimalista para Node.js.

Para instalar essas dependências, execute `npm install`, conforme mencionado nas instruções de instalação.

## Uso

Uma vez que o servidor esteja em execução, você pode enviar requisições HTTP para os endpoints da API usando ferramentas como cURL ou Postman. Aqui está um exemplo de como criar uma conta bancária usando cURL:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"numero_conta":"2","valor":500,"senha": "amigo" }' http://localhost:3000

/transacoes/sacar
```

Consulte a seção de endpoints da API acima para obter mais detalhes sobre cada endpoint e seu uso.