// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    setViolations: 'validatingDraftSuccess';
  };
  internalEvents: {
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    validate: 'done.invoke.Mail Machine.MAIL.VALIDATING:invocation[0]';
  };
  missingImplementations: {
    actions: 'setViolations';
    services: 'validate';
    guards: 'isValid';
    delays: never;
  };
  eventsCausingServices: {
    validate: 'draftChanged';
  };
  eventsCausingGuards: {
    isValid: 'validatingDraftSuccess';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'TOGGLE'
    | 'TOGGLE.SECURE_SEND_OFF'
    | 'TOGGLE.SECURE_SEND_ON'
    | 'MAIL'
    | 'MAIL.VALIDATING'
    | 'MAIL.VALID'
    | 'MAIL.INVALID'
    | {
        TOGGLE?: 'SECURE_SEND_OFF' | 'SECURE_SEND_ON';
        MAIL?: 'VALIDATING' | 'VALID' | 'INVALID';
      };
  tags: never;
}
