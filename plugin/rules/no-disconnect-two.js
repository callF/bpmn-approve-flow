import { isAny } from 'bpmnlint-utils';
/** * A rule that verifies that there exists no disconnected * flow elements, i.e. elements without incoming * _or_ outgoing sequence flows */
export default function () {
  function check(node, reporter) {
    if (!isAny(node, [
      'bpmn:UserTask',
      'bpmn:ExclusiveGateway',
    ])) {
      return;
    }
    const incoming = node.incoming || [];
    const outgoing = node.outgoing || [];
    if (!incoming.length || !outgoing.length) {
      reporter.report(node.id, '存在节点没有连线或者出线！');
    }
  }

  return {
    check,
  };
}
