import express from "express";
import cors from "cors";
import "./db";
import activitiesRouter from "./routes/activities/router";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/activities", activitiesRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
