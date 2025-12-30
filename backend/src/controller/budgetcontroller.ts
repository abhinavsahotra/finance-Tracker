import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { AuthRequest } from "../middleware/authmiddleware.js";

export const createOrUpdateBudget = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.userId as string;

    const { category, limit, month, year } = req.body;

    if (!category || !limit || !month || !year) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const budget = await prisma.budget.upsert({
      where: {
        userId_category_month_year: {
          userId,
          category,
          month,
          year,
        },
      },
      update: {
        limit,
      },
      create: {
        userId,
        category,
        limit,
        month,
        year,
      },
    });

    res.status(200).json({
      message: "Budget saved successfully",
      budget,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to save budget",
    });
  }
};

export const getBudgets = async (
  req: AuthRequest,
  res: Response
) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const month = req.query.month
    ? Number(req.query.month)
    : undefined;

  const year = req.query.year
    ? Number(req.query.year)
    : undefined;

  const budgets = await prisma.budget.findMany({
    where: {
      userId: req.userId,
      ...(month && { month }),
      ...(year && { year }),
    },
    orderBy: {
      category: "asc",
    },
  });

  return res.status(200).json({ budgets });
};