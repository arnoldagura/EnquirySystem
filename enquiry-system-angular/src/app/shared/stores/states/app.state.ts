import { AppStatusState } from './app-status.state';
import { Injectable, Injector } from '@angular/core';
import { State, Selector, StateContext } from '@ngxs/store';
import { AppStatusEmitter } from '../emitters/app-status.emitter';
import { Receiver } from '@ngxs-labs/emitter';
import { SetToken } from '../actions/app.action';
import { produce } from 'immer';

export class AppStateModel {
  token: string;
}

@Injectable()
@State<AppStateModel>({
  name: 'app',
  defaults: {
    token: null
  },
  children: [AppStatusState]
})
export class AppState {

  private static appStatusEmitter: AppStatusEmitter;

  constructor(injector: Injector) {
    AppState.appStatusEmitter = injector.get<AppStatusEmitter>(AppStatusEmitter);
  }

  @Selector()
  static token({ token }: AppStateModel) {
    return token;
  }

  @Receiver({ action: SetToken })
  static setToken({ setState }: StateContext<AppStateModel>, { payload }: SetToken) {
    setState(produce((draft: AppStateModel) => {
      draft.token = payload;
    }));
  }
}
