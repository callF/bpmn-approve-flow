// 审批状态
export const APPROVE_STATUS = {
  UNACTIVE: 0,
  CREATE: 1,
  RETURN: 2,
  PASS: 3,
  ING: 4,
  NO_APPROVE: 5,
  REJECT: 6,
  toKey: (v: number) => {
    switch (v) {
      case APPROVE_STATUS.PASS:
        return 'pass';
      case APPROVE_STATUS.REJECT:
        return 'reject';
      case APPROVE_STATUS.RETURN:
        return 'return';
      case APPROVE_STATUS.UNACTIVE:
        return 'unactive';
      case APPROVE_STATUS.NO_APPROVE:
        return 'unactive';
      default:
        return '';
    }
  },
  // toString: (v: number) => {
  //   switch (v) {
  //     case APPROVE_STATUS.UNACTIVE:
  //       return '未激活';
  //     case APPROVE_STATUS.CREATE:
  //     case APPROVE_STATUS.RETURN:
  //     case APPROVE_STATUS.PASS:
  //     case APPROVE_STATUS.ING:
  //     case APPROVE_STATUS.WITHDRAW:
  //     case APPROVE_STATUS.REJECT:
  //     default:
  //       return '';
  //   }
  // }
};

export const APPROVE_FLOW_TYPES = {
  CHANGE: 2,
  DISPOSE: 3,
  TRANSFER: 5,
  SUBSCRIBE: 4,
  CLAIM: 1,
  BORROW: 8,
  RETURN: 9,
  HAND_OVER: 10,
  VALUES: [2, 5, 3, 1, 4, 8, 9, 10],
  toString: (v: number | string) => {
    switch (+v) {
      case APPROVE_FLOW_TYPES.CLAIM:
        return '资产申领';
      case APPROVE_FLOW_TYPES.SUBSCRIBE:
        return '资产申购';
      case APPROVE_FLOW_TYPES.DISPOSE:
        return '资产处置';
      case APPROVE_FLOW_TYPES.TRANSFER:
        return '资产移交';
      case APPROVE_FLOW_TYPES.CHANGE:
        return '资产变动';
      case APPROVE_FLOW_TYPES.BORROW:
        return '资产借用';
      case APPROVE_FLOW_TYPES.RETURN:
        return '资产归还';
      case APPROVE_FLOW_TYPES.HAND_OVER:
        return '资产交回';
      default:
        return '未知';
    }
  },
  toKey: (v: number | string) => {
    switch (+v) {
      case APPROVE_FLOW_TYPES.CLAIM:
        return 'claim';
      case APPROVE_FLOW_TYPES.SUBSCRIBE:
        return 'subscribe';
      case APPROVE_FLOW_TYPES.DISPOSE:
        return 'dispose';
      case APPROVE_FLOW_TYPES.TRANSFER:
        return 'transfer';
      case APPROVE_FLOW_TYPES.CHANGE:
        return 'change';
      case APPROVE_FLOW_TYPES.BORROW:
        return 'borrow';
      case APPROVE_FLOW_TYPES.RETURN:
        return 'return';
      case APPROVE_FLOW_TYPES.HAND_OVER:
        return 'handOver';
      default:
        return '未知';
    }
  },
  toResourceName: (v: number | string, id: string) => {
    let name = '';
    switch (+v) {
      case APPROVE_FLOW_TYPES.CLAIM:
        name = 'zcsl';
        break;
      case APPROVE_FLOW_TYPES.SUBSCRIBE:
        name = 'zcsg';
        break;
      case APPROVE_FLOW_TYPES.DISPOSE:
        name = 'zccz';
        break;
      case APPROVE_FLOW_TYPES.TRANSFER:
        name = 'zcyj';
        break;
      case APPROVE_FLOW_TYPES.CHANGE:
        name = 'zcbd';
        break;
      case APPROVE_FLOW_TYPES.BORROW:
        name = 'zcjy';
        break;
      case APPROVE_FLOW_TYPES.RETURN:
        name = 'zcgh';
        break;
      case APPROVE_FLOW_TYPES.HAND_OVER:
        name = 'zcjh';
        break;
      default:
        break;
    }
    return `${name}_${id}.bpmn20.xml`;
  },
};

// 审核回退方式
export const APPROVE_RETURN_WAYS = {
  RELUNCH: 1,
  BACK: 2,
  VALUES: [1, 2],
  toString: (v: number) => {
    switch (v) {
      case APPROVE_RETURN_WAYS.RELUNCH:
        return '回退至发起人';
      case APPROVE_RETURN_WAYS.BACK:
        return '逐级回退';
      default:
        return '';
    }
  },
};

