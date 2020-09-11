import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsEmitPluginModule } from '@ngxs-labs/emitter';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';

// STATES
import { AppState } from './states/app.state';
import { AppStatusState } from './states/app-status.state';

// EMITTERS
import { AppStatusEmitter } from './emitters/app-status.emitter';
import { CustomerIssueState } from './states/customer-issue.state';

@NgModule({
  imports: [
    NgxsEmitPluginModule.forRoot(),
    NgxsSelectSnapshotModule.forRoot(),
    NgxsModule.forRoot([
      // Add states here
      AppState,
      AppStatusState,
      CustomerIssueState,
    ])
  ],
  providers: [
    AppStatusEmitter
  ]
})
export class StoreModule { }
