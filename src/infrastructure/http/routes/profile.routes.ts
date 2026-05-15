import { Router } from "express";
import { container } from "tsyringe";
import { ProfileController } from "../controllers/profile.controller";
import { createApi } from "../../../utils/helpers/createApi";

export const profileRoutes = Router();

const controller = container.resolve(ProfileController);
const tagName = "Profile";

createApi(profileRoutes, {
  method: "post",
  path: "/",
  fullPath: "/profile",
  summary: "Criar perfil",
  tags: [tagName],
  controller: controller.create.bind(controller),
});
