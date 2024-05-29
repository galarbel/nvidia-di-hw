import { useEffect, useState } from "react";
import { getAllTestTypes } from "../services/SearchService";

type TuseGetTestTypes = () => [boolean, string | undefined, string[]];

export const DEFAULT_TEST_TYPES = ["Drop", "Durability", "Humidity", "Stress"];

const testTypes: string[] = [];

const useGetTestTypes: TuseGetTestTypes = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const doGetAllTestTypes = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const res = await getAllTestTypes();
      testTypes.length === 0 && testTypes.push(...res);
    } catch (e) {
      setError(e as string);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    testTypes.length === 0 && !isLoading && doGetAllTestTypes();
  }, []);

  return [isLoading, error, testTypes];
};

export default useGetTestTypes;
