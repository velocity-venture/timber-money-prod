// Implementation based on blueprint: javascript_log_in_with_replit
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";

export function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: false,
    // Add timeout for faster failure in static deployments
    gcTime: 0, // Don't cache failed requests
    refetchOnMount: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
