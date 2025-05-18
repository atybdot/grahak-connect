import { session as sessionAtom } from "@/atoms/session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	RiFindReplaceLine,
	RiLogoutCircleLine,
	RiPulseLine,
	RiTimer2Line,
	RiUserLine,
} from "@remixicon/react";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function UserDropdown() {
	const router = useRouter();
	const [session, setSession] = useAtom(sessionAtom);
	const [email, setEmail] = useState<string>();
	const [pass, setPass] = useState<string>();
	const [show, setShow] = useState<boolean>();
	const [loading, setLoading] = useState<boolean>();
	if (session?.userId === "") {
		return (
			<>
				<Dialog open={show} onOpenChange={setShow}>
					<DialogContent>
						<section>
							<div>
								<Label>Email</Label>
								<Input
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									type="email"
								/>
							</div>
							<div>
								<Label>password</Label>
								<Input
									value={pass}
									onChange={(e) => setPass(e.target.value)}
									type="password"
								/>
							</div>
							<Button
								onClick={async () => {
									setLoading(true);
									const sessionRaw = await fetch("http://localhost:3000", {
										method: "POST",
										body: JSON.stringify({
											email,
											pass,
										}),
									});
									const session = await sessionRaw.json();
									setSession(session);
									setLoading(false);
								}}
							>
								{loading ? "loading..." : "Login"}
							</Button>
						</section>
					</DialogContent>
				</Dialog>
				<Button size={"sm"} onClick={() => setShow(true)}>
					Log In
				</Button>
			</>
		);
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
					<Avatar className="size-8">
						<AvatarImage
							src="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp2/user-02_mlqqqt.png"
							width={32}
							height={32}
							alt="Profile image"
						/>
						<AvatarFallback>KK</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-w-64 p-2" align="end">
				<DropdownMenuLabel className="mb-2 flex min-w-0 flex-col px-1 py-0">
					<span className="mb-0.5 truncate font-medium text-foreground text-sm">
						Mary P.
					</span>
					<span className="truncate font-normal text-muted-foreground text-xs">
						mary@askdigital.com
					</span>
				</DropdownMenuLabel>
				<DropdownMenuItem className="gap-3 px-1">
					<Button
						asChild
						onClick={() => {
							router.redirect("/");
							setSession(null);
						}}
					>
						<RiLogoutCircleLine
							size={20}
							className="text-muted-foreground/70"
							aria-hidden="true"
						/>
						<span>Log out</span>
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
