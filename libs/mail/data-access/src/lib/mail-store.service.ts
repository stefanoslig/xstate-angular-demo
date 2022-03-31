import { Injectable } from '@angular/core';
import {
  AdminSettings,
  Draft,
  ViolationsResponse,
} from '@xstate-angular-demo/shared/api-types';
import { Store } from '@xstate-angular-demo/shared/data-access';
import { map } from 'rxjs';
import { MailApiService } from './mail-api.service';

export interface MailState {
  settings: AdminSettings;
  violations: ViolationsResponse;
}

const initialState: MailState = {
  settings: { secureSendEnabledByDefault: false },
  violations: { isValid: true, violations: [] },
};

@Injectable({
  providedIn: 'root',
})
export class MailStoreService extends Store<MailState> {
  settings$ = this.state$.pipe(map((state) => state.settings));
  violations$ = this.state$.pipe(map((state) => state.violations));

  constructor(private mailApiService: MailApiService) {
    super(initialState);
  }

  fetchSettings() {
    this.mailApiService.fetchSettings().subscribe((settings) =>
      this.setState({
        ...this.state,
        settings,
      })
    );
  }

  validateDraft(draft: Draft) {
    this.mailApiService.validateDraft(draft).subscribe((violations) => {
      this.setState({
        ...this.state,
        violations,
      });
    });
  }
}
