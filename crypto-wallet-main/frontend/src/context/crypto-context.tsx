import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { fakeFetchCrypto, fetchAssets } from "../api";
import { percentDifference } from "../until";
import { IAssets, ICoin } from "../types.ts";

interface ICryptoContext {
  crypto: ICoin[];
  assets: IAssets[];
  loading: boolean;
  addAsset: (newAsset: IAssets) => void;
}
const defaultContext: ICryptoContext = {
  assets: [],
  crypto: [],
  loading: false,
  addAsset: () => {},
};

const CryptoContext = createContext<ICryptoContext>(defaultContext);

export const CryptoContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [crypto, setCrypto] = useState<ICoin[]>([]);
  const [assets, setAssets] = useState<IAssets[]>([]);

  function mapAssets(asset: IAssets[], result: ICoin[]) {
    console.log(result, "result");
    return asset.map((asset: IAssets) => {
      const coin = result.find((c) => c.id === asset.id);
      return {
        grow: asset.price < coin!.price,
        growPercent: percentDifference(asset.price, coin!.price),
        totalAmount: asset.amount * coin!.price,
        totalProfit: asset.amount * coin!.price - asset.amount * asset.price,
        name: coin!.name,
        ...asset,
      };
    });
  }
  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fetchAssets();

      setAssets(mapAssets(assets, result));
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);

  function addAsset(newAsset: IAssets) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
};
export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
