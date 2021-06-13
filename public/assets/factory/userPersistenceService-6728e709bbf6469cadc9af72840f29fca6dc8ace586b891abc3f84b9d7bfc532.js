      angular.module('userPersistenceService', [])
        .factory("userSession", [
            "$cookies", function($cookies) {
                var user = {};
                return {
                    setCookieData: function(user) {
                        $cookies.put("_session_version", user);
                        //$cookies.putObject("usr", user);  
                    },
                    getCookieData: function() {
                        userName = $cookies.get("_session_version");
                        //userName = $cookies.getObject('usr');
                        return userName;
                    },
                    clearCookieData: function() {
                        user = "";
                        $cookies.remove("_session_version");
                    }
                }
            }
        ]);
