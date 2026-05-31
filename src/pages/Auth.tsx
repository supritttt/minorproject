import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Auth() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    const res = mode === "signin" ? await signIn(email, password) : await signUp(email, password, name);
    setBusy(false);
    if (res.error) { toast.error(res.error); return; }
    if (mode === "signup") toast.success("Check your email to verify your account");
    else { toast.success("Welcome back"); navigate("/"); }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <Link to="/" className="mb-8"><Logo size={40} /></Link>
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-6 shadow-soft">
        <h1 className="font-display text-2xl mb-1">{mode === "signin" ? "Welcome back" : "Create account"}</h1>
        <p className="text-sm text-muted-foreground mb-5">{mode === "signin" ? "Log in to plan trips and join chats." : "Join HiddenTerra to save itineraries."}</p>
        <form onSubmit={submit} className="space-y-3">
          {mode === "signup" && (
            <div>
              <Label htmlFor="name">Display name</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
          </div>
          <Button type="submit" disabled={busy} className="w-full bg-primary hover:bg-primary/90">
            {busy && <Loader2 className="size-4 animate-spin mr-2" />} {mode === "signin" ? "Log in" : "Sign up"}
          </Button>
        </form>
        <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-sm text-muted-foreground hover:text-foreground mt-4 w-full text-center">
          {mode === "signin" ? "No account? Sign up" : "Have an account? Log in"}
        </button>
      </div>
    </div>
  );
}
