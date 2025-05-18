import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {},

	clientPrefix: "PUBLIC_",
	client: {},
	runtimeEnv: process.env,
});
