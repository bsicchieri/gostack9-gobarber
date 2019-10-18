//importando o express - require(nome da dependência)
const express = require('express');

//criando uma variável(server)
const server = express();

//localhost:3000/teste
server.get('/teste', () => {
  console.log('teste');
})

server.listen(3000);