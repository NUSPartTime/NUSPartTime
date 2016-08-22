window.fbAsyncInit = function() {
  FB.init({
    appId: '833829723419057',
    xfbml: true,
    version: 'v2.7'
  });

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      FB.api('/me', {
        fields: ['name']
      }, function(response) {
        name = response.name;
        document.getElementById("welcome_message").innerHTML = "Welcome " + response.name;
        $(".login-button").text("Log out");
      });
    }
  });

  FB.Event.subscribe("auth.login", function(response) {
    console.log("fb login");
    $.post('/userCreation/create', {
      id: FB.getAuthResponse().userID,
      name: FB.getAuthResponse().name
    });
  });

  FB.Event.subscribe("auth.logout", function(response) {
    console.log("fb logout");
    location.reload();
  });

};

/**
 * This function aims at allowing users to log in and log out
 * This function will check user's login status first
 */
function fb_login() {
    // checkt login status first
    FB.getLoginStatus(function(response) {
        console.log(response);
        if (response.status === 'connected') {
            FB.logout(function(response) {
                console.log(response);
            });
        }
    });

    FB.login(function(response) {
        if (response.authResponse) {
            // console.log('Welcome!  Fetching your information.... ');
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID

            $(".login-button p").text("Log out");

            FB.api('/me', function(response) {
                user_email = response.email; //get user email
                // you can store this data into your database             
            });
        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        scope: 'public_profile, email'
    });
}

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
