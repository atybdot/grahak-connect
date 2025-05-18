import { tool } from "ai";
import { z } from "zod";

export const cancelOrder = tool({
  description: "cancel order on behalf of a user",
  parameters: z.object({
    userId: z
      .string()
      .min(1)
      .describe("userId of a user,this is used to uniquely identify a user"),
    orderId: z.string().min(1).describe("order id to identify unique order"),
    authToken: z
      .string()
      .max(1)
      .describe(
        "This is an auth token that is used in X-Authorization headers to perform operation on behalf of the user"
      ),
  }),
  execute: async ({ userId, orderId, authToken }) => {
    const rawRes = await fetch("http://localhost:3000/db/cancel", {
      method: "POST",
      body: JSON.stringify({ userId, orderId }),
      headers: {
        "X-Authorization": authToken,
      },
    });
    const res = await rawRes.json();
    return res;
  },
});
