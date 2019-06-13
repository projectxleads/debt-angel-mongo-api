import express from "express";
import leadApiRoutes from "../routes/api/lead.api";

const router = express.Router();

router.use("/lead", leadApiRoutes);

export default router;
