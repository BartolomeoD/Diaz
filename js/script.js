function include(url) {
  var script = document.createElement('script');
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}
include ("jquery-2.2.1.min.js");

$(document).ready(function() {
  $(".bottom").hide();
  var lastPage;
  var numLastPage;
  var page = 0;
  var pageEnd = 0;
  var jsonstring;
  var getfromjson = function(jsonurl, startid = page, lastid = pageEnd) {
    $.getJSON(jsonurl, function(data) {
      jsonstring = '<table>';
      for (var num = startid; num < lastid; num++) {
        jsonstring+='<tr>'+'<th>'+data[num].id+'</th>'+'<th>'+data[num].name+'</th>'+'</tr>';
      };
      jsonstring += '</table>';
      $(".content").html(jsonstring);
    })
  };
  $.getJSON('JSON/data3.json', processData);
  function processData(data) {
  lastPage = data.length % 5;
  numLastPage = data.length - lastPage;
  }
  $('#b1').on("click", function() {
    $(".bottom").hide();
    $(".content").html("<div> HElloWorld! </div>");
  });

  $('#b2').on("click", function() {
    $(".bottom").hide();
    page = 0;
    pageEnd = 4;
    getfromjson('JSON/data.json');
  });

  $('#b3').on("click", function() {
    $(".bottom").hide();
    page = 0;
    pageEnd = 18;
    getfromjson('JSON/data3.json');
  });

  $('#b4').on("click", function() {
    $(".bottom").show();
    console.log(page, pageEnd);
    page = 0;
    pageEnd = 5;
    getfromjson('JSON/data3.json')
  });

  $('#Next').on("click", function() {
    if (pageEnd + 5 >= numLastPage + lastPage) {
      page = numLastPage;
      pageEnd = page + lastPage;
    }
    else {
      page = pageEnd;
      pageEnd += 5;
    }
    getfromjson('JSON/data3.json');
  });

	$('#Prvs').on("click", function(){
		if (page > 4){
      if (page == numLastPage) pageEnd -= lastPage;
      else pageEnd = page;
      page -= 5;
      getfromjson('JSON/data3.json');
	   }
  });

  $('#First').on("click", function() {
    page = 0;
    pageEnd = 5;
    getfromjson('JSON/data3.json');
  });

  $('#Last').on("click", function() {
    page = numLastPage;
    pageEnd = page + lastPage;
    getfromjson('JSON/data3.json');
  })
});
