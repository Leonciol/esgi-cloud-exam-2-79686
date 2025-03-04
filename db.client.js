const { Sequelize } = require('sequelize')

const database_url = process.env.DATABASE_URL;

if (!database_url) {
  console.error("ERROR db not exsit");
  process.exit(1); 
}

// database
const sequelize = new Sequelize(database_url,
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);

// authentication and synchronization
sequelize.authenticate()
  .then(() => {
    sequelize.sync().catch(() => console.log("Cannot sync the database"));
  })
  .catch(() => console.log("Cannot connect to database, please check environment credentials"));

module.exports = sequelize;
