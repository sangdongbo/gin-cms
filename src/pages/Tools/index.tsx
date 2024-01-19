import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import moment from 'moment';
import { stringify } from 'qs';
import { useRef, useState } from 'react';
import { queryRule } from './service';

export default () => {
  const actionRef = useRef<ActionType>();
  const [loading, setLoading] = useState(false);

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
    </>
  );
};
