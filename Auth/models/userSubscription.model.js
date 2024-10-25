const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSubscriptionSchema = new mongoose.Schema({
  user_subscription_id: { type: String, default: uuidv4, unique: true },
  user_id: { type: String, required: true, ref: "User" },
  plan_id: { type: String, required: true, ref: "SubscriptionPlan" },
  
  start_date: { type: Date, default: Date.now },
  end_date: { type: Date },
  
  status: {
    type: String,
    enum: ["active", "canceled", "expired"],
    default: "active"
  },
  
  
}, { timestamps: true });

// Middleware to ensure only one membership type is active
userSubscriptionSchema.pre("save", function (next) {
  const memberships = [this.isDiamond, this.isGold, this.isSilver, this.isTrial];
  const activeMemberships = memberships.filter(Boolean);

  if (activeMemberships.length > 1) {
    return next(new Error("Only one membership level can be active per user subscription."));
  }

  next();
});

module.exports = mongoose.model("UserSubscription", userSubscriptionSchema);
