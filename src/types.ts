interface DataType {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface DataQueryType {
    pageSize: number;
}

export type { DataType, DataQueryType };
