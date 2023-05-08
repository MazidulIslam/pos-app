import Layout from '@/components/Layout';
import StoreProvider from '/store';
export default function Home() {
  return (
    <StoreProvider>
      <Layout />
    </StoreProvider>
  );
}
