import Transaction from "../models/transactionModel.js";

/**
 * CREATE TRANSACTION
 */
export const createTransaction = async (req, res) => {
  try {
    const { userId, amount, title, type, date } = req.body;

    if (!userId || !amount || !title || !type) {
      return res.status(400).json({
        success: false,
        message: "userId, amount, title and type are required",
      });
    }

    const transaction = await Transaction.create({
      userId, // no ObjectId conversion
      amount,
      title,
      type,
      date,
    });

    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    console.error("createTransaction error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET ALL TRANSACTIONS FOR A USER
 */
export const getTransactionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "userId is required" });

    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    res
      .status(200)
      .json({ success: true, count: transactions.length, data: transactions });
  } catch (error) {
    console.error("getTransactionsByUser error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET USER BALANCE
 */
export const getUserBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "userId is required" });

    const balance = await Transaction.getUserBalance(userId);

    res.status(200).json({ success: true, data: balance });
  } catch (error) {
    console.error("getUserBalance error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET SINGLE TRANSACTION
 */
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction)
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });

    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    console.error("getTransactionById error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * UPDATE TRANSACTION
 */
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!transaction)
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });

    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    console.error("updateTransaction error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * DELETE TRANSACTION
 */
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction)
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });

    res
      .status(200)
      .json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("deleteTransaction error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
