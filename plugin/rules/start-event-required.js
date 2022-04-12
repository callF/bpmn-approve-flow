const {
  is,
  isAny,
} = require('bpmnlint-utils');
/** * A rule that checks for the presence of a start event per scope. */
module.exports = function () {
  function hasStartEvent(node) {
    const flowElements = node.flowElements || [];
    return (
      flowElements.some(node => is(node, 'bpmn:StartEvent'))
    );
  }

  function hasUserTask(node) {
    const flowElements = node.flowElements || [];
    return (
      flowElements.some(node => is(node, 'bpmn:UserTask'))
    );
  }

  function check(node, reporter) {
    if (!isAny(node, [
      'bpmn:Process',
      'bpmn:SubProcess',
    ])) {
      return;
    }

    const type = is(node, 'bpmn:SubProcess') ? 'Sub process' : '流程';
    if (!hasStartEvent(node)) {
      reporter.report(node.id, `${type}缺少开始节点！`);
    }
    if (!hasUserTask(node)) {
      reporter.report(node.id, `${type}缺少审批人节点！`);
    }
  }

  return { check };
};
