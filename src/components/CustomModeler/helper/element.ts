'use strict';

interface IEleHelper {
  createElement: (
    elementType: any,
    properties: any,
    parent: any,
    factory: any,
  ) => any;
  updateExtension: (
    ele: any,
    bpmnFactory: any,
    initData: any,
    key?: string,
    v?: any,
    onChangeCustomProps?: Function,
  ) => { isInit: boolean; extensionElements: any; customProperties: any };
  updateLoopCharacteristics: (
    ele: any,
    bpmnFactory: any,
    initData: any,
    key?: string,
    v?: any,
    onChangeBody?: Function,
  ) => any;
}

const ElementHelper: IEleHelper = {};
export default ElementHelper;

/**
 * Creates a new element and set the parent to it
 *
 * @method ElementHelper#createElement
 *
 * @param {String} elementType of the new element
 * @param {Object} properties of the new element in key-value pairs
 * @param {moddle.object} parent of the new element
 * @param {BpmnFactory} factory which creates the new element
 *
 * @returns {djs.model.Base} element which is created
 */
ElementHelper.createElement = function (
  elementType,
  properties,
  parent,
  factory,
) {
  const element = factory.create(elementType, properties);
  element.$parent = parent;
  return element;
};

ElementHelper.updateExtension = function (
  ele: any,
  bpmnFactory: any,
  initData: any,
  key?: string,
  v?: any,
  onChangeCustomProps?: Function,
) {
  const { businessObject } = ele || {};
  let isInit = false;
  // 初始化extensionElements
  let extensionElements = businessObject.get('extensionElements');
  if (!extensionElements) {
    isInit = true;
    extensionElements = ElementHelper.createElement(
      'bpmn:ExtensionElements',
      null,
      ele,
      bpmnFactory,
    );
  }
  const res = extensionElements.get('values');
  let customProperties;
  for (let i = 0; i < res.length; i++) {
    if (
      extensionElements.get('values')[i] &&
      extensionElements.get('values')[i].$type === 'flowable:CustomProperties'
    ) {
      customProperties = extensionElements.get('values')[i];
    }
  }
  // 初始化或赋值customProperties
  if (!customProperties) {
    // 初始化数据
    customProperties = ElementHelper.createElement(
      'flowable:CustomProperties',
      initData,
      ele,
      bpmnFactory,
    );
    extensionElements.get('values').push(customProperties);
  } else if (key) {
    // 更新数据
    let d = customProperties.$attrs;
    d[key] = v;
    if (onChangeCustomProps) {
      d = onChangeCustomProps({ ...d });
    }
    customProperties = ElementHelper.createElement(
      'flowable:CustomProperties',
      d,
      ele,
      bpmnFactory,
    );
    extensionElements.get('values')[0] = customProperties;
  }
  return {
    isInit,
    extensionElements,
    customProperties,
  };
};

ElementHelper.updateLoopCharacteristics = (
  ele: any,
  bpmnFactory: any,
  initData: any,
  key?: string,
  v?: any,
  onChangeBody?: Function,
) => {
  const { businessObject, id } = ele || {};
  // 初始化multiInstanceLoopCharacteristics
  let multiInstanceLoopCharacteristics = businessObject.get(
    'loopCharacteristics',
  );
  if (!multiInstanceLoopCharacteristics) {
    multiInstanceLoopCharacteristics = ElementHelper.createElement(
      'bpmn:MultiInstanceLoopCharacteristics',
      { elementVariable: 'assignee', collection: `assigneeList_${id}` },
      ele,
      bpmnFactory,
    );
    // 初始化为或签
    const completionCondition = ElementHelper.createElement(
      'bpmn:Expression',
      initData,
      multiInstanceLoopCharacteristics,
      bpmnFactory,
    );
    multiInstanceLoopCharacteristics.$attrs.isSequential = false;
    multiInstanceLoopCharacteristics.completionCondition = completionCondition;
  } else if (key === 'mutiApproverWay') {
    // 会签或签，mutiApproverWay目前是会签或签的key
    const { completionCondition } = multiInstanceLoopCharacteristics;
    if (onChangeBody) {
      completionCondition.body = onChangeBody();
    }
  }
  return multiInstanceLoopCharacteristics;
};
