import { tool } from "ai";
import { z } from "zod";

export const getUserInfo = tool({
	description:
		"this tool return an object that contains all the data/info related to a user such as their name,email, password,orders etc...",
	parameters: z.object({
		authToken: z
			.string()
			.min(1)
			.describe(
				"This is an auth token that is used in X-Authorization headers to perform operation on behalf of the user",
			),
	}),
	execute: async (props) => {
		try {
			const rawRes = await fetch("http://localhost:3000/db/me", {
				method: "GET",
				headers: {
					"X-Authorization": props.authToken,
				},
			});
			const res = await rawRes.json();
			return res;
		} catch (error) {
			return { error, message: "unable get user details" };
		}
	},
});
