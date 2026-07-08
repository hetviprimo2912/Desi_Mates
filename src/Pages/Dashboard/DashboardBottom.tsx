import TicketStats from "./TicketStats";
import TopTicketSelling from "./TopTicketSelling";

export default function DashboardBottom() {
    return (
        <div className="mt-6 rounded-[22px] bg-[#F8FAFC] p-2">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] gap-6 items-stretch">
                <TicketStats
                    title="Monthly Ticket Sold"
                    value={0}
                    percentage="-100%"
                    type="monthly"
                />
                <TicketStats
                    title="Annual Ticket Sold"
                    value={0}
                    percentage="-100%"
                    type="annual"
                />
                <TopTicketSelling />
            </div>
        </div>
    );
}
