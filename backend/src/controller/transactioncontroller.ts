import { Response } from "express";
import { prisma } from "../lib/prisma.js";
import { AuthRequest } from "../middleware/authmiddleware.js";

export async function createTransaction(
  req: AuthRequest,
  res: Response
) {
  const { amount, type, category, note, date } = req.body;

  if (!amount || !type || !category) {
    return res.status(400).json({
      message: "amount, type and category are required",
    });
  }

  if (amount <= 0) {
    return res.status(400).json({
      message: "amount must be greater than 0",
    });
  }

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const transaction = await prisma.transaction.create({
    data: {
      amount,
      type,
      category,
      note,
      ...(date && { date: new Date(date) }),
      userId: req.userId,
    },
  });

  return res.status(201).json({
    message: "Transaction created",
    transaction,
  });
}

export async function getTransactions(
    req: AuthRequest, 
    res: Response
) {
    if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
    }

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: req.userId,
    },
    orderBy: {
      date: "desc",
    },
  });

  return res.status(200).json({
    transactions,
  });
}

export async function updateTransaction(
  req: AuthRequest,
  res: Response
) {
  const { id } = req.params;
  const { amount, type, category, description, date } = req.body;

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if(!id){
    return res.status(401).json({ message: "Transaction does not exist"})
  }

  // Ensure transaction belongs to user
  const existing = await prisma.transaction.findFirst({
    where: {
      id,
      userId: req.userId,
    },
  });

  if (!existing) {
    return res.status(404).json({
      message: "Transaction not found",
    });
  }

  const updatedTransaction = await prisma.transaction.update({
    where: { id },
    data: {
      ...(amount && { amount }),
      ...(type && { type }),
      ...(category && { category }),
      ...(description !== undefined && { description }),
      ...(date && { date: new Date(date) }),
    },
  });

  return res.status(200).json({
    message: "Transaction updated",
    transaction: updatedTransaction,
  });
}

export async function deleteTransaction(
  req: AuthRequest,
  res: Response
) {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if(!id){
    return res.status(401).json({ message: "Transaction doesnot exist"})
  }

  const existing = await prisma.transaction.findFirst({
    where: {
      id,
      userId: req.userId,
    },
  });

  if (!existing) {
    return res.status(404).json({
      message: "Transaction not found",
    });
  }

  await prisma.transaction.delete({
    where: { id },
  });

  return res.status(200).json({
    message: "Transaction deleted",
  });
}
