import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // <-- changed from ObjectId to String for Clerk
      required: true,
      index: true, // important for performance
    },
    amount: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["credit", "debit"], // must match your transaction type
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// ✅ Static method to get user balance
transactionSchema.statics.getUserBalance = async function (userId) {
  const result = await this.aggregate([
    { $match: { userId } }, // no ObjectId conversion needed
    {
      $group: {
        _id: null,
        totalCredit: {
          $sum: { $cond: [{ $eq: ["$type", "credit"] }, "$amount", 0] },
        },
        totalDebit: {
          $sum: { $cond: [{ $eq: ["$type", "debit"] }, "$amount", 0] },
        },
        transactionCount: { $sum: 1 },
      },
    },
  ]);

  const stats = result[0] || {
    totalCredit: 0,
    totalDebit: 0,
    transactionCount: 0,
  };

  return {
    totalCredit: stats.totalCredit,
    totalDebit: stats.totalDebit,
    totalBalance: stats.totalCredit - stats.totalDebit,
    transactionCount: stats.transactionCount,
  };
};

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
