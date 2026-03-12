import { ClassStudent } from "../../../domain/entities/ClassStudent";
import { ClassStudentEntity } from "../entities/ClassStudentEntity";

export class ClassStudentMapper {
    static toDomain(entity: ClassStudentEntity): ClassStudent {
        return new ClassStudent(
            entity.name, entity.maxAge, entity.minAge
        );
    }
}