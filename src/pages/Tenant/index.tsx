import { ExportOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Badge, Button, Tag, message } from 'antd';
import { useRef } from 'react';
import ModalForm from './components/ModalForm';
import { addRule, getRule, queryRule, updateRule } from './service';

export default () => {
  const actionRef = useRef<ActionType>();

  const typeEnum = {
    1: { text: '现有权限', color: 'green' },
    2: { text: '定制权限', color: 'blue' },
    3: { text: '测试账号', color: 'orange' },
  };

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
      title: '账号类别',
      dataIndex: 'type',
      key: 'filter[type]',
      valueType: 'select',
      valueEnum: typeEnum,
      width: 60,
      render: (_, record) => {
        const { text, color } = typeEnum?.[record.type] || {};
        return <Tag color={color}>{text}</Tag>;
      },
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
      title: '到期时间',
      dataIndex: 'end_time',
      valueType: 'date',
      hideInSearch: true,
      width: 80,
    },
    {
      title: '状态',
      width: 60,
      key: 'filter[status]',
      valueType: 'select',
      valueEnum: {
        1: '开启',
        0: '关闭',
      },
      render: (dom: any, record: any) => {
        const badgeValue: any = record?.status
          ? {
              status: 'success',
              text: '开启',
            }
          : {
              status: 'error',
              text: '关闭',
            };
        return <Badge {...badgeValue} />;
      },
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
            console.log(values);
            await updateRule(record.id, values);
            message.success('更新成功');
            actionRef?.current?.reload();
            return true;
          }}
          request={() => {
            return getRule(record.id).then((res) => {
              const permissions = res?.permissions.map((item: any) => item.name) || [];
              return { ...res, permissions: permissions };
            });
          }}
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
                API_URL +
                API_URL_PREFIX +
                `/tenant/export?token=${localStorage.getItem(ACCESS_TOKEN_NAME)}}`;
            }}
          >
            导出
          </Button>,
        ]}
      />
    </>
  );
};
