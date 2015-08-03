var sunStaring = (function ($) {
    var my = {};

    function buildUrl(resource) {
        return 'https://st20iygm56.execute-api.us-east-1.amazonaws.com/prod/' + resource;
    }

    my.checkStatus = function (callback) {
        $.getJSON(buildUrl('isonline'), null, callback);
    };

    return my;
}($));