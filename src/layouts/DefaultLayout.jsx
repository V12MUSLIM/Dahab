import Navbar02 from "../components/ui/shadcn-io/navbar-02";
import Footer from "../components/sections/Footer";
import UpButton from "@/components/UpButton";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function DefaultLayout({ children }) {
  return (
    <>
      {/* Navbar */}
      <motion.div
        className="relative w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Navbar02 />
      </motion.div>
      <UpButton />
      {/* Page Content */}
      <main className="min-h-screen">{children}</main>

      {/* Footer */}
      <Footer />
    </>
  );
}
