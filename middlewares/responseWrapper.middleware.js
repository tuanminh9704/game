"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var responseWrapper = function (req, res, next) {
    res.status(200).success = function (data) {
        res.json({
            success: true,
            data: data,
            message: null
        });
    };
    res.successWithPagination = function (data, totalPages, totalItems, pageIndex) {
        res.status(200).json({
            success: true,
            totalPages: totalPages,
            pageIndex: pageIndex,
            totalItems: totalItems,
            data: data,
            message: null
        });
    };
    res.status(400).error = function (message) {
        res.json({
            success: false,
            data: null,
            message: message
        });
    };
    next();
};
exports.default = responseWrapper;
