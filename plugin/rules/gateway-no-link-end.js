// 缺少结束节点
const {
  is,
  isAny,
} = require('bpmnlint-utils')
;
/** * A rule that checks the presence of an end event per scope. */
module.exports = function () {
  function isLinkEnd(node) {
    const outgoing = node.outgoing || [];
    return (
      outgoing.some(node => is(node.targetRef, 'bpmn:EndEvent'))
    );
  }

  function check(node, reporter) {
    if (!isAny(node, [
      'bpmn:ExclusiveGateway',
    ])) {
      return;
    }
    if (isLinkEnd(node)) {
      reporter.report(node.id, '条件节点不能连接结束节点！');
    }

    const outgoing = node.outgoing || [];
    if (outgoing.length <= 1) {
      reporter.report(node.id, '条件节点至少连接两条分支！');
    }
  }

  return { check };
};
