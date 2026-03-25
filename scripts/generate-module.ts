import fs from "fs";
import path from "path";

const moduleName = process.argv[2];

if (!moduleName) {
  console.error("Informe o nome do módulo. Ex: yarn generate:module student");
  process.exit(1);
}

const pascalCase = (text: string) =>
  text.replace(/(^\w|-\w|_\w)/g, (match) =>
    match.replace(/[-_]/, "").toUpperCase(),
  );

const camelCase = (text: string) => {
  const pascal = pascalCase(text);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

const name = {
  raw: moduleName,
  pascal: pascalCase(moduleName),
  camel: camelCase(moduleName),
  upper: moduleName.toUpperCase(),
};

const basePath = path.resolve("src");

type FileDef = {
  filepath: string;
  content: string;
};

const files: FileDef[] = [
  {
    filepath: path.join(basePath, "domain/entities", `${name.pascal}.ts`),
    content: `
    import { ValidationEmpty } from "../../utils/error";
    
    export class ${name.pascal} {
  constructor(
    public readonly name: string,
  ) {
    this.validate()  
  }

  private validate() {
    if (!this.name) throw new ValidationEmpty("name")
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
    content: `import { ${name.pascal} } from "../entities/${name.pascal}";

export interface I${name.pascal}Repository {
  create(data: ${name.pascal}): Promise<${name.pascal}>;
  getOne(uuid: string): Promise<${name.pascal} | null>;
  getAll(): Promise<${name.pascal}[]>;
  update(uuid: string, data: Partial<${name.pascal}>): Promise<boolean>;
  delete(uuid: string): Promise<boolean>;
}
`,
  },
  {
    filepath: path.join(basePath, "application/dtos", `${name.raw}.dto.ts`),
    content: `export interface ${name.pascal}DTO {
  name: string;
}
`,
  },
  {
    filepath: path.join(
      basePath,
      "application/use-cases",
      name.raw,
      `create.usecase.ts`,
    ),
    content: `import { inject, injectable } from "tsyringe";
import { I${name.pascal}Repository } from "../../../domain/repositories/I${name.pascal}Repository";
import { ${name.pascal} } from "../../../domain/entities/${name.pascal}";
import { ${name.pascal}DTO } from "../../dtos/${name.raw}.dto";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class Create${name.pascal}UseCase {
  constructor(
    @inject(ContainerEnum.${name.upper}_REPOSITORY)
    private readonly repository: I${name.pascal}Repository,
  ) {}

  async execute(data: ${name.pascal}DTO): Promise<${name.pascal}> {
    const entity = new ${name.pascal}(data.name);
    return await this.repository.create(entity);
  }
}
`,
  },
  {
    filepath: path.join(
      basePath,
      "application/use-cases",
      name.raw,
      `getOne.usecase.ts`,
    ),
    content: `import { inject, injectable } from "tsyringe";
import { I${name.pascal}Repository } from "../../../domain/repositories/I${name.pascal}Repository";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class GteOne${name.pascal}UseCase {
  constructor(
    @inject(ContainerEnum.${name.upper}_REPOSITORY)
    private readonly repository: I${name.pascal}Repository,
  ) {}

  async execute(uuid: string) {
    return await this.repository.getOne(uuid);
  }
}
`,
  },
  {
    filepath: path.join(
      basePath,
      "application/use-cases",
      name.raw,
      `getAll.usecase.ts`,
    ),
    content: `import { inject, injectable } from "tsyringe";
import { I${name.pascal}Repository } from "../../../domain/repositories/I${name.pascal}Repository";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class GetAll${name.pascal}UseCase {
  constructor(
    @inject(ContainerEnum.${name.upper}_REPOSITORY)
    private readonly repository: I${name.pascal}Repository,
  ) {}
  
  async execute() {
    return await this.repository.getAll();
  }
}
`,
  },
  {
    filepath: path.join(
      basePath,
      "application/use-cases",
      name.raw,
      `update.usecase.ts`,
    ),
    content: `import { inject, injectable } from "tsyringe";
import { I${name.pascal}Repository } from "../../../domain/repositories/I${name.pascal}Repository";
import { Update${name.pascal}DTO } from "../../dtos/${name.raw}.dto";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class Update${name.pascal}UseCase {
  constructor(
    @inject(ContainerEnum.${name.upper}_REPOSITORY)
    private readonly repository: I${name.pascal}Repository,
  ) {}

  async execute(uuid: string, data: Update${name.pascal}DTO): Promise<void> {
    await this.repository.update(uuid, data);
  }
}
`,
  },
  {
    filepath: path.join(
      basePath,
      "application/use-cases",
      name.raw,
      `delete.usecase.ts`,
    ),
    content: `import { inject, injectable } from "tsyringe";
import { I${name.pascal}Repository } from "../../../domain/repositories/I${name.pascal}Repository";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class Delete${name.pascal}UseCase {
  constructor(
    @inject(ContainerEnum.${name.upper}_REPOSITORY)
    private readonly repository: I${name.pascal}Repository,
  ) {}

  async execute(uuid: string): Promise<void> {
    await this.repository.delete(uuid);
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
    uuid: z.string().trim().min(1, new ValidationEmpty("uuid").response)),
  }),
  body: z.object({
    name: z.string().trim().min(1).optional(),
  }),
});

