import { Layout } from "antd";
import AppHeader from "./AppHeader.tsx";
import AppSider from "./AppSider.tsx";
import AppContent from "./AppContent.tsx";

function AppLayout() {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}

export default AppLayout;
