import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        pathl: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    // retornar o model que acabou de ser inicializado
    return this;
  }
}

export default File;
