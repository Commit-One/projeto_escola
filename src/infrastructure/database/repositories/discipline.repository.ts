import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { injectable } from "tsyringe";
import { IDisciplineRepository } from "../../../domain/repositories/IDisciplineRepository";
import { Discipline } from "../../../domain/entities/Discipline";
import { DisciplineEntity } from "../entities/DisciplineEntity";
import { DisciplineMapper } from "../mappers/discipline.mapper";
import { NotFoundError } from "../../../utils/error";
import { SchoolEntity } from "../entities/SchoolEntity";

@injectable()
export class DisciplineTypeOrmRepository implements IDisciplineRepository {
  protected readonly _repo: Repository<DisciplineEntity>;
  protected readonly _repoSchool: Repository<SchoolEntity>;

  constructor() {
    this._repo = AppDataSource.getRepository(DisciplineEntity);
    this._repoSchool = AppDataSource.getRepository(SchoolEntity);
  }

  async getAll(): Promise<Discipline[]> {
    const list = await this._repo.find();
    return list.map((e) => DisciplineMapper.toDomain(e));
  }

  async create(name: string, schoolUuid: string): Promise<Discipline> {
    const discipline = new Discipline(name, schoolUuid);
    const school = await this._repoSchool.findOne({
      where: { uuid: schoolUuid },
    });

    if (!school) throw new NotFoundError("Escola");

    const entity = DisciplineMapper.toEntity(discipline);
    await this._repo.save(entity);
    return DisciplineMapper.toDomain(entity);
  }

  async getOne(uuid: string): Promise<Discipline | null> {
    const discipline = await this._repo.findOne({ where: { uuid } });

    if (!discipline) throw new NotFoundError("Disciplina");

    return DisciplineMapper.toDomain(discipline);
  }

  async delete(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete({ uuid });
    return (deleted.affected ?? 0) > 0;
  }

  async update(uuid: string, name: string): Promise<Discipline> {
    const entity = await this._repo.findOne({ where: { uuid } });

    if (!entity) throw new NotFoundError("Disciplina");

    await this._repo.update({ uuid }, { name });
    return DisciplineMapper.toDomain(entity);
  }
}
