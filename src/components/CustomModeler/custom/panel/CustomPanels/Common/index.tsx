import React from 'react';
import FormSection from '../components/FormSection';
import { Input } from 'antd';
import './index.less';

interface IProps {
  onChange: Function;
  ele: any;
}
const CommonPanel = (props: IProps) => {
  const { onChange, ele } = props;
  const { businessObject } = ele || {};
  return (
    <div className="g-common-panel">
      <FormSection>
        <div className="u-label">名称</div>
        <div className="m-value">
          <Input
            value={businessObject?.name}
            onChange={(e: any) => onChange({ name: e.target.value })}
          />
        </div>
      </FormSection>
    </div>
  );
};

export default CommonPanel;