// 当提交的单据不满足所有审批流程时
export const APPROVE_EXTRA_WAYS = {
  OK: 1,
  REJECT: 2,
  VALUES: [1, 2],
  toString: (v: number) => {
    switch (v) {
      case APPROVE_EXTRA_WAYS.OK:
        return '单据允许提交，提交成功';
      case APPROVE_EXTRA_WAYS.REJECT:
        return '单据不允许提交，提交失败';
      default:
        return '';
    }
  },
};

// 资源是否变更
export const RESOURCE_CHANGED = {
  FALSE: 0,
  TRUE: 1,
};

// 保存类型
export const SUBMIT_TYPE = {
  SAVE: 1,
  RELEASE: 2,
};

// 列表启用/禁用类型
export const CONFIG_STATUS = {
  ENABLED: '1',
  DISABLED: '0',
  VALUES: ['1', '0'],
  toString: (v: string) => {
    switch (v) {
      case CONFIG_STATUS.ENABLED:
        return '已启用';
      case CONFIG_STATUS.DISABLED:
        return '已停用';
      default:
        return '未知';
    }
  },
  toKey: (v: string) => {
    switch (v) {
      case CONFIG_STATUS.ENABLED:
        return 'enabled';
      case CONFIG_STATUS.DISABLED:
        return 'disabled';
      default:
        return '未知';
    }
  },
};

// 审批人节点 类型
export const APPROVER_APPROVE_TYPE = {
  ARTIFICIAL: 1,
  PASS: 2,
  REJECT: 3,
  VALUES: [1, 2, 3],
  toString: (v: number) => {
    switch (v) {
      case APPROVER_APPROVE_TYPE.ARTIFICIAL:
        return '人工审批';
      case APPROVER_APPROVE_TYPE.PASS:
        return '自动通过';
      case APPROVER_APPROVE_TYPE.REJECT:
        return '自动拒绝';
      default:
        return '';
    }
  },
};

// 审批人类型
export const APPROVER_TYPE = {
  ROLE: 1,
  MEMBER: 2,
  VALUES: [1, 2],
  toString: (v: number) => {
    switch (v) {
      case APPROVER_TYPE.ROLE:
        return '指定角色';
      case APPROVER_TYPE.MEMBER:
        return '指定成员';
      default:
        return '';
    }
  },
};

// 多人审批方式
export const MUTI_APPROVER_WAYS = {
  OR: 1,
  AND: 2,
  VALUES: [1, 2],
  toString: (v: number) => {
    switch (v) {
      case MUTI_APPROVER_WAYS.OR:
        return '或签（一名审批人同意、不同意或退回即可）';
      case MUTI_APPROVER_WAYS.AND:
        return '会签（须所有审批人同意）';
      default:
        return '';
    }
  },
  toName: (v: number) => {
    switch (v) {
      case MUTI_APPROVER_WAYS.OR:
        return '或签';
      case MUTI_APPROVER_WAYS.AND:
        return '会签';
      default:
        return '';
    }
  },
};

// 审核人为空时通过类型
export const APPROVER_PASS_TYPE = {
  PASS: 1,
  SELECT: 2,
  VALUES: [1, 2],
  toString: (v: number) => {
    switch (v) {
      case APPROVER_PASS_TYPE.PASS:
        return '自动通过';
      case APPROVER_PASS_TYPE.SELECT:
        return '指定人员审批';
      default:
        return '';
    }
  },
};

