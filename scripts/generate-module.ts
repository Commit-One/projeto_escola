import fs from "fs";
import path from "path";

const moduleName = process.argv[2];

if (!moduleName) {
  console.error("Informe o nome do módulo. Ex: yarn generate:module school");
  process.exit(1);
}

const pascalCase = (text: string) =>
  text
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

const camelCase = (text: string) => {
  const pascal = pascalCase(text);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

const upperSnakeCase = (text: string) =>
  text
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .replace(/__+/g, "_")
    .toUpperCase();

const tableCase = (text: string) =>
  text
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .replace(/__+/g, "_")
    .toLowerCase();

const name = {
  raw: camelCase(moduleName),
  pascal: pascalCase(moduleName),
  upper: upperSnakeCase(moduleName),
  table: tableCase(moduleName),
};

const basePath = path.resolve("src");
const enumPath = path.resolve("src/utils/enum/container.ts");
const containerIndexPath = path.resolve("src/main/container/index.ts");

const entityIdKey = `${name.raw}Id`;
const cacheEnumKey = `${name.upper}S`;

type FileDef = {
  filepath: string;
  content: string;
};

const files: FileDef[] = [
  {
    filepath: path.join(basePath, "application/dtos", `${name.raw}.dto.ts`),
    content: `export interface ${name.pascal}DTO {
  name: string;
}
`,
  },
  {
    filepath: path.join(basePath, "domain/entities", `${name.pascal}.ts`),
    content: `import { ValidationEmpty } from "../../utils/error";
import { IBaseProps } from "../contracts/IBaseProps";
import { Base } from "./Base";

export class ${name.pascal} extends Base {
  constructor(
    public name: string,
    baseProps?: IBaseProps,
  ) {
    super(baseProps);
    this.validate();
  }

  private validate() {
    if (!this.name) throw new ValidationEmpty("name");
  }
}
`,
  },
  {
    filepath: path.join(
      basePath,
      "domain/repositories",
      `I${name.pascal}Repository.ts`,
    ),
    content: `import { ${name.pascal}DTO } from "../../application/dtos/${name.raw}.dto";
import { ${name.pascal} } from "../entities/${name.pascal}";

export interface I${name.pascal}Repository {
  getOne(uuid: string): Promise<${name.pascal} | null>;
  delete(uuid: string): Promise<boolean>;
  getAll(): Promise<${name.pascal}[]>;
  create(data: ${name.pascal}DTO): Promise<${name.pascal}>;
  update(uuid: string, data: ${name.pascal}DTO): Promise<${name.pascal} | null>;
}
`,
  },
  {
    filepath: path.join(
      basePath,
      "application/use-cases",
      name.raw,
      "create.usecase.ts",
    ),
    content: `import { inject, injectable } from "tsyringe";
import { ${name.pascal} } from "../../../domain/entities/${name.pascal}";
import { I${name.pascal}Repository } from "../../../domain/repositories/I${name.pascal}Repository";
import { ${name.pascal}DTO } from "../../dtos/${name.raw}.dto";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";

@injectable()
export class Create${name.pascal}UseCase {
  constructor(
    @inject(ContainerEnum.${name.upper}_REPOSITORY)
    private readonly _repo: I${name.pascal}Repository,
  ) {}

  async execute(data: ${name.pascal}DTO): Promise<${name.pascal}> {
    const created = await this._repo.create(data);

    logger.info({
      message: "${name.pascal} criado com sucesso",
      ${entityIdKey}: created.uuid,
    });

    return created;
  }
}
`,
  },
  {
    filepath: path.join(
      basePath,
      "application/use-cases",
      name.raw,
      "getOne.usecase.ts",
    ),
    content: `import { inject, injectable } from "tsyringe";
import { ${name.pascal} } from "../../../domain/entities/${name.pascal}";
import { I${name.pascal}Repository } from "../../../domain/repositories/I${name.pascal}Repository";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class GetOne${name.pascal}UseCase {
  constructor(
    @inject(ContainerEnum.${name.upper}_REPOSITORY)
    private readonly _repo: I${name.pascal}Repository,
  ) {}

  async execute(uuid: string): Promise<${name.pascal} | null> {
    return await this._repo.getOne(uuid);
  }
}
`,
  },
  {
    filepath: path.join(
      basePath,
      "application/use-cases",
      name.raw,
      "getAll.usecase.ts",
    ),
    content: `import { inject, injectable } from "tsyringe";
import { ${name.pascal} } from "../../../domain/entities/${name.pascal}";
import { I${name.pascal}Repository } from "../../../domain/repositories/I${name.pascal}Repository";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class GetAll${name.pascal}UseCase {
  constructor(
    @inject(ContainerEnum.${name.upper}_REPOSITORY)
    private readonly _repo: I${name.pascal}Repository,
  ) {}

  async execute(): Promise<${name.pascal}[]> {
    return await this._repo.getAll();
  }
}
`,
  },
  {
    filepath: path.join(
      basePath,
      "application/use-cases",
      name.raw,
      "update.usecase.ts",
    ),
    content: `import { inject, injectable } from "tsyringe";
import { ${name.pascal} } from "../../../domain/entities/${name.pascal}";
import { I${name.pascal}Repository } from "../../../domain/repositories/I${name.pascal}Repository";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { ${name.pascal}DTO } from "../../dtos/${name.raw}.dto";
import { logger } from "../../../infrastructure/logger";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class Update${name.pascal}UseCase {
  constructor(
    @inject(ContainerEnum.${name.upper}_REPOSITORY)
    private readonly _repo: I${name.pascal}Repository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string, data: ${name.pascal}DTO): Promise<${name.pascal} | null> {
    const item = await this._repo.update(uuid, data);

    if (!item) {
      logger.warn({
        message: "Ocorreu um erro ao realizar o update de ${name.raw}. Registro não encontrado",
        ${entityIdKey}: uuid,
      });

      return item;
    }

    await this._cache.delete(cacheKeyEnum.${cacheEnumKey});

    logger.info({
      message: "${name.pascal} atualizado com sucesso",
      ${entityIdKey}: uuid,
    });

    return item;
  }
}
`,
  },
  {
    filepath: path.join(
      basePath,
      "application/use-cases",
      name.raw,
      "delete.usecase.ts",
    ),
    content: `import { inject, injectable } from "tsyringe";
import { I${name.pascal}Repository } from "../../../domain/repositories/I${name.pascal}Repository";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { logger } from "../../../infrastructure/logger";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class Delete${name.pascal}UseCase {
  constructor(
    @inject(ContainerEnum.${name.upper}_REPOSITORY)
    private readonly _repo: I${name.pascal}Repository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete(uuid);

    if (!deleted) {
      logger.warn({
        message: "${name.pascal} não encontrado",
        ${entityIdKey}: uuid,
      });

      return false;
    }

    await this._cache.delete(cacheKeyEnum.${cacheEnumKey});

    logger.info({
      message: "${name.pascal} deletado com sucesso",
      ${entityIdKey}: uuid,
    });

    return true;
  }
}
`,
  },
  {
    filepath: path.join(
      basePath,
      "infrastructure/http/validators",
      `${name.raw}.validator.ts`,
    ),
    content: `import * as z from "zod";
import { ValidationEmpty } from "../../../utils/error";

export const create${name.pascal}Schema = z.object({
  body: z.object({
    name: z.string().trim().min(1, new ValidationEmpty("name").response),
  }),
});

export const update${name.pascal}Schema = z.object({
  params: z.object({
    uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
  }),
  body: z.object({
    name: z.string().trim().min(1, new ValidationEmpty("name").response),
  }),
});

export const delete${name.pascal}Schema = z.object({
  params: z.object({
    uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
  }),
});

export const getOne${name.pascal}Schema = z.object({
  params: z.object({
    uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response),
  }),
});
`,
  },
  {
    filepath: path.join(
      basePath,
      "infrastructure/database/entities",
      `${name.pascal}Entity.ts`,
    ),
    content: `import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";

@Entity("tb_${name.table}")
export class ${name.pascal}Entity extends Base {
  @Column({ type: "varchar", length: 150, nullable: false })
  name!: string;
}
`,
  },
  {
    filepath: path.join(
      basePath,
      "infrastructure/database/mappers",
      `${name.raw}.mapper.ts`,
    ),
    content: `import { ${name.pascal}DTO } from "../../../application/dtos/${name.raw}.dto";
import { ${name.pascal} } from "../../../domain/entities/${name.pascal}";
import { ${name.pascal}Entity } from "../entities/${name.pascal}Entity";

export class ${name.pascal}Mapper {
  static toDomain(entity: ${name.pascal}Entity): ${name.pascal} {
    return new ${name.pascal}(entity.name, {
      createdAt: entity.createdAt,
      enable: entity.enable,
      uuid: entity.uuid,
    });
  }

  static toEntity(data: ${name.pascal} | ${name.pascal}DTO): ${name.pascal}Entity {
    const entity = new ${name.pascal}Entity();

    entity.name = data.name;

    return entity;
  }
}
`,
  },
  {
    filepath: path.join(
      basePath,
      "infrastructure/database/repositories",
      `${name.raw}.repository.ts`,
    ),
    content: `import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import { ${name.pascal}DTO } from "../../../application/dtos/${name.raw}.dto";
import { ${name.pascal} } from "../../../domain/entities/${name.pascal}";
import { I${name.pascal}Repository } from "../../../domain/repositories/I${name.pascal}Repository";
import { NotFoundError } from "../../../utils/error";
import { AppDataSource } from "../data-source";
import { ${name.pascal}Entity } from "../entities/${name.pascal}Entity";
import { ${name.pascal}Mapper } from "../mappers/${name.raw}.mapper";

@injectable()
export class ${name.pascal}TypeOrmRepository implements I${name.pascal}Repository {
  protected readonly _repo: Repository<${name.pascal}Entity>;

  constructor() {
    this._repo = AppDataSource.getRepository(${name.pascal}Entity);
  }

  async getOne(uuid: string): Promise<${name.pascal}> {
    const result = await this._repo.findOne({
      where: { uuid },
    });

    if (!result) throw new NotFoundError("${name.pascal}");

    return ${name.pascal}Mapper.toDomain(result);
  }

  async delete(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete({ uuid });
    return (deleted.affected ?? 0) > 0;
  }

  async getAll(): Promise<${name.pascal}[]> {
    const list = await this._repo.find();
    return list.map((item) => ${name.pascal}Mapper.toDomain(item));
  }

  async create(data: ${name.pascal}DTO): Promise<${name.pascal}> {
    const entity = this._repo.create(${name.pascal}Mapper.toEntity(data));
    await this._repo.save(entity);
    return ${name.pascal}Mapper.toDomain(entity);
  }

  async update(uuid: string, data: ${name.pascal}DTO): Promise<${name.pascal} | null> {
    const exists = await this._repo.exists({
      where: { uuid },
    });

    if (!exists) return null;

    await this._repo.update({ uuid }, { ...data });
    return await this.getOne(uuid);
  }
}
`,
  },
  {
    filepath: path.join(
      basePath,
      "infrastructure/http/controllers",
      `${name.raw}.controller.ts`,
    ),
    content: `import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { Create${name.pascal}UseCase } from "../../../application/use-cases/${name.raw}/create.usecase";
import { Delete${name.pascal}UseCase } from "../../../application/use-cases/${name.raw}/delete.usecase";
import { GetAll${name.pascal}UseCase } from "../../../application/use-cases/${name.raw}/getAll.usecase";
import { GetOne${name.pascal}UseCase } from "../../../application/use-cases/${name.raw}/getOne.usecase";
import { Update${name.pascal}UseCase } from "../../../application/use-cases/${name.raw}/update.usecase";
import { Handler } from "../statusHttp";

@injectable()
export class ${name.pascal}Controller {
  constructor(
    private readonly _create: Create${name.pascal}UseCase,
    private readonly _delete: Delete${name.pascal}UseCase,
    private readonly _update: Update${name.pascal}UseCase,
    private readonly _getAll: GetAll${name.pascal}UseCase,
    private readonly _getOne: GetOne${name.pascal}UseCase,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const created = await this._create.execute(req.body);
      return Handler.created(res, created);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const deleted = await this._delete.execute(uuid as string);
      return Handler.ok(res, deleted);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const updated = await this._update.execute(uuid as string, req.body);
      return Handler.ok(res, updated);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getAll(_: Request, res: Response) {
    try {
      const list = await this._getAll.execute();
      return Handler.ok(res, list);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const item = await this._getOne.execute(uuid as string);
      return Handler.ok(res, item);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }
}
`,
  },
  {
    filepath: path.join(
      basePath,
      "infrastructure/http/routes",
      `${name.raw}.routes.ts`,
    ),
    content: `import { Router } from "express";
import { container } from "tsyringe";
import { ${name.pascal}Controller } from "../controllers/${name.raw}.controller";

export const ${name.raw}Routes = Router();

const controller = container.resolve(${name.pascal}Controller);

${name.raw}Routes.post("/", (req, res) => controller.create(req, res));
${name.raw}Routes.get("/", (req, res) => controller.getAll(req, res));
${name.raw}Routes.get("/:uuid", (req, res) => controller.getOne(req, res));
${name.raw}Routes.put("/:uuid", (req, res) => controller.update(req, res));
${name.raw}Routes.delete("/:uuid", (req, res) => controller.delete(req, res));
`,
  },
];

for (const file of files) {
  const dir = path.dirname(file.filepath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(file.filepath)) {
    console.log(`Arquivo já existe: ${file.filepath}`);
    continue;
  }

  fs.writeFileSync(file.filepath, file.content, "utf-8");
  console.log(`Criado: ${file.filepath}`);
}

if (fs.existsSync(enumPath)) {
  let enumContent = fs.readFileSync(enumPath, "utf-8");

  const enumKey = `${name.upper}_REPOSITORY`;
  const enumValue = `${name.pascal}TypeOrmRepository`;

  if (!enumContent.includes(enumKey)) {
    enumContent = enumContent.replace(
      /}\s*$/,
      `  ${enumKey} = "${enumValue}",\n}`,
    );

    fs.writeFileSync(enumPath, enumContent, "utf-8");
    console.log(`Enum adicionado: ${enumKey}`);
  } else {
    console.log(`Enum já existe: ${enumKey}`);
  }
} else {
  console.log("Arquivo ContainerEnum não encontrado.");
}

if (fs.existsSync(containerIndexPath)) {
  let containerContent = fs.readFileSync(containerIndexPath, "utf-8");

  const importLine = `import { ${name.pascal}TypeOrmRepository } from "../../infrastructure/database/repositories/${name.raw}.repository";`;
  const registerBlock = `
container.registerSingleton(
  ContainerEnum.${name.upper}_REPOSITORY,
  ${name.pascal}TypeOrmRepository,
);
`;

  if (!containerContent.includes(importLine)) {
    containerContent = importLine + "\n" + containerContent;
  }

  if (!containerContent.includes(`ContainerEnum.${name.upper}_REPOSITORY`)) {
    containerContent += registerBlock;
  }

  fs.writeFileSync(containerIndexPath, containerContent, "utf-8");
  console.log(`Container registrado: ${name.pascal}TypeOrmRepository`);
} else {
  console.log(
    "Arquivo de container não encontrado. Ajuste o caminho em containerIndexPath.",
  );
}

console.log(`Módulo "${name.raw}" gerado com sucesso.`);
