/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import cors from "cors";
import express from 'express';
import { connectDB } from './config/database.js';
import mnfRoutes from "./routes/mnf.route";

const app = express();

// app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:4200",
  methods: "GET, OPTIONS"
}))

app.use('/mnf', mnfRoutes)

connectDB();


app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to nvidia-di-api!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
