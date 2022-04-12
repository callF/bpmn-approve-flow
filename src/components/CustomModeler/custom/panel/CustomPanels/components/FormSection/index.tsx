import { CloseCircleFilled } from '@ant-design/icons';
import React from 'react';
import './index.less';

interface IProps {
  children: React.ReactNode;
  onClose?: Function;
}

const FormSection = (props: IProps) => {
  const { children, onClose } = props;
  return (
    <div className="g-form-section">
      <div className="m-item-c">{children}</div>
      {onClose ? (
        <CloseCircleFilled
          onClick={() => onClose && onClose()}
          className="u-close-btn"
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default FormSection;
