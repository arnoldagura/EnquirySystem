import { AppStatusError, AppStatusSuccess, AppStatusValidationError } from '../actions/app-status.action';
import { Emittable, Emitter, Receiver } from '@ngxs-labs/emitter';
import { Injectable } from '@angular/core';
import { State, StateContext } from '@ngxs/store';
import { AppStatus } from '../../models/app-status.mode';
import produce from 'immer';

export class AppStatusStateModel {
  success: AppStatus;
  errors: AppStatus;
  validation_errors: AppStatus;
}

@Injectable()
@State<AppStatusStateModel>({
  name: 'status',
  defaults: {
    success: null,
    errors: null,
    validation_errors: null
  }
})
export class AppStatusState {

  @Emitter(AppStatusState.validationErrors)
  private static validationErrorEmitter: Emittable<AppStatus>;

  @Receiver({ action: AppStatusSuccess })
  public static success({ setState }: StateContext<AppStatusStateModel>, { payload }: AppStatusSuccess) {
    setState(produce((draft: AppStatusStateModel) => {
      draft = {
        success: payload,
        errors: null,
        validation_errors: null
      };
    }));
  }

  @Receiver({ action: AppStatusError })
  public static errors({ setState }: StateContext<AppStatusStateModel>, { payload }: AppStatusError) {
    switch (payload.status) {
      case 422:
        this.validationErrorEmitter.emit(payload);
        break;
      default:
        setState(produce((draft: AppStatusStateModel) => {
          draft = {
            success: null,
            errors: payload,
            validation_errors: null
          };
        }));
        break;
    }
  }

  @Receiver({ action: AppStatusValidationError })
  public static validationErrors({ setState }: StateContext<AppStatusStateModel>, { payload }: AppStatusValidationError) {
    setState(produce((draft: AppStatusStateModel) => {
      draft = {
        success: null,
        errors: null,
        validation_errors: payload
      };
    }));
  }

}
