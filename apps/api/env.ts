import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		GOOGLE_API: z.string().min(1),
		DIRECT_URL: z.string().min(1),
		DATABASE_URL: z.string().min(1),
		JWT_SEC: z.string().min(1),
	},

	clientPrefix: "PUBLIC_",
	client: {},
	runtimeEnv: process.env,
});
