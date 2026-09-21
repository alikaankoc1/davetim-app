"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultInvitation,
  makeSlug,
  type InvitationData,
} from "@/lib/invitation";

type InvitationContextValue = {
  data: InvitationData;
  slug: string;
  update: (patch: Partial<InvitationData>) => void;
  reset: () => void;
};

const InvitationContext = createContext<InvitationContextValue | null>(null);

export function InvitationProvider({
  children,
  initial,
}: {
  children: ReactNode;
  initial?: Partial<InvitationData>;
}) {
  const [data, setData] = useState<InvitationData>({
    ...defaultInvitation,
    ...initial,
  });

  const update = useCallback((patch: Partial<InvitationData>) => {
    setData((current) => ({ ...current, ...patch }));
  }, []);

  const reset = useCallback(() => {
    setData({ ...defaultInvitation, ...initial });
  }, [initial]);

  const slug = useMemo(
    () => makeSlug(data.hostA, data.hostB),
    [data.hostA, data.hostB]
  );

  const value = useMemo(
    () => ({ data, slug, update, reset }),
    [data, slug, update, reset]
  );

  return (
    <InvitationContext.Provider value={value}>
      {children}
    </InvitationContext.Provider>
  );
}

export function useInvitation() {
  const context = useContext(InvitationContext);
  if (!context) {
    throw new Error("useInvitation must be used within InvitationProvider");
  }
  return context;
}
