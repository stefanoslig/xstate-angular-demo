import { mailMachineModel } from './mail-machine.model';

export const mailMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGUwGMCuAnMACAtgIYCWANgHTICiAwgKoBKVA+tQHIAizA8gGK-kAkhwAyVAMSJQABwD2sYgBdisgHZSQAD0QBOHQBZyARh0B2AEz6DAVh0Bma6dMAaEAE9E5gGyHLRgAz6RsEG-v7WXgC+ka6omDgEJBTU9EysVJw8-OQAagCCIsJ5ACqCbADi4gBuhKTEEITKqlAcWIQAZorIGGhocPBIIHIKymoa2ghGlgAc5F7h4UZepj525kauHgjrXuRm+nbL82Gm0xbRsejYeERklLSMLOxcfLziirJQUKRgGsNKKnUgwm1nMm0Qph0e3MtgMZzsgS802mFxAcWuiTuKUe6Uyr3EEDanRoAAtCM1IH95ACxsDENN9LNHOYEfYdIsdOCEIdfEF-OYLPp-PNrHZUeiErdkg80s8eGwhKIJFSRoDxp41nMYf4jNMdDCvOYdNM7Fz9KY7MYEWFzCaYQ4dOKrpKkvdUk8Mi8FflChwSmVKjU6g0mi0iV0en1YAMZNTRkDQBNGaZyP41pCdKLbAdrFzrIFyNMvHY7FZhUihQKnfEbq7sbLPfL3p9vr9Bv94+qEF5bHs7EsDBmvEZRVy7CtyKY+QLLMLwmKYmjnbWsTKPXi2ATw6TyTAICqaQmtPSXO5EI5LUZrba7NN1ocF4vVLIIHANBKV9L3biXtlhGID07OkED1axyFLWF72sK9OTPbZi0nU401tMJiz0axqwxKU3RxOVXlyAoilKCpALVYCAkzchQVFOwzENQ4dC8LkYRTJwDh7EUwhMTCXVXb88OyAAFBhuAAWUE4pSNpRNECMfRexLAxGSmaxzXsZinCo4JDmgpYLGFfQeM-HCGzxbIfWEKSjwmItZlnRSLBWCxpmY8JC1BE4+R1KwMMXD9MS-XDG1eKyuzvQxmVZWiOS5KZ-HckwDH7Mwzh7IyApM9cvUVAD2zjMiZMmEtEPHYd5jk4J-BcuDzXMOZlm88wBTMft0uw+ssvlAjfX9Ei8tVaTj25YrM37Rke1MNMLTNLxdlmktDmmWxpn8R0-OXDKOp-LqygsjhQuA6C6uQjMsyS3MaqLcghTTaDizTJYTTaus1227hvUI-b+sPLsAjmpFwnk4UVn5U0arkyc+RMBwrG8cxnr4oKNwOwrizHI1IYCGEUr1eaEdIFGhttLldn1ZajFOW0TEcKJokiIA */
  mailMachineModel.createMachine({
  context: mailMachineModel.initialContext,
  tsTypes: {} as import('./mail-machine.config.typegen').Typegen0,
  id: 'Secure mail',
  initial: 'SECURE_SEND_ON',
  states: {
    SECURE_SEND_OFF: {
      initial: 'IDLE',
      states: {
        IDLE: {
          always: {
            target: 'VALIDATING',
          },
        },
        VALIDATING: {
          invoke: {
            src: 'validate',
          },
          on: {
            validatingDraftSuccess: [
              {
                cond: 'isInvalid',
                target: 'PROMPT',
              },
              {
                target: 'VALID',
              },
            ],
          },
        },
        PROMPT: {
          type: 'final',
        },
        VALID: {},
      },
      on: {
        toggle: {
          target: 'SECURE_SEND_ON',
        },
        draftChanged: {
          actions: 'setDraft',
          target: '.VALIDATING',
        },
      },
    },
    SECURE_SEND_ON: {
      initial: 'IDLE',
      states: {
        IDLE: {
          always: {
            target: 'VALIDATING',
          },
        },
        VALIDATING: {
          invoke: {
            src: 'validate',
          },
          on: {
            validatingDraftSuccess: [
              {
                actions: 'setViolations',
                cond: 'isInvalid',
                target: 'INVALID',
              },
              {
                actions: 'setViolations',
                target: 'VALID',
              },
            ],
          },
        },
        INVALID: {
          type: 'final',
        },
        VALID: {
          type: 'final',
        },
      },
      on: {
        toggle: {
          actions: 'resetViolations',
          target: 'SECURE_SEND_OFF',
        },
        draftChanged: {
          actions: 'setDraft',
          target: '.VALIDATING',
        },
      },
    },
  },
});
