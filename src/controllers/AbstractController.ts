import { Router } from "express";

//Middlewares
import ValidationErrorMiddleware from "../middlewares/validationError";
import AuthorizationMiddleware from "../middlewares/authorization";
import PermissionMiddleware from "../middlewares/permission";

//Services
import CognitoService from "../services/cognitoService";

export default abstract class AbstractController {
  private _router: Router = Router();
  private _prefix: string;

  protected handleErrors = ValidationErrorMiddleware.handleErrors;
  protected authMiddleware = AuthorizationMiddleware.getInstance();
  protected permissionMiddleware = PermissionMiddleware.getInstance();
  protected cognitoService = CognitoService.getInstance();

  public get prefix(): string {
    return this._prefix;
  }

  public get router(): Router {
    return this._router;
  }

  protected constructor(prefix: string) {
    this._prefix = prefix;
    this.initRoutes();
  }
  //Inicializar las rutas
  protected abstract initRoutes(): void;
  //Validar el cuerpo de la petición
}
