import type { ReactNode } from "react";

interface StatCardItem {
    label: string;
    value: string | number;
    change?: string;
    sub?: string;
    icon: ReactNode;
    bg: string;
    isNegative?: boolean;
    cols?: number;
}

interface StatsCardsProps {
    stats: StatCardItem[];
    cols?: number;
    loading?: boolean;
}

export default function StatsCards({
    stats,
    cols,
    loading = false,
}: StatsCardsProps) {
    const colClass = cols === 3
    ? "2xl:grid-cols-3" : 
    cols === 5
        ? "2xl:grid-cols-5"
        : cols === 6
            ? "2xl:grid-cols-6"
            : "2xl:grid-cols-4";

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${colClass} gap-4 mb-6`}>
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className="bg-white p-4 rounded-[10px] border border-gray-200 flex items-center gap-3 min-w-0"
                >
                    <div
                        className={`w-[58px] h-[58px] shrink-0 rounded-[12px] ${stat.bg} flex items-center justify-center`}
                    >
                        {stat.icon}
                    </div>

                    <div className="flex flex-col min-w-0">
                        <p className="text-[13px] font-medium text-gray-600 truncate font-poppins">
                            {stat.label}
                        </p>

                        {loading ? (
                            <div className="h-7 w-20 bg-gray-200 rounded animate-pulse mt-1" />
                        ) : (
                            <h3 className="text-[22px] font-bold text-[#101828] leading-tight mt-[1px]">
                                {stat.value}
                            </h3>
                        )}

                        {stat.sub ? (
                            <p className="text-[12px] text-gray-500 truncate mt-[1px]">{stat.sub}</p>
                        ) : stat.change ? (
                            <div className="flex items-center gap-1">
                                <svg
                                    width="14"
                                    height="6"
                                    viewBox="0 0 14 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`w-3 h-2 ${stat.isNegative ? "rotate-180" : ""}`}
                                >
                                    <path
                                        d="M8 0L15.5 7.5H0.5L8 0Z"
                                        fill={stat.isNegative ? "#EF4444" : "#22C55E"}
                                    />
                                </svg>
                                {loading ? (
                                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mt-2" />
                                ) : (
                                    <p className="text-[12px] text-gray-500 mt-0.5">
                                        {stat.change}
                                    </p>
                                )}
                            </div>
                        ) : null}
                    </div>
                </div>
            ))}
        </div>
    );
}