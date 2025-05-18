import { faker } from "@faker-js/faker/locale/en_IN";
import { env } from "env";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import prisma from "prisma";
import type { Order } from "prisma/generated";

export const app = new Hono<{
  Variables: {
    userId: string;
  };
}>();

app.use("*", async (c, next) => {
  const authToken = c.req.header("X-Authorization");
  if (!authToken || authToken.length <= 0) {
    return c.json(
      { message: "missing auth token", status: 400 },
      { status: 400 }
    );
  }
  try {
    const v = await verify(authToken, env.JWT_SEC);
    if (v.id) {
      //@ts-expect-error
      c.set("userId", v.id);
    }
    await next();
  } catch (error) {
    return c.json(
      {
        message: "wrong auth token",
        status: 400,
      },
      { status: 400 }
    );
  }
});

app.get("/check", async (c) => {
  return c.text("OK");
});

app.get("/me", async (c) => {
  const userId = c.var.userId;
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        orders: true,
        issuesRaised: true,
      },
    });
    return c.json(user);
  } catch (error) {
    return c.json(
      { message: "unable to find user", status: 404, error },
      { status: 400 }
    );
  }
});

app.get("/orders", async (c) => {
  const limit = Number.parseInt(c.req.query("q") ?? "1", 10);
  try {
    const orders = await prisma.order.findMany({ take: limit });
    return c.json(orders);
  } catch (error) {
    return c.json(
      { message: "unable to find orders", status: 500 },
      { status: 500 }
    );
  }
});
app.post("/place", async (c) => {
  const userId = c.var.userId;
  const body: { orderId: string } = await c.req.json();
  try {
    const cloneItem = await prisma.order.findUniqueOrThrow({
      where: {
        id : body.orderId
      },
    });
    const placed = await prisma.order.create({
      data: {
        userId,
        price: cloneItem.price,
        currency: cloneItem.currency,
        deliveryStatus: cloneItem.deliveryStatus,
        title: cloneItem.title,
      },
    });
    return c.json(placed);
  } catch (error) {
    return c.json(
      {
        message: "unable to place order ",
        status: 500,
        errors: error,
      },
      { status: 500 }
    );
  }
});
app.post("/cancel", async (c) => {
  const orderId:string = await c.req.json();
  if (orderId === "") {
    return c.json(
      {
        message: "Bad Request\nmissing order id",
        status: 400,
      },
      { status: 400 }
    );
  }
  try {
    const t = await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        deliveryStatus: "CANCEL",
      },
    });
    return c.json(t);
  } catch (error) {
    return c.json(
      {
        message: "unable to delete id",
        status: 500,
        error,
      },
      { status: 500 }
    );
  }
});
app.get("/order/:id", async (c) => {
  const body: Pick<Order, "id"> = c.req.param();
  try {
    const t = await prisma.order.findUnique({
      where: {
        id: body.id,
      },
    });
    return c.json(t);
  } catch (error) {
    return c.json(
      {
        message: `unable to get order with id ${body.id}`,
        status: 500,
        error,
      },
      { status: 500 }
    );
  }
});
