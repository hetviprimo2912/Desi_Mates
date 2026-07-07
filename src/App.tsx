import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./Features/Auth/Login/LoginPage";
import Layout from "./Components/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AllUsers from "./Pages/AllUsers/AllUsers";
import SubscribedUsers from "./Pages/AllUsers/SubscribedUsers";
import ProtectedRoute from "./Routes/ProtectedRoute";
import PublicRoute from "./Routes/PublicRoute";

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