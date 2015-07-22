$(document).ready(function() {

  var Posts = function() {
    this.posts = [];
    this.cur = 'Get';
  }

  Posts.prototype.getAll = function() {
    var x = this;
    x.posts = [];

    var constructHtml = function(response, keys) {
      var html = '';
      keys.forEach(function(key) {
        // console.log(response[key]['_id']);
        x.posts.push(response[key]['_id']);
        html += '<tr class="list-item">';
        html +=   '<td>';
        html +=     response[key]['user'];
        html +=   '</td>';
        html +=   '<td>';
        html +=     response[key]['title'];
        html +=   '</td>';
        html +=   '<td>';
        html +=     response[key]['text'];
        html +=   '</td>';
        html +=   '<td>';
        html +=     response[key]['_id'];
        html +=   '</td>';
      });
      // console.log(x.posts);
      return html;
    }

    var success = function(response) {
      var keys = Object.keys(response);
      var html = constructHtml(response, keys);
      $('#posts').append(html);
    }

    $.ajax({
      type:'GET',
      url:'http://ga-wdi-api.meteor.com/api/posts',
      dataType:'json',
      success: success
    });
  }

  Posts.prototype.add = function(user,title,text) {
    var x = this;

    var constructHtml = function(id) {
      // console.log(x.posts);
      x.posts.push(id);
      var html = '';
      html += '<tr class="list-item">';
      html +=   '<td>';
      html +=     user;
      html +=   '</td>';
      html +=   '<td>';
      html +=     title;
      html +=   '</td>';
      html +=   '<td>';
      html +=     text;
      html +=   '</td>';
      html +=   '<td>';
      html +=     id;
      html +=   '</td>';
      return html;
    }

    var success = function(response) {
      var html = constructHtml(response);
      $('#posts').append(html);
    }

    $.ajax({
      type: 'POST',
      url: 'http://ga-wdi-api.meteor.com/api/posts/',
      data: {
        user: user,
        title: title,
        text: text,
        x: Date.parse("2011-02-10"),
        dateCreated: new Date()
      },
      dataType: 'json',
      success: success
    });
  }

  Posts.prototype.tryName = function(name) {
    
    var constructHtml = function(response, keys) {
      var html = '';
      keys.forEach(function(key) {
        html += '<tr class="list-item">';
        html +=   '<td>';
        html +=     response[key]['user'];
        html +=   '</td>';
        html +=   '<td>';
        html +=     response[key]['title'];
        html +=   '</td>';
        html +=   '<td>';
        html +=     response[key]['text'];
        html +=   '</td>';
        html +=   '<td>';
        html +=     response[key]['_id'];
        html +=   '</td>';
      });
      return html;
    }

    var success = function(response) {
      var keys = Object.keys(response);
      var html = constructHtml(response, keys);
      $('.list-item').remove();
      $('#posts').append(html);
      $('.function p').remove();
      $('button').text('RESET');
    }

    var error = function(response) {
      $('.function').prepend('<p>post does not exist</p>');
      setTimeout(function() {$('.function p')[0].remove()}, 1000);
    }

    $.ajax({
      type:'GET',
      url:'http://ga-wdi-api.meteor.com/api/posts/search/'+name,
      dataType:'json',
      success: success,
      error: error
    });
  }

  Posts.prototype.find = function(id) {
    var x = this;

    var constructHtml = function(response) {
      var html = '';
      html += '<tr class="list-item">';
      html +=   '<td>';
      html +=     response['user'];
      html +=   '</td>';
      html +=   '<td>';
      html +=     response['title'];
      html +=   '</td>';
      html +=   '<td>';
      html +=     response['text'];
      html +=   '</td>';
      html +=   '<td>';
      html +=     id;
      html +=   '</td>';
      return html;
    }

    var success = function(response) {
      var html = constructHtml(response);
      $('.list-item').remove();
      $('#posts').append(html);
      $('.function p').remove();
      $('button').text('RESET');
    }

    var error = function(response) {
      x.tryName(id);
    }

    $.ajax({
      type: 'GET',
      url: 'http://ga-wdi-api.meteor.com/api/posts/'+id,
      dataType: 'json',
      success: success,
      error: error
    });
  }

  Posts.prototype.del = function(id) {
    
    for(var a in this.posts) {
      if(this.posts[a] == id) {
        this.posts.splice(a,1)
      }
    }

    var success = function(response) {
    }

    $.ajax({
      type: 'DELETE',
      url: 'http://ga-wdi-api.meteor.com/api/posts/'+id,
      success: success
    });
  }

  Posts.prototype.put = function(user,title,text,id) {

    var success = function(response) {
    }

    $.ajax({
      type: 'PUT',
      url: 'http://ga-wdi-api.meteor.com/api/posts/'+id,
      data: {
        user: user,
        title: title,
        text: text,
        dateModified: new Date()
      },
      dataType: 'json',
      success: success
    });
  }
  
  //initialize
  var current = new Posts();
  current.getAll();

  $(document).on('click','.nav-item', function() {
    $('.list-item').remove();
    current.getAll();
    if($(this).text() == 'Post' && current.cur != 'Post') {
      $('button').text('CREATE POST');
      $('.function p').remove();
      var html = ''
      html += '<p>';
      html +=   'Name: <input type="text" placeholder="name">';
      html += '</p>'
      html += '<p>';
      html +=   'Title: <input type="text" placeholder="title">';
      html += '</p>'
      html += '<p>';
      html +=   'Text: <input type="text" placeholder="text">';
      html += '</p>'
      $('.function').prepend(html)
      $('#Post').css({'background-color' : '#CFD8DC', color : 'black'});
      $('#'+current.cur).css({'background-color' : '#607D8B', color : 'white'});
      current.cur = 'Post';
    } else if($(this).text() == 'Get' && current.cur != 'Get') {
      $('button').text('GET POST(S)');
      $('.function p').remove();
      var html = ''
      html += '<p>';
      html +=   'Id/Name: <input type="text" placeholder="text">';
      html += '</p>'
      $('.function').prepend(html)
      $('#Get').css({'background-color' : '#CFD8DC', color : 'black'});
      $('#'+current.cur).css({'background-color' : '#607D8B', color : 'white'});
      current.cur = 'Get';
    } else if($(this).text() == 'Delete' && current.cur != 'Delete') {
      $('button').text('DELETE POST');
      $('.function p').remove();
      var html = ''
      html += '<p>';
      html +=   'Id: <input type="text" placeholder="id">';
      html += '</p>'
      $('.function').prepend(html)
      $('#Delete').css({'background-color' : '#CFD8DC', color : 'black'});
      $('#'+current.cur).css({'background-color' : '#607D8B', color : 'white'});
      current.cur = 'Delete';
    } else if($(this).text() == 'Put' && current.cur != 'Put') {
      $('button').text('UPDATE POST');
      $('.function p').remove();
      var html = ''
      html += '<p>';
      html +=   'Name: <input type="text" placeholder="name">';
      html += '</p>'
      html += '<p>';
      html +=   'Title: <input type="text" placeholder="title">';
      html += '</p>'
      html += '<p>';
      html +=   'Text: <input type="text" placeholder="text">';
      html += '</p>'
      html += '<p>';
      html +=   'Id: <input type="text" placeholder="id">';
      html += '</p>'
      $('.function').prepend(html)
      $('#Put').css({'background-color' : '#CFD8DC', color : 'black'});
      $('#'+current.cur).css({'background-color' : '#607D8B', color : 'white'});
      current.cur = 'Put';
    }
  });

  $(document).on('click','button',function() {
    if(current.cur == 'Post') {
      var name = $('input')[0].value;
      var title = $('input')[1].value;
      var text = $('input')[2].value;
      current.add(name,title,text);
    } else if(current.cur == 'Get') {
      if($('button').text() == 'RESET') {
        location.reload();
      } else {
        current.find($('input').val());
      }
    } else if(current.cur == 'Put') {
      var name = $('input')[0].value;
      var title = $('input')[1].value;
      var text = $('input')[2].value;
      var id = $('input')[3].value;
      current.put(name,title,text,id);
      setTimeout(function() {
        $('.list-item').remove();
        current.getAll();}, 1000);
    } else {
      current.del($('input').val());
      setTimeout(function() {
        $('.list-item').remove();
        current.getAll();}, 1000);
    }
  });


});