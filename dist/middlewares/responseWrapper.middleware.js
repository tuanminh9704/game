"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseWrapper = (req, res, next) => {
    res.status(200).success = (data) => {
        res.json({
            success: true,
            data: data,
            message: null
        });
    };
    res.successWithPagination = (data, totalPages, totalItems, pageIndex) => {
        res.status(200).json({
            success: true,
            totalPages: totalPages,
            pageIndex: pageIndex,
            totalItems: totalItems,
            data: data,
            message: null
        });
    };
    res.status(400).error = (message) => {
        res.json({
            success: false,
            data: null,
            message: message
        });
    };
    next();
};
exports.default = responseWrapper;
