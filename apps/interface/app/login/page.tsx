"use client";
import { session } from "@/atoms/session";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
	email: z.string(),
	password: z.string().min(1),
});

export default function MyForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const setSession = useSetAtom(session);
	const router = useRouter();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const r = await new Promise((resolve) => {
			fetch("http://localhost:3000/token", {
				method: "POST",
				body: JSON.stringify({
					email: values.email,
					password: values.password,
				}),
			})
				.then(async (res) => {
					const data = await res.json();
					setSession({ token: res["auth-token"], email: values.email });
				})
				.finally(() => {
					resolve("session set");
					router.replace("/chat");
				});
		});
	}

	return (
		<section className="m-auto flex h-screen max-w-3xl flex-col items-center justify-center">
			<div>
				<p className="font-mono text-xl">Login</p>
				<h1 className="font-bold text-3xl">Grahak Connect</h1>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mx-auto max-w-4xl space-y-4 py-10"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>email</FormLabel>
								<FormControl>
									<Input
										placeholder="example@gmail.com"
										type="email"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>password</FormLabel>
								<FormControl>
									<Input placeholder="password" type="text" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</section>
	);
}
