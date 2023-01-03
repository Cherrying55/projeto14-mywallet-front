import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(usersRoutes);
app.use(transactionRoutes);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server running in port: ${port}`));