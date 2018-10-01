/* eslint import/no-commonjs: 0 */

const path = require('path');

const folder = process.env.NODE_ENV === 'DEVELOPMENT' ? 'src' : 'dist';

module.exports = {
  type: 'mysql',
  port: 3306,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [path.join(folder, 'entity/*.js')],
  migrations: [path.join(folder, 'migration/*.js')],
  // subscribers: [
  //   path.join(folder, 'subscriber/*.js')
  // ],
  cli: {
    entitiesDir: path.join(folder, 'entity'),
    migrationsDir: path.join(folder, 'migration'),
    // subscriberDir: path.join(folder, 'subscriber')
  },
};
