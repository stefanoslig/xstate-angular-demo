import { createModel } from 'xstate/lib/model';
import { Draft, Violation } from '@xstate-angular-demo/shared/api-types';

export interface Context {
  violations: Array<Violation>;
  draftHasChanged: boolean;
  draft: Draft;
}

export const mailMachineModel = createModel(
  {
    violations: [],
    draftHasChanged: false,
    draft: {
      from: '',
      recipients: { to: [''] },
      subject: '',
      body: '',
    },
  } as Context,
  {
    events: {
      toggle: () => ({}),
      draftChanged: (draft: Draft) => ({ draft }),
      validatingDraftSuccess: (violations: Array<Violation>) => ({
        violations,
      }),
      showViolations: () => ({}),
    },
  }
);
