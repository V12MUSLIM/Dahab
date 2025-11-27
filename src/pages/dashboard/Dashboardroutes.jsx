import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AdminEditContact from "./AdminEditContact";
import AdminEditSocials from "./AdminEditSocials";
import AdminEditPackages from "./AdminEditPackges";
import Dashboard from "./Dashboard";
import EditRooms from "./EditRooms";
import DashboardDestinations from "./DashboardDestinations";
const AdminEditStays = lazy(() => import("./AdminEditStays"));
export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="destinations" element={<DashboardDestinations />} />
      <Route path="contacts" element={<AdminEditContact />} />
      <Route path="socialmedia" element={<AdminEditSocials />} />
      <Route path="packages" element={<AdminEditPackages />} />
      <Route path="stays" element={<AdminEditStays />} />

      {/* Stays management */}
      <Route path="stays/:id/rooms" element={<EditRooms />} />
    </Routes>
  );
}
