import { Router } from "express";
import { schoolRoutes } from "./schools.routes";
import { usersRoutes } from "./users.routes";
import { profileRoutes } from "./profile.routes";
import { loginRoutes } from "./login.routes";

export const routes = Router();

routes.get("/", (_req, res) => res.send("OK"));
routes.use("/escola", schoolRoutes);
routes.use("/user", usersRoutes);
routes.use("/profile", profileRoutes);
routes.use("/login", loginRoutes);
