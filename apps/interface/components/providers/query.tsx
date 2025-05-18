import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
const queryClient = new QueryClient();

export function QueryProvider({
	children,
}: { children: Readonly<React.ReactNode> }) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
