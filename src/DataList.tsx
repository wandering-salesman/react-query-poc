import { Fragment, useEffect, useState } from "react";
import useData from "./hooks/useData";
import { DataType } from "./types";
import "./dataStyles.css";

const DataList = () => {
    const pageSize = 10;
    const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
        useData({ pageSize });

    const [dataLength, setDataLength] = useState(0);

    useEffect(() => {
        let length: number = 0;
        if (Array.isArray(data?.pages)) {
            length = data?.pages?.reduce((res: number, curr: any) => {
                return res + curr?.length;
            }, 0);
        }
        setDataLength(length);
    }, [data?.pages]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error?.message}</p>;
    }
    return (
        <>
            <div className="container">
                <ul className="list">
                    {data &&
                        data.pages.map((page: any, index: number) => (
                            <Fragment key={index}>
                                {page.map((post: DataType) => (
                                    <li
                                        key={post?.id}
                                        className="list-item"
                                    >
                                        {post?.title}
                                    </li>
                                ))}
                            </Fragment>
                        ))}
                </ul>
            </div>

            <span className="count-box">{`Current Rows: ${
                dataLength ? dataLength : 0
            }`}</span>
            <button
                className="btn"
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
            >
                {isFetchingNextPage
                    ? "Loading..."
                    : dataLength === 90
                      ? "Can't no more"
                      : "Load More"}
            </button>
        </>
    );
};

export default DataList;
