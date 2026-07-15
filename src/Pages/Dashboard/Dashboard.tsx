import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Store/store";
import { fetch_dashboard } from "../../Store/slices/DashboardSlices/dashboard_thunk";
import MonthlyUser from "./MonthlyUser";
import DashboardUsers from "./DashboardUsers";
import DashboardBottom from "./DashboardBottom";
import DashboardEvents from "./DashboardEvents";
import MixedChart from "./MixedChart";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetch_dashboard());
  }, [dispatch]);

  return (
    <div className="px-4 sm:px-8 pt-6 pb-12">
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#101828]">Dashboard</h1>
        <p className="mt-2 text-[15px] text-gray-500">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <MonthlyUser data={data?.graph_data} loading={loading} />
      <div className="mt-6">
        <DashboardUsers users={data?.latest_users} loading={loading} />
      </div>
      <DashboardBottom
        monthlyTicket={data?.monthly_ticket_sold}
        annualTicket={data?.annual_ticket_sold}
        topEvent={data?.topEvent}
        loading={loading}
      />
      <div className="mt-6">
        <DashboardEvents
          newEvents={data?.new_event}
          growthOverview={data?.growth_overview}
          loading={loading}
        />
      </div>
      <div className="mt-6">
        <MixedChart data={data?.mixed_statistics} loading={loading} />
      </div>
    </div>
  );
};

export default Dashboard;
