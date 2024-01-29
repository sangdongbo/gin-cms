import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import moment from 'moment';
import { stringify } from 'qs';
import { useRef, useState } from 'react';
import ModalForm from './components/ModalForm';
import { queryRule } from './service';

export default () => {
  const actionRef = useRef<ActionType>();
  const [loading, setLoading] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [row, setRow] = useState<any>();

  const columns: ProColumns[] = [
    {
      title: '问题',
      dataIndex: 'message',
      key: 'filter[message]',
      ellipsis: true,
      width: 80,
    },
    {
      title: '答案',
      dataIndex: 'result',
      key: 'filter[result]',
      ellipsis: true,
      width: 120,
    },
    {
      title: '答案',
      dataIndex: 'source',
      hideInSearch: true,
      width: 60,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 50,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'filter[created_at]',
      valueType: 'dateTimeRange',
      hideInTable: true,
    },
    {
      width: 30,
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
          详情
        </a>,
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
          defaultCollapsed: false,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Button
              loading={loading}
              onClick={() => {
                setLoading(true);
                const values = formProps.form?.getFieldsValue();
                const queryParams: any = {};
                queryParams.token = localStorage.getItem(ACCESS_TOKEN_NAME) || '';
                Object.keys(values).forEach((key) => {
                  const value = values[key];
                  console.log(value, key);
                  if (Array.isArray(value)) {
                    queryParams[key] = value.map((v) => moment(v).format('YYYY-MM-DD HH:mm:ss')); // 示例只取日期部分
                  } else {
                    queryParams[key] = value;
                  }
                });
                const exportUrl = `${API_URL}${API_URL_PREFIX}/ai/tools/export?${stringify(
                  queryParams,
                )}`;
                window.location.href = exportUrl;
                setLoading(false);
              }}
            >
              导出
            </Button>,
          ],
        }}
        request={queryRule}
        pagination={{
          pageSize: 10,
        }}
        toolBarRender={() => []}
      />
      {row ? (
        <ModalForm
          initialValues={{
            message: row.message,
            result: row.result,
            source: row.source,
          }}
          id={row.id}
          open={updateModalVisible}
          onOpenChange={(state: any) => {
            if (!state) {
              setRow(undefined);
            }
            setUpdateModalVisible(state);
          }}
          width={500}
          title="查看详情"
        ></ModalForm>
      ) : null}
    </>
  );
};
