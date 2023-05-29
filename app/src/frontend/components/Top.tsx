import { Sidebar } from './layout/Sidebar';

export const Top = () => {
  return (
    <div className="flex min-h-screen flex-row">
      <Sidebar />
      {/* <main className="grow">{children}</main> */}
    </div>
  );
};
