window.fbAsyncInit = function() {
  FB.init({
    appId: '833829723419057',
    xfbml: true,
    version: 'v2.7'
  });

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      FB.api('/me', {
        fields: 'name'
      }, function(response) {
        document.getElementById("welcome_message").innerHTML = "Welcome " + response.name;
      });
    }
  });

  FB.Event.subscribe("auth.login", function(response) {
    window.location = window.location + '?id=' + FB.getAuthResponse().userID;

  });

  FB.Event.subscribe("auth.logout", function(response) {
    location.reload();
  });

};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
