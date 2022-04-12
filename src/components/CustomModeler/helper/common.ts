// 兼容arr，str的arr
export const strToArr = (str: any, toNumber?: boolean) => {
  const getArr = (list: string[]) => {
    if (!toNumber) {
      return list;
    }
    return (list || []).map(Number);
  };
  return typeof str === 'string' ? (str ? getArr(str.split(',')) : []) : str;
};

// str to num
export const getNumV = (v: any) => {
  if (/^\d+$/.test(v)) {
    // 为数字或者数字类型字符串
    return +v;
  }
  return v;
};
