import * as endpoints from "./endpoints";

export const config = {
    method: 'get',  
    url: endpoints.API,
    headers: {  
        'Content-Type': 'application/json'
    }
};