import type { IUser } from "../../modules/auth/user/user.interface";

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}

declare global {
  namespace Express {
    export interface Request {
      file?: File;
      files?: File[];
    }
  }
}
