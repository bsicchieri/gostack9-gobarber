//importando o express - require(nome da dependência)
const express = require('express');

//criando uma variável(server)
const server = express();

//localhost:3000/teste
//req - todos os dados da requisição
//res - todas as informações necessárias para responder
server.get('/teste', (req, res) => {
  return res.json({ message: 'Hello World' });
})

server.listen(3000);