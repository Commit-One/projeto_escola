import { Student } from "../../../domain/entities/Student";
import { StudentEntity } from "../entities/StudentEntity";

export class StudentMapper {
    static toDomain(entity: StudentEntity): Student {
        return new Student(
            entity.schoolUuid, entity.matriculation, entity.dateBirth, entity.status, entity.nameMother, entity.nameFather, entity.name, entity.phone
            , entity.classStudentUuid, entity.periodUuid, entity.dateMatriculation, entity.hasDiscount, entity.discount, entity.datePayment, entity.profileUuid
        );
    }
}