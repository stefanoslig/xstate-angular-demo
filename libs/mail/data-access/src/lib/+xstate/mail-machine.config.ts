import { mailMachineModel } from './mail-machine.model';

export const mailMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFkCGBLANgAjQYwAt0A7MAOgBUB5AcRoBkBRMgZUYGEBVAJUYH02AOQAifKgDFxAYgAuAeyhRMYRKAAOc2Ohno5xVSAAeiAMwAGACxkATAE4AbAA57tswEYTAdjfX7FgDQgAJ6I1m6OZGZR7gCszo7WZjFmjgC+qYFoWLiohCTk1HRMrBw8-EKiVIKyCkoqSCAaWjp6BsYI5lZ2Ti7uXj5+gSEIbp5mkdFutibWCa4J6ZkYOPhEpGTIAIIAkvRkAGqb9NvCmxTbgjRSAG6omOgQqDrEUMIATqgAZjIsAK54eDg8AaTW0un0DXaFmsJkinkcPh8nk8FiSQ0Q0KsySibg8iVGqJiixAWRWuTW5C2uykEA+33YBFQL0gBlBLQhoHanms6IQySstkFgsc02s3LclnSGRAxDkEDgBlJOTy60KDGYbC4vAEjBEYkkrM0YNakMQ3N5ozcZBMNpMFmREqmtgs9mJStW+UotHVJS15V1lUEhua4LaGLMsNi9jsdrM9lxthiFs8sMctvt3ncgpdbuWyopXqKjGDxo5Rgxjl5tk8E2iDj8bgsMQsblz2Q96ype0Ox1O50uJfZYYQ1hdZASCOsyVsYTM1lmvPtsIsQumMRiMxMHjbZJVlJ23aOJ0HodNCHsNvHPhXU-nZlsjgCwQxD7Iq5nXjjSXtO-znq7ZAXD2x4gkaQ5nuaz4dI+b6rm4F4mAkKYWL+Hb7rsJ4mpyFa8nYtiwcKUwuE4UyoeS+SYWW7SjrhVjRLEYQzuE3hSqkQA */
  mailMachineModel.createMachine(
    {
      context: mailMachineModel.initialContext,
      tsTypes: {} as import('./mail-machine.config.typegen').Typegen0,
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
                src: 'validate',
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
  );
