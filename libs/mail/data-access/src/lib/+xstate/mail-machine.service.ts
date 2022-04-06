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
        validate: (context) =>
          this.mailApiService
            .validateDraft(context.draft)
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
          violations: (_, event) => event.violations,
        }),
        setDraftHasChanged: mailMachineModel.assign({
          draftHasChanged: () => true,
        }),
        setDraft: mailMachineModel.assign({
          draft: (_, event) => event.draft,
        }),
        setWarning: mailMachineModel.assign({
          violations: (_, event) => event.violations,
        }),
      },
      guards: {
        isValid: (_, event) => event.violations.length < 0,
        draftHasChanged: (context) => context.draftHasChanged,
      },
    }),
    { devTools: true } // set this based on an environment variable
  ).start();

  public state$ = from(this._service).pipe(shareReplay());
  public send = this._service.send;

  constructor(private readonly mailApiService: MailApiService) {}
}
