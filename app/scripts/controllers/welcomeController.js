define([
  'require',
	'application',
  'templates',
  'jqueryUI',
  'jsonp',
  'spinnerJQ',
  'spin'

],
function(require, app, templates) {
    'use strict';
  app.module("WelcomeApp", function(WelcomeApp, PandoraFlix, Backbone, Marionette, $, _) {
    WelcomeApp.router = Marionette.AppRouter.extend({
      appRoutes: {
        'welcome': 'welcome'
      }
    })

    var API = {
      welcome: function(){
        WelcomeApp.Show.Controller.startUp()
      }
    }

    PandoraFlix.on('start:welcome', function(){
      //PandoraFlix.navigate('welcome')
      API.welcome()
    })

    PandoraFlix.addInitializer(function() {
      new WelcomeApp.router({
        controller: API
      });
    });

  })
  app.module("WelcomeApp.Show", function(Show, PandoraFlix, Backbone, Marionette, $, _){
    Show.Controller = $.extend({}, (Show && Show.Controller ? Show.Controller : {}), {
      startUp: function(){
        var that = this
        this.welcomeView = new Show.Layout();
        this.welcomeView.on('show', function () {
          var inputView = new Show.View();
          inputView.on('fetchShowApi', function(showName){
            var loadingView = new Show.Loading();
            that.welcomeView.showResults.show(loadingView)
            var apiBase = "http://netflixroulette.net/api/api.php?title="
            var suggestApi = "https://www.tastekid.com/api/similar"
            var APIKey = "148698-AriGonza-HKXFYJ6D"
            var suggestionArray = null
            var netflixArray = []
            $.ajax({
              url: suggestApi,
              jsonp: "callback",
              dataType: "jsonp",
              async: false,
              data: {
                q: showName.show,
                info: 1,
                type: 'show',
                k: APIKey,
                format: "json"
              },
              success: function( response ) {
                console.log( response );
                suggestionArray = response.Similar.Results;
                suggestionArray.forEach(function (suggestion) {
                  if (netflixArray.length < 5 ){
                    $.ajax({
                      url: apiBase + suggestion.Name,
                      async: false,
                      success: function (data) {
                        console.log(data)
                        netflixArray.push(data)
                      }
                    })
                  } else {
                    return
                  }
                })
                $.ajax({
                  url: apiBase + showName.show,
                  dataType: 'json',
                  complete: function(xhr, data) {
                    if(data == "error"){
                      return
                    } else {
                      var data = JSON.parse(xhr.responseText)
                      $.get('http://www.omdbapi.com/?t=' + showName.show + '&plot=long&r=json', function (poster) {
                        console.log(poster)
                        var resultModel = new Show.ResultModel({
                          category: data.category,
                          poster: poster.Poster,
                          title: data.show_title,
                          summary: data.summary,
                          id: data.show_id
                        })
                        var resultsView = new Show.Results({
                          model: resultModel,
                          suggestions: netflixArray
                        })
                        that.welcomeView.showResults.empty()
                        that.welcomeView.showResults.show(resultsView)
                      })
                    }
                  }
                })
              }
            })
          })
          that.welcomeView.showInputDiv.show(inputView)
        })
        app.main.show(this.welcomeView)
      }
    })
    Show.Layout = Marionette.LayoutView.extend({
      template: templates.layout,
      regions: {
        showInputDiv: '#showInputDiv',
        showResults: '#showResults'
      }
    })
    Show.View = Marionette.ItemView.extend({
      initialize: function () {
        console.log(this)
      },
      template: templates.welcome,
      className: "welcomePage",
      ui: {
        inputLabel: '#inputLabel',
        showInput: '#showInput',
        fetchShowBtn: '#fetchShowBtn'
      },
      events: {
        'click @ui.fetchShowBtn': 'fetchShow',
        'keypress @ui.showInput': "checkKey"
      },
      checkKey: function (e) {
        var code = e.keyCode || e.which;

        if( code === 13 ) {
          this.fetchShow()
          return false;
        }
      },
      fetchShow: function(){
        $('#inputH1').html("You picked")
        var showName = this.ui.showInput.val()
        this.trigger('fetchShowApi', {show: showName})
      }
    })
    Show.Results = Marionette.ItemView.extend({
      template: templates.results,
      initialize: function () {
        console.log(this)
      },
      className: 'container',
      templateHelpers: function () {
        return {
          suggestions: this.options.suggestions
        }
      }
    })
    Show.ResultModel = Backbone.Model.extend({
    })
    Show.Loading = Marionette.ItemView.extend({
      template: templates.loading,

      title: "Loading Data",
      message: "Please wait, data is loading.",

      serializeData: function(){
        return {
          title: Marionette.getOption(this, "title"),
          message: Marionette.getOption(this, "message")
        }
      },

      onShow: function(){
        var opts = {
          lines: 13, // The number of lines to draw
          length: 20, // The length of each line
          width: 10, // The line thickness
          radius: 30, // The radius of the inner circle
          corners: 1, // Corner roundness (0..1)
          rotate: 0, // The rotation offset
          direction: 1, // 1: clockwise, -1: counterclockwise
          color: "#000", // #rgb or #rrggbb
          speed: 1, // Rounds per second
          trail: 60, // Afterglow percentage
          shadow: false, // Whether to render a shadow
          hwaccel: false, // Whether to use hardware acceleration
          className: "spinner", // The CSS class to assign to the spinner
          zIndex: 2e9, // The z-index (defaults to 2000000000)
          top: "30px", // Top position relative to parent in px
          left: "auto" // Left position relative to parent in px
        };
        $("#spinner").spin(opts);
      }
    });
  })

});
;
