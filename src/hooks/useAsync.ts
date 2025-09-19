import { useEffect, useState } from 'react';
export function useAsync<T>(asyncFn: () => Promise<T>, deps: any[] = []) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<T | null>(null);
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);
        asyncFn()
            .then((res) => mounted && setData(res))
            .catch((err) => mounted && setError(err))
            .finally(() => mounted && setLoading(false));
        return () => {
            mounted = false;
        };
    }, deps);
    return { loading, error, data };
}