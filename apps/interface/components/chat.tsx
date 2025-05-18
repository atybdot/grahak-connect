"use client";

import { historyAtom } from "@/atoms/chatHisotry";
import { session } from "@/atoms/session";
import { ChatMessage } from "@/components/chat-message";
import { SettingsPanelTrigger } from "@/components/settings-panel";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@ai-sdk/react";
import {
	RiAttachment2,
	RiCodeSSlashLine,
	RiLeafLine,
	RiMicLine,
	RiShareCircleLine,
	RiShareLine,
	RiShining2Line,
} from "@remixicon/react";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef } from "react";

export default function Chat() {
	const sessionValue = useAtomValue(session);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const { messages, input, handleInputChange, handleSubmit } = useChat({
		api: "http://localhost:3002/food",
		headers: {
			"X-Authorization": sessionValue?.token ?? "",
		},
	});

	const [history, setHistory] = useAtom(historyAtom);
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView();
		// setHistory(messages);
		console.log(messages);
	}, [messages, history]);

	return (
		<ScrollArea className="w-full flex-1 bg-background shadow-md md:rounded-s-[inherit] min-[1024px]:rounded-e-3xl [&>div>div]:h-full">
			<div className="flex h-full flex-col px-4 md:px-6 lg:px-8">
				{/* Header */}
				<div className="sticky top-0 z-10 bg-background py-5 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-gradient-to-r before:from-black/[0.06] before:via-black/10 before:to-black/[0.06]">
					<div className="flex items-center justify-between gap-2">
						<Breadcrumb>
							<BreadcrumbList className="sm:gap-1.5">
								<BreadcrumbItem>
									<BreadcrumbLink href="/">Home</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage>Chat</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</div>
				{/* Chat */}
				{!(messages.length > 0) ? (
					<div className="relative min-h-96 grow">
						<div className="my-8 text-center">
							<div className="inline-flex items-center rounded-full border border-black/[0.08] bg-white px-3 py-1 font-medium text-foreground/80 text-xs opacity-0 shadow-xs" />
						</div>
						<p className="text-center text-4xl">What's Bugging you?</p>
					</div>
				) : (
					<div className="relative grow">
						<div className="mx-auto mt-6 max-w-3xl space-y-6">
							<div className="my-8 text-center">
								<div className="inline-flex items-center rounded-full border border-black/[0.08] bg-white px-3 py-1 font-medium text-foreground/80 text-xs opacity-0 shadow-xs" />
							</div>
							{messages.map((txt) => {
								return (
									<div key={txt.id}>
										{txt.role === "user" ? (
											<ChatMessage isUser>
												{txt.parts.map((part, i) => {
													switch (part.type) {
														case "text":
															return <p key={`${txt.id}-${i}`}>{part.text}</p>;
													}
												})}
											</ChatMessage>
										) : (
											<ChatMessage>
												{txt.parts.map((part, i) => {
													switch (part.type) {
														case "text":
															return <p key={`${txt.id}-${i}`}>{part.text}</p>;
													}
												})}
											</ChatMessage>
										)}
									</div>
								);
							})}
							<div ref={messagesEndRef} aria-hidden="true" />
						</div>
					</div>
				)}

				{/* Footer */}
				<form
					onSubmit={handleSubmit}
					className="sticky bottom-0 z-50 pt-4 md:pt-8"
				>
					<div className="mx-auto max-w-3xl rounded-[20px] bg-background pb-4 md:pb-8">
						<div className="relative rounded-[20px] border border-transparent bg-muted transition-colors focus-within:border-input focus-within:bg-muted/50 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 [&:has(input:is(:disabled))_*]:pointer-events-none">
							<input
								value={input}
								onChange={handleInputChange}
								className="flex w-full bg-transparent px-4 py-3 text-[15px] text-foreground leading-relaxed [resize:none] placeholder:text-muted-foreground/70 focus-visible:outline-none sm:min-h-[84px]"
								placeholder="Ask me anything..."
								aria-label="Enter your prompt"
							/>
							{/* Textarea buttons */}
							<div className="flex items-center justify-between gap-2 p-3">
								{/* Left buttons */}
								<div className="flex items-center gap-2">
									<Button
										variant="outline"
										size="icon"
										className="size-8 rounded-full border-none transition-[box-shadow] hover:bg-background hover:shadow-md"
									>
										<RiAttachment2
											className="size-5 text-muted-foreground/70"
											size={20}
											aria-hidden="true"
										/>
										<span className="sr-only">Attach</span>
									</Button>
									<Button
										variant="outline"
										size="icon"
										className="size-8 rounded-full border-none transition-[box-shadow] hover:bg-background hover:shadow-md"
									>
										<RiMicLine
											className="size-5 text-muted-foreground/70"
											size={20}
											aria-hidden="true"
										/>
										<span className="sr-only">Audio</span>
									</Button>
								</div>
								{/* Right buttons */}
								<div className="flex items-center gap-2">
									<Button type="submit" className="h-8 rounded-full">
										SEND
									</Button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</ScrollArea>
	);
}
