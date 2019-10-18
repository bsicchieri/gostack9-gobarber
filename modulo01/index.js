const express = require('express');

const server = express();

//localhost:3000/teste
server.get('/users/:id', (req, res) => {
  //const id = req.params.id;
  const { id } = req.params;

  return res.json({ message: `Buscando o usuário ${id}` });

  //const nome = req.query.nome;
  //return res.json({ message: `Hello ${nome}` });
})

server.listen(3000);