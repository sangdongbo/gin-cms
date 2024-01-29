import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { useForm } from 'antd/es/form/Form';
import Permission from './Permission';

export default (props: any) => {
  const [form] = useForm();

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
      <ProFormText name="name" label="账号类别" rules={[{ required: true }]} />
      <ProForm.Item label="选择权限" name="permissions" rules={[{ required: true }]}>
        <Permission
          onChange={(value: any) => {
            form.setFieldsValue({ permissions: value });
          }}
          defaultCheckedKeys={props?.initialValues?.permissions}
        />
      </ProForm.Item>
    </ModalForm>
  );
};
