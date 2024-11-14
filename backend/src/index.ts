import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// app.use("/*", cors());

// Configure CORS
app.use("/*", cors({
  origin: '*', // Change this to your frontend URL in production
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
