import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './index.less';
import {
  CUSTOM_PANELS,
  NODE_TYPE,
} from '@/components/CustomModeler/helper/config';
import { is } from 'bpmnlint-utils';

interface IProps {
  modeler: any;
}

const CustomPanel = (props: IProps) => {
  const { modeler } = props;
  const [ele, setEle] = useState<any>();
  const [propData, setPropData] = useState<any>({});
  const [modifyModeler, setModifyModeler] = useState<boolean>(false);
  const modeling = modeler && modeler.get('modeling');
  const {
    businessObject: { sourceRef },
  } = ele || { businessObject: { sourceRef: null } };
  let { type } = ele || {};
  // 线处理，如果不是网关后面的线就变成普通线
  if (type === NODE_TYPE.LINE && sourceRef) {
    const incomEle = sourceRef;
    if (!is(incomEle, NODE_TYPE.EX_GATEWAY)) {
      type = NODE_TYPE.N_LINE;
    }
  }

  useEffect(() => {
    modeler && listenModeler();
    return () => {
      modeler && offListenModeler();
    };
  }, [modeler, ele, modeling]);

  const onSelectionChanged = useCallback(
    (e: any) => {
      const { newSelection } = e;
      const _ele = newSelection[0];
      setDefaultProperties(_ele);
    },
    [ele],
  );

  const onEleChanged = useCallback(
    (e: any) => {
      const { element } = e;
      if (!ele) {
        return;
      }
      if (element.id === ele.id) {
        setDefaultProperties(element);
      }
    },
    [ele],
  );

  const offListenModeler = () => {
    modeler.off('selection.changed', onSelectionChanged);
    modeler.off('element.changed', onEleChanged);
  };

  const listenModeler = () => {
    modeler.on('selection.changed', onSelectionChanged);
    modeler.on('element.changed', onEleChanged);
  };
  const setDefaultProperties = (_ele: any) => {
    if (_ele) {
      const { businessObject } = _ele;
      const { name } = businessObject;
      onPropChange({ name });
      setEle(_ele);
    } else {
      setEle(_ele);
    }
  };

  const onPropChange = useCallback(
    (data: any, modifyM?: boolean) => {
      setPropData({ ...propData, ...data });
      modifyM && setModifyModeler(!modifyModeler);
    },
    [propData, modifyModeler],
  );

  const onFieldChange = useCallback(
    (_data: any) => {
      onPropChange({ ..._data }, true);
    },
    [onPropChange],
  );

  useEffect(() => {
    ele && updateProperties();
  }, [modifyModeler]);

  const updateProperties = () => {
    modeling.updateProperties(ele, { ...propData });
  };

  const renderPanel = useMemo(() => {
    let PanelCom;
    if (CUSTOM_PANELS.includes(type)) {
      PanelCom = require(`./CustomPanels/${type.split(':')[1]}`).default;
    } else {
      PanelCom = require('./CustomPanels/Common').default;
    }
    if (PanelCom) {
      return <PanelCom ele={ele} onChange={onFieldChange} modeler={modeler} />;
    }
  }, [type, onFieldChange, ele]);

  return type ? (
    <div className="g-custom-panel">
      <div className="u-banner">{NODE_TYPE.toTitle(type)}</div>
      <div className="m-c">{renderPanel}</div>
    </div>
  ) : (
    <></>
  );
};

export default CustomPanel;
