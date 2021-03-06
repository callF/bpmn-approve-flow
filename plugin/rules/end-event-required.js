// 缺少结束节点
const {
  is,
  isAny,
} = require('bpmnlint-utils')
;
/** * A rule that checks the presence of an end event per scope. */
module.exports = function () {
  function hasEndEvent(node) {
    const flowElements = node.flowElements || [];
    return (
      flowElements.some(node => is(node, 'bpmn:EndEvent'))
    );
  }

  function check(node, reporter) {
    if (!isAny(node, [
      'bpmn:Process',
      'bpmn:SubProcess',
    ])) {
      return;
    }

    if (!hasEndEvent(node)) {
      const type = is(node, 'bpmn:SubProcess') ? 'Sub process' : '流程';
      reporter.report(node.id, `${type}缺少结束节点！`);
    }
  }

  return { check };
};
