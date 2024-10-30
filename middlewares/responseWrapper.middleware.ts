import {Express, Request, Response, NextFunction } from "express";

const responseWrapper = (req: Request, res: Response, next: NextFunction) => {
    res.success = (data: any) => {
        res.json({
            success: true,
            data: data,
            message: null
        });
    };

    res.successWithPagination = (data: any, totalPages: number, totalItems: number, pageIndex: number) => {
        res.json({
            success: true,
            totalPages: totalPages,
            pageIndex: pageIndex,
            totalItems: totalItems,
            data: data,
            message: null
        });
    };

    res.error = (message: string) => {
        res.json({
            success: false,
            data: null,
            message: message
        });
    };

    next();
};

export default responseWrapper;
