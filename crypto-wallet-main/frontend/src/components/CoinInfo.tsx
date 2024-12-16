import { Flex, Typography } from "antd";
import { CoinInfoProps } from "../types.ts";
import React from "react";

const CoinInfo: React.FC<CoinInfoProps> = ({ coin, withSymbol }) => {
  return (
    <Flex align="center">
      <img src={coin.icon} alt={coin.name} style={{ width: 40 }} />
      <Typography.Title style={{ margin: 0, marginRight: 10 }} level={2}>
        {withSymbol && <span>({coin.symbol})</span>} {coin.name}
      </Typography.Title>
    </Flex>
  );
};

export default CoinInfo;
