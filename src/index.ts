import { Hono } from "hono";
import bookmarksRoute from "./routes/bookmarks";
import commentsRoute from "./routes/comments";
import feedRoute from "./routes/feed";
import reactionsRoute from "./routes/reactions";
import reportsRoute from "./routes/reports";
import submissionsRoute from "./routes/submissions";
import authRoute from "./routes/auth";

const app = new Hono().basePath('/api');

app.route("/v1/auth", authRoute);
app.route("/v1/bookmarks", bookmarksRoute);
app.route("/v1/comments", commentsRoute);
app.route("/v1/feed", feedRoute);
app.route("/v1/reactions", reactionsRoute);
app.route("/v1/reports", reportsRoute);
app.route("/v1/submissions", submissionsRoute);

export default app;
