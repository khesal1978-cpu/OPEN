import TransactionItem from "../TransactionItem";

export default function TransactionItemExample() {
  return (
    <div className="p-6 bg-background space-y-2">
      <TransactionItem
        type="credit"
        description="Mining Reward"
        amount={12.50}
        timestamp="2 hours ago"
      />
      <TransactionItem
        type="bonus"
        description="Referral Bonus"
        amount={25.00}
        timestamp="5 hours ago"
      />
      <TransactionItem
        type="credit"
        description="Daily Mining"
        amount={8.75}
        timestamp="Yesterday"
      />
    </div>
  );
}
