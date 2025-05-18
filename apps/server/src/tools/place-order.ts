import { tool } from "ai";
import { z } from "zod";

export const placeOrder = tool({
  description: "place order on behalf of a user",
  parameters: z.object({
    userId: z
      .string()
      .min(1)
      .describe("userId of a user on which order is to be placed"),
    orderId: z.string().min(1).describe("order id to identify unique order"),
    authToken: z
      .string()
      .max(1)
      .describe(
        "This is an auth token that is used in X-Authorization headers to perform operation on behalf of the user"
      ),
  }),
  execute: async ({ userId, orderId, authToken }) => {
    try {
      const rawRes = await fetch("http://localhost:3000/db/place", {
        method: "POST",
        body: JSON.stringify({ userId, orderId }),
        headers: {
          "X-Authorization": authToken,
        },
      });
      const res = await rawRes.json();
      return res;
    } catch (error) {
      return { error, message: "unable to place order" };
    }
  },
});
