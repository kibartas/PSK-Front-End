import axios from "axios";
let baseUri = "https://localhost:44344/api";

let Api = axios.create({
    baseURL: baseUri,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + window.sessionStorage.getItem("token")
    }
});

//example request with auth
// export const GetUserInfo = async () => {
//     return await Api.get("/users/info")
//         .then((response) => {
//             return response.data;
//         }).catch(error => {
//             console.log(error);
//         })
// };