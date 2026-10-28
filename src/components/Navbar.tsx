import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AuthModal } from "./AuthModal";
import { Magnetic } from "@/components/Magnetic";
import { DESTINATIONS } from "@/data/destinations";
import { EASE, DUR, popoverVariants } from "@/lib/motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [query, setQuery] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const suggestions = query.trim().length > 0
    ? DESTINATIONS.filter(d => d.place.toLowerCase().includes(query.toLowerCase()) || d.state.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  return (
    <>
      <motion.header
        initial={reduce ? false : { opacity: 0, y: -12 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: DUR.base, ease: EASE }}
        className={`fixed top-0 inset-x-0 z-40 glass-nav border-b border-border transition-[height,box-shadow,padding] duration-300 ease-soft ${scrolled ? "shadow-soft" : ""}`}
        style={{ transition: "box-shadow 300ms ease" }}
      >
        <div className={`container flex items-center gap-4 transition-all duration-300 ease-soft ${scrolled ? "h-14" : "h-[72px]"}`}>
          <Logo size={scrolled ? 26 : 30} />

          <div className="flex-1 max-w-xl mx-auto relative hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                value={query}
                onChange={e => { setQuery(e.target.value); setShowSuggest(true); }}
                onFocus={() => setShowSuggest(true)}
                onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
                placeholder="Search destinations or states…"
                className="pl-10 h-10 bg-porcelain/60 border-heather/35 focus-visible:ring-electric/60 text-[#26153B] placeholder:text-[#6B5581]"
                aria-label="Search destinations"
              />
            </div>
            <AnimatePresence>
              {showSuggest && suggestions.length > 0 && (
                <motion.div
                  variants={popoverVariants}
                  initial={reduce ? false : "hidden"}
                  animate={reduce ? undefined : "show"}
                  exit={reduce ? undefined : "exit"}
                  style={{ originY: 0 }}
                  className="absolute top-full mt-2 inset-x-0 bg-card border border-heather/40 rounded-xl shadow-lift overflow-hidden z-50"
                >
                  {suggestions.map((d, i) => (
                    <motion.button
                      key={d.slug}
                      onMouseDown={() => navigate(`/destination/${d.slug}`)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-heather/20 text-[#26153B] transition-colors"
                      initial={reduce ? false : { opacity: 0, x: -4 }}
                      animate={reduce ? undefined : { opacity: 1, x: 0 }}
                      transition={{ duration: DUR.fast, ease: EASE, delay: i * 0.025 }}
                    >
                      <MapPin className="size-4 text-heather shrink-0" />
                      <span className="font-medium">{d.place}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{d.state}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <nav className="ml-auto flex items-center gap-1">
            {[
              { to: "/", label: "Home", end: true },
              { to: "/destinations", label: "Destinations", end: false },
              { to: "/featured", label: "Featured", end: false },
              { to: "/itinerary", label: "My Itineraries", end: false },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `hidden sm:inline-flex text-sm font-medium px-3.5 py-1.5 rounded-full transition-all ${
                    isActive
                      ? "text-heather-700 bg-heather/20 border border-heather/40 shadow-sm"
                      : "text-foreground/75 hover:text-foreground hover:bg-porcelain/60"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow">
                    <Avatar className="size-9 border border-border">
                      <AvatarImage src={profile?.avatar_url ?? undefined} alt={profile?.display_name ?? "Profile"} />
                      <AvatarFallback className="bg-secondary text-secondary-foreground font-medium">
                        {(profile?.display_name ?? user.email ?? "U").slice(0,1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium truncate">{profile?.display_name ?? "Traveller"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/itinerary")}>
                    <UserIcon className="size-4 mr-2" /> My Itineraries
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive">
                    <LogOut className="size-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Magnetic max={4}>
                  <Button variant="ghost" size="sm" onClick={() => { setAuthMode("signin"); setAuthOpen(true); }} className="hover:bg-heather/20 text-[#26153B] font-semibold">
                    Login
                  </Button>
                </Magnetic>
                <Magnetic max={4}>
                  <Button
                    size="sm"
                    onClick={() => { setAuthMode("signup"); setAuthOpen(true); }}
                    className="bg-electric hover:bg-[#d5f325] text-[#190C28] font-bold shadow-[0_0_12px_rgba(228,255,59,0.4)] transition-all"
                  >
                    Sign Up
                  </Button>
                </Magnetic>
              </>
            )}
          </nav>
        </div>

        {/* Scroll progress — thin gradient bar at the bottom edge of the
            navbar. Gated on reduced motion via the hook returning 0. */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2.5px] origin-left"
          style={{
            width: `${(reduce ? 0 : scrollProgress) * 100}%`,
            background: "linear-gradient(90deg, #9B7ED6, #E4FF3B)",
            boxShadow: "0 0 12px rgba(228, 255, 59, 0.6)",
            transition: reduce ? undefined : "width 80ms linear",
          }}
        />
      </motion.header>
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} initialMode={authMode} />
    </>
  );
}
