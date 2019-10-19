const express = require('express');

const server = express();

server.use(express.json());

const users = ['Bruno', 'Julia', 'Marcelo'];

//listar todos os usuários
server.get('/users', (req, res) => {
  return res.json(users);
})

//listar um usuário
server.get('/users/:index', (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
  
  //const id = req.params.id;
  //const { id } = req.params;
  //return res.json({ message: `Buscando o usuário ${id}` });

  //const nome = req.query.nome;
  //return res.json({ message: `Hello ${nome}` });
})

//criar usuário
server.post('/users', (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

//alterar usuário
server.put('/users/:index', (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

//deletar usuário
server.delete('/users/:index', (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);