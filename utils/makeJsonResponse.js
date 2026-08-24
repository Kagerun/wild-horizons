export function makeResponse(res, code, data){
    res.statusCode = code
    res.setHeader('Content-Type', "application/json")
    res.end(JSON.stringify(data))
}