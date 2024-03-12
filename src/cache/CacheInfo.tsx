import { useEffect, useState } from "react";
import ICacheConfig from "./ICacheConfig";
import * as api from "cache-api";

const CacheInfo = () => {
  const [cacheConfig, setCacheConfig] = useState<ICacheConfig>();

  useEffect(() => {
    api.getCacheConfig().then(setCacheConfig);
  }, []);

  return (
    <>
      Made by Maria Knabe 2022
      <br />
      Using Ant Design and SheetDB
      <br />
      Cache last updated on {cacheConfig?.last_updated}
    </>
  );
};

export default CacheInfo;
