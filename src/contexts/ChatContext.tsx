import { createContext, useContext, useState, type ReactNode } from "react";

type ChatCtx = {
  destinationContext: string | undefined;
  setDestinationContext: (ctx: string | undefined) => void;
};

const Ctx = createContext<ChatCtx | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [destinationContext, setDestinationContext] = useState<string | undefined>(undefined);
  return (
    <Ctx.Provider value={{ destinationContext, setDestinationContext }}>
      {children}
    </Ctx.Provider>
  );
}

export function useChatContext() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useChatContext must be inside ChatProvider");
  return c;
}
