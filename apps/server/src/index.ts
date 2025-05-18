import "dotenv/config";
import { serve } from "@hono/node-server";
import { generateText, streamText } from "ai";
import axios from "axios";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { stream } from "hono/streaming";
import { cancelOrder } from "./tools/cancel-order";
import { generateAuthToken } from "./tools/create-auth-token";
import { getOrderList } from "./tools/get-order-list";
import { getSpecificOrder } from "./tools/get-specific-order";
import { getUserInfo } from "./tools/get-user-info";
import { placeOrder } from "./tools/place-order";
import { Gemni } from "./utils/Gemni";
import { eComm, foodComp } from "./utils/envoirments";

const app = new Hono();

app.use(logger());

app.use(
	"/*",
	cors({
		origin: "*",
		allowMethods: ["GET", "POST", "OPTIONS"],
	}),
);
app.get("/get-orders", async (c) => {
	const res = await fetch("http://localhost:3000/db/orders", {
		method: "GET",
		headers: {
			"X-Authorization":
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE4MGRiODg3LTVmMWItNGVmMy1hYmM1LTU2MzE2ZjA0MjVhNSIsIm5hbWUiOiJDaGFuZHJhIER1dHRhIn0.YXOQKuhB2ajS7FL3gbJpq_HU2nmjlKgvngFOhlnVyxo",
		},
	});
	const rj = await res.json();
	return c.json(rj);
});
app.on("GET", ["/food", "/e-com"], async (c) => {
	// const prompt = c.req.query("q") ?? "";
	// if (!prompt || prompt === "") {
	// 	return c.json({ message: "prompt query is required", status: 402 });
	// }
	const envoirment = c.req.path === "food" ? foodComp : eComm;

	const result = await generateText({
		model: Gemni("gemini-2.5-flash-preview-04-17"),
		system: `
  	You are a customer support agent for a large organization, which provides services or products to users through its digital platforms (such as a website or mobile app).
    here are more details about the company:
    ${envoirment}
  	Your task is to first evaluate the user's prompt.
    you know the envoirment and prompt now decide weather it is related to the envoirment or user is just spamming or asking random question.
    if so then return what you can do and cannot do.
  	You are not even allowed to reply basic or simple questions if they are not related to provided envoirment
  	If you eavluate the prompt to be safe, proceed to respond to the user's query.
  	otherwise respond that you are not allowed to answer random questions and inform the user about what you can and cannot do in this specific scenario.

  	make your response as humanly as possible.

  	suppose when user asked you to fetch his/her's order history, now do not respont with something like here is your order list, make your response like two humans are talking.
  	like here is your order history, on XYZ date you place ABC order or price pqz. which currently is in transit or delivered.

  	when user asked to perform some dangerous action such as canceling their order, ask it twice to confirm that they really want to perform this destructive operation rather than going and executing it directly.

  	Additionally, always respond to the user in the same language in which the query was asked, or in the user's native language, if identifiable.
    User may ask you to place order on their behalf or they may  ask you to cancel order on their behalf.
    Do not call same tools multiple times.
    `,
		prompt:
			"hi there my email is Rajan_Sinha@yahoo.co.in and my password is Sp1Do,can you fetch my info?",
		tools: {
			generateAuthToken,
			getUserInfo,
			getOrderList,
			// getSpecificOrder,
			// placeOrder,
			// cancelOrder,
		},
		maxSteps: 5,
	});

	return c.json(result.text);
});

app.post("/ai", async (c) => {
	const { messages } = await c.req.json();

	const streamRes = await generateText({
		model: Gemni("gemini-1.5-flash"),
		system: "respond with whatever user asked in a hilarious fashion",
		messages,
	});
	return c.json(streamRes);
});

serve(
	{
		fetch: app.fetch,
		port: 3002,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
