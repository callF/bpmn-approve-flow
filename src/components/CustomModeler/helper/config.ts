export const customElements = [];
export const divLabelElements = customElements;
export const customConfig = {
  // 自定义元素的配置(后面会用到)
  'bpmn:StartEvent': {
    url: 'https://szzw001.oss-cn-hangzhou.aliyuncs.com/assetControl/app/1645534190961.jpg',
    attr: { x: 0, y: 0, width: 80, height: 47 },
  },
  'bpmn:Task': {
    url: 'https://szzw001.oss-cn-hangzhou.aliyuncs.com/assetControl/app/1645534190961.jpg',
    attr: { x: 0, y: 0, width: 80, height: 47 },
  },
  'bpmn:ExclusiveGateway': {
    url: 'https://szzw001.oss-cn-hangzhou.aliyuncs.com/assetControl/app/1645534190961.jpg',
    attr: { x: 0, y: 0, width: 80, height: 47 },
  },
  'bpmn:EndEvent': {
    url: 'https://szzw001.oss-cn-hangzhou.aliyuncs.com/assetControl/app/1645534190961.jpg',
    attr: { x: 0, y: 0, width: 80, height: 47 },
  },
};

// 节点类型
export const NODE_TYPE = {
  START: 'bpmn:StartEvent',
  USER_TASK: 'bpmn:UserTask',
  END: 'bpmn:EndEvent',
  LINE: 'bpmn:SequenceFlow',
  N_LINE: 'bpmn:NomalSequenceFlow',
  EX_GATEWAY: 'bpmn:ExclusiveGateway',
  toTitle: (v: string) => {
    switch (v) {
      case NODE_TYPE.START:
        return '开始节点';
      case NODE_TYPE.USER_TASK:
        return '审批人节点';
      case NODE_TYPE.END:
        return '结束节点';
      case NODE_TYPE.LINE:
        return '条件线';
      case NODE_TYPE.N_LINE:
        return '连线';
      case NODE_TYPE.EX_GATEWAY:
        return '条件节点';
      default:
        return '';
    }
  },
};
export const CUSTOM_PANELS = [NODE_TYPE.USER_TASK, NODE_TYPE.LINE];
