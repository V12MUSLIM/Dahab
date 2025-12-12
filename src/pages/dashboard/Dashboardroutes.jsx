import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AdminEditContact from "./AdminEditContact";
import AdminEditSocials from "./AdminEditSocials";
import AdminEditPackages from "./AdminEditPackges";
import Dashboard from "./Dashboard";
import EditRooms from "./EditRooms";
import DashboardDestinations from "./DashboardDestinations";
import AdminEditHeroes from "@/pages/dashboard/AdminEditHeroes";
const AdminEditStays = lazy(() => import("./AdminEditStays"));
const AddStay = lazy(() => import("./AddStay")); // ⬅️ new

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="destinations" element={<DashboardDestinations />} />
      <Route path="contacts" element={<AdminEditContact />} />
      <Route path="socialmedia" element={<AdminEditSocials />} />
      <Route path="packages" element={<AdminEditPackages />} />
      <Route path="heroes" element={<AdminEditHeroes />} />
      {/* Stay Management */}
      <Route path="stays">
        <Route index element={<AdminEditStays />} />
        <Route path="addstay" element={<AddStay />} /> {/* ⬅️ new */}
        <Route path=":id/rooms" element={<EditRooms />} />
      </Route>
    </Routes>
  );
}
