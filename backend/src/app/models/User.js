import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // executado antes de qualquer usuário ser salvo no BD
    this.addHook('beforeSave', async user => {
      // verificar se está cadastrando ou alterando a senha
      if (user.password) {
        // gerar password hash
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    // retornar o model que acabou de ser inicializado
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id' });
  }

  // verificar se a senha que ele está usando para logar
  // é a senha correta já armazenada
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
