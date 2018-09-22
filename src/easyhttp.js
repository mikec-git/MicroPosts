/**
* EasyHTTP Library
* Library for making HTTP requests
* 
* @version 3.0.0
* @author Mike Choi
* @license MIT
**/

class EasyHTTP {
    // Make an HTTP GET request
    async get(url) {
        const response = this.statusOk(await fetch(url));
        const resData = await response.json();
        return resData;
    }

    // Make an HTTP POST request
    async post(url, data) {
        const response = this.statusOk(await fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
        }));
        const resData = await response.json();
        return resData;
    }

    // Make an HTTP PUT request
    async put(url, data) {
        const response = this.statusOk(await fetch(url, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
        }));
        const resData = await response.json();
        return resData;
    }

    // Make an HTTP DELETE request
    async delete(url) {
        const response = this.statusOk(await fetch(url, {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'}
        }));
        return 'User Deleted';
    }
    
    statusOk(res){
        if(res.ok){
            return res;
        } 
        
        throw new Error(res.status);
    }
}


export const http = new EasyHTTP();