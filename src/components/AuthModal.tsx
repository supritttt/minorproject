import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "At least 6 characters").max(72),
});
const signUpSchema = signInSchema.extend({
  displayName: z.string().trim().min(2, "Name too short").max(60),
});

export function AuthModal({
  open, onOpenChange, initialMode = "signin",
}: { open: boolean; onOpenChange: (o: boolean) => void; initialMode?: "signin" | "signup" }) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  useEffect(() => { setMode(initialMode); }, [initialMode, open]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "signin") {
        const parsed = signInSchema.safeParse({ email, password });
        if (!parsed.success) {
          toast({ title: "Invalid input", description: parsed.error.issues[0].message, variant: "destructive" });
          return;
        }
        const { error } = await signIn(parsed.data.email, parsed.data.password);
        if (error) toast({ title: "Sign in failed", description: error, variant: "destructive" });
        else { toast({ title: "Welcome back!" }); onOpenChange(false); }
      } else {
        const parsed = signUpSchema.safeParse({ email, password, displayName });
        if (!parsed.success) {
          toast({ title: "Invalid input", description: parsed.error.issues[0].message, variant: "destructive" });
          return;
        }
        const { error } = await signUp(parsed.data.email, parsed.data.password, parsed.data.displayName);
        if (error) toast({ title: "Sign up failed", description: error, variant: "destructive" });
        else { toast({ title: "Welcome to HiddenTerra!", description: "You're signed in." }); onOpenChange(false); }
      }
    } finally { setSubmitting(false); }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </DialogTitle>
          <DialogDescription>
            {mode === "signin" ? "Sign in to plan trips, leave reviews, and join community chats." : "Join HiddenTerra to unlock reviews, itineraries and chat."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-1.5">
              <Label htmlFor="dn">Display name</Label>
              <Input id="dn" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Aanya Kapoor" autoComplete="name" />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="em">Email</Label>
            <Input id="em" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pw">Password</Label>
            <Input id="pw" type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete={mode === "signin" ? "current-password" : "new-password"} />
          </div>
          <Button type="submit" disabled={submitting} className="w-full bg-primary hover:bg-primary/90">
            {submitting ? "Please wait…" : (mode === "signin" ? "Sign in" : "Create account")}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            {mode === "signin" ? "New here? " : "Already have an account? "}
            <button type="button" className="text-primary hover:underline" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
              {mode === "signin" ? "Create account" : "Sign in"}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
