import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, message } from 'antd';
import { useRef, useState } from 'react';
import ModalForm from './components/ModalForm';
import { addRule, queryRule, removeRule, updateRule } from './service';

export default () => {
  const actionRef = useRef<ActionType>();
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [row, setRow] = useState<any>();

  const columns: ProColumns[] = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'filter[name]',
      ellipsis: true,
      width: 180,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 120,
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 120,
    },
    {
      width: 60,
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          onClick={() => {
            setUpdateModalVisible(true);
            setRow(record);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="删除数据"
          description="您确定要删除这行数据吗?"
          onConfirm={async () => {
            await removeRule(record.id);
            message.success('删除成功');
            actionRef?.current?.reload();
          }}
        >
          <a style={{ color: 'red' }}>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        request={queryRule}
        pagination={{
          pageSize: 10,
        }}
        toolBarRender={() => [
          <ModalForm
            title="新建角色"
            onFinish={async (values: any) => {
              await addRule(values);
              message.success('提交成功');
              actionRef?.current?.reload();
              return true;
            }}
            key="create"
          >
            <Button key="button" icon={<PlusOutlined />} type="primary">
              新建
            </Button>
          </ModalForm>,
        ]}
      />
      {row ? (
        <ModalForm
          initialValues={{
            name: row.name,
            permissions: row?.permissions.map((item: any) => item.name) || [],
          }}
          onFinish={async (value: any) => {
            await updateRule({ id: row.id, ...value });
            setUpdateModalVisible(false);
            setRow(undefined);
            message.success('更新成功');
            actionRef?.current?.reload();
          }}
          id={row.id}
          open={updateModalVisible}
          onOpenChange={(state: any) => {
            if (!state) {
              setRow(undefined);
            }
            setUpdateModalVisible(state);
          }}
          width={300}
          title="修改角色"
        ></ModalForm>
      ) : null}
    </>
  );
};
