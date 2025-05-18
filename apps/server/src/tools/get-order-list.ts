import { tool } from "ai";
import axios from "axios";
import { z } from "zod";

export const getOrderList = tool({
	description: "fetch a list of orders of a user",
	parameters: z.object({
		authToken: z
			.string()
			.min(1)
			.describe(
				"This is an auth token that is used in X-Authorization headers to perform operation on behalf of the user",
			),
	}),
	execute: async ({ authToken }) => {
		const orderListRaw = await fetch("http://localhost:3000/db/orders", {
			method: "GET",
			headers: {
				"X-Authorization": authToken,
			},
		});
		const orderList = await orderListRaw.json();
		return orderList;
	},
});
