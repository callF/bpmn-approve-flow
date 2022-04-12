export const getAdaptedUserTree = (userList: any[]) => {
  const loop = (l: any[], parentCode?: string) => {
    return l.map((item: any) => {
      const {
        agencyName,
        agencyCode,
        id,
        userId,
        children,
        zcyUserPos,
        realName,
      } = item;
      let _children: any[] = children;
      if (zcyUserPos && zcyUserPos.length) {
        _children = _children.concat(zcyUserPos);
      }
      if (_children && _children.length) {
        _children = loop(_children, agencyCode);
      }
      const myKey = `${userId || id}-${parentCode}`;
      return {
        key: myKey,
        value: myKey,
        title: agencyName || realName,
        children: _children,
        isUser: !!userId,
      };
    });
  };
  return loop(userList) || [];
};

export const delTreeEmptyNode = (treeData: any[] = []) => {
  const hasChildren = (_l: any[]) => {
    if (!_l || !_l.length) {
      return false;
    }
    let flag = false;
    const loop = (_tree: any) => {
      _tree.forEach((item: any) => {
        const { children, isUser } = item;
        if (flag) {
          // 已经有了用户
          return;
        }
        if (isUser) {
          // 节点找有用户
          flag = true;
        } else {
          // 对下层寻找用户
          loop(children);
        }
      });
    };
    loop(_l);
    return flag;
  };
  const loop = (_l: any[]) => {
    const newL: any[] = [];
    _l.forEach((item: any) => {
      const { isUser, children } = item;
      if (isUser) {
        // 当前是用户
        newL.push(item);
      } else if (hasChildren(children)) {
        // 节点下有用户
        item.children = loop(children);
        newL.push(item);
      }
    });
    return newL;
  };
  return loop(treeData);
};
