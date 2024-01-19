import { ModalForm, ProFormText } from '@ant-design/pro-components';

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
      <ProFormText name="name" label="名称" rules={[{ required: true }]} />
      <ProFormText name="label" label="别名" rules={[{ required: true }]} />
      <ProFormText name="guard_name" label="权限名称" rules={[{ required: true }]} />
    </ModalForm>
  );
};
