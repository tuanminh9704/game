const responseWrapper = (req, res, next) => {
    res.success = (data) => {
        res.json({
            success: true,
            data: data,
            message: null
        })
    }

    res.successWithPagination = (data) => {
        res.json({
            success: true,
            totalPages: totalPages,
            pageIndex: pageIndex,
            totalItems: totalItems,
            data: data,
            message: null
        })
    }

    res.error = (message) => {
        res.json({
            success: false,
            data: null,
            message: message
        })
    }

    next();
}

module.exports = responseWrapper;