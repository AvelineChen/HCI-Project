$(document).ready(function(){
	var currentPage = 1;
	var totalLength = 0;
    var readText = 0;
    var noteText = {};
    var shiftBg = false;
    var storyName = {
    	"Voldemort": {"Category":"Character","Description":"Lord Voldemort, Formerly known as Tom Marvolo Riddle and commonly referred to as He-Who-Must-Not-Be-Named. The most powerful Dark wizard of all time."},
    	"Apothecary":{"Category":"Location","Description":"The Apothecary is a store located at North Side, Diagon Alley which supplies merchants with ingredients for potion-making."},
    	"Eeylops":{"Category":"Stuff","Description":"Eeylops Premium Owl Treats are a brand of Owl Treats shaped like mice sold at Eeylops Owl Emporium in Diagon Alley. Harry Potter fed these treats to his owl Hedwig"},
    	"Emporium":{"Category":"Location","Description":"Eeylops Owl Emporium is a chain of shops that sells owls and supplies to care for them, such as food. It has three locations in Glasgow, Leeds, and London."},
    	"Quirrell":{"Category":"Character","Description":"Quirinus Quirrell, Stuttering, nervous Defence Against the Dark Arts professor who's hiding a dark secret."},
    	"Hagrid": {"Category":"Character","Description":"Rubeus Hagrid, The half-giant Hogwarts gamekeeper loves all creatures and is a tirelessly loyal friend to Harry and Dumbledore."},
    	"Dursleys":{"Category":"Character","Description":"The Dursley family is a Muggle family, and the only known living close relatives of Harry Potter. Petunia Dursley was the older sister of Harry's mother, Lily Potter."},
    	"Ollivanders":{"Category":"Location","Description":"A prestigious wand shop, located in Diagon Alley."},
    	"Ollivander":{"Category":"Character","Description":"Garrick Ollivander, Considered by many to be the world's best wandmaker, almost everyone at Hogwarts gets their wands from him."},
    }
    var pageside = 0;	// determine the page (left/right) interacted by gaze 
    var circleCounter =  get('circleCounter');
    var bar = new ProgressBar.Circle(circleCounter, {
      strokeWidth: 6,
      easing: 'easeInOut',
      duration: 5000,
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: null,
      from: { color: '#FFEA82' ,a:0},
      to: { color: '#f44242' ,a:1},
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
      }
    });
    circleCounter.style.display = 'none';
    var wordkey = '6403c2110633afe550102066b7d03b83d35feb1b3c26c2dae';
    var autoUpdata = true;

    var homeAudio = document.getElementById("BackgroundAudio"); 
    var startAudio = document.getElementById("startAudio"); 
    startAudio.play();
    $("div[class='annotag open']").hide();
    $("a[class='menu-item arrow']").hide();
    $("nav[class='menu menu-right']").hide();
    $("nav[class='menu menu-left']").hide();

    $('p').each(function(){
            var text = $(this).html().split(' '),
            	len = text.length,
                result = [];
            totalLength+=len;
            for( var i = 0; i < len; i++ ) 
            	result[i] = '<span class="overlay" id = "text'+ i + '" hasRead="false">' + text[i] + '</span>';   

            $(this).html(result.join(' '));
    });
   $( '.overlay' ).each( function( index, element ){   
          $( this ).eyeIn(
            function() {
              this.$element.css('background', '#ffff99');//light yellow          
            },2
          );

          $( this ).eyeOut(
            function() {
              this.$element.css('background', 'transparent');     
            },10
          );
    });

  	$.eyeSuspend(
	    function() {
        	$( '.overlay' ).css('background', 'transparent');
    	}
  	);
    

    $( "a[class='menu-item lightblue']" ).click(function() {
    	startAudio.pause();
    	startAudio.currentTime = 0;
    	BackgroundAudio.play();
    	currentPage = 1;
    	$("#home").fadeOut("slow");
    	$("#content").fadeIn("slow");
    	$("#page"+currentPage).fadeIn("slow");
    });
    
    $( "a[class='menu-item lightblue']" ).eyeIn(
            function() {
                  changeBackgroundColor("a[class='menu-item lightblue']",'#EEEEEE','#62C2E4');
                  setCircleBartoPosition("a[class='menu-item lightblue']");
                  bar.animate(1.0, {
                      duration: 1000
                  }, function() {    
                      changeBackgroundColor("a[class='menu-item lightblue']",'#ffffff','#EEEEEE');             
                      setCircleBartoDefault();
                      startAudio.pause();
                      startAudio.currentTime = 0;
                  	  BackgroundAudio.play();
                      currentPage = 1;
                  	$("#home").fadeOut("slow");
                  	$("#content").fadeIn("slow");
                  	$("#page"+currentPage).fadeIn("slow");

                  });
            },2
    );

    $( "a[class='menu-item lightblue']" ).eyeOut(
        function(){
            changeBackgroundColor("a[class='menu-item lightblue']",'#62C2E4','#EEEEEE');
            setCircleBartoDefault();
        },5);
    
    $( "a[class='menu-item blue']" ).click(function() {
    	// get last suspend page, set it to currentpage
    	startAudio.pause();
    	startAudio.currentTime = 0;
    	$("#home").fadeOut("slow");
    	$("#content").fadeIn("slow");
    	$("#page"+currentPage).fadeIn("slow");

    });
    
    $( "a[class='menu-item blue']" ).eyeIn(
            function() {
                  changeBackgroundColor("a[class='menu-item blue']",'#EEEEEE','#669AE1');
                  setCircleBartoPosition("a[class='menu-item blue']");
                  bar.animate(1.0, {
                      duration: 1000
                  }, function() {
                      changeBackgroundColor("a[class='menu-item blue']",'#ffffff','#EEEEEE');             
                      setCircleBartoDefault();
                   // get last suspend page, set it to currentpage
                      startAudio.pause();
                      startAudio.currentTime = 0;
                  	$("#home").fadeOut("slow");
                  	$("#content").fadeIn("slow");
                  	$("#page"+currentPage).fadeIn("slow");

                  });
              },2
      );

      $( "a[class='menu-item blue']" ).eyeOut(
          function(){
              changeBackgroundColor("a[class='menu-item blue']",'#669AE1','#EEEEEE');
              setCircleBartoDefault();
          },5);

      $( "a[class='menu-item purple']" ).click(function() {
// link to notebook page------------------------------------------------------
    	  localStorage.setItem("noteText", JSON.stringify(noteText));
    	  window.location.href='Notebook.html';
      });
      
      $( "a[class='menu-item purple']" ).eyeIn(
              function() {
                    changeBackgroundColor("a[class='menu-item purple']",'#EEEEEE','#C49CDE');
                    setCircleBartoPosition("a[class='menu-item purple']");
                    
                    bar.animate(1.0, {
                        duration: 1000
                    }, function() {    
                        changeBackgroundColor("a[class='menu-item purple']",'#ffffff','#EEEEEE');             
                        setCircleBartoDefault();
// open notebook page------------------------------------------------------
                        localStorage.setItem("noteText", JSON.stringify(noteText));
                        window.location.href='Notebook.html';
                    });
              },2
      );

      $( "a[class='menu-item purple']" ).eyeOut(
          function(){
              changeBackgroundColor("a[class='menu-item purple']",'#C49CDE','#EEEEEE');
              setCircleBartoDefault();
          },5);
      
// left area previous button---------------------------
      $("#leftArea").hover(function(){
      	fadein($("nav[class='menu menu-left']")[0]);
      },function(){
      	$("nav[class='menu menu-left']").fadeOut("slow");
      });
      
      $( "a[class='menu-item previous']" ).click(function() {
        	if(currentPage!=1){
        		var sound = Math.floor(Math.random() * ( 5 + 1));
        		document.getElementById("flip"+sound).play();
	        	$("#page"+currentPage).fadeOut("slow");
	            currentPage--;
	        	$("#page"+currentPage).fadeIn("slow");
	        	pageside = 0;
	        	resetbackground();
	        	clearPage();
        	}
        });
      
      $( "a[class='menu-item previous']" ).eyeIn(
          function() {
                changeBackgroundColor("a[class='menu-item previous']",'#EEEEEE','#70CC72');
                setCircleBartoPosition("a[class='menu-item previous']");
                bar.animate(1.0, {
                    duration: 1000
                }, function() {    
                    changeBackgroundColor("a[class='menu-item previous']",'#ffffff','#EEEEEE');             
                    setCircleBartoDefault();
                  if(currentPage!=1){
                	  var sound = Math.floor(Math.random() * ( 5 + 1));
              		  document.getElementById("flip"+sound).play();
                	  $("#page"+currentPage).fadeOut("slow");
                      currentPage--;
                      $("#page"+currentPage).fadeIn("slow");
                      pageside = 0;
                      resetbackground();
                      clearPage();
                  }
                });
          },2
      );

      $( "a[class='menu-item previous']" ).eyeOut(
          function(){
              changeBackgroundColor("a[class='menu-item previous']",'#70CC72','#EEEEEE');
              setCircleBartoDefault();
          },5);
      
      $( "a[class='menu-item back']" ).click(function() {
      	$("#content").fadeOut("slow");
      	$("#home").fadeIn("slow");
      	var remain = (readText/totalLength*100).toFixed(0);
		document.getElementById("progress").innerHTML = remain+"%";
		document.getElementsByClassName("progress-bar")[0].style.width = remain+"%";
		document.getElementById("count").innerHTML = readText;
		document.getElementById("total").innerHTML = "/" + totalLength;
		clearPage();
      });
    
    $( "a[class='menu-item back']" ).eyeIn(
        function() {
              changeBackgroundColor("a[class='menu-item back']",'#EEEEEE','#353333');
              setCircleBartoPosition("a[class='menu-item back']");
              bar.animate(1.0, {
                  duration: 1000
              }, function() {    
                  changeBackgroundColor("a[class='menu-item back']",'#ffffff','#EEEEEE');             
                  setCircleBartoDefault();
                  $("#content").fadeOut("slow");
                	$("#home").fadeIn("slow");
                	var remain = (readText/totalLength*100).toFixed(0);
          		document.getElementById("progress").innerHTML = remain+"%";
          		document.getElementsByClassName("progress-bar")[0].style.width = remain+"%";
          		document.getElementById("count").innerHTML = readText;
          		document.getElementById("total").innerHTML = "/" + totalLength;
          		clearPage();
              });
        },2
    );

    $( "a[class='menu-item back']" ).eyeOut(
        function(){
            changeBackgroundColor("a[class='menu-item back']",'#353333','#EEEEEE');
            setCircleBartoDefault();
        },5);
    
// right area next button---------------------------
      $("#rightArea").hover(function(){
      	fadein($("nav[class='menu menu-right']")[0]);
      },function(){
      	$("nav[class='menu menu-right']").fadeOut("slow");
      });
      
      $( "a[class='menu-item next']" ).click(function() {
      	if(currentPage!=3){
      		var sound = Math.floor(Math.random() * ( 5 + 1));
    		document.getElementById("flip"+sound).play();
	      	$("#page"+currentPage).fadeOut("slow");
	          currentPage++;
	      	$("#page"+currentPage).fadeIn("slow");
	      	 pageside = 0;
	      	resetbackground();
	      	clearPage();
      	}
      });
    
    $( "a[class='menu-item next']" ).eyeIn(
            function() {
                  changeBackgroundColor("a[class='menu-item next']",'#EEEEEE','#70CC72');
                  setCircleBartoPosition("a[class='menu-item next']");
                  bar.animate(1.0, {
                      duration: 1000
                  }, function() {    
                      changeBackgroundColor("a[class='menu-item next']",'#ffffff','#EEEEEE');             
                      setCircleBartoDefault();
                      if(currentPage!=3){
                    	  var sound = Math.floor(Math.random() * ( 5 + 1));
                  		document.getElementById("flip"+sound).play();
                      	$("#page"+currentPage).fadeOut("slow");
                          currentPage++;
                      	$("#page"+currentPage).fadeIn("slow");
                      	pageside = 0;
                      	resetbackground();
                      	clearPage();
                  	}
                  });
              },2
      );
      $( "a[class='menu-item next']" ).eyeOut(
          function(){
              changeBackgroundColor("a[class='menu-item next']",'#70CC72','#EEEEEE');
              setCircleBartoDefault();
          },5);
    
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    var ctx = get('canvas');

    ctx.width  = $(document).width();
    ctx.height = $(document).height();
    var gazeData = [];
    var gazePositionTime = [];
    
    $(document).bind('gazePointMove',updateGazeDate);

    function updateGazeDate(evt, point){
      var gazePoint = [point.x,point.y,1];
      gazeData.push(gazePoint);

      var curTime =  moment().valueOf();
      var positionTime  = {'x':point.x,
                           'y':point.y,
                           'time':curTime};
      gazePositionTime.push(positionTime); 
    }
    
// Search selected word------------------------------------------------
    $("body").keydown(function(){
    	var curObj = $.currentGazeElement('.overlay');
    	if(curObj){
            curObj.css('color','#FE4365');
            var word = curObj.text().replace(/[^a-zA-Z 0-9]+/g,"");
            console.log("word after replace is: " + word);
            var utterance = new SpeechSynthesisUtterance(word);
            speechSynthesis.speak(utterance);
            initialAnnotation();
            $.ajax({
                url:"http://api.wordnik.com:80/v4/word.json/"+word.toLowerCase()+"/definitions?limit=2&includeRelated=false&useCanonical=false&includeTags=false&api_key="+wordkey,
                dataType: 'json', // Notice! JSONP <-- P (lowercase)
                success:function(json){
                	word = word.toLowerCase();
                  $(".word").text(word);
                  for(var i = 0; i < json.length; i++){
                	document.getElementsByClassName("wordsource")[i].innerHTML = json[i].partOfSpeech;
                	document.getElementsByClassName("wordtitleMeaning")[i].innerHTML = "Meaning";
                	document.getElementsByClassName("wordmeaning")[i].innerHTML = json[i].text;
                  }
                    $("div[class='annotag open']")[0].style.left = pageside != 1 ? "800px" : "150px";
                    $("div[class='annotag open']").show();
                    
                  },
                error:function(){
// search word in story-line dictionary------------------------------------------
                  console.log("wordnik error");
                  if(storyName[word]!=undefined){
                	  $(".word").text(word);
                	document.getElementsByClassName("wordsource")[0].innerHTML = storyName[word].Category;
                  	document.getElementsByClassName("wordtitleMeaning")[0].innerHTML = "Description";
                  	document.getElementsByClassName("wordmeaning")[0].innerHTML = storyName[word].Description;
                  	$("div[class='annotag open']")[0].style.left = pageside != 1 ? "800px" : "150px";
                    $("div[class='annotag open']").show();
                  }
                }

                });
            
        }
      });
    function initialAnnotation(){
        $(".wordsource").text('');
        $(".wordtitleMeaning").text('');
        $(".wordmeaning").text('');
    }
    $( "div[class='annotag open']" ).eyeOut(
            function(){
            	$("div[class='annotag open']").hide();
            },50);
    
    $( "a[class='menu-item red']" ).eyeIn(
            function() {

                  changeBackgroundColor("a[class='menu-item red']",'#EEEEEE','#FE4365');
                  setCircleBartoPosition("a[class='menu-item red']");

                  bar.animate(1.0, {
                      duration: 1000
                  }, function() {    
                      changeBackgroundColor("a[class='menu-item red']",'#ffffff','#EEEEEE');             
                      setCircleBartoDefault();
                   // add selected word into notebook
                      if(json[0].text!=undefined){
                    	  noteText[word] = json[0].text;
                      }else if(json.length>1){
                    	  noteText[word] = json[1].text!=undefined? json[1].text:"";
                      }
                  });
            },2
        );
        
        $( "a[class='menu-item red']" ).eyeOut(
                function(){
                    changeBackgroundColor("a[class='menu-item red']",'#FE4365','#EEEEEE');
                    setCircleBartoDefault();
                },5);
    
    $(document).bind('gazeObject',getGazeObject);

 
    function getGazeObject(evt, element) {
    	// reading a word
      if(element.tagName=='SPAN'&& element.hasRead==undefined){
    	  readText++;
    	  element.hasRead=true;
      }
    };

    function getTopElements(gazeList,number){

      var sortable = [];
      for (var key in gazeList)
        if(key.length>0)
          sortable.push([key, gazeList[key]])

      sortable.sort(function(first, second) {
          return second[1] - first[1];
      });

      var topElements =  {};
      for (var i = 0; i < number; i++)
        topElements[sortable[i][0]] = sortable[i][1];

      return topElements;
    }
    
    $('.outsideApothecary').css('border', '2px solid green');
    $('.cage').css('border', '2px solid green');
    $('.leaving').css('border', '2px solid green');
    $('.wand').css('border', '2px solid green');
    $('.shop').css('border', '2px solid green');
    $('.trywand').css('border', '2px solid green');
    
    $('.outsideApothecary').eyeIn(
      function() {
    	  if(pageside==0||pageside==-1){
    		  pageside=-1;
          $("#outside").show(1000);
          $('.caption.outside').show(1000);
          $("#owl").hide(1000);
          $('.caption.owl').hide(1000);
          $("#diagon").hide(1000);
          $('.caption.diagon').hide(1000);}
        },50
    );
    
    $('.cage').eyeIn(
      function() {
    	  if(pageside==0||pageside==-1){
    		  pageside=-1;
          $("#owl").show(1000);
          $('.caption.owl').show(1000);
          $("#outside").hide(1000);
          $('.caption.outside').hide(1000);
          $("#diagon").hide(1000);
          $('.caption.diagon').hide(1000);}
        },50
    );
    $('.leaving').eyeIn(
      function() {
    	  if(pageside==0||pageside==-1){
    		  pageside=-1;
          $("#diagon").show(1000);
          $('.caption.diagon').show(1000);
          $("#outside").hide(1000);
          $('.caption.outside').hide(1000);
          $("#owl").hide(1000);
          $('.caption.owl').hide(1000);}
        },50
    );
    $('.wand').eyeIn(
      function() {
    	  if(pageside==0||pageside==-1){
    		  pageside=-1;
	          $("#magic").show(1000);
	          $('.caption.magic').show(1000);
          }
        },20
    );
    // change background image
    $('.shop').eyeIn(
		function() {
			if(currentPage!=-1 && !shiftBg){
				shiftBg = true;
				$("div[class='col-md-6']").animate({
					
					opacity : "0.8",
					filter : "alpha(opacity=80)"
				}, 600);
				$('#content').fadeTo('slow', 0.3, function()
					{
						$(this).css('background-image', "url('img/Ollivanders.png')");
						$(this).css('background-size', "cover");
					}).fadeTo('slow', 1);
			}
		},50
    );
    $('.trywand').eyeIn(
    		function() {
    			if(currentPage!=-1 && !shiftBg){
    				shiftBg = true;
	    			$("div[class='col-md-6']").animate({
	    				
	    				opacity : "0.8",
	    				filter : "alpha(opacity=80)"
	    			}, 600);
	    			$('#content').fadeTo('slow', 0.3, function()
					{
						$(this).css('background-image', "url('img/wandshop.png')");
						$(this).css('background-size', "cover");
					}).fadeTo('slow', 1);
    			}
    		},50
        );
    
    function resetbackground(){
		shiftBg = false;
    	$("div[class='col-md-6']").animate({
			
			opacity : "1",
			filter : "alpha(opacity=100)"
		}, 600);
		$('#content').fadeTo('slow', 0.3, function()
			{
				$(this).css('background-image', "");
			}).fadeTo('slow', 1);
    }
    function clearPage(){
    	pageside=0;
  	    $('.img-fluid.left').hide(500);
        $('.caption.left').hide(500);
        $('.img-fluid.right').hide(500);
        $('.caption.right').hide(500);
    }
    $('#bottomArea').eyeIn(
      function() {
    	  clearPage();
          fadein($("nav[class='menu menu-right']")[0]);
        },20
    );
    $('#topArea').eyeIn(
      function() {
    	  clearPage();
        },20
    );
    // images triggered by left text
    $('.img-fluid.left').eyeIn(
		function() {
			pageside=-1;
		},0
	);
    // images triggered by right text
    $('.img-fluid.right').eyeIn(
		function() {
			pageside=1;
		},0
	);

    function get(id) {
        return document.getElementById(id);
    }

    function changeBackgroundColor(element,backgroundColor,color){
      $(element).css('background',backgroundColor);
      $(element).css('color',color);
    }

    function setCircleBartoDefault(){
        bar.animate(0,{
          duration: 0
        });            
        circleCounter.style.display = 'none';
    }

    function setCircleBartoPosition(element){
      var rect = $(element)[0].getBoundingClientRect();
      circleCounter.style.top = rect.top-10 +'px';
      circleCounter.style.left = rect.left-10 +'px';
      circleCounter.style.display = 'inline';
      circleCounter.style.zIndex = "100";
    }
    


    $("#rightArea").eyeIn(
      function(){
        fadein($("nav[class='menu menu-right']")[0]);
      },5);

    $("#rightArea").eyeOut(
      function(){
        $("nav[class='menu menu-right']").hide();
    },5);

    $("#leftArea").eyeIn(
      function(){
    	  fadein($("nav[class='menu menu-left']")[0]);
      },5);

    $("#leftArea").eyeOut(
      function(){
        $("nav[class='menu menu-left']").hide();
    },5);

    function fadein(element) {
      var op = 0.1;  // initial opacity
      element.style.display = 'block';
      var timer = setInterval(function () {
            if (op >= 1){
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 10);
    }


});