export const delete${name.pascal}Schema = z.object({
  params: z.object({
    uuid: z.string().trim().min(1,new ValidationEmpty("uuid").response)),
  }),
});

export const getOne${name.pascal}Schema = z.object({
  params: z.object({
    uuid: z.string().trim().min(1,new ValidationEmpty("uuid").response)),
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

@Entity("tb_${name.raw}")
export class ${name.pascal}Entity extends Base {
  @Column({ type: "varchar", length: 150, nullable: false })
  name!: string;
}
`,
  },
  {
    filepath: path.join(
      basePath,
      "infrastructure/mappers",
      `${name.raw}.mapper.ts`,
    ),
    content: `import { ${name.pascal} } from "../../../domain/entities/${name.pascal}";
import { ${name.pascal}Entity } from "../entities/${name.pascal}Entity";
import { Create${name.pascal}DTO } from "../../../application/dtos/${name.raw}.dto";

export class ${name.pascal}Mapper {
  static toEntity(data: ${name.pascal} | Create${name.pascal}DTO): ${name.pascal}Entity {
    const entity = new ${name.pascal}Entity();
    entity.name = data.name;
    return entity;
  }

  static toDomain(entity: ${name.pascal}Entity): ${name.pascal} {
    return new ${name.pascal}(entity.name);
  }
}
`,
  },
  {
    filepath: path.join(
      basePath,
      "infrastructure/database/repositories",
      `${name.raw}.typeorm.repository.ts`,
    ),
    content: `import { Repository } from "typeorm";
import { injectable } from "tsyringe";
import { AppDataSource } from "../data-source";
import { I${name.pascal}Repository } from "../../../domain/repositories/I${name.pascal}Repository";
import { ${name.pascal} } from "../../../domain/entities/${name.pascal}";
import { ${name.pascal}Entity } from "../entities/${name.pascal}Entity";
import { ${name.pascal}Mapper } from "../mappers/${name.raw}.mapper";

@injectable()
export class ${name.pascal}TypeOrmRepository implements I${name.pascal}Repository {
  private readonly repo: Repository<${name.pascal}Entity>;

  constructor() {
    this.repo = AppDataSource.getRepository(${name.pascal}Entity);
  }

  async create(data: ${name.pascal}): Promise<${name.pascal}> {
    const entity = this.repo.create(${name.pascal}Mapper.toEntity(data));
    await this.repo.save(entity);
    return ${name.pascal}Mapper.toDomain(entity);
  }

  async findById(uuid: string): Promise<${name.pascal} | null> {
    const entity = await this.repo.findOne({ where: { uuid } as any });
    return entity ? ${name.pascal}Mapper.toDomain(entity) : null;
  }

  async findAll(): Promise<${name.pascal}[]> {
    const entities = await this.repo.find();
    return entities.map(${name.pascal}Mapper.toDomain);
  }

  async update(uuid: string, data: Partial<${name.pascal}>): Promise<void> {
    await this.repo.update({ uuid } as any, data);
  }

  async delete(uuid: string): Promise<void> {
    await this.repo.delete({ uuid } as any);
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
import { Handler } from "../statusHttp";
import { Create${name.pascal}UseCase } from "../../../application/use-cases/${name.camel}/create.usecase";
import { Delete${name.pascal}UseCase } from "../../../application/use-cases/${name.camel}/delete.usecase";
import { Update${name.pascal}UseCase } from "../../../application/use-cases/${name.camel}/update.usecase";
import { GetAll${name.pascal}UseCase } from "../../../application/use-cases/${name.camel}/getAll.usecase";
import { GetOne${name.pascal}UseCase } from "../../../application/use-cases/${name.camel}/getOne.usecase";

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
      const getAll = await this._getAll.execute();
      return Handler.ok(res, getAll);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const getOne = await this._getOne.execute(uuid as string);
      return Handler.ok(res, getOne);
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

export const ${name.camel}Routes = Router();

const controller = container.resolve(${name.pascal}Controller);

${name.camel}Routes.post("/", (req, res) => controller.create(req, res));
${name.camel}Routes.get("/", (req, res) => controller.getAll(req, res));
${name.camel}Routes.get("/:uuid", (req, res) => controller.getOne(req, res));
${name.camel}Routes.put("/:uuid", (req, res) => controller.update(req, res));
${name.camel}Routes.delete("/:uuid", (req, res) => controller.delete(req, res));
`,
  },
];

for (const file of files) {
  const dir = path.dirname(file.filepath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(file.filepath)) {
    console.log(`Arquivo já existe: \${file.filepath}\``);
    continue;
  }

  fs.writeFileSync(file.filepath, file.content, "utf-8");
  console.log(`Criado: \${file.filepath}\``);
}

console.log(`Módulo "\${name.raw}" gerado com sucesso.\``);
