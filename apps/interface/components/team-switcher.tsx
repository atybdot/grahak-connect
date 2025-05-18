"use client";

import * as React from "react";

import { orgActiveAtom } from "@/atoms/org";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { RiAddLine, RiExpandUpDownLine } from "@remixicon/react";
import { useAtom } from "jotai";

export function TeamSwitcher({
	teams,
}: {
	teams: {
		name: "somato" | "blipkart";
		logo: string;
		style: string;
	}[];
}) {
	const [activeTeam, setActiveTeam] = useAtom(orgActiveAtom);

	if (!teams.length) return null;

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="gap-3 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground [&>svg]:size-auto"
						>
							<div
								className={cn(
									"relative flex aspect-square size-9 items-center justify-center overflow-hidden rounded-md text-sidebar-primary-foreground after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[0_1px_2px_0_rgb(0_0_0/.05),inset_0_1px_0_0_rgb(255_255_255/.12)]",
									activeTeam?.style,
								)}
							/>

							<div className="grid flex-1 text-left text-base leading-tight">
								<span className="truncate font-medium">
									{activeTeam?.name ?? "Select a Team"}
								</span>
							</div>
							<RiExpandUpDownLine
								className="ms-auto text-sidebar-foreground/50"
								size={20}
								aria-hidden="true"
							/>
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="dark w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-md"
						align="start"
						side="bottom"
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-muted-foreground/70 text-xs uppercase">
							Teams
						</DropdownMenuLabel>
						{teams.map((team, index) => (
							<DropdownMenuItem
								key={team.name}
								onClick={() =>
									setActiveTeam({
										name: team.name,
										env: team.name === "blipkart" ? "eCom" : "food",
										style:
											team.name === "blipkart"
												? "bg-yellow-500"
												: "bg-rose-500",
									})
								}
								className="gap-2 p-2"
							>
								<div className="flex size-6 items-center justify-center overflow-hidden rounded-md">
									<div
										className={cn(
											"h-9 w-9",
											index === 0 ? "bg-rose-600" : "bg-yellow-500",
										)}
									/>
								</div>
								{team.name}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
