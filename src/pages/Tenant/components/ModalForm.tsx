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
      <ProFormText name="nickname" label="租户昵称" />
      <ProFormText name="domain" label="账号" rules={[{ required: true }]} />
      <ProFormText
        name="password"
        label="密码"
        placeholder={`密码非必填，默认密码是Lookstar@${currentYear}`}
      />
      <ProFormText name="phone" label="手机号" />
      <ProFormText name="email" label="邮箱" />
    </ModalForm>
  );
};
