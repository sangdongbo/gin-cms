import type { TreeDataNode } from 'antd';
import { Tree } from 'antd';
import React, { useEffect, useState } from 'react';
import { queryTree } from './service';

interface PermissionProps {
  onChange: (value: React.Key[]) => void;
  defaultCheckedKeys: any;
}

const Permission: React.FC<PermissionProps> = ({ onChange, defaultCheckedKeys }) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);

  useEffect(() => {
    queryTree().then((data) => {
      setTreeData(data);
      const allKeys = getAllNodeKeys(data);
      setExpandedKeys(allKeys);
      setAutoExpandParent(false);
      console.log(defaultCheckedKeys);
      setCheckedKeys(defaultCheckedKeys);
    });
  }, [defaultCheckedKeys]);

  const getAllNodeKeys = (nodes: TreeDataNode[]): React.Key[] => {
    let keys: React.Key[] = [];
    nodes.forEach((node) => {
      keys.push(node.key || '');
      if (node.children) {
        keys = keys.concat(getAllNodeKeys(node.children));
      }
    });
    return keys;
  };

  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
    // 使用 setTimeout 延迟关闭自动展开行为
    setTimeout(() => {
      setAutoExpandParent(false);
    });
  };

  const onCheck = (checkedKeysValue: React.Key[]) => {
    setCheckedKeys(checkedKeysValue);
    onChange(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <Tree
      checkable
      onExpand={onExpand}
      height={600}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={treeData}
    />
  );
};

export default Permission;
