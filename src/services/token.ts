export async function getAccessToken(){
    return await new Promise((resolve, reject)=>{
        resolve( typeof window !== "undefined" ? window.localStorage.getItem('access_token') : false)
        reject("error")
    })
}