// 条件节点可选
export const SELECTABLE_CONDITIONS = {
  ORIGIN: 1,
  OVERDUE: 2,
  DISPOSE_TYPE: 3,
  SPONSOR: 4,
  CATEGORY: 5,
  VALUES: [1, 2, 3, 4, 5],
  toString: (v: number) => {
    switch (v) {
      case SELECTABLE_CONDITIONS.ORIGIN:
        return '原值（元）';
      case SELECTABLE_CONDITIONS.OVERDUE:
        return '逾期资产';
      case SELECTABLE_CONDITIONS.DISPOSE_TYPE:
        return '处置方式';
      case SELECTABLE_CONDITIONS.SPONSOR:
        return '发起人';
      case SELECTABLE_CONDITIONS.CATEGORY:
        return '资产分类';
      default:
        return '';
    }
  },
  toValues: (v: number) => {
    switch (+v) {
      case APPROVE_FLOW_TYPES.CLAIM:
        return [SELECTABLE_CONDITIONS.SPONSOR];
      case APPROVE_FLOW_TYPES.SUBSCRIBE:
        return [SELECTABLE_CONDITIONS.SPONSOR, SELECTABLE_CONDITIONS.CATEGORY];
      case APPROVE_FLOW_TYPES.DISPOSE:
        return [
          SELECTABLE_CONDITIONS.ORIGIN,
          SELECTABLE_CONDITIONS.OVERDUE,
          SELECTABLE_CONDITIONS.DISPOSE_TYPE,
          SELECTABLE_CONDITIONS.SPONSOR,
          SELECTABLE_CONDITIONS.CATEGORY,
        ];
      case APPROVE_FLOW_TYPES.TRANSFER:
        return [
          SELECTABLE_CONDITIONS.ORIGIN,
          SELECTABLE_CONDITIONS.OVERDUE,
          SELECTABLE_CONDITIONS.SPONSOR,
          SELECTABLE_CONDITIONS.CATEGORY,
        ];
      case APPROVE_FLOW_TYPES.CHANGE:
        return [
          SELECTABLE_CONDITIONS.ORIGIN,
          SELECTABLE_CONDITIONS.OVERDUE,
          SELECTABLE_CONDITIONS.SPONSOR,
          SELECTABLE_CONDITIONS.CATEGORY,
        ];
      case APPROVE_FLOW_TYPES.BORROW:
        return [SELECTABLE_CONDITIONS.SPONSOR, SELECTABLE_CONDITIONS.CATEGORY];
      case APPROVE_FLOW_TYPES.RETURN:
        return [
          SELECTABLE_CONDITIONS.ORIGIN,
          SELECTABLE_CONDITIONS.OVERDUE,
          SELECTABLE_CONDITIONS.SPONSOR,
          SELECTABLE_CONDITIONS.CATEGORY,
        ];
      case APPROVE_FLOW_TYPES.HAND_OVER:
        return [SELECTABLE_CONDITIONS.SPONSOR, SELECTABLE_CONDITIONS.CATEGORY];
      default:
        return [];
    }
  },
};

// 值类型
export const VALUE_TYPE = {
  ALL: 1,
  SINGLE: 2,
  VALUES: [1, 2],
  toString: (v: number) => {
    switch (v) {
      case VALUE_TYPE.ALL:
        return '合计值';
      case VALUE_TYPE.SINGLE:
        return '单条值';
      default:
        return '';
    }
  },
};

// 值操作类型
export const OPERATE_TYPE = {
  GREATER_OR_EQUAL: 1,
  LESS_OR_EQUAL: 2,
  LESS: 3,
  GREATER: 4,
  EQUAL: 5,
  VALUES: [1, 2, 3, 4, 5],
  toString: (v: number) => {
    switch (v) {
      case OPERATE_TYPE.GREATER_OR_EQUAL:
        return '大于等于';
      case OPERATE_TYPE.LESS_OR_EQUAL:
        return '小于等于';
      case OPERATE_TYPE.LESS:
        return '小于';
      case OPERATE_TYPE.GREATER:
        return '大于';
      case OPERATE_TYPE.EQUAL:
        return '等于';
      default:
        return '';
    }
  },
  toOperate: (v: number) => {
    switch (v) {
      case OPERATE_TYPE.GREATER_OR_EQUAL:
        return '>=';
      case OPERATE_TYPE.LESS_OR_EQUAL:
        return '<=';
      case OPERATE_TYPE.LESS:
        return '<';
      case OPERATE_TYPE.GREATER:
        return '>';
      case OPERATE_TYPE.EQUAL:
        return '==';
      default:
        return '';
    }
  },
};

// 逾期类型
export const OVERDUE_TYPE = {
  ALL: 1,
  NOT: 2,
  HAS: 3,
  HAS_NOT: 4,
  VALUES: [1, 2, 3, 4],
  toString: (v: number) => {
    switch (v) {
      case OVERDUE_TYPE.ALL:
        return '全部逾期';
      case OVERDUE_TYPE.NOT:
        return '全部不逾期';
      case OVERDUE_TYPE.HAS:
        return '存在逾期';
      case OVERDUE_TYPE.HAS_NOT:
        return '存在不逾期';
      default:
        return '';
    }
  },
};

// 是否逾期
export const IS_OVERDUE = {
  TRUE: 1,
  FALSE: 2,
  VALUES: [1, 2],
  toString: (v: number) => {
    switch (v) {
      case IS_OVERDUE.TRUE:
        return '是';
      case IS_OVERDUE.FALSE:
        return '否';
      default:
        return '';
    }
  },
};
