import { ModalForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { selectPermissionRule } from '../../Permissions/service';

export default (props: any) => {
  const currentYear = new Date().getFullYear();

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
      <ProFormText name="name" label="角色名称" rules={[{ required: true }]} />
      <ProFormCheckbox.Group
        name="permissions"
        layout="vertical"
        label="选择权限"
        request={selectPermissionRule}
      />
    </ModalForm>
  );
};
