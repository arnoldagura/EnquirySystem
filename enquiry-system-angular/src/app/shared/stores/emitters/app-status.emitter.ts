import { Emitter, Emittable } from '@ngxs-labs/emitter';

import { AppStatusState } from '../states/app-status.state';
import { Injectable } from '@angular/core';
import { AppStatus } from '../../models/app-status.mode';

@Injectable()
export class AppStatusEmitter {

  @Emitter(AppStatusState.success)
  success: Emittable<AppStatus>;

  @Emitter(AppStatusState.errors)
  errors: Emittable<AppStatus>;

}
