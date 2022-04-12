import './index.less';
/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */
export default function PaletteProvider(palette, create, elementFactory, globalConnect, lassoTool) {
  this.create = create;
  this.elementFactory = elementFactory;
  this.globalConnect = globalConnect;
  this.lassoTool = lassoTool;
  palette.registerProvider(this);
}

PaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'spaceTool',
  'lassoTool',
  'translate',
];

PaletteProvider.prototype.getPaletteEntries = function (element) {
  const {
    create,
    elementFactory,
    lassoTool,
  } = this;
  function createTask(type) {
    return function (event) {
      const shape = elementFactory.createShape({
        type,
      });
      create.start(event, shape);
    };
  }
  return {
    'create:start': {
      group: 'model',
      className: 'bpmn-icon-start-event-none start',
      title: '创建一个开始节点',
      action: {
        dragstart: createTask('bpmn:StartEvent'),
        click: createTask('bpmn:StartEvent'),
      },
    },
    'create:approver': {
      group: 'model',
      className: 'bpmn-icon-task',
      title: '创建一个审批人节点',
      action: {
        dragstart: createTask('bpmn:UserTask'),
        click: createTask('bpmn:UserTask'),
      },
    },
    'create:gateway': {
      group: 'model',
      className: 'bpmn-icon-gateway-none',
      title: '创建一个条件节点',
      isAbstract: true,
      action: {
        dragstart: createTask('bpmn:ExclusiveGateway'),
        click: createTask('bpmn:ExclusiveGateway'),
      },
    },
    'create:end': {
      group: 'model',
      className: 'bpmn-icon-end-event-none',
      title: '创建一个结束节点',
      action: {
        dragstart: createTask('bpmn:EndEvent'),
        click: createTask('bpmn:EndEvent'),
      },
    },
    'lasso-tool': {
      group: 'tools',
      className: 'bpmn-icon-lasso-tool',
      title: '区域选择',
      action: {
        click(event) {
          lassoTool.activateSelection(event);
        },
      },
    },
  };
};
