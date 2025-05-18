import { tool } from "ai";
import { z } from "zod";

export const getSpecificOrder = tool({
  description: "get detail of a specific order",
  parameters: z.object({
    orderId: z.string().min(1).describe("order id to identify unique order"),
    authToken: z
      .string()
      .max(1)
      .describe(
        "This is an auth token that is used in X-Authorization headers to perform operation on behalf of the user"
      ),
  }),
  execute: async ({ authToken, orderId }) => {
    try {
      const rawRes = await fetch(`http://localhost:3000/db/order/${orderId}`, {
        method: "GET",
        headers: {
          "X-Authorization": authToken,
        },
      });
      const res = await rawRes.json();
      return res;
    } catch (error) {
      return { error, message: "unable to get the details of the order" };
    }
  },
});
