// const allRules = [
//   'conditional-flows',
//   'end-event-required',
//   'event-sub-process-typed-start-event',
//   'fake-join',
//   'label-required',
//   'no-complex-gateway',
//   'no-disconnected',
//   'no-duplicate-sequence-flows',
//   'no-gateway-join-fork',
//   'no-implicit-split',
//   'no-inclusive-gateway',
//   'single-blank-start-event',
//   'single-event-definition',
//   'start-event-required',
//   'sub-process-blank-start-event'
// ];

// module.exports = {
//   rules: allRules.reduce(function(rules, ruleName) {
//     rules[ruleName] = 'error';

//     return rules;
//   }, {})
// };

module.exports = {
  configs: {
    recommended: {
      rules: {
        'best-bpm-modeler/target-namespace': 'error',
        'best-bpm-modeler/no-manual-task': 'warn',
      },
    },
    all: {
      rules: {
        'best-bpm-modeler/target-namespace': 'error',
        'best-bpm-modeler/no-manual-task': 'warn',
        'best-bpm-modeler/empty-process': 'error',
        'best-bpm-modeler/gateway-no-link-end': 'error',
        // 'best-bpm-modeler/conditional-flows': 'error',
        'best-bpm-modeler/end-event-required': 'error',
        'best-bpm-modeler/event-sub-process-typed-start-event': 'error',
        // 'best-bpm-modeler/fake-join': 'error',
        // 'best-bpm-modeler/label-required': 'error',
        'best-bpm-modeler/no-complex-gateway': 'error',
        'best-bpm-modeler/no-disconnected': 'error',
        'best-bpm-modeler/no-disconnect-two': 'error',
        // 'best-bpm-modeler/start-usertask-required': 'error',
        'best-bpm-modeler/sequence-flow-attrs-required': 'error',
        // "best-bpm-modeler/best-bpm-modeler/no-duplicate-sequence-flows": "error",
        'best-bpm-modeler/no-gateway-join-fork': 'error',
        'best-bpm-modeler/no-implicit-split': 'error',
        'best-bpm-modeler/no-inclusive-gateway': 'error',
        'best-bpm-modeler/single-blank-start-event': 'error',
        'best-bpm-modeler/single-event-definition': 'error',
        'best-bpm-modeler/start-event-required': 'error',
        'best-bpm-modeler/sub-process-blank-start-event': 'error',
      },
    },
  },
};
