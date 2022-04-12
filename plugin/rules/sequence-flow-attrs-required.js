const {
  is,
} = require('bpmnlint-utils');

const find = require('lodash/find');

const SC = {
  ORIGIN: 1,
  OVERDUE: 2,
  DISPOSE_TYPE: 3,
  SPONSOR: 4,
  CATEGORY: 5,
};

module.exports = function () {
  function check(node, reporter) {
    if (is(node, 'bpmn:SequenceFlow')) {
      const { extensionElements } = node;
      if (extensionElements) {
        const properties = find(extensionElements.get('values'), (e) => {
          return is(e, 'flowable:CustomProperties');
        });
        const selectedCondition = strToArr(findValue(properties, 'selectedCondition'), true);
        if (selectedCondition && selectedCondition.length) {
          const sponsors = findValue(properties, 'originator');
          const cates = findValue(properties, 'assetCategory');
          if (selectedCondition.includes(SC.SPONSOR) && (!sponsors || !sponsors.length)) {
            reporter.report(node.id, '有条件线中的发起人为空！');
          }
          if (selectedCondition.includes(SC.CATEGORY) && (!cates || !cates.length)) {
            reporter.report(node.id, '有条件线中的资产分类为空！');
          }
        }
      }
    }
  }

  const strToArr = (str, toNumber) => {
    const getArr = (list) => {
      if (!toNumber) {
        return list;
      }
      return (list || []).map(Number);
    };
    return typeof str === 'string'
      ? (str ? getArr(str.split(',')) : [])
      : str;
  };

  function findValue(properties, name) {
    if (!properties) {
      return;
    }
    return properties.$attrs[name] || properties.get(name);
  }
  return {
    check,
  };
};
