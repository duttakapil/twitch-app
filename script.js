$(".tableHead").hide();

var users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "duttakapil"];

function getData(name){
  var url = "https://api.twitch.tv/kraken/channels/"  + name + "?callback=?";
  $.getJSON(url, function(data){
    
     $("#objects").append("<li class='" + name + " list-group-item' id='item'><img src='" + displayLogo(data) + "' height='30' class='round_img'>  " + "<a href='" + data.url +"'>"+ data.display_name.split('')[0].toUpperCase() + data.display_name.slice(1) +"</a><span class='live'></span></li>");   
    
      decorateData(name);      
  });       
}

var objects = [], num = 1;

function decorateData(name){
  $.getJSON("https://api.twitch.tv/kraken/streams/" + name + "?callback=?", function(data){
    var $name = $('.' + name);
    data.stream === null ?      
        $($name).addClass('list-group-item-danger').find('span').text("Offline")
       :
        $($name).addClass('list-group-item-success').find('span').text("Online");
    objects[name] = data;
    if(data.stream !== null) {
      $('.isStreaming').text('');
      var obj = data.stream.channel;
      $('.tableHead').show();
      $(".table").append("<tr><td>" + (num++) +"</td><td>" + obj.display_name +"</td><td>" + obj.game +"</td><td>" +obj.status + "</td><td><a href='"+ obj.url +"'>"+ obj.name +"</a></td></tr>")
    }
  });
}

function displayLogo(data){
  return data.logo || "http://nogutsnogalaxy.net/ui/tw64.png";  
}

$.each(users, function(i) {
  getData(users[i]);  
})

$(".submit").click(function(){
  var user = $("#search").val().replace(/\s/g, '');
  if(users.indexOf(user) === -1) {
    getData(user);
    users.push(user);
  }
})

$('#objects').click('#item', function(){
  console.log($(this)[0]);
})