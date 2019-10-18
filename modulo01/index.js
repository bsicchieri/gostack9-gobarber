const express = require('express');

const server = express();

const users = ['Bruno', 'Julia', 'Gabriel'];

//localhost:3000
server.get('/users/:index', (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
  
  //const id = req.params.id;
  //const { id } = req.params;
  //return res.json({ message: `Buscando o usuário ${id}` });

  //const nome = req.query.nome;
  //return res.json({ message: `Hello ${nome}` });
})

server.listen(3000);