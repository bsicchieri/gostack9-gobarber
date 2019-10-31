import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    // validações
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    // verificar se as informações batem com a validação
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ errorr: 'Validation fails' });
    }

    // verifica se já não existe um usuário com o email
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists!' });
    }

    // campos que serão retornados
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  // alteração dos dados cadastrais
  async update(req, res) {
    // validações
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    // verificar se as informações batem com a validação
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ errorr: 'Validation fails' });
    }

    // busca
    const { email, oldPassword } = req.body;

    // busca o usuário que será editado
    const user = await User.findByPk(req.userId);

    // verifica se o email que ele quer alterar for diferente
    // do email que ele já possui
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists!' });
      }
    }

    // verifica se a senha antiga é igual a senha que ele já possui
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match!' });
    }

    // atualizar o usuário
    const { id, name, provider } = await user.update(req.body);

    // campos que serão retornados
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
