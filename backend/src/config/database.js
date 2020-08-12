require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || 'postgres',
  storage: './__tests__/database.sqlite',
  operatorsAliases: 0, // Desabilita algum wating pesquisar melhor depois
  logging: 0,
  define: {
    timestamps: 1,
    underscored: 1,
    underscoredAll: 1,
  },
};
