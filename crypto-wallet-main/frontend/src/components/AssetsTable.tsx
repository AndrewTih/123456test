import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useCrypto } from "../context/crypto-context.tsx";

interface DataType {
  key: React.Key;
  name: string | undefined;
  price: number | undefined;
  amount: number | undefined;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name!.length - b.name!.length,
    sortDirections: ["descend"],
  },
  {
    title: "Price, $",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price! - b.price!,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.amount! - b.amount!,
  },
];

function AssetsTable() {
  const { assets } = useCrypto();

  const data = assets.map((a) => ({
    key: a.id,
    name: a.name,
    price: a.price,
    amount: a.amount,
  }));

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div style={{ marginTop: 100 }}>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
}

export default AssetsTable;
