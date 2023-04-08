require("reflect-metadata");
const http = require('http');
const dotenv = require('dotenv');
const { createConnection } = require('typeorm');
const schedule = require('node-schedule');
const { validateTransaction } = require('./src/services/transactionService');
const app = require('./src/app');
const typeormconfig = require('./src/config/typeormconfig');

let AppDataSource;
async function main() {
  dotenv.config();
  const port = process.env.PORT || 3000;

  // conexion a base de datos
  AppDataSource = createConnection(typeormconfig)
    .then(() => console.log("Database conectada!"))
    .catch((error) => console.log(error));

  // Crea e inicia el servidor
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(`Server inició en el puerto ${port}`);
  });

  // Programar la validación de transacciones cada 30 segundos
  schedule.scheduleJob('30 * * * * *', validateTransaction);
}

main();

module.exports = {
  AppDataSource,
};
