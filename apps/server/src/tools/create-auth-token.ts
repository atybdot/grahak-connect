import { tool } from "ai";
import { z } from "zod";

export const generateAuthToken = tool({
	description:
		"generate auth token which will be used by other tools to perform queries on behlf pf the user. this token is necessary to  perform any action. this tool should must run fist before any other tool. it is of highest priority\nsave the result of this tool so that you dont have to call it every time to need to perform action. As soon as you get the auth token back move to another tool do not stuck in loop back hell",
	parameters: z.object({
		email: z
			.string()
			.min(1)
			.describe("userId of a user on which order is to be placed"),
		password: z.string().min(1).describe("order id to identify unique order"),
	}),
	execute: async (props) => {
		const rawRes = await fetch("http://localhost:3000/token", {
			method: "POST",
			body: JSON.stringify({ email: props.email, password: props.password }),
		});
		const res = await rawRes.json();
		return res["auth-token"];
	},
});
