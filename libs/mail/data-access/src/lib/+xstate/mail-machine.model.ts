import { createModel } from 'xstate/lib/model';
import { Draft, Violation } from '@xstate-angular-demo/shared/api-types';

export interface Context {
  violations: Array<Violation>;
  draft: Draft;
}

export const mailMachineModel = createModel(
  {
    violations: [],
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
    },
  }
);
