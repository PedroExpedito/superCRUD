import sequelize from '../../src/app/models';

// export default () => {
//   console.log(sequelize.connection.models);
// };
export default () => Promise.all(Object.keys(sequelize.connection.models)
  .map((key) => sequelize.connection.models[key].destroy({ truncate: true, force: true })));
