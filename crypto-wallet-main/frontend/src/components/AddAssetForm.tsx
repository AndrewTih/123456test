import { useState, useRef } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Result,
  Select,
  Space,
} from "antd";
import { useCrypto } from "../context/crypto-context.tsx";
import { IAssets, ICoin } from "../types.ts";
import CoinInfo from "./CoinInfo.tsx";

type FieldType = "price" | "amount" | "total" | ["price"] | ["amount"] | ["total"] | "date";
interface IOnClose {
  onClose: () => void;
}
const validateMessages = {
  required: "'${label}' is required!",
  types: {
    number: "'${label}' in not valid number",
  },
  number: {
    range: "'${label} must be between '${min}' and '${max}'",
  },
};

function AddAssetForm({ onClose }: IOnClose) {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState<ICoin | undefined | null>(null);
  const [submited, setSubmited] = useState(false);
  const assetRef = useRef<IAssets | undefined>();
  console.log(assetRef);

  if (submited) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef?.current?.amount} of ${coin?.name} by price ${assetRef?.current?.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Go Console
          </Button>,
        ]}
      />
    );
  }
  if (!coin) {
    return (
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Select coin"
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
    );
  }

  function onFinish(values: IAssets) {
    if (coin?.id === undefined) {
      return;
    }
    const newAssets = {
      id: coin?.id,
      amount: values?.amount,
      price: values?.price,
      data: values.date ?? new Date(),
    };

    assetRef.current = newAssets;

    setSubmited(true);
    addAsset(newAssets);
  }
  function handlerAmountChange(value: number | null) {
    console.log(value);
    if (value !== null) {
      const price = form.getFieldValue("price");
      form.setFieldsValue({
        total: +(value * price).toFixed(2),
      });
    } else {
      form.setFieldsValue({
        total: 0,
      });
    }
  }

  function handlerPriceChange(value: number | null) {
    console.log(value);
    if (value !== null) {
      const amount = form.getFieldValue("amount");
      form.setFieldsValue({
        total: +(amount * value).toFixed(2),
      });
    } else {
      form.setFieldsValue({
        total: 0,
      });
    }
  }
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ price: +coin!.price!.toFixed(2) }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item<FieldType>
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          onChange={handlerAmountChange}
          placeholder="Enter to amount"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item<FieldType> label="Price" name="price">
        <InputNumber onChange={handlerPriceChange} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item<FieldType> label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item<FieldType> label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add asset
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddAssetForm;
