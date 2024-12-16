import React, { useContext } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Layout, List, Spin, Statistic, Tag, Typography } from "antd";
import { capitalize } from "../../until";
import CryptoContext from "../../context/crypto-context.tsx";

const siderStyle: React.CSSProperties = {
  padding: "1rem",
};

function AppSider() {
  const { loading, assets } = useContext(CryptoContext);

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset: any) => (
        <Card style={{ marginBottom: "1rem" }}>
          {loading ? (
            <Spin />
          ) : (
            <div>
              <Statistic
                title={capitalize(asset.id)}
                value={asset.totalAmount}
                precision={2}
                valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
                prefix={
                  asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                }
                suffix="$"
              />

              <List
                size="small"
                dataSource={[
                  {
                    title: "Total profit",
                    value: asset.totalProfit,
                    withTag: true,
                  },
                  { title: "Asset Amount", value: asset.amount, isPlain: true },
                  // { title: "Total Difference", value: asset.growPercent },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <span>{item.title}</span>
                    <span>
                      {item.withTag && (
                        <Tag color={asset.grow ? "green" : "red"}>
                          {asset.growPercent}%
                        </Tag>
                      )}
                      {item.isPlain && item.value}
                      {!item.isPlain && (
                        <Typography.Text
                          type={asset.grow ? "success" : "danger"}
                        >
                          {item.value.toFixed(2)}$
                        </Typography.Text>
                      )}
                    </span>
                  </List.Item>
                )}
              />
            </div>
          )}
        </Card>
      ))}
    </Layout.Sider>
  );
}

export default AppSider;
