import { Router } from "express";
import { schoolRoutes } from "./schools.routes";
import { usersRoutes } from "./users.routes";
import { profileRoutes } from "./profile.routes";
import { loginRoutes } from "./login.routes";
import { periodRoutes } from "./period.routes";
import { studentsRoutes } from "./student.routes";
import { classStudents } from "./classStudent.routes";
import { classPeriod } from "./classPeriod.routes";
import { teste } from "./teste.routes";

export const routes = Router();

routes.get("/", (_req, res) => res.send("OK"));
routes.use("/escola", schoolRoutes);
routes.use("/user", usersRoutes);
routes.use("/profile", profileRoutes);
routes.use("/login", loginRoutes);
routes.use("/periodo", periodRoutes);
routes.use("/student", studentsRoutes);
routes.use("/class", classStudents);
routes.use("/classPeriod", classPeriod);

routes.use("/teste", teste);
