import { selectPermissionRule } from '@/pages/Settings/Permissions/service';
import {
  ModalForm,
  ProFormCheckbox,
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { queryRoles } from './service';

export default (props: any) => {
  const currentYear = new Date().getFullYear();

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
      <ProFormRadio.Group name="type" label="选择账号类别" options={typeRadio} />
      <ProFormDependency name={['type']}>
        {({ type }) => {
          if (type === 1) {
            return (
              <ProFormSelect
                name="role_id"
                label="选择角色"
                request={queryRoles}
                rules={[{ required: true }]}
              />
            );
          }
          if (type === 2) {
            return (
              <ProFormCheckbox.Group
                name="permissions"
                layout="vertical"
                label="选择权限"
                rules={[{ required: true }]}
                request={selectPermissionRule}
              />
            );
          }
          if (type === 3) {
            return (
              <ProFormCheckbox.Group
                name="permissions"
                layout="vertical"
                label="选择权限"
                rules={[{ required: true }]}
                request={selectPermissionRule}
              />
            );
          }
        }}
      </ProFormDependency>
      <ProFormDateTimePicker name="end_time" label="到期时间" />
      <ProFormSwitch name="status" label="账号状态" />
    </ModalForm>
  );
};
