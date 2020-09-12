import { AppStatusState } from './app-status.state';
import { Injectable, Injector } from '@angular/core';
import { State, Selector, StateContext } from '@ngxs/store';
import { AppStatusEmitter } from '../emitters/app-status.emitter';
import { Receiver } from '@ngxs-labs/emitter';
import { SetToken } from '../actions/app.action';
import { produce } from 'immer';
import { GetUser } from '../actions/auth.action';
import { User } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs';

export class AuthStateModel {
  token: string;
  user: User;
}

@Injectable()
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    user: {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      username: null,
      userType: null,
      token: null
    }
  },
  children: [AppStatusState]
})
export class AuthState {

  private static appStatusEmitter: AppStatusEmitter;

  constructor(injector: Injector) {
    AuthState.appStatusEmitter = injector.get<AppStatusEmitter>(AppStatusEmitter);
  }

  @Selector()
  static isAuthorized({ token }: AuthStateModel) {
    return token !== null && typeof token !== 'undefined';
  }

  @Selector()
  static token({ token }: AuthStateModel) {
    return token;
  }

  @Selector()
  static user({ user }: AuthStateModel) {
    return user;
  }

  @Receiver({ action: SetToken })
  static setToken({ setState }: StateContext<AuthStateModel>, { payload }: SetToken) {
    setState(produce((draft: AuthStateModel) => {
      draft.token = payload;
    }));
  }

  @Receiver({ action: GetUser, cancelUncompleted: true })
  static GetUser({ setState }: StateContext<AuthStateModel>, { payload }: GetUser) {
    setState(produce((draft: AuthStateModel) => {
      // draft.user = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      var ed = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      
      if(ed.value != null) {
        draft.user = ed.value;
        console.log('ed', ed.value);
        draft.token = ed.value.token;
      }
    }));
  }
}
