import dotenv from "dotenv";
import Connection_DB from "./db/dbConnection.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

Connection_DB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is listening at port no.->  ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    ` Error file connecting to mongodb database-> ${error}`;
  });
