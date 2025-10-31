import Navbar02 from "../components/ui/shadcn-io/navbar";
import Footer from "../components/sections/Footer";
import UpButton from "@/components/UpButton";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function DefaultLayout({ children }) {
  return (
    <>
      <motion.div className="relative w-full" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Navbar02 />
      </motion.div>
  
      <UpButton />
 
      {/* Offset fixed desktop header (h-16) and clear space for a fixed mobile bottom bar */}
      <main className="min-h-screen lg:pt-16 pb-20 lg:pb-0">{children}</main>

      <Footer />
    </>
  );
}