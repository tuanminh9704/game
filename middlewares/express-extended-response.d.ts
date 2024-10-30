declare namespace Express {
    export interface Response {
        success : (data : any) => void;
        successWithPagination: (data: any, totalPages: number, totalItems: number, pageIndex: number) => void;
        error: (message : string) => void;
    }
}