module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postegres',
  password: 'docker',
  databse: 'gobarber',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
