import { jwtDecode } from "jwt-decode";

// import jwt_decode from 'jwt-decode'; // Import for decoding JWT
// import axios from 'axios'; // Import for making API requests

exports. handleTokenStoring=(data)=> {
  const tokens = data.tokens; // Assuming token is in 'token' field

  // Store token in cookie
  document.cookie = `jwtAccessToken=${tokens.accessToken}; path=/;`; // Adjust path and other cookie options as needed
  document.cookie = `jwtRefreshToken=${tokens.refreshToken}; path=/;`; // Adjust path and other cookie options as needed
return ("token succesfully stored")

  // Decode JWT
//   const decodedToken = jwt_decode(token);
//   console.log('Decoded token:', decodedToken);

}

exports. getJwtTokenFromCookie=()=> {
    const cookies = document.cookie.split(';');
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('jwtToken=')) {
       
        return cookie.substring('jwtToken='.length);
      }
    }
  
    return null; // Token not found
  }
  
  exports.decodeToken=(token)=>{
    // console.log(token +" from homepage")
    const decodedToken = jwtDecode(token);
    console.log("from jwt file "+decodedToken?.type);
    return decodedToken
  }
