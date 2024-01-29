import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';

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
      submitter={false}
      {...props}
    >
      <ProFormTextArea name="message" label="问题" />
      <ProFormTextArea name="result" label="答案" fieldProps={{ style: { minHeight: '500px' } }} />
      <ProFormText name="source" label="答案" />
    </ModalForm>
  );
};
