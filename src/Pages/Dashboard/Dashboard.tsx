import MonthlyUser from "./MonthlyUser";
import DashboardUsers from "./DashboardUsers";
import DashboardBottom from "./DashboardBottom";
import DashboardEvents from "./DashboardEvents";
import MixedChart from "./MixedChart";

const Dashboard = () => {
  return (
    <div className="px-4 sm:px-8 pt-6 pb-12">

      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#101828]">
          Dashboard
        </h1>

        <p className="mt-2 text-[15px] text-gray-500">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <MonthlyUser />
      <div className="mt-6">
        <DashboardUsers />
      </div>
      <DashboardBottom />
      <div className="mt-6">
        <DashboardEvents />
      </div>
      <div className="mt-6">
        <MixedChart />
      </div>
    </div>
  );
};

export default Dashboard;