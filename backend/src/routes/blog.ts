import {
  createBlogInput,
  updateBlogInput,
} from "@mayankbhagyawani/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: { userId: string };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization");
  try {
    const user = await verify(authHeader ?? "", c.env.JWT_SECRET);
    if (user && user.id) {
      c.set("userId", user.id as string);
      await next();
    } else {
      c.status(403);
      return c.json({ message: "Invalid authorization" });
    }
  } catch (error) {
    c.status(403);
    return c.json({ message: "Unauthorized" });
  }
});

// Todo: add pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
    select: {
      id: true,
      authorId: true,
      content: true,
      title: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({ blogs });
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { title, content } = body;
  const { success } = createBlogInput.safeParse({ title, content });
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  if (!success) {
    c.status(411);
    return c.text("Invalid input");
  }

  const blog = await prisma.blog.create({
    data: {
      title: title,
      content: content,
      authorId: Number(authorId),
    },
  });

  return c.json({ id: blog.id });
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: { id: Number(id) },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ blog });
  } catch (error) {
    return c.json({ error });
  }
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { title, content, id } = body;
  const { success } = updateBlogInput.safeParse({ title, content, id });

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  if (!success) {
    c.status(411);
    return c.text("Invalid input");
  }

  const blog = await prisma.blog.update({
    where: { id: id },
    data: {
      title: title,
      content: content,
    },
  });

  return c.json({ id: blog.id });
});
