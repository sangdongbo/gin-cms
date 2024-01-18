import { ExportOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useRef } from 'react';
import ModalForm from './components/ModalForm';
import { addRule, getRule, queryRule, updateRule } from './service';

export default () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns[] = [
    {
      title: '昵称',
      dataIndex: ['user', 'nickname'],
      key: 'filter[nickname]',
      ellipsis: true,
      width: 100,
    },
    {
      title: '账号',
      dataIndex: ['user', 'username'],
      key: 'filter[username]',
      ellipsis: true,
      width: 100,
    },
    {
      title: '手机号',
      dataIndex: ['user', 'phone'],
      key: 'filter[phone]',
      ellipsis: true,
      width: 80,
    },
    {
      title: '邮箱',
      dataIndex: ['user', 'email'],
      key: 'filter[email]',
      ellipsis: true,
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'filter[created_at]',
      valueType: 'dateTimeRange',
      hideInTable: true,
    },
    {
      width: 60,
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <ModalForm
          title="编辑"
          onFinish={async (values: any) => {
            await updateRule(record.id, values);
            message.success('更新成功');
            actionRef?.current?.reload();
            return true;
          }}
          request={() => getRule(record.id)}
          key="edit"
        >
          <a>编辑</a>
        </ModalForm>,
        // <Popconfirm
        //   key="delete"
        //   title="删除数据"
        //   description="您确定要删除这行数据吗?"
        //   onConfirm={async () => {
        //     await removeRule(record.id);
        //     message.success('删除成功');
        //     actionRef?.current?.reload();
        //   }}
        // >
        //   <a style={{ color: 'red' }}>删除</a>
        // </Popconfirm>,
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
            title="新建租户"
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
          <Button
            key="export"
            icon={<ExportOutlined />}
            onClick={() => {
              window.location.href =
                API_URL_PREFIX + `/tenant/export?token=${localStorage.getItem(ACCESS_TOKEN_NAME)}}`;
            }}
          >
            导出
          </Button>,
        ]}
      />
    </>
  );
};
