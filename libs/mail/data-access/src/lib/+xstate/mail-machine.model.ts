import { createModel } from 'xstate/lib/model';
import { Draft, Violation } from '@xstate-angular-demo/shared/api-types';

export const mailMachineModel = createModel(
  {
    violations: [],
  },
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
