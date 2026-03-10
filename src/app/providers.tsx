'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Header from "@/components/Header/Header";

function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Header online={true} />
      {children}
    </Providers>
  );
}
