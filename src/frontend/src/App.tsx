import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EliteCarCare from "./pages/EliteCarCare";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EliteCarCare />
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
