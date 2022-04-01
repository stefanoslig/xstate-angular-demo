import { sendParent } from 'xstate';
import { createModel } from 'xstate/lib/model';
import { Draft, Violation } from '@xstate-angular-demo/shared/api-types';
import { delay, map, of, tap } from 'rxjs';

const violations: Array<Violation> = [
  {
    id: 'b514987e-55c2-429f-af34-eaacfa63ec29',
    description: "One of the recipients doesn't belong to this domain",
  },
  {
    id: '2109d190-8fde-4497-beed-2a1889935034',
    description: 'The body contains sensitive data',
  },
];

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

export const mailMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFkCGBLANgAjQYwAt0A7MAOgBUB5AcRoBkBRMgZUYGEBVAJUYH02AOQAifKgDFxAYgAuAeyhRMYRKAAOc2Ohno5xVSAAeiAMwAGACxkATAE4AbAA57tswEYTAdjfX7FgDQgAJ6I1m6OZGZR7gCszo7WZjFmjgC+qYFoWLiohCTk1HRMrBw8-EKiVIKyCkoqSCAaWjp6BsYI5lZ2Ti7uXj5+gSEIbp5mkdFutibWCa4J6ZkYOPhEpGTIAIIAkvRkAGqb9NvCmxTbgjRSAG6omOgQqDrEUMIATqgAZjIsAK54eDg8AaTW0un0DXaFmsJkinkcPh8nk8FiSQ0Q0KsySibg8iVGqJiixAWRWuTW5C2uykEA+33YBFQL0gBlBLQhoHanms6IQySstkFgsc02s3LclnSGRAxDkEDgBlJOTy60KDGYbC4vAEjBEYkkrM0YNakMQ3N5ozcZBMNpMFmREqmtgs9mJStW+UotHVJS15V1lUEhua4LaGLMsNi9jsdrM9lxthiFs8sMctvt3ncgpdbuWyopXqKjGDxo5Rgxjl5tk8E2iDj8bgsMQsblz2Q96ype0Ox1O50uJfZYYQ1hdZASCOsyVsYTM1lmvPtsIsQumMRiMxMHjbZJVlJ23aOJ0HodNCHsNvHPhXU-nZlsjgCwQxD7Iq5nXjjSXtO-znq7ZAXD2x4gkaQ5nuaz4dI+b6rm4F4mAkKYWL+Hb7rsJ4mpyFa8nYtiwcKUwuE4UyoeS+SYWW7SjrhVjRLEYQzuE3hSqkQA */
  mailMachineModel.createMachine(
    {
      context: mailMachineModel.initialContext,
      tsTypes: {} as import('./mail-state-machine.typegen').Typegen0,
      id: 'Mail Machine',
      type: 'parallel',
      states: {
        TOGGLE: {
          initial: 'SECURE_SEND_OFF',
          states: {
            SECURE_SEND_OFF: {
              on: {
                toggle: {
                  target: 'SECURE_SEND_ON',
                },
              },
            },
            SECURE_SEND_ON: {
              on: {
                toggle: {
                  target: 'SECURE_SEND_OFF',
                },
              },
            },
          },
        },
        MAIL: {
          states: {
            VALIDATING: {
              invoke: {
                src: () =>
                  of(violations).pipe(
                    tap(console.log),
                    delay(3000),
                    map((violations) =>
                      mailMachineModel.events.validatingDraftSuccess(violations)
                    )
                  ),
              },
              on: {
                validatingDraftSuccess: [
                  {
                    cond: 'isValid',
                    target: 'VALID',
                  },
                  {
                    actions: 'setViolations',
                    target: 'INVALID',
                  },
                ],
              },
            },
            VALID: {},
            INVALID: {},
          },
          on: {
            draftChanged: {
              target: '.VALIDATING',
            },
          },
        },
      },
    },
    {
      actions: {
        setViolations: mailMachineModel.assign({
          violations: (_, event: any) => event.violations,
        }),
      },
      guards: {
        isValid: (_, event) => event.violations.length < 0,
      },
    }
  );
