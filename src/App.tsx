import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChatProvider } from "@/contexts/ChatContext";
import { TerraChat } from "@/components/TerraChat";
import { pageVariants } from "@/lib/motion";
import Index from "./pages/Index";
import DestinationDetail from "./pages/DestinationDetail";
import Itinerary from "./pages/Itinerary";
import ShareItinerary from "./pages/ShareItinerary";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={reduce ? undefined : pageVariants}
        initial={reduce ? false : "initial"}
        animate={reduce ? undefined : "in"}
        exit={reduce ? undefined : "out"}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/destination/:slug" element={<DestinationDetail />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/share/:token" element={<ShareItinerary />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ChatProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
            <TerraChat />
          </BrowserRouter>
        </ChatProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
