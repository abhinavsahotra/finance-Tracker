import { Router } from "express";
import { 
    createTransaction, 
    deleteTransaction, 
    getTransactions, 
    updateTransaction
} from "../controller/transactioncontroller.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

const router = Router();

router.post("/", authMiddleware, createTransaction);
router.get("/", authMiddleware, getTransactions);
router.put("/:id", authMiddleware, updateTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);

export default router;
