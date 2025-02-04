/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: () => true, // 只有管理员可访问
    //canAdmin: () => currentUser?.is_admin, // 只有管理员可访问
  };
}
