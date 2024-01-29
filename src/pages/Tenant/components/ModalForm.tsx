import Permission from '@/pages/Settings/Role/components/Permission';
import {
  ModalForm,
  ProForm,
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import { getRule } from '../service';
import { queryRoles } from './service';

export default (props: any) => {
  const currentYear = new Date().getFullYear();
  const [form] = useForm();

  const [initPermissions, setInitPermissions] = useState<any>([]);

  const typeRadio = [
    {
      label: '现有权限',
      value: 1,
    },
    {
      label: '定制权限',
      value: 2,
    },
    {
      label: '测试账号',
      value: 3,
    },
  ];
  return (
    <ModalForm
      width="500px"
      trigger={props?.children}
      modalProps={{
        destroyOnClose: true,
      }}
      request={() => {
        if (props?.recordId) {
          return getRule(props?.recordId).then((res) => {
            const permissions = res?.permissions.map((item: any) => item.name) || [];
            setInitPermissions(permissions);
            return { ...res, permissions: permissions };
          });
        } else {
          return {};
        }
      }}
      omitNil={false}
      {...props}
    >
      <ProFormText name="nickname" label="租户昵称" />
      <ProFormText name="domain" label="账号" rules={[{ required: true }]} />
      <ProFormText
        name="password"
        label="密码"
        placeholder={`密码非必填，默认密码是Lookstar@${currentYear}`}
      />
      <ProFormText name="phone" label="手机号" />
      <ProFormText name="email" label="邮箱" />
      <ProFormRadio.Group name="type" label="账号权限" options={typeRadio} />
      <ProFormDependency name={['type']}>
        {({ type }) => {
          if (type === 1) {
            return (
              <ProFormSelect
                name="role_id"
                label="选择账号类别"
                request={queryRoles}
                rules={[{ required: true }]}
              />
            );
          }
          if (type === 2) {
            return (
              // <ProFormCheckbox.Group
              //   name="permissions"
              //   layout="vertical"
              //   label="选择权限"
              //   rules={[{ required: true }]}
              //   request={selectPermissionRule}
              // />
              <ProForm.Item label="选择定制权限" name="permissions" rules={[{ required: true }]}>
                <Permission
                  onChange={(value: any) => {
                    form.setFieldsValue({ permissions: value });
                  }}
                  defaultCheckedKeys={initPermissions}
                />
              </ProForm.Item>
            );
          }
          if (type === 3) {
            return (
              <ProForm.Item label="选择测试权限" name="permissions" rules={[{ required: true }]}>
                <Permission
                  onChange={(value: any) => {
                    form.setFieldsValue({ permissions: value });
                  }}
                  defaultCheckedKeys={initPermissions}
                />
              </ProForm.Item>
            );
          }
        }}
      </ProFormDependency>
      <ProFormDateTimePicker name="end_time" label="到期时间" />
      <ProFormSwitch name="status" label="账号状态" />
    </ModalForm>
  );
};
