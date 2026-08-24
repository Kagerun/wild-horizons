export function filterData(data, filterType, filterParam){

    return data.filter((destination)=>{
        if
        (destination[filterType].toLowerCase().replaceAll(" ","")=== filterParam.toLowerCase()){
            return true
        }})
}