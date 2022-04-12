import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Checkbox, Select, InputNumber, TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'umi';
import { arrUtils } from '@szsk/utils';
import {
  SELECTABLE_CONDITIONS,
  disposalType,
  VALUE_TYPE,
  OPERATE_TYPE,
  OVERDUE_TYPE,
} from '@/constants';
import SelectMap from '@/components/SelectMap';
import FormSection from '../components/FormSection';
import elementHelper from '@/components/CustomModeler/helper/element';
import './index.less';
import { delTreeEmptyNode, getAdaptedUserTree } from '@/utils/approveConfig';
import { getNumV, strToArr } from '../../../../helper/common';

interface IProps {
  onChange: Function;
  ele: any;
  modeler: any;
}

const initData = {
  selectedCondition: [],
  priceType: VALUE_TYPE.ALL,
  valueOprate: OPERATE_TYPE.GREATER_OR_EQUAL,
  price: 10000,
  overdue: OVERDUE_TYPE.ALL,
  disposalWay: '1',
  originator: [],
  assetCategory: [],
};

const FlowLinePanel = (props: IProps) => {
  const { userList = [] } = {};
  const { onChange, ele, modeler } = props;
  const { applyBusiness = [] } = {};
  const selectableConditions = SELECTABLE_CONDITIONS.toValues(
    applyBusiness,
  ).map((key: number) => ({
    label: SELECTABLE_CONDITIONS.toString(key).replace('（元）', ''),
    value: key,
  }));
  const [tab, setTab] = useState('content');
  const changeTab = (type: 'select' | 'content') => {
    setTab(type);
  };

  const [customP, setCustomP] = useState<any>({ $attrs: {} });
  const { priceType, valueOprate, price, disposalWay, overdue } =
    customP.$attrs;
  let { selectedCondition, originator, assetCategory } = customP.$attrs;

  originator = strToArr(originator);
  assetCategory = strToArr(assetCategory);
  selectedCondition = strToArr(selectedCondition, true);

  // 初始化以及获取customP
  useEffect(() => {
    setCustomP(init().customProperties);
  });

  const init = () => {
    const res = getUpdatedExtensionEles();
    const _props = {
      extensionElements: res.extensionElements,
    };
    if (res.isInit) {
      onChange && onChange(_props);
    }
    return res;
  };

  const myOnChange = (key: string, v: any) => {
    const _props = {
      extensionElements: getUpdatedExtensionEles(key, v).extensionElements,
      conditionExpression: getUpdatedCEEle(key, v),
    };
    onChange && onChange(_props);
  };

  const getUpdatedCEEle = (key: string, v: any) => {
    return modeler._moddle.create('bpmn:FormalExpression', {
      body: generateCE(key, v),
    });
  };

  // 获取更新的extention,key用来判断是改变数据
  const getUpdatedExtensionEles = (key?: string, v?: any) => {
    const bpmnFactory = modeler.get('bpmnFactory');
    // 初始化extensionElements
    const { isInit, extensionElements, customProperties } =
      elementHelper.updateExtension(
        ele,
        bpmnFactory,
        initData,
        key,
        v,
        (attrs: any) => {
          const d = { ...attrs };
          if (key === 'price' && !v) {
            d.price = 0;
          }
          if (
            key === 'selectedCondition' &&
            selectedCondition.length < v.length
          ) {
            const addKey = arrUtils.getArrDiff(selectedCondition, v)[0];
            if (addKey === SELECTABLE_CONDITIONS.ORIGIN) {
              // 原值
              d.priceType = initData.priceType;
              d.valueOprate = initData.valueOprate;
              d.price = initData.price;
            }
            if (addKey === SELECTABLE_CONDITIONS.OVERDUE) {
              // 逾期
              d.overdue = initData.overdue;
            }
            if (addKey === SELECTABLE_CONDITIONS.DISPOSE_TYPE) {
              // 处置方式
              d.disposalWay = initData.disposalWay;
            }
            if (addKey === SELECTABLE_CONDITIONS.SPONSOR) {
              // 发起人
              d.originator = initData.originator;
            }
            if (addKey === SELECTABLE_CONDITIONS.CATEGORY) {
              // 种类
              d.assetCategory = initData.assetCategory;
            }
          }
          return d;
        },
      );
    return { extensionElements, customProperties, isInit };
  };

  // 生成条件表达式 => ${xx == xx && yy == yy || (zz == zz)}
  const generateCE = (key: string, v: any) => {
    const newAttrs = { ...customP.$attrs, [key]: v };
    const {
      priceType: _priceType,
      valueOprate: _valueOprate,
      price: _price,
      disposalWay: _disposalWay,
      overdue: _overdue,
    } = newAttrs;
    let {
      selectedCondition: _selectedCondition,
      originator: _originator,
      assetCategory: _assetCategory,
    } = customP.$attrs;
    _originator = strToArr(_originator);
    _assetCategory = strToArr(_assetCategory);
    _selectedCondition = strToArr(_selectedCondition, true);
    let expression = '${';
    let cExpression = '';
    _selectedCondition.forEach((_key: number) => {
      if (_key === SELECTABLE_CONDITIONS.ORIGIN) {
        cExpression += `priceType == ${_priceType} && price ${OPERATE_TYPE.toOperate(
          _valueOprate,
        )} ${_price} && `;
      }
      if (_key === SELECTABLE_CONDITIONS.OVERDUE) {
        cExpression += `overdue == ${_overdue} && `;
      }
      if (_key === SELECTABLE_CONDITIONS.DISPOSE_TYPE) {
        cExpression += `disposalWay == ${_disposalWay} && `;
      }
      if (
        _key === SELECTABLE_CONDITIONS.SPONSOR &&
        _originator &&
        _originator.length
      ) {
        cExpression += '(';
        _originator.forEach((pId: string) => {
          // pId是userId-parentCode
          const userId = pId.split('-')[0];
          cExpression += `originator == '${userId}' || `;
        });
        cExpression = cExpression.slice(0, cExpression.length - 4);
        cExpression += ') && ';
      }
      if (
        _key === SELECTABLE_CONDITIONS.CATEGORY &&
        _assetCategory &&
        _assetCategory.length
      ) {
        cExpression += 'var:containsAny(assetCategoryList,';

        _assetCategory.forEach((cId: string) => {
          cExpression += `'${cId}',`;
        });
        cExpression = cExpression.slice(0, cExpression.length - 1);
        cExpression += ') && ';
      }
    });
    cExpression = cExpression.slice(0, cExpression.length - 4);
    if (cExpression) {
      expression += `${cExpression}}`;
    } else {
      expression = '';
    }
    return expression;
  };

  // 删除条件
  const onClose = (idx: number) => {
    myOnChange(
      'selectedCondition',
      selectedCondition.slice(0, idx).concat(selectedCondition.slice(idx + 1)),
    );
  };

  const renderValues = (type: number) => {
    switch (type) {
      case SELECTABLE_CONDITIONS.ORIGIN:
        return (
          <>
            <Select
              placeholder="请选择"
              style={{ width: '90px', marginRight: '8px' }}
              options={VALUE_TYPE.VALUES.map((key) => ({
                label: VALUE_TYPE.toString(key),
                value: key,
              }))}
              value={getNumV(priceType)}
              onChange={(e: any) => myOnChange('priceType', e)}
            />
            <Select
              placeholder="请选择"
              style={{ width: '100px', marginRight: '8px' }}
              options={OPERATE_TYPE.VALUES.map((key) => ({
                label: OPERATE_TYPE.toString(key),
                value: key,
              }))}
              value={getNumV(valueOprate)}
              onChange={(e: any) => myOnChange('valueOprate', e)}
            />
            <InputNumber
              placeholder="请输入"
              value={getNumV(price)}
              onChange={(e: any) => myOnChange('price', e)}
              min={0}
            />
          </>
        );
      case SELECTABLE_CONDITIONS.OVERDUE:
        return (
          <Select
            placeholder="请选择"
            style={{ width: '120px', marginRight: '8px' }}
            options={OVERDUE_TYPE.VALUES.map((key) => ({
              label: OVERDUE_TYPE.toString(key),
              value: key,
            }))}
            value={getNumV(overdue)}
            onChange={(e: any) => myOnChange('overdue', e)}
          />
        );
      case SELECTABLE_CONDITIONS.DISPOSE_TYPE:
        return (
          <Select
            value={disposalWay}
            onChange={(e: any) => myOnChange('disposalWay', e)}
            placeholder="请选择"
            style={{ width: '100%' }}
          >
            {/* {SelectMap(disposalType)} */}
          </Select>
        );
      case SELECTABLE_CONDITIONS.SPONSOR:
        return (
          <TreeSelect
            style={{ width: '100%' }}
            multiple
            placeholder="请选择"
            treeCheckable
            // treeData={delTreeEmptyNode(getAdaptedUserTree(userList))}
            value={originator}
            onChange={(e: any) => myOnChange('originator', e)}
          />
        );
      case SELECTABLE_CONDITIONS.CATEGORY:
        return (
          <TreeSelect
            style={{ width: '100%' }}
            multiple
            placeholder="请选择"
            treeCheckable
            fieldNames={{
              label: 'categoryName',
              value: 'categoryCode',
              children: 'childList',
            }}
            // treeData={assetTypeTree}
            value={assetCategory}
            onChange={(e: any) => myOnChange('assetCategory', e)}
          />
        );
      default:
        return '';
    }
  };

  const renderSelect = () => {
    return (
      <FormSection>
        <div className="m-select-part">
          <Checkbox.Group
            value={selectedCondition}
            options={selectableConditions}
            onChange={(keys: any[]) => myOnChange('selectedCondition', keys)}
          />
          <Button
            className="u-back-btn"
            type="primary"
            onClick={() => changeTab('content')}
          >
            确定
          </Button>
        </div>
      </FormSection>
    );
  };

  const renderConditions = () => {
    return (selectedCondition || []).map((key: number, idx: number) => {
      return (
        <FormSection key={key} onClose={() => onClose(idx)}>
          <div className="u-label f-required">
            {SELECTABLE_CONDITIONS.toString(key)}
          </div>
          <div className="m-value">{renderValues(key)}</div>
        </FormSection>
      );
    });
  };

  return (
    <div className="g-flow-line-panel">
      {tab === 'content' ? (
        <>
          <div className="m-top">
            <div className="m-tip">
              <ExclamationCircleFilled className="u-tip-icon" />
              <span className="u-tip">
                当审批单同时满足以下条件时，进入此流程
              </span>
            </div>
            <Button className="u-add-btn" onClick={() => changeTab('select')}>
              +添加条件
            </Button>
          </div>
          {renderConditions()}
        </>
      ) : (
        ''
      )}
      {tab === 'select' ? renderSelect() : ''}
    </div>
  );
};

export default React.memo(FlowLinePanel);
