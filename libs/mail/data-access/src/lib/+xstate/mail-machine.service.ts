import { Injectable } from '@angular/core';
import { from, map, shareReplay } from 'rxjs';
import { interpret } from 'xstate';
import { MailApiService } from '../mail-api.service';
import { mailMachine } from './mail-machine.config';
import { mailMachineModel } from './mail-machine.model';

@Injectable({
  providedIn: 'root',
})
export class MailStoreService {
  private _service = interpret(
    mailMachine.withConfig({
      services: {
        validate: (_, event) =>
          this.mailApiService
            .validateDraft(event.draft)
            .pipe(
              map((result) =>
                mailMachineModel.events.validatingDraftSuccess(
                  result.violations
                )
              )
            ),
      },
      actions: {
        setViolations: mailMachineModel.assign({
          violations: (_, event: any) => event.violations,
        }),
      },
      guards: {
        isValid: (_, event) => event.violations.length < 0,
      },
    }),
    { devTools: true } // set this based on an environment variable
  ).start();

  public state$ = from(this._service).pipe(shareReplay());
  public send = this._service.send;

  constructor(private readonly mailApiService: MailApiService) {}
}
