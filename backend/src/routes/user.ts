import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@mayankbhagyawani/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { username, password, name } = body;
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { success } = signupInput.safeParse({ username, password, name });

  if (!success) {
    c.status(411);
    return c.text("Invalid input");
  }

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password,
        name,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.text(jwt);
  } catch (err) {
    console.error(err);
    c.status(411);
    return c.text("User already exists");
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { username, password, name } = body;
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const parsedBody = signinInput.safeParse({ username, password, name });

  if (parsedBody.success) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username,
          password,
        },
      });

      if (!user) {
        c.status(403);
        return c.text("Invalid - Unauthorized");
      }

      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

      return c.text(jwt);
    } catch (err) {
      console.error(err);
      c.status(411);
      return c.text("User already exists");
    }
  }
});
