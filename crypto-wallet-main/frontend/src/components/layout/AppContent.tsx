import React from "react";
import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context.tsx";
import PortfolioChart from "../PortfolioChart.tsx";
import AssetsTable from "../AssetsTable.tsx";

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

function AppContent() {
  const { assets, crypto } = useCrypto();
  const cryptoPriceMap = crypto.reduce<{ [key: string]: number }>((acc, crypto) => {
    if (crypto.id !== undefined) { // Проверяем, что id не undefined
      acc[crypto.id] = crypto.price;
    }
    return acc;
  }, {});
  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "#fff" }}>
        Portfolio:{" "}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, v) => acc + v, 0)
          .toFixed(2)}{" "}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}

export default AppContent;
