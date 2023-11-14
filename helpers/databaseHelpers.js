import { writeFileSync, readFileSync } from "fs";
const database = new URL("../database/db.json", import.meta.url);

export const loadData = () => {
  return JSON.parse(readFileSync(database));
};

export const storeData = (data) => {
  return writeFileSync(database, JSON.stringify(data));
};
