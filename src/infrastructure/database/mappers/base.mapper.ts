export class BaseMapper {
  static toBaseProps(entity: {
    uuid: string;
    createdAt: Date;
    enable: boolean;
  }) {
    return {
      uuid: entity.uuid,
      createdAt: entity.createdAt,
      enable: entity.enable,
    };
  }
}
