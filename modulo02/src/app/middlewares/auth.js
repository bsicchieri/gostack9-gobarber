// verificar se o usuário está logado

import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // se não estiver presente na requisição
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided ' });
  }

  // dividir o bearer e o token
  const [, token] = authHeader.split(' ');

  try {
    // se conseguiu decifrar o token, decoded recebe as informações
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    // caso o token esteja errado
    return res.status(401).json({ error: 'Token invalid' });
  }
};
