const express = require('express');

const server = express();

//localhost:3000/teste
server.get('/users/', (req, res) => {
  const nome = req.query.nome;

  return res.json({ message: `Hello ${nome}` });
})

server.listen(3000);