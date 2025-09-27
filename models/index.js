import { Sequelize, DataTypes } from "sequelize";
import configFile from "../config/config.js";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configFile[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

const loadModels = async () => {
  const files = fs
    .readdirSync(__dirname)
    .filter((file) => file !== basename && file.endsWith(".js"));
  for (const file of files) {
    const modulePath = pathToFileURL(path.join(__dirname, file)).href;
    const modelModule = await import(modulePath);
    const model = modelModule.default(sequelize, DataTypes);
    db[model.name] = model;
  }
};

await loadModels();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
