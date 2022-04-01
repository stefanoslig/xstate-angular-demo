import { Injectable } from '@angular/core';
import {
  AdminSettings,
  Draft,
  ViolationsResponse,
} from '@xstate-angular-demo/shared/api-types';
import { Store } from '@xstate-angular-demo/shared/data-access';
import { BehaviorSubject, from, map, shareReplay } from 'rxjs';
import { MailApiService } from './mail-api.service';
import { interpret } from 'xstate';
import { mailMachine } from './mail-state-machine';
@Injectable({
  providedIn: 'root',
})
export class MailStoreService {
  _service = interpret(mailMachine, { devTools: true }).start();
  state$ = from(this._service).pipe(shareReplay());
  send = this._service.send;
}
