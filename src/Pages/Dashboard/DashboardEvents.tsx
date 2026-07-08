import NewEvents from "./NewEvents";
import GrowthOverview from "./GrowthOverview";

export default function DashboardEvents() {
    return (
        <div className="mt-10">

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                {/* New Events */}

                <div className="xl:col-span-8">

                    <NewEvents />

                </div>

                {/* Growth Overview */}

                <div className="xl:col-span-4">

                    <GrowthOverview />

                </div>

            </div>

        </div>
    );
}