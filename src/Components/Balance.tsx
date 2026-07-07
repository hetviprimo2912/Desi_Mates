import { Wallet } from "lucide-react";

interface BalanceProps {
  amount: string | number;
  iconSize?: number;
  iconClassName?: string;
  textClassName?: string;
  showIcon?: boolean;
  className?: string;
}

export default function Balance({
  amount,
  iconSize = 16,
  iconClassName = "text-gray-700",
  textClassName = "text-[14px] font-medium text-gray-600",
  showIcon = true,
  className = "flex items-center gap-2",
}: BalanceProps) {
  return (
    <div className={className}>
      {showIcon && <Wallet size={iconSize} className={iconClassName} />}
      <p className={textClassName}>{amount}</p>
    </div>
  );
}
