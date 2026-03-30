import { NextFunction, Request, Response, Router } from "express";
import { z, ZodTypeAny } from "zod";
import { registry } from "../../main/swagger";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => unknown | Promise<unknown>;

type SwaggerRouteConfig = {
  method: HttpMethod;
  path: string;
  fullPath: string;
  summary: string;
  description?: string;
  tags?: string[];
  params?: z.ZodObject<z.ZodRawShape>;
  query?: z.ZodObject<z.ZodRawShape>;
  body?: ZodTypeAny;
  response?: ZodTypeAny;
  middlewares?: Middleware[];
  controller: (
    req: Request,
    res: Response,
    next?: NextFunction,
  ) => unknown | Promise<unknown>;
};

export function createApi(router: Router, config: SwaggerRouteConfig) {
  const {
    method,
    path,
    fullPath,
    summary,
    description,
    tags,
    params,
    query,
    body,
    response,
    middlewares = [],
    controller,
  } = config;

  router[method](
    path,
    ...middlewares,
    async (
      req: Request & { body: unknown },
      res: Response,
      next: NextFunction,
    ) => {
      try {
        if (params) {
          const parsedParams = params.safeParse(req.params);

          if (!parsedParams.success) {
            return res.status(400).json({
              message: "Parâmetros inválidos",
              errors: parsedParams.error.flatten(),
            });
          }

          req.params = parsedParams.data as Request["params"];
        }

        if (query) {
          const parsedQuery = query.safeParse(req.query);

          if (!parsedQuery.success) {
            return res.status(400).json({
              message: "Query inválida",
              errors: parsedQuery.error.flatten(),
            });
          }

          req.query = parsedQuery.data as Request["query"];
        }

        if (body) {
          const parsedBody = body.safeParse(req.body);

          if (!parsedBody.success) {
            return res.status(400).json({
              message: "Body inválido",
              errors: parsedBody.error.flatten(),
            });
          }

          req.body = parsedBody.data;
        }

        return await controller(req, res, next);
      } catch (error) {
        return next(error);
      }
    },
  );

  registry.registerPath({
    method,
    path: expressPathToOpenApiPath(fullPath),
    tags,
    summary,
    description,
    request: {
      params,
      query,
      body: body
        ? {
            required: true,
            content: {
              "application/json": {
                schema: body,
              },
            },
          }
        : undefined,
    },
    responses: {
      200: response
        ? {
            description: "Sucesso",
            content: {
              "application/json": {
                schema: response,
              },
            },
          }
        : {
            description: "Sucesso",
          },
      201: response
        ? {
            description: "Criado com sucesso",
            content: {
              "application/json": {
                schema: response,
              },
            },
          }
        : {
            description: "Criado com sucesso",
          },
      400: {
        description: "Requisição inválida",
      },
      401: {
        description: "Não autenticado",
      },
      403: {
        description: "Sem permissão",
      },
    },
  });
}

function expressPathToOpenApiPath(path: string) {
  return path.replace(/:([a-zA-Z0-9_]+)/g, "{$1}");
}
