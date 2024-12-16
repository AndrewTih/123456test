import { Divider, Tag, Typography } from "antd";
import { CoinInfoProps } from "../types.ts";
import React from "react";
import CoinInfo from "./CoinInfo.tsx";

const CoinInfoModal: React.FC<CoinInfoProps> = ({ coin }) => {
  if (!coin) {
    return <div>No coin selected</div>;
  }
  return (
    <>
      <CoinInfo coin={coin} withSymbol />
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong>1 hour:</Typography.Text>
        <Tag
          color={coin?.priceChange1h || 0 > 0 ? "green" : "red"}
          style={{ marginLeft: 10 }}
        >
          {coin.priceChange1h}%
        </Tag>
        <Typography.Text strong>1 day:</Typography.Text>
        <Tag
          color={coin?.priceChange1d || 0 > 0 ? "green" : "red"}
          style={{ marginLeft: 10 }}
        >
          {coin.priceChange1h}%
        </Tag>
        <Typography.Text strong>1 week:</Typography.Text>
        <Tag
          color={coin?.priceChange1w || 0 > 0 ? "green" : "red"}
          style={{ marginLeft: 10 }}
        >
          {coin.priceChange1h}%
        </Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price:</Typography.Text>
        {coin?.price?.toFixed(2)}$
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price BTC:</Typography.Text>
        {coin.priceBtc}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Market Cap:</Typography.Text>
        {coin.marketCap}$
      </Typography.Paragraph>
      {coin?.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong>Contract Address:</Typography.Text>
          {coin?.contractAddress}
        </Typography.Paragraph>
      )}
    </>
  );
};

export default CoinInfoModal;
