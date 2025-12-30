import { Router } from "express";
import { createOrUpdateBudget, getBudgets } from "../controller/budgetcontroller.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

const router = Router();

router.post("/", authMiddleware, createOrUpdateBudget);
router.get("/", authMiddleware, getBudgets);

export default router;