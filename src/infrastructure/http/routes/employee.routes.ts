import { Router } from "express";
import { container } from "tsyringe";
import { EmployeeController } from "../controllers/employee.controller";
import { createApi } from "../../../utils/helpers/createApi";
import { getOneDisciplineSchema } from "../validators/discipline.validator";
import {
  createEmployeeSchema,
  deleteEmployeeSchema,
  updateStatusEmployeeSchema,
} from "../validators/employee.validator";
import { updateSchoolSchema } from "../validators/school.validator";

export const employeeRoutes = Router();

const controller = container.resolve(EmployeeController);
const tagName = "Employee";

createApi(employeeRoutes, {
  controller: controller.getAll.bind(controller),
  method: "get",
  path: "/",
  fullPath: "/employee",
  summary: "Busca todos os funcionários",
  tags: [tagName],
});

createApi(employeeRoutes, {
  controller: controller.create.bind(controller),
  method: "post",
  path: "/",
  fullPath: "/employee",
  summary: "Cria um novo funcionário",
  tags: [tagName],
  body: createEmployeeSchema,
});

createApi(employeeRoutes, {
  controller: controller.updateStatus.bind(controller),
  method: "put",
  path: "/status/:uuid",
  fullPath: "/employee/status/:uuid",
  summary: "Atualiza o status de um funcionário",
  tags: [tagName],
  body: updateStatusEmployeeSchema.body,
  params: updateStatusEmployeeSchema.params,
});

createApi(employeeRoutes, {
  controller: controller.update.bind(controller),
  method: "put",
  path: "/:uuid",
  fullPath: "/employee/:uuid",
  summary: "Atualiza um funcionário",
  tags: [tagName],
  params: updateSchoolSchema.params,
  body: updateSchoolSchema.body,
});

createApi(employeeRoutes, {
  controller: controller.getAll.bind(controller),
  method: "get",
  path: "/:uuid",
  fullPath: "/employee/:uuid",
  summary: "Busca um funcionário",
  tags: [tagName],
  params: getOneDisciplineSchema,
});

createApi(employeeRoutes, {
  controller: controller.delete.bind(controller),
  method: "delete",
  path: "/:uuid",
  fullPath: "/employee/:uuid",
  summary: "Remove um funcionário",
  tags: [tagName],
  params: deleteEmployeeSchema,
});
