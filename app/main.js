import SongsController from "./Controllers/SongsController.js";
class App {
  songsController = new SongsController(token);
  
}



var clientId = 'e863a77415934f8cac071fab8289c948'; // Your client id
var clientSecret = 'd6c0f18394b34745a4e3c86fcab94da9'; // Your secret

const headers = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  auth: {
    username: clientId,
    password: clientSecret,
  },
};
const data = {
  grant_type: 'client_credentials',
};

let token = "";

async function login()
{

    // @ts-ignore
     const resp = axios.post(
       'https://accounts.spotify.com/api/token',
   
        // @ts-ignore
       Qs.stringify(data),
       headers
     ).then(function(response){                               
      token = response.data.access_token;
      window["app"] = new App();
  });        

}

login();

