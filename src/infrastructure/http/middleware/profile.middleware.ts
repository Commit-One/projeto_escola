import { Request, Response, NextFunction } from "express";
import { StatusHTTP } from "../../../utils/enum/statusHTTP";
import { IDecoded } from "../../../domain/contracts/IDecoded";

export function authorizationMiddleware(profile: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: IDecoded = (req as any).user;

      if (!profile.includes(user.profile.name)) {
        return res.status(StatusHTTP.FORBIDDEN).json({
          message: "Ação não autorizada para esse tipo de perfil",
        });
      }

      return next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({
        message: "Perfil de acesso inválido",
      });
    }
  };
}
