import TicketStats from "./TicketStats";
import TopTicketSelling from "./TopTicketSelling";
import type { TicketStat, TopEvent } from "../../Types/DashboardTypes/dashboard_types";

interface Props {
    monthlyTicket?: TicketStat;
    annualTicket?: TicketStat;
    topEvent?: TopEvent;
    loading?: boolean;
}

export default function DashboardBottom({ monthlyTicket, annualTicket, topEvent, loading }: Props) {
    return (
        <div className="mt-6 rounded-[22px] bg-[#F8FAFC] p-2">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] gap-6 items-stretch">
                <TicketStats
                    title="Monthly Ticket Sold"
                    value={monthlyTicket?.count ?? 0}
                    percentage={`${monthlyTicket?.percentage ?? 0}%`}
                    type="monthly"
                    loading={loading}
                />
                <TicketStats
                    title="Annual Ticket Sold"
                    value={annualTicket?.count ?? 0}
                    percentage={`${annualTicket?.percentage ?? 0}%`}
                    type="annual"
                    loading={loading}
                />
                <TopTicketSelling topEvent={topEvent} loading={loading} />
            </div>
        </div>
    );
}
