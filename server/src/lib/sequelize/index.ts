import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require('./../../../config/database.json')[env];

let sequelize: Sequelize.Sequelize;
sequelize = new Sequelize.Sequelize(config.database, config.username, config.password, config);

export default sequelize;