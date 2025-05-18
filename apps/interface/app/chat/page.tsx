"use client";
import type { Metadata } from "next";

import { session as sessionAtom } from "@/atoms/session";
import { AppSidebar } from "@/components/app-sidebar";
import Chat from "@/components/chat";
import {
	SettingsPanel,
	SettingsPanelProvider,
} from "@/components/settings-panel";
import { Button } from "@/components/ui/button";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import UserDropdown from "@/components/user-dropdown";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const [session, setSession] = useAtom(sessionAtom);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	useEffect(() => {
		if (!session || session?.token === "") {
			router.replace("/login");
		}
		if (session) {
			setLoading(false)
		}
	}, []);
	if (loading) {
		return (
			<div>
				<Skeleton className="h-full w-full" />
			</div>
		);
	}
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="group/sidebar-inset bg-sidebar">
				<header className="dark before:-left-px relative flex h-16 shrink-0 items-center gap-2 bg-sidebar px-4 text-sidebar-foreground before:absolute before:inset-y-3 before:z-50 before:w-px before:bg-gradient-to-b before:from-white/5 before:via-white/15 before:to-white/5 md:px-6 lg:px-8">
					<SidebarTrigger className="-ms-2" />
					<div className="ml-auto flex items-center gap-8">
						{!session || session.token === "" ? (
							<Button
								onClick={() => {
									router.push("/login");
								}}
							>
								Login
							</Button>
						) : (
							<UserDropdown />
						)}
					</div>
				</header>
				<SettingsPanelProvider>
					<div className="flex h-[calc(100svh-4rem)] bg-[hsl(240_5%_92.16%)] transition-all duration-300 ease-in-out md:rounded-s-3xl md:group-peer-data-[state=collapsed]/sidebar-inset:rounded-s-none">
						<Chat />
					</div>
				</SettingsPanelProvider>
			</SidebarInset>
		</SidebarProvider>
	);
}
