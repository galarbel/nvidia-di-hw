import { useEffect, useState } from "react";
import { getAllPNs } from "../services/SearchService";

type TuseGetPNs = () => [boolean, string | undefined, string[]];

export const DEFAULT_TEST_TYPES = ["Drop", "Durability", "Humidity", "Stress"];

const testTypes: string[] = [];

const useGetPNs: TuseGetPNs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const doGetAllPNs = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const res = await getAllPNs();
      testTypes.length === 0 && testTypes.push(...res);
    } catch (e) {
      setError(e as string);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    testTypes.length === 0 && !isLoading && doGetAllPNs();
  }, []);

  return [isLoading, error, testTypes];
};

export default useGetPNs;
