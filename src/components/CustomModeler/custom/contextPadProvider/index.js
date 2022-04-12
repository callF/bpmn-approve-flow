import inherits from 'inherits';

import ContextPadProvider from 'bpmn-js/lib/features/context-pad/ContextPadProvider';

import { is } from 'bpmn-js/lib/util/ModelUtil';

import { assign } from 'min-dash';

inherits(CustomContextPadProvider, ContextPadProvider);

CustomContextPadProvider.$inject = [
  'injector',
  'connect',
  'translate',
  'elementFactory',
];

export default function CustomContextPadProvider(injector, connect, translate) {
  injector.invoke(ContextPadProvider, this);

  // var cached = bind(this.getContextPadEntries, this)
  // var rules = this._rules
  const elementFactory = this._elementFactory;
  const create = this._create;
  const autoPlace = this._autoPlace;
  const modeling = this._modeling;
  // const contextPad = this._contextPad;
  // const popupMenu = this._popupMenu;
  // const canvas = this._canvas;

  this.getContextPadEntries = function (element) {
    const actions = {};
    const { businessObject, outgoing } = element;
    function startConnect(event, element, autoActivate) {
      connect.start(event, element, autoActivate);
    }

    function appendAction(type, className, title, options) {
      if (typeof title !== 'string') {
        options = title;
        title = translate('Append {type}', { type: type.replace(/^bpmn:/, '') });
      }

      function appendStart(event, element) {
        const shape = elementFactory.createShape(assign({ type }, options));
        create.start(event, shape, {
          source: element,
        });
      }

      const append = autoPlace
        ? function (event, element) {
          const shape = elementFactory.createShape(
            assign({ type }, options),
          );

          autoPlace.append(element, shape);
        }
        : appendStart;

      const shortType = type.replace(/^bpmn:/, '');
      return {
        group: 'model',
        className,
        title: translate(title || 'Create {type}', { type: shortType } || 'Append {type}', { type: shortType }),
        action: {
          dragstart: appendStart,
          click: append,
        },
      };
    }

    function removeElement() {
      modeling.removeElements([element]);
    }

    // function getReplaceMenuPosition(element) {
    //   const Y_OFFSET = 5;

    //   const diagramContainer = canvas.getContainer();
    //   const pad = contextPad.getPad(element).html;

    //   const diagramRect = diagramContainer.getBoundingClientRect();
    //   const padRect = pad.getBoundingClientRect();

    //   const top = padRect.top - diagramRect.top;
    //   const left = padRect.left - diagramRect.left;

    //   const pos = {
    //     x: left,
    //     y: top + padRect.height + Y_OFFSET,
    //   };

    //   return pos;
    // }
    const isStartNode = is(businessObject, 'bpmn:StartEvent');
    const isEGateway = is(businessObject, 'bpmn:ExclusiveGateway');
    const isEndNode = is(businessObject, 'bpmn:EndEvent');
    const isSequenceF = is(businessObject, 'bpmn:SequenceFlow');
    // 定义开始节点 扩展的操作
    if (isStartNode && !outgoing.length) {
      assign(actions, {
        'append.gateway': appendAction(
          'bpmn:ExclusiveGateway',
          'bpmn-icon-gateway-xor',
          translate('创建一个条件节点'),
        ),
        'append.user-task': appendAction(
          'bpmn:UserTask',
          'bpmn-icon-user-task',
          translate('创建一个审批人节点'),
        ),
      });
    } else if (isEGateway) {
      assign(actions, {
        'append.user-task': appendAction(
          'bpmn:UserTask',
          'bpmn-icon-user-task',
          translate('创建一个审批人节点'),
        ),
      });
    } else if (!isEndNode && !isSequenceF && !outgoing.length) {
      assign(actions, {
        'append.end-event': appendAction(
          'bpmn:EndEvent',
          'bpmn-icon-end-event-none',
          translate('创建一个结束节点'),
        ),
        'append.gateway': appendAction(
          'bpmn:ExclusiveGateway',
          'bpmn-icon-gateway-xor',
          translate('创建一个条件节点'),
        ),
        'append.user-task': appendAction(
          'bpmn:UserTask',
          'bpmn-icon-user-task',
          translate('创建一个审批人节点'),
        ),
      });
    }
    if ((!isEndNode && !isSequenceF && !isEGateway && !outgoing.length) || isEGateway) {
      assign(actions, {
        connect: {
          group: 'connect',
          className: 'bpmn-icon-connection-multi',
          title: translate('创建连线'),
          action: {
            click: startConnect,
            dragstart: startConnect,
          },
        },
      });
    }

    // if (!popupMenu.isEmpty(element, 'bpmn-replace')) {
    // Replace menu entry
    // assign(actions, {
    //   replace: {
    //     group: 'edit',
    //     className: 'bpmn-icon-screw-wrench',
    //     title: translate('Change type'),
    //     action: {
    //       click(event, element) {
    //         const position = assign(getReplaceMenuPosition(element), {
    //           cursor: { x: event.x, y: event.y },
    //         });

    //         popupMenu.open(element, 'bpmn-replace', position);
    //       },
    //     },
    //   },
    // });
    // }

    assign(actions, {
      delete: {
        group: 'edit',
        className: 'bpmn-icon-trash',
        title: translate('删除'),
        action: {
          click: removeElement,
        },
      },
    });
    return actions;
  };
}
