"use client";

import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Next13ProgressBar } from "next13-progressbar";

interface LayoutProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const Providers: FC<LayoutProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        {children}
        <Next13ProgressBar
          height="2px"
          color="#000"
          options={{ showSpinner: false }}
          showOnShallow
        />
      </>
    </QueryClientProvider>
  );
};

export default Providers;
