import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataQueryType, DataType } from "../types";

const useData = (query: DataQueryType) =>
    useInfiniteQuery<DataType[], Error>({
        queryKey: ["Posts", query],
        queryFn: ({ pageParam = 1 }: any) =>
            axios
                .get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _start: pageParam * query.pageSize,
                        _limit: query.pageSize,
                    },
                })
                .then((res) => res.data),
        staleTime: 1 * 60 * 1000,
        getNextPageParam: (lastPage: any, allPages: any) => {
            return lastPage.length > 0 ? allPages.length + 1 : undefined;
        },
        initialPageParam: 0,
    });

export default useData;
