// src/@types/express/index.d.ts
import "express-serve-static-core";
import { IDecoded } from "../../application/dtos/decoded.dto";

declare module "express-serve-static-core" {
  interface Request {
    user?: IDecoded;
  }
}

export {};
