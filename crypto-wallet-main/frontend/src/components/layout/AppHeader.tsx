import React, { useEffect, useState } from "react";
import { Button, Layout, Select, Space, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context.tsx";
import CoinInfoModal from "../CoinInfoModal.tsx";
import AddAssetForm from "../AddAssetForm.tsx";
import { ICoin } from "../../types.ts";

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

function AppHeader() {
  const { crypto } = useCrypto();
  const [coin, setCoin] = useState<ICoin | undefined | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const keypress = (event: { key: string }) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  const handlerSelect = (value: string | null) => {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  };
  return (
    <Layout.Header style={headerStyle}>
      <Select
        mode="multiple"
        style={{ width: "350px" }}
        open={select}
        onClick={() => setSelect((prev) => !prev)}
        onSelect={handlerSelect}
        value="press / to open"
        options={crypto.map((coin: ICoin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img width="20px" src={option.data.icon} alt={option.data.label} />
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add asset
      </Button>
      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        {coin && <CoinInfoModal coin={coin} />}
      </Modal>
      <Drawer
        width={600}
        title="Add asset"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}

export default AppHeader;
