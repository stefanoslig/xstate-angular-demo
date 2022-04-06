import { mailMachineModel } from './mail-machine.model';

export const mailMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFkCGBLANgAjQYwAt0A7MAOgGUBRAYQFUAlKgfWoDkARZgeQDFeyASQ4AZKgGJEoAA4B7WOgAu6WcSkgAHogC0ANgCM+sgCYAHAGYADPoDs+0wE4HpmwFYANCACeOh5bL6ACxmToGBlro2psYAvjGeaFi4qIQk5NT0TKxUnDz8ZABqAIIiwkUAKoJsAOLiAG6omOgQqMrEUBwATqgAZooUAK54eHDwSCByCsqq6loI2oHmRmZWrvrOi26mHt46QboBwQ62NpY2NubGZ3EJGDj4RKSUtIws7Fx8vOKKslBQmGB1JMlCo1OM5tp1q4yK5AqZdJFtpZTHD4Z4fAh9JYHGRzK5Tg5jMYHK5dLDXLF4iBEvcUo90i8su88l8IN0+jQCKh2pAgfIQTNwTpzkZos5Ccc4acbOjEE5cfizoFbHiRQ4btS7slUk8Mq9srluGwhKIJHypqDZogbDiyWFXBTdPbXGdZfNCWQnSEHGEIlFjLoNTTtfTnpk3jkPsbiqUOBUqrUGk0Wm0Ouz+kMRrAxjJ+dMwaA5oFSTDjn5XOZCYENm7IVdPUcrmSHX5LK4g1qHmkw-rmUbvr9-oDxsD81b5qYImQxY5iUEXK7dvNzIsG3PLOZ4cqzIEO0ku7rGRHDWxxGzeopOdyYBBzQKC5odAjp8Sq8i4YtlW6HAdtgSiSSdoUnEVLELIEBwOowYHgy4YGh8+TCGId5jkK8wXOYASuJOQTEpYxYUrWBiHHhdrFpcFaBlS0F0t2epMpGLKFCUZSVDUKGWmhCzGIEuIogYQSVvCugOG6kTToqFymBYug8cie60jqsG9oxnxkAA6kUDBsAmHGCoWwp2C+4pzlKi4Yvo+IKqc0nYvo5iXLopgKSGdFHvBLJ6Q+EI2tCM4SvO0q1sYSwkRYKJttYQTttRna0YecF9saSFUF547cSYVywvY5i6NYxg7BieiYV6fhkRWBW5S5ME9gxJ7MbG8bsSOeacQZCDGOs052ORfr4SSxhusSAQIoYbiXBc2JktV8XKXVUYNcIaVoQiNi4gGIVrK4Dg2iutaBAcuF+Nu0QOqSVG3Pus21ceC1VDGS0tRa+mPvMz5im+KIoiu+i1vZxhrn4-0VjYwTObFV1KTdHlGst7XaH4xmfR+P3BbYa7RFcRJkrl5gzUpcOvdoFj+P5pkLjKS4LPoBxehYWIyYSlJxEAA */
  mailMachineModel.createMachine({
  context: mailMachineModel.initialContext,
  tsTypes: {} as import('./mail-machine.config.typegen').Typegen0,
  id: 'Mail Machine',
  initial: 'SECURE_SEND_OFF',
  states: {
    SECURE_SEND_OFF: {
      initial: 'IDLE',
      states: {
        IDLE: {
          always: {
            cond: 'draftHasChanged',
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
                cond: 'isValid',
              },
              {
                actions: 'setWarning',
                target: 'WARNING',
              },
            ],
          },
        },
        WARNING: {},
      },
      on: {
        toggle: {
          target: 'SECURE_SEND_ON',
        },
        draftChanged: {
          actions: ['setDraft', 'setDraftHasChanged'],
          target: '.VALIDATING',
        },
      },
    },
    SECURE_SEND_ON: {
      initial: 'IDLE',
      states: {
        IDLE: {
          always: {
            cond: 'draftHasChanged',
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
        toggle: {
          target: 'SECURE_SEND_OFF',
        },
        draftChanged: {
          actions: ['setDraft', 'setDraftHasChanged'],
          target: '.VALIDATING',
        },
      },
    },
  },
});
