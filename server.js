import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { makeResponse } from "./utils/makeJsonResponse.js";
import {filterData} from "./utils/getDataByPathParams.js"
import { getDataByQueryParams } from "./utils/getDataByQueryParams.js";
const PORT = 8000;

const server = http.createServer(async(req, res)=>{
    const user_url = req.url 
    const destinations = await getDataFromDB()
    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)

    if (urlObj.pathname === "/api" && req.method === 'GET' ){
        let filteredData = getDataByQueryParams(destinations, queryObj)
        makeResponse(res, 200, filteredData)
    }else if(user_url.startsWith("/api/continent")&& req.method === 'GET'){
        const continent = req.url.split("/").pop()
        const filteredData = filterData(destinations, 'continent', continent)
        makeResponse(res, 200, filteredData)
    }else if(user_url.startsWith("/api/country")&& req.method === 'GET'){
        const country = req.url.split("/").pop()
        const filteredData = filterData(destinations, 'country', country)
        makeResponse(res, 200, filteredData)
    }else{
        makeResponse(res, 404, {error:"not found",message:"Request route does not exist"})
    }
})

server.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`))