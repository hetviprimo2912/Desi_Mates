import NewEvents from "./NewEvents";
import GrowthOverview from "./GrowthOverview";
import type { NewEvent, GrowthOverview as GrowthOverviewType } from "../../Types/DashboardTypes/dashboard_types";

interface Props {
    newEvents?: NewEvent[];
    growthOverview?: GrowthOverviewType;
    loading?: boolean;
}

export default function DashboardEvents({ newEvents, growthOverview, loading }: Props) {
    return (
        <div className="mt-10">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                <div className="xl:col-span-8">
                    <NewEvents events={newEvents} loading={loading} />
                </div>
                <div className="xl:col-span-4">
                    <GrowthOverview data={growthOverview} loading={loading} />
                </div>
            </div>
        </div>
    );
}
