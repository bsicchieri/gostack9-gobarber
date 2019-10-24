import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Bruno Sicchieri',
    email: 'brunosicchieri@hotmail.com',
    password_hash: '12345678',
  });

  return res.json(user);
  // return res.json({ message: 'Hello Bootcamp GoStack' });
});

export default routes;
