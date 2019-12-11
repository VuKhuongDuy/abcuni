function setCookie(strCookie, username){
    var d = new Date();

    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toGMTString();

    document.cookie =
      escape("username") +
      "=" +
      escape(username) +
      ";" +
      expires +
      ";path=/";
    document.cookie =
      escape("token") + "=JWT " + escape(strCookie) + "; path=/";
    
}

function getToken(){
  let token = '';
  var cookies = document.cookie.split(";");
  cookies.forEach((str) => {
    if(str.indexOf('=')){
      token = str.split('=')[1];
    }
  })
  return token;
}
export { setCookie, getToken };