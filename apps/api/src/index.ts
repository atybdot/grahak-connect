import "dotenv/config";
import { serve } from "@hono/node-server";
import { env } from "env";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { jwt, sign } from "hono/jwt";
import { logger } from "hono/logger";
import prisma from "prisma";
import type { User } from "prisma/generated";
import { app as dbRouter } from "./routers/db/index";

const app = new Hono();

app.use(logger());

app.use(
	"/*",
	cors({
		origin: process.env.CORS_ORIGIN || "",
		allowMethods: ["GET", "POST", "OPTIONS"],
	}),
);

app.get("/", (c) => {
	return c.text("OK");
});

app.post("/token", async (c) => {
	const body: Pick<User, "email" | "password"> = await c.req.json();
	console.log(body);

	if (body.email === "" || body.password === "") {
		return c.json({ message: "missing inputs", status: 402 });
	}
	try {
		const user = await prisma.user.findUniqueOrThrow({
			where: {
				email: body.email,
				password: body.password,
			},
		});
		const token = await sign(
			{ id: user.id, name: user.firstName },
			env.JWT_SEC,
		);
		return c.json({
			"auth-token": token,
			message: "Please store it in some where safe",
		});
	} catch (error) {
		return c.json({
			message: "unable to find user\nprovide proper details",
			status: 402,
			error,
		});
	}
});

app.get("/grahak-connect", async (c) => {});

app.route("/db", dbRouter);

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
