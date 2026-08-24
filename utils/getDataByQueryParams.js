export const getDataByQueryParams = (data, queryObj) => {
    return data.filter((destination)=>
        Object.keys(queryObj).every((query)=>
            String(destination[query]).toLowerCase() === String(queryObj[query]).toLowerCase()
        )
    )
}