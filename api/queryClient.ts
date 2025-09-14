import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 20 // 20 seconds - 20 seconds after the data is fetched, the data is considered stale
    },
    mutations: {
      retry: false
    }
  }
});

export default queryClient;
