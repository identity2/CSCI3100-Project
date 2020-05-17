/*
Webpage Unility library
Contributor: Yu Chao

Contain general methods to check user login status and deal with cookie setting
*/
var serverAddr = 'http://35.201.158.77:3100';

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, expireDay = 7) {
  var d = new Date();
  d.setTime(d.getTime() + (expireDay*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function logoutUser() {
  var postBody = JSON.stringify({
    apiToken: getCookie('api_token')
  });
  $.post(serverAddr + '/logout', postBody);

  setCookie('username', '', -1);
  setCookie('api_token', '', -1);
}

function pingServer(success = undefined) {
  // Check if the backend is on.
  $.get(serverAddr + "/ping", function() {
      // Badge
      var serverBadge = document.getElementById('server-badge');
      serverBadge.innerHTML = 'Server On';
      serverBadge.style.backgroundColor = 'lightgreen';
      serverBadge.style.color = 'black';

      if (success) success();
  }).fail(function() {
      alert('Failed to connect to the server, please make sure the backend system is on!');
      window.location.href = 'index.html';
  });
}

function checkLogin(success = undefined) {
  // Check if the user is logged in.
  var username = getCookie('username');
  if (username != '') {
      // Hide "Login / Register" Button.
      document.getElementById('login-register').style.display = "none";
      document.getElementById('logout-btn').onclick = function() {
          alert('logged out!');
          logoutUser();
          window.location.href = 'index.html';
      };
  
      // Account
      document.getElementById('account').innerHTML = 'User: ' + username;

      if (success) success(username);
  } else {
      document.getElementById('logout').style.display = "none";
  }
}

