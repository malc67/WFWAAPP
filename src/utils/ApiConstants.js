const Base_url = "https://shahjee-insurance.herokuapp.com/";

let link = "user/";

let image_base_url = "https://35.189.61.110/";

let android_map_key = "AIzaSyD4IakOtTxg5Ds4GhNEaHE03MQtFRE7tkE";
let ios_map_key = "AIzaSyBY2LBx91fNz4tvI4e1Gtu8ZGXJ0nTI43o";

let google_map_api_key = "&sensor=false&key=AIzaSyBosJOS3Vh5CqFhPW58AVdZ0AlZ_eWBE-I"
let xml=
` <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="390" height="180" viewBox="0 0 390 180">
<defs>
  <clipPath id="clip-path">
    <rect id="Rectangle_90" data-name="Rectangle 90" width="390" height="180" transform="translate(0 55)" fill="#fff"/>
  </clipPath>
  <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
    <stop offset="0" stop-color="#fff"/>
    <stop offset="1" stop-color="#a9bb4b" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="linear-gradient-2" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
    <stop offset="0" stop-color="#e5edb9" stop-opacity="0"/>
    <stop offset="1" stop-color="#ddf3f9" stop-opacity="0.827"/>
  </linearGradient>
</defs>
<g id="logo-header" opacity="0.5">
  <g id="logo-header-2" data-name="logo-header" transform="translate(0 -55)" clip-path="url(#clip-path)">
    <path id="Path_29" data-name="Path 29" d="M2225,199.3s81.24,46.441,161.635,37.678c77.3,0,132.763-45.086,184.821-109.355,114.413-141.25,288.231-76.408,288.231-76.408l0-78.511H2225Z" transform="translate(-2230.653 -4.7)" fill="url(#linear-gradient)"/>
    <path id="Path_330" data-name="Path 330" d="M2225,157.47s76.13,37.868,151.469,30.724c72.441,0,124.412-36.764,173.2-89.17,107.216-115.177,270.1-62.3,270.1-62.3V-27.3H2225Z" transform="translate(-2242.876 44.3)" fill="url(#linear-gradient-2)"/>
  </g>
</g>
</svg>

`;

const constants =
{
    google_map_api_key: google_map_api_key,
    android_map_key: android_map_key,
    ios_map_key: ios_map_key,
    image_base_url: image_base_url,
    getProfession: Base_url + "profession/public",
    registration: Base_url + link + "auth/client/register",
    signin: Base_url + link + "auth/client/login",
    xml:xml
}

export default constants;