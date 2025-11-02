import { ArrowDownLeft, ArrowUpRight, Gift } from "lucide-react";

interface TransactionItemProps {
  type: "credit" | "debit" | "bonus";
  description: string;
  amount: number;
  timestamp: string;
}

export default function TransactionItem({ type, description, amount, timestamp }: TransactionItemProps) {
  const getIcon = () => {
    switch (type) {
      case "credit":
        return <ArrowDownLeft className="w-5 h-5 text-green-500" />;
      case "debit":
        return <ArrowUpRight className="w-5 h-5 text-red-500" />;
      case "bonus":
        return <Gift className="w-5 h-5 text-primary" />;
    }
  };

  const getAmountColor = () => {
    switch (type) {
      case "credit":
      case "bonus":
        return "text-green-500";
      case "debit":
        return "text-red-500";
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover-elevate" data-testid={`transaction-${type}`}>
      <div className="p-2 rounded-lg bg-muted">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground">{description}</p>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
      <div className="text-right">
        <p className={`font-mono font-bold ${getAmountColor()}`}>
          {type === "debit" ? "-" : "+"}
          {amount.toFixed(2)}
        </p>
        <p className="text-xs text-muted-foreground">PC</p>
      </div>
    </div>
  );
}
