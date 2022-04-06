// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    setDraft: 'draftChanged';
    setDraftHasChanged: 'draftChanged';
    setWarning: 'validatingDraftSuccess';
    setViolations: 'validatingDraftSuccess';
  };
  internalEvents: {
    '': { type: '' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    validate:
      | 'done.invoke.Mail Machine.SECURE_SEND_OFF.VALIDATING:invocation[0]'
      | 'done.invoke.Mail Machine.SECURE_SEND_ON.VALIDATING:invocation[0]';
  };
  missingImplementations: {
    actions: 'setDraft' | 'setDraftHasChanged' | 'setWarning' | 'setViolations';
    services: 'validate';
    guards: 'draftHasChanged' | 'isValid';
    delays: never;
  };
  eventsCausingServices: {
    validate: 'draftChanged' | '';
  };
  eventsCausingGuards: {
    draftHasChanged: '';
    isValid: 'validatingDraftSuccess';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'SECURE_SEND_OFF'
    | 'SECURE_SEND_OFF.IDLE'
    | 'SECURE_SEND_OFF.VALIDATING'
    | 'SECURE_SEND_OFF.WARNING'
    | 'SECURE_SEND_ON'
    | 'SECURE_SEND_ON.IDLE'
    | 'SECURE_SEND_ON.VALIDATING'
    | 'SECURE_SEND_ON.VALID'
    | 'SECURE_SEND_ON.INVALID'
    | {
        SECURE_SEND_OFF?: 'IDLE' | 'VALIDATING' | 'WARNING';
        SECURE_SEND_ON?: 'IDLE' | 'VALIDATING' | 'VALID' | 'INVALID';
      };
  tags: never;
}
