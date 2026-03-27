import { Router } from "express";
import { container } from "tsyringe";
import { MediaController } from "../controllers/media.controller";
import { createApi } from "../../../utils/helpers/createApi";
import {
  createMediaSchema,
  deleteMediaSchema,
  getOneMediaSchema,
  updateMediaSchema,
} from "../validators/media.validator";

export const mediaRoutes = Router();

const controller = container.resolve(MediaController);
const tagName = "Medias";

createApi(mediaRoutes, {
  method: "post",
  path: "/",
  fullPath: "/media",
  summary: "Cria a média da escola",
  body: createMediaSchema,
  tags: [tagName],
  controller: controller.create.bind(controller),
});

createApi(mediaRoutes, {
  method: "get",
  path: "/",
  fullPath: "/media",
  summary: "Busca todas as médias disponíveis",
  tags: [tagName],
  controller: controller.getAll.bind(controller),
});

createApi(mediaRoutes, {
  method: "get",
  path: "/:uuid",
  fullPath: "/media/:uuid",
  summary: "Buisca a média com base no uuid",
  body: getOneMediaSchema,
  tags: [tagName],
  controller: controller.getOne.bind(controller),
});

createApi(mediaRoutes, {
  method: "put",
  path: "/:uuid",
  fullPath: "/media/:uuid",
  summary: "Atualiza a média escola",
  body: updateMediaSchema.body,
  params: updateMediaSchema.params,
  tags: [tagName],
  controller: controller.update.bind(controller),
});

createApi(mediaRoutes, {
  method: "delete",
  path: "/:uuid",
  fullPath: "/delete/:uuid",
  summary: "Deletar média",
  body: deleteMediaSchema,
  tags: [tagName],
  controller: controller.delete.bind(controller),
});
