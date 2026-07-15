import { ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";
import type { GrowthOverview as GrowthOverviewType } from "../../Types/DashboardTypes/dashboard_types";

interface Props {
    data?: GrowthOverviewType;
    loading?: boolean;
}

const GROWTH_CONFIG = [
    { key: "total_users" as const, title: "Total Users", color: "#2563EB" },
    { key: "total_tickets" as const, title: "Total Tickets", color: "#10B981" },
    { key: "total_events" as const, title: "Total Events", color: "#8B5CF6" },
    { key: "subscribed_users" as const, title: "Subscribed Users", color: "#F59E0B" },
];

function ProgressRing({ title, value, progress, color }: { title: string; value: number; progress: number; color: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-[52px] h-[52px] flex-shrink-0">
                <ResponsiveContainer>
                    <RadialBarChart
                        innerRadius="72%"
                        outerRadius="100%"
                        barSize={6}
                        data={[{ value: 100, fill: "#EEF2F7" }, { value: Math.abs(progress), fill: color }]}
                        startAngle={90}
                        endAngle={-270}
                    >
                        <RadialBar dataKey="value" cornerRadius={20} background={false} />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
            <div>
                <p className="text-[12px] text-gray-500">{title}</p>
                <h3 className="text-[16px] font-semibold text-[#101828]">{value.toLocaleString()}</h3>
            </div>
        </div>
    );
}

export default function GrowthOverview({ data, loading }: Props) {
    return (
        <div className="bg-white border border-[#E5E7EB] rounded-[20px] shadow-xl hover:shadow-2xl transition-all duration-300 p-6 h-full w-full flex flex-col">
            <div className="mb-4">
                <h2 className="text-[22px] font-semibold text-[#101828]">Growth Overview</h2>
                <p className="text-xs text-gray-500 mt-0.5">Platform growth statistics</p>
            </div>

            <div className="space-y-3">
                {GROWTH_CONFIG.map((cfg) => {
                    const stat = data?.[cfg.key];
                    return (
                        <div
                            key={cfg.key}
                            className="flex items-center justify-between rounded-2xl border border-[#E5E7EB] bg-white px-4 py-4 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            {loading ? (
                                <div className="flex items-center gap-3 animate-pulse">
                                    <div className="w-[52px] h-[52px] rounded-full bg-gray-200 flex-shrink-0" />
                                    <div className="space-y-2">
                                        <div className="h-3 w-24 rounded bg-gray-200" />
                                        <div className="h-4 w-16 rounded bg-gray-200" />
                                    </div>
                                </div>
                            ) : (
                                <ProgressRing
                                    title={cfg.title}
                                    value={stat?.count ?? 0}
                                    progress={stat?.percentage ?? 0}
                                    color={cfg.color}
                                />
                            )}
                            <div className="text-right">
                                <p className="text-[20px] font-bold" style={{ color: cfg.color }}>
                                    {stat?.percentage ?? 0}%
                                </p>
                                <p className="text-[11px] text-gray-500">Overall Growth</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
