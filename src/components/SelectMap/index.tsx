import { Select } from 'antd';

const { Option } = Select;
export default (list: any) => {
  const nodeList: Array<any> = [];
  list?.forEach((val: string, key: string) => {
    nodeList.push(
      <Option key={key} value={key}>
        {val}
      </Option>,
    );
  });
  return nodeList;
};
