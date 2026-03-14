import { useEffect, useState } from "react";

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchproduct() {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          return new Error("res is not ok");
        }
        const data: T = await res.json();
        setLoading(false);
        setData(data);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchproduct();
  }, [url]);
  return { data, loading, error };
};
