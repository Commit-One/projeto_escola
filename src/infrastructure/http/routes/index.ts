import { Router } from "express";
import { schoolRoutes } from "./schools.routes";
import { usersRoutes } from "./users.routes";
import { profileRoutes } from "./profile.routes";
import { loginRoutes } from "./login.routes";
import { periodRoutes } from "./period.routes";
import { studentsRoutes } from "./student.routes";
import { classStudentsRoutes } from "./classStudent.routes";
import { classPeriodRoutes } from "./classPeriod.routes";
import { teste } from "./_teste.routes";
import { disciplineRoutes } from "./discipline.routes";
import { studentDisciplineRoutes } from "./studentDiscipline.routes";

export const routes = Router();

routes.get("/", (_req, res) => res.send("OK"));
routes.use("/escola", schoolRoutes);
routes.use("/user", usersRoutes);
routes.use("/profile", profileRoutes);
routes.use("/login", loginRoutes);
routes.use("/periodo", periodRoutes);
routes.use("/student", studentsRoutes);
routes.use("/class", classStudentsRoutes);
routes.use("/classPeriod", classPeriodRoutes);
routes.use("/discipline", disciplineRoutes);
routes.use("/studentdiscipline", studentDisciplineRoutes);

routes.use("/teste", teste);
