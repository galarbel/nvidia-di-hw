import cors from "cors";
import express from "express";
import connectDB from "./config/database";
import mnfRoutes from "./routes/mnf.route.v1";

const app = express();

// app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:4200",
  methods: "GET, OPTIONS",
}));

app.use("/api/v1/mnf", mnfRoutes);

connectDB();


app.get(["/", "/health"], (req, res) => { res.send({ message: "Hello! I am up!", status: "OK!" }); });


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on("error", console.error);
