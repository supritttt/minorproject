import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AuthModal } from "./AuthModal";
import { DESTINATIONS } from "@/data/destinations";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [query, setQuery] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
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
      <header
        className={`fixed top-0 inset-x-0 z-40 glass-nav border-b border-border transition-[height,box-shadow,padding] duration-300 ease-soft ${scrolled ? "shadow-soft" : ""} ${mounted ? "opacity-100" : "opacity-0"}`}
        style={{ transition: "opacity 500ms ease, box-shadow 300ms ease" }}
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
                className="pl-10 h-10 bg-background/70 border-border focus-visible:ring-primary/30"
                aria-label="Search destinations"
              />
            </div>
            {showSuggest && suggestions.length > 0 && (
              <div className="absolute top-full mt-2 inset-x-0 bg-popover border border-border rounded-md shadow-lift overflow-hidden z-50 fade-up">
                {suggestions.map(d => (
                  <button
                    key={d.slug}
                    onMouseDown={() => navigate(`/destination/${d.slug}`)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-accent/50 transition-colors"
                  >
                    <MapPin className="size-4 text-primary shrink-0" />
                    <span className="font-medium">{d.place}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{d.state}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <nav className="ml-auto flex items-center gap-2">
            <Link to="/itinerary" className="hidden sm:inline-flex text-sm text-foreground/80 hover:text-foreground px-3 py-2 rounded-md transition-colors">
              My Itineraries
            </Link>
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
                <Button variant="ghost" size="sm" onClick={() => { setAuthMode("signin"); setAuthOpen(true); }}>
                  Login
                </Button>
                <Button size="sm" onClick={() => { setAuthMode("signup"); setAuthOpen(true); }} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Sign Up
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} initialMode={authMode} />
    </>
  );
}
