import { getMetaData } from '../sharedMetadata';

export const metadata = getMetaData({ url: '/chat' });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="pb-safe h-full min-h-[100dvh] bg-sky-50 px-4 pt-[70px]">{children}</main>;
};

export default Layout;
