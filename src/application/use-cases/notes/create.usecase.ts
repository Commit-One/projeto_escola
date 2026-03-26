import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { NotesDTO } from "../../dtos/notes.dto";
import { Notes } from "../../../domain/entities/Notes";
import { INotesRepository } from "../../../domain/repositories/INotesRepository";

@injectable()
export class CreateNotesUseCase {
  constructor(
    @inject(ContainerEnum.NOTES_REPOSITORY)
    private readonly _repo: INotesRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(data: NotesDTO): Promise<Notes> {
    const notes = await this._repo.create(data);
    await this._cache.delete(cacheKeyEnum.NOTES);
    logger.info({
      message: "Relação criada com sucesso",
      noteUuid: notes.uuid,
    });
    return notes;
  }
}
