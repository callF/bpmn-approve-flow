// 缺少结束节点
const {
  isAny,
} = require('bpmnlint-utils');
/** * A rule that checks the presence of an end event per scope. */
module.exports = function () {
  function isEmpty(node) {
    return !(node.flowElements || []).length;
  }

  function check(node, reporter) {
    if (!isAny(node, [
      'bpmn:Process',
    ])) {
      return;
    }

    if (isEmpty(node)) {
      reporter.report(node.id, '未配置流程！');
    }
  }

  return { check };
};
