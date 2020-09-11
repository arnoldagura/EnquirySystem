import { AppStatus } from '../../models/app-status.mode';


export class AppStatusSuccess {
  public static readonly type = '[AppStatus] Success';
  constructor(public payload: AppStatus) { }
}

export class AppStatusError {
  public static readonly type = '[AppStatus] Error';
  constructor(public payload: AppStatus) { }
}

export class AppStatusValidationError {
  public static readonly type = '[AppStatus] Validation Error';
  constructor(public payload: AppStatus) { }
}
