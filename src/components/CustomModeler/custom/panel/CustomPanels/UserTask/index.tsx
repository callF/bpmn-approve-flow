import React, { useEffect, useState } from 'react';
import { Radio, TreeSelect } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useSelector } from 'umi';
import FormSection from '../components/FormSection';
import './index.less';
import {
  APPROVER_APPROVE_TYPE,
  APPROVER_TYPE,
  MUTI_APPROVER_WAYS,
} from '@/constants';
import { delTreeEmptyNode, getAdaptedUserTree } from '@/utils/approveConfig';
import elementHelper from '@/components/CustomModeler/helper/element';
import { getNumV, strToArr } from '../../../../helper/common';

interface IProps {
  onChange: Function;
  ele: any;
  modeler: any;
}

const initData = {
  approvalType: APPROVER_APPROVE_TYPE.ARTIFICIAL,
  mutiApproverWay: MUTI_APPROVER_WAYS.OR,
  roles: [],
  users: [],
  approvalAgentType: APPROVER_TYPE.ROLE,
};

const UserTaskPanel = (props: IProps) => {
  const { approveRoles = [], userList = [] } = {};

  const { onChange, ele, modeler } = props;
  const [customP, setCustomP] = useState<any>({ $attrs: {} });

  const {
    approvalType, // 审批类型 （人工审批-1 自动审批通过-2自动审批拒绝-3）
    mutiApproverWay, // 会签或签
    approvalAgentType, // 审批人代理类型
  } = customP.$attrs;

  let { roles, users } = customP.$attrs;
  roles = strToArr(roles);
  users = strToArr(users);

  // 初始化以及获取customP
  useEffect(() => {
    setCustomP(init().customProperties);
  });

  const init = () => {
    const res = getUpdatedExtensionEles();
    const _props = {
      extensionElements: res.extensionElements,
      loopCharacteristics: res.multiInstanceLoopCharacteristics,
      'flowable:assignee': '${assignee}',
    };
    if (res.isInit) {
      onChange && onChange(_props);
    }

    return res;
  };

  const approveTypes = APPROVER_APPROVE_TYPE.VALUES.map((key) => ({
    label: APPROVER_APPROVE_TYPE.toString(key),
    value: key,
  }));
  const approverTypes = APPROVER_TYPE.VALUES.map((key) => ({
    label: APPROVER_TYPE.toString(key),
    value: key,
  }));
  const mutiApproverWays = MUTI_APPROVER_WAYS.VALUES.map((key) => ({
    label: MUTI_APPROVER_WAYS.toString(key),
    value: key,
  }));

  const myOnChange = (key: string, v: any) => {
    const _props: any = {
      extensionElements: getUpdatedExtensionEles(key, v).extensionElements,
    };
    if (key === 'approverType') {
      _props['flowable:candidateUsers'] = '';
      _props['flowable:candidateGroups'] = '';
    }
    if (key === 'users') {
      _props['flowable:candidateUsers'] = v.map(
        (pId: string) => pId.split('-')[0],
      );
    }
    if (key === 'roles') {
      _props['flowable:candidateGroups'] = v;
    }
    onChange && onChange(_props);
  };

  // 获取更新的extention
  const getUpdatedExtensionEles = (key?: string, v?: any) => {
    const bpmnFactory = modeler.get('bpmnFactory');
    // 初始化multiInstanceLoopCharacteristics
    const multiInstanceLoopCharacteristics =
      elementHelper.updateLoopCharacteristics(
        ele,
        bpmnFactory,
        { body: '${nrOfCompletedInstances == 1}' },
        key,
        v,
        () => {
          if (v === MUTI_APPROVER_WAYS.OR) {
            return '${nrOfCompletedInstances == 1}';
          }
          return '${nrOfCompletedInstances/nrOfInstances == 1}';
        },
      );
    // 初始化Extension+customProperties
    const { isInit, extensionElements, customProperties } =
      elementHelper.updateExtension(
        ele,
        bpmnFactory,
        initData,
        key,
        v,
        (attrs: any) => {
          const d = { ...attrs };
          if (key === 'approverType') {
            d.users = [];
            d.roles = [];
          }
          return d;
        },
      );

    return {
      extensionElements,
      customProperties,
      isInit,
      multiInstanceLoopCharacteristics,
    };
  };

  return (
    <div className="g-user-task-panel">
      <div className="m-top">
        <div className="m-tip">
          <ExclamationCircleFilled className="u-tip-icon" />
          <span className="u-tip">
            审批人为空时，需要用户提交或审批单据时自行指定审批人员
          </span>
        </div>
      </div>
      <FormSection>
        <div className="u-label">审批类型</div>
        <div className="m-value">
          <Radio.Group
            options={approveTypes}
            value={getNumV(approvalType)}
            onChange={(e: any) => myOnChange('approvalType', e.target.value)}
          />
        </div>
      </FormSection>
      <FormSection>
        <div className="u-label">设置审批人</div>
        <div className="m-value">
          <Radio.Group
            options={approverTypes}
            value={getNumV(approvalAgentType)}
            onChange={(e: any) => {
              myOnChange('approvalAgentType', e.target.value);
            }}
          />
        </div>
        <div className="m-modify-user">
          <div className="u-label">
            {getNumV(approvalAgentType) === APPROVER_TYPE.MEMBER
              ? '修改成员'
              : '修改角色'}
          </div>
          {getNumV(approvalAgentType) === APPROVER_TYPE.MEMBER ? (
            <TreeSelect
              style={{ width: '100%' }}
              treeDefaultExpandAll
              multiple
              placeholder="请选择"
              treeCheckable
              treeData={delTreeEmptyNode(getAdaptedUserTree(userList))}
              value={typeof users === 'string' ? users.split(',') : users}
              onChange={(e: any) => myOnChange('users', e)}
            />
          ) : (
            <TreeSelect
              style={{ width: '100%' }}
              treeDefaultExpandAll
              multiple
              placeholder="请选择"
              treeCheckable
              value={typeof roles === 'string' ? roles.split(',') : roles}
              onChange={(e: any) => myOnChange('roles', e)}
              treeData={approveRoles}
            />
          )}
        </div>
      </FormSection>
      <FormSection>
        <div className="u-label">多人审批时方式</div>
        <div className="m-value">
          <Radio.Group
            options={mutiApproverWays}
            value={getNumV(mutiApproverWay)}
            onChange={(e: any) => myOnChange('mutiApproverWay', e.target.value)}
          />
        </div>
      </FormSection>
    </div>
  );
};

export default UserTaskPanel;
