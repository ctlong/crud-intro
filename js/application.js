var Post = function() {
  // this.user = 
}

var GetAll = function() {
  var printOut = function(item) {
    var html = '';
    html += '<tr class="list-item">';
    html +=   '<td>';
    html +=     item['user'];
    html +=   '</td>';
    html +=   '<td>';
    html +=     item['title'];
    html +=   '</td>';
    html +=   '<td>';
    html +=     item['text'];
    html +=   '</td>';
    html +=   '<td>';
    html +=     item['_id'];
    html +=   '</td>';
    $('#posts').append(html);
  }

  var success = function(response) {
    for(var a in response) {
      printOut(response[a]);
    }
  }

  var current = new Post();

  $.ajax({
    type:'GET',
    url:'http://ga-wdi-api.meteor.com/api/posts',
    dataType:'json',
    success: success
  });
}


$(document).ready(function() {

  $(document).on('click','.nav-item', function() {
    GetAll();
  });


});