$(document).ready(function() {
  var cat = 'Get';


  var Posts = function() {
    this.newPosts = [];
  }

  Posts.prototype.getAll = function() {

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
    this.newPosts.push(title);

    var constructHtml = function(id) {
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

  Posts.prototype.find = function(id) {

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

    $.ajax({
      type: 'GET',
      url: 'http://ga-wdi-api.meteor.com/api/posts/'+id,
      dataType: 'json',
      success: success
    });
  }

  Posts.prototype.del = function(id) {
    
    for(var a in this.newPosts) {
      if(this.newPosts[a] == id) {
        this.newPosts.splice(a,1)
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
    this.newPosts.push(title);

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
  
  var current = new Posts();
  current.getAll();

  $(document).on('click','.nav-item', function() {
    if($(this).text() == 'Post' && cat != 'Post') {
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
      $('#'+cat).css({'background-color' : '#607D8B', color : 'white'});
      cat = 'Post';
    } else if($(this).text() == 'Get' && cat != 'Get') {
      $('button').text('GET POST');
      $('.function p').remove();
      var html = ''
      html += '<p>';
      html +=   'Id: <input type="text" placeholder="id">';
      html += '</p>'
      $('.function').prepend(html)
      $('#Get').css({'background-color' : '#CFD8DC', color : 'black'});
      $('#'+cat).css({'background-color' : '#607D8B', color : 'white'});
      cat = 'Get';
    } else if($(this).text() == 'Delete' && cat != 'Delete') {
      $('button').text('DELETE POST');
      $('.function p').remove();
      var html = ''
      html += '<p>';
      html +=   'Id: <input type="text" placeholder="id">';
      html += '</p>'
      $('.function').prepend(html)
      $('#Delete').css({'background-color' : '#CFD8DC', color : 'black'});
      $('#'+cat).css({'background-color' : '#607D8B', color : 'white'});
      cat = 'Delete';
    } else if($(this).text() == 'Put' && cat != 'Put') {
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
      $('#'+cat).css({'background-color' : '#607D8B', color : 'white'});
      cat = 'Put';
    }
  });

  $(document).on('click','button',function() {
    if($('button').text() == 'RESET') {location.reload();}
    if(cat == 'Post') {
      var name = $('input')[0].value;
      var title = $('input')[1].value;
      var text = $('input')[2].value;
      current.add(name,title,text);
    } else if(cat == 'Get') {
      current.find($('input').val());
    } else if(cat == 'Put') {
      var name = $('input')[0].value;
      var title = $('input')[1].value;
      var text = $('input')[2].value;
      var id = $('input')[3].value;
      current.put(name,title,text,id);
      setTimeout(function() {location.reload();}, 1000);
    } else {
      current.del($('input').val());
      setTimeout(function() {location.reload();}, 1000);
    }
  });


});