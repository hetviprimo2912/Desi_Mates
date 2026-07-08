import {
    ResponsiveContainer,
    RadialBarChart,
    RadialBar,
} from "recharts";

const growthData = [
    {
        title: "Total Users",
        value: 1240,
        progress: 82,
        color: "#2563EB",
    },
    {
        title: "Total Tickets",
        value: 380,
        progress: 65,
        color: "#10B981",
    },
    {
        title: "Total Events",
        value: 26,
        progress: 48,
        color: "#8B5CF6",
    },
    {
        title: "Subscribed Users",
        value: 315,
        progress: 72,
        color: "#F59E0B",
    },
];

function ProgressRing({
    title,
    value,
    progress,
    color,
}: {
    title: string;
    value: number;
    progress: number;
    color: string;
}) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-[52px] h-[52px] flex-shrink-0">
                <ResponsiveContainer>
                    <RadialBarChart
                        innerRadius="72%"
                        outerRadius="100%"
                        barSize={6}
                        data={[
                            { value: 100, fill: "#EEF2F7" },
                            { value: progress, fill: color },
                        ]}
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

export default function GrowthOverview() {

    return (


            <div
                className="
                    bg-white
                    border
                    border-[#E5E7EB]
                    rounded-[20px]
                    shadow-xl
                    hover:shadow-2xl
                    transition-all
                    duration-300
                    p-6
                    h-full
                    w-full
                    flex
                    flex-col
                "
        >
            <div className="mb-4">
                <h2 className="text-[22px] font-semibold text-[#101828]">Growth Overview</h2>
                <p className="text-xs text-gray-500 mt-0.5">Platform growth statistics</p>
            </div>

            <div className="space-y-3">
                {growthData.map((item) => (
                    <div
                        key={item.title}
                        className="
                                    flex
                                    items-center
                                    justify-between
                                    rounded-2xl
                                    border
                                    border-[#E5E7EB]
                                    bg-white
                                    px-4
                                    py-4
                                    shadow-sm
                                    hover:shadow-md
                                    transition-all
                                    duration-300
                                    "
                    >
                        <ProgressRing
                            title={item.title}
                            value={item.value}
                            progress={item.progress}
                            color={item.color}
                        />
                        <div className="text-right">
                            <p className="text-[20px] font-bold" style={{ color: item.color }}>
                                {item.progress}%
                            </p>
                            <p className="text-[11px] text-gray-500">Overall Growth</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );

}