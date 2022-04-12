import React, { useEffect, useState } from 'react';
import minimapModule from 'diagram-js-minimap';
import lintModule from 'bpmn-js-bpmnlint';
import CustomModeler from '@/components/CustomModeler';
import 'diagram-js-minimap/assets/diagram-js-minimap.css';
import moddleDescriptor from '@/components/CustomModeler/custom/descriptor/flowable.json';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
import './index.less';
import bpmnlintConfig from '../../../../.bpmnlintrc';
import CustomPanel from '@/components/CustomModeler/custom/panel';
import {
  generateUUID,
  getInitXml,
} from '@/components/CustomModeler/helper/init';

const ApproveFlow = () => {
  const [uuId] = useState(generateUUID());
  const [xmlChanged, setXmlChanged] = useState(false);
  const [initXml, setXml] = useState(getInitXml(uuId));
  // xml配置错误信息
  const [errMsg, setErrMsg] = useState('');
  const [bpmnModeler, setModeler] = useState<any>();
  useEffect(() => {
    initBpmn();
  }, []);

  const onChange = (xmlStr: string) => {
    setXml(xmlStr);
    setXmlChanged(true);
  };

  // 画图成功回调
  const success = () => {
    // 触发错误检查，防止草稿错误通过
    toggleErrHandle();
    // bpmn图变动监听
    addBpmnListener();
  };

  const toggleErrHandle = () => {
    const lintM = bpmnModeler.get('linting');
    let firstIssue = '';
    lintM.toggle();
    // 保存xml错误信息
    setTimeout(() => {
      const _keys = Object.keys(lintM._issues);
      if (_keys.length) {
        _keys.forEach((key: string) => {
          lintM._issues[key].forEach((item: any) => {
            if (!firstIssue) {
              firstIssue = item.message;
            }
          });
        });
      } else {
        setErrMsg('');
      }
      firstIssue && setErrMsg(firstIssue);
    });
  };

  const addBpmnListener = () => {
    bpmnModeler.on('commandStack.changed', () => {
      bpmnModeler.saveXML({ format: true }, async (err: any, xml: string) => {
        // 成功生成xml
        if (!err) {
          // 保存xml，在步骤切换的时候可以重新渲染
          onChange(xml);
          toggleErrHandle();
        }
      });
    });
  };

  const initBpmn = () => {
    const m = new CustomModeler({
      container: '#canvas',
      height: '100%',
      // 地图和规则
      additionalModules: [minimapModule, lintModule],
      // flowable描述器
      moddleExtensions: {
        flowable: moddleDescriptor,
      },
      // 键盘操作
      keyboard: {
        bindTo: document.body,
      },
      // 自定义规则
      linting: {
        bpmnlint: bpmnlintConfig,
      },
    });
    setModeler(m);
  };

  useEffect(() => {
    bpmnModeler && createBpmnDiagram();
  }, [bpmnModeler]);

  // 创建图
  const createBpmnDiagram = () => {
    bpmnModeler.importXML(initXml, (err: any) => {
      if (!err) {
        // 初始化成功回调
        success();
      }
    });
    // 小地图
    bpmnModeler.get('minimap').open();
  };

  return (
    <div className="g-second-step">
      <div id="canvas" className="m-container" />
      <CustomPanel modeler={bpmnModeler} />
    </div>
  );
};

export default ApproveFlow;
