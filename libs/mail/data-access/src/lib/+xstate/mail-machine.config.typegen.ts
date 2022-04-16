// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    setDraft: 'draftChanged';
    resetViolations: 'toggle';
    setViolations: 'validatingDraftSuccess';
  };
  internalEvents: {
    '': { type: '' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    validate:
      | 'done.invoke.Secure mail.SECURE_SEND_OFF.VALIDATING:invocation[0]'
      | 'done.invoke.Secure mail.SECURE_SEND_ON.VALIDATING:invocation[0]';
  };
  missingImplementations: {
    actions: 'setDraft' | 'resetViolations' | 'setViolations';
    services: 'validate';
    guards: 'isInvalid';
    delays: never;
  };
  eventsCausingServices: {
    validate: 'draftChanged' | '';
  };
  eventsCausingGuards: {
    isInvalid: 'validatingDraftSuccess';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'SECURE_SEND_OFF'
    | 'SECURE_SEND_OFF.IDLE'
    | 'SECURE_SEND_OFF.VALIDATING'
    | 'SECURE_SEND_OFF.PROMPT'
    | 'SECURE_SEND_OFF.VALID'
    | 'SECURE_SEND_ON'
    | 'SECURE_SEND_ON.IDLE'
    | 'SECURE_SEND_ON.VALIDATING'
    | 'SECURE_SEND_ON.INVALID'
    | 'SECURE_SEND_ON.VALID'
    | {
        SECURE_SEND_OFF?: 'IDLE' | 'VALIDATING' | 'PROMPT' | 'VALID';
        SECURE_SEND_ON?: 'IDLE' | 'VALIDATING' | 'INVALID' | 'VALID';
      };
  tags: never;
}
