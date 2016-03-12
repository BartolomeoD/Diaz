function include(url) {
  var script = document.createElement('script');
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}
include ("js/jquery-2.2.1.min.js");

$(document).ready(function() {
  var firstheight;
  var pageOpen=1;
  
  $(".content").height(function(i,val){
	   firstheight=val;
       return val;
    });
  function installheight(id,znach){
	  console.log(id);
	   $(".content").height(function(i,val){
		
       if(firstheight == val && znach==true){return val-50;}if(firstheight > val && znach==false){return val+50;}}
    );}
	
  $('#d1').hide();
  $('#d2').hide();
  $('#d3').hide();
  $('#d4').hide();
  $('.bottom').hide();
  var page;
  var pageEnd;
  $('#b1').on("click", function() {
  $('.bottom').hide();
    $(".content").html("<div> HElloWorld! </div>");
	installheight(this.id,false);
  });

  $('#b2').on("click", function() {
    $('.bottom').hide();
    $.getJSON('JSON/data.json', processData);
    function processData(data) {
      var empty='';
      for (var num = 0; num <= 3; num++) {
        empty+='<p>'+data[num].mytitle+'<br>'+data[num].myarticle+'</p>';
      }
      $(".content").html(empty);
	  installheight(this.id,false);
    }
  });

  $('#b3').on("click", function() {
    $('.bottom').hide();
    $.getJSON('JSON/data2.json', processData);
    function processData(data) {
      var bla='';
      $.each(data,function(mainobj, obj){
        bla+='<p>'+obj.mytitle+'<br>'+obj.myarticle+'</p>';
      });
      $(".content").html(bla);
    }
	installheight(this.id,false);
  });

  $('#b4').on("click", function() {
	$.getJSON('JSON/data3.json', processData);
    function processData(data) {
		var permis = true;
		page = 0 ;
		pageEnd = 5;
		var empty='';
		var numbPage
      for (numbPage = page; numbPage < pageEnd; numbPage++) {
        empty+='<p>'+data[numbPage].id+'<br>'+data[numbPage].name+'</p>';
      };
      $('.bottom').show();
      $(".content").html(empty);


		    
	
};

	
	installheight(this.id,true);
  });
  	  $('#next').on("click", function() {
		  $.getJSON('JSON/data3.json', processData);
    function processData(data) {
		
		if(pageOpen+5<=data.length){$(".bottom").attr("pagenum",String(Number($(".bottom").attr("pagenum"))+1));}
		
		pageOpen=Number($(".bottom").attr("pagenum"))*5-5;
		console.log(pageOpen);
		console.log(data.length);
		var empty='';
		if(pageOpen+5<=data.length){
		for(var numData=pageOpen; numData<pageOpen+5;numData++)
		{
                console.log(numData);
				empty+='<p>'+data[numData].id+'<br>'+data[numData].name+'</p>';
		        }
				$(".content").html(empty);}		
		if(pageOpen+5>data.length){ 
		for(var numData=pageOpen; numData<data.length;numData++)
		{
		        console.log(numData);
				empty+='<p>'+data[numData].id+'<br>'+data[numData].name+'</p>';
		}
		        permis=false;
				$(".content").html(empty);}	
	  }
	  }
    );
		  $('#prvs').on("click", function() {
			  $.getJSON('JSON/data3.json', processData);
    function processData(data) {
		
		if(pageOpen*5-5>0)$(".bottom").attr("pagenum",String(Number($(".bottom").attr("pagenum"))-1));		
		pageOpen=Number($(".bottom").attr("pagenum"))*5-5;
		console.log(pageOpen);
		console.log(data.length);
		var empty='';		
		for(var numData=pageOpen; numData<pageOpen+5;numData++)
		{
                console.log(numData);
				empty+='<p>'+data[numData].id+'<br>'+data[numData].name+'</p>';
		        }
				$(".content").html(empty);			
		  }
		  }
    );
	 $('#first').on("click", function() {
		  $.getJSON('JSON/data3.json', processData);
    function processData(data) {
		$(".bottom").attr("pagenum",String(1));		
		pageOpen=Number($(".bottom").attr("pagenum"))*5-5;
		var empty='';
		for(var numData=pageOpen; numData<pageOpen+5;numData++)
		{
                console.log(numData);
				empty+='<p>'+data[numData].id+'<br>'+data[numData].name+'</p>';
		        }
				$(".content").html(empty);	
	}
	}
	);
	$('#last').on("click", function() {
		  $.getJSON('JSON/data3.json', processData);
    function processData(data) {
		$(".bottom").attr("pagenum",String((data.length-data.length%5)/5+1));		
		pageOpen=Number($(".bottom").attr("pagenum"))*5-5;
		var empty='';
        if(pageOpen+5>data.length){ 
		for(var numData=pageOpen; numData<data.length;numData++)
		{
		        console.log(numData);
				empty+='<p>'+data[numData].id+'<br>'+data[numData].name+'</p>';
		}
		        
				$(".content").html(empty);}	
	}
	}
	);
});
