import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./Features/Auth/Login/LoginPage";
import Layout from "./Components/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AllUsers from "./Pages/AllUsers/AllUsers";
import SubscribedUsers from "./Pages/AllUsers/SubscribedUsers";
import ProtectedRoute from "./Routes/ProtectedRoute";
import PublicRoute from "./Routes/PublicRoute";
import AllCategory from "./Pages/Category/AllCategory";
import AddCategory from "./Pages/Category/AddCategory";
import AllInterest from "./Pages/Interest/AllInterest";
import AddInterest from "./Pages/Interest/AddInterest";
import AllStarSign from "./Pages/StarSign/AllStarSign";
import AddStarSign from "./Pages/StarSign/AddStarSign";
import AllReligion from "./Pages/Religion/AllReligion";
import AddReligion from "./Pages/Religion/AddReligion";
import AllEvent from "./Pages/Event/AllEvent";
import AddEvent from "./Pages/Event/AddEvent";
import PaymentList from "./Pages/Payment/PaymentList";
import AllMatches from "./Pages/Matches/AllMatches";
import AllTickets from "./Pages/Ticket/AllTickets";
import AllReports from "./Pages/Report/AllReports";
import ManagerList from "./Pages/EventManager/ManagerList";
import AddManager from "./Pages/EventManager/AddManager";
import Settings from "./Pages/Settings/Settings";
function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route
          path="/login"
          element={<LoginPage />}
        />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/all-users"
            element={<AllUsers />}
          />

          <Route
            path="/sub-users"
            element={<SubscribedUsers />}
          />

          <Route
            path="/category/all-category"
            element={<AllCategory />}
          />

          {/* Later */}
          <Route
            path="/category/add-category"
            element={<AddCategory />}
          />
          <Route
            path="/interest/all-interest"
            element={<AllInterest />}
          />

          <Route
            path="/interest/add-interest"
            element={<AddInterest />}
          />
          <Route
            path="/starsign/all-starsign"
            element={<AllStarSign />}
          />

          <Route
            path="/starsign/add-starsign"
            element={<AddStarSign />}
          />
          <Route
            path="/religion/all-religion"
            element={<AllReligion />}
          />

          <Route path="/religion/add-religion" element={<AddReligion />} />

          <Route path="/event/all-event" element={<AllEvent />} />
          <Route path="/event/add-event" element={<AddEvent />} />

          <Route path="/payment/payment-list" element={<PaymentList />} />

          <Route path="/matches/all-matches" element={<AllMatches />} />

          <Route path="/ticket/all-tickets" element={<AllTickets />} />

          <Route path="/report/all-reports" element={<AllReports />} />

          <Route path="/event-manager/manager-list" element={<ManagerList />} />
          <Route path="/event-manager/add-manager" element={<AddManager />} />

          <Route path="/settings" element={<Settings />} />
            <Route path="/report/add-reports" element={<AllReports />} />
        </Route>

      </Route>

      {/* Default Route */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;