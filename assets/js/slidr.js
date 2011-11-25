/*
*
* SLIDR v0.1
* "A jQuery image and HTML animated slider using grid based transitions"
* By Chris Finch (chrisfinchy@gmail.com) for Hovr
*
* Copyright 2011, Hovr Ltd
* Licensed under the GPL Version 3 license.
*
* Date: Fri 25th november 2011
*
* Sample controls:
* <ul>
* 	<a class="slidr-ui" id="prev" href="#">&laquo;</a>
* 	<a class="slidr-ui" id="next" href="#">&raquo;</a>
* 	<li></li>
* </ul>
* 
* Sample script calls + css:
* <link href="http://slidr.justatest.co/assets/slidr.css" rel="stylesheet" type="text/css" />
* <script src="http://slidr.justatest.co/assets/js/slidr.js" type="text/javascript"></script>
* 
* available animations: 'chequerboard', 'blind', 'curtain', 'threeBoard', 'left', 'right', 'up', 'down', 'fade', 'col_fade', 'crossFade'
*
* Sample options:
*
* {
* 	animations	: ['chequerboard', 'blind', 'curtain', 'threeBoard', 'left', 'right', 'up', 'down', 'fade', 'col_fade', 'crossFade'],	// a single animation, array of animations or 'all'
*	speed 		: 	900,	// speed of the animations (ms)
*	uiLocation	:	$('.slidr-ui'),		//jQuery selector with location of next and prev buttons
*	auto		: 	true,	// advance the slide automagically? (true/false)
*	autoTimer	:	5000	// how long to wait between automatic transitions? (ms)
* }
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
*/

(function( $ ){
	
	$.fn.slidr = function( options ) {
		
		var opts = {
			animation	:	'all',
			speed 		: 	900,
			auto		: 	true,
			autoTimer	:	5000
		};
		
		return this.each(function() {        
			var self = $(this);
			if ( options ) { 
				$.extend( opts, options );
			}
		    var lis = self.find("li"),
				container = $("<div />").attr("id", "transitions"),
				currentLi = 0,
				size = 80,
				topZindex = lis.length,
				x,
				y,
				animations = ['chequerboard', 'blind', 'curtain', 'threeBoard', 'left', 'right', 'up', 'down', 'fade', 'col_fade', 'crossFade'];
		
		    //set incremental z-indices
		    $.each(lis, function (i) {
		        $(this).css("zIndex", topZindex - i);
		    });
			
			var grid_w = (self.width() / size),
				grid_h = (self.height() / size);
		
		    //build transitions grid
		    for (x = 0; x < grid_w; x++) {
		        for (y = 0; y < grid_h; y++) {
		            $("<div />").css({
		                width: size,
		                height: size,
		                left: x * size,
		                top: y * size,
		                overflow: "hidden",
		                backgroundPosition: "-" + x * size + "px -" + y * size + "px"
		            }).addClass('cb').appendTo(container);
		        }
		    }
		
		    self.bind("chequerboardReady", function () {
		        var transitions = self.find("#transitions div.cb");
		        transitions.each(function (i) {
		            function chequerboard() {
		                if (i < transitions.length - 1) {
		                    transitions.eq(i).fadeOut(opts.speed, "linear");
		                } else {
		                    transitions.eq(i).delay(200).fadeOut(opts.speed, "linear", function () {
		                        transitions.parent().remove();
		                    });
		                }
		            }
		            setTimeout(function () { chequerboard(); }, Math.floor(Math.random() * 5) * 100);
		        });
		    });
		    
		    self.bind("blindReady", function () {
		        var transitions = self.find("#transitions div.cb");
		        transitions.each(function (i) {
		
		            function blind () {
		                if (i < transitions.length - 1) {
		                    transitions.eq(i).fadeOut(opts.speed, "linear");
		                } else {
		                    transitions.eq(i).fadeOut(opts.speed, "linear", function () {
		                        transitions.parent().remove();
		                    });
		                }
		            }
		
		            setTimeout(function () { blind(); }, 10*i);
		        });
		    });
		    
		    self.bind("curtainReady", function () {
		        var transitions = self.find("#transitions div.cb"),
		        	slice = ((transitions.length)/2),
		        	left = transitions.slice(0, slice), 
		            right = transitions.slice(slice);
		            left.animate({
		            	left: '-=1000px'
		            }, opts.speed);
		            right.animate({
		            	left: '+=1000px'
		            }, opts.speed);
		            
		            $.when(left, right).then(function () {
		            	transitions.parent().remove();
		            });
		    });
		    
		    self.bind("threeBoardReady", function () {
		        var transitions = self.find("#transitions div.cb"),
		        	slice = ((transitions.length)/3),
		        	left = transitions.slice(0, slice),
		        	center= transitions.slice(slice, (slice*2)), 
		            right = transitions.slice(slice*2);
		            
		            left.animate({
		            	top: '+=1000px'
		            }, opts.speed);
		            center.animate({
		            	top: '-=1000px'
		            }, opts.speed);
		            right.animate({
		            	top: '+=1000px'
		            }, opts.speed);
		            $.when(left, right).then(function () {
		            	transitions.parent().remove();
		            });
		    });
		    
		    self.bind("leftReady", function () {
		        var transitions = self.find("#transitions div.cb"),
		        	width= '+='+(self.width()+100);
		            transitions.animate({
		            	left: width
		            }, opts.speed);
		            $.when(transitions).then(function () {
		            	transitions.parent().remove();
		            });
		    });
		    
		    self.bind("rightReady", function () {
		        var transitions = self.find("#transitions div.cb");
		            transitions.animate({
		            	left: '-=1000px'
		            }, opts.speed);
		            $.when(transitions).then(function () {
		            	transitions.parent().remove();
		            });
		    });
		    

		    self.bind("upReady", function () {
		        var transitions = self.find("#transitions div.cb");
		            transitions.animate({
		            	top: '-=1000px'
		            }, opts.speed);
		            $.when(transitions).then(function () {
		            	transitions.parent().remove();
		            });
		    });
		    
		    self.bind("downReady", function () {
		        var transitions = self.find("#transitions div.cb");
		            transitions.animate({
		            	top: '+=1000px'
		            }, opts.speed);
		            $.when(transitions).then(function () {
		            	transitions.parent().remove();
		            });
		    });
		    
		    self.bind("fadeReady", function () {
		        var transitions = self.find("#transitions div.cb");
		            transitions.fadeOut(opts.speed);
		            $.when(transitions).then(function () {
		            	transitions.parent().remove();
		            });
		    });

/*
		    self.bind("rainReady", function () {
		       	var transitions = self.find("#transitions div.cb"),
		        	cols = ($('#transitions').width()/80),
		        	cols_length = ($('#transitions').height()/80),
		        	cols_a = [],
		        	r;
		            for (r = 1; r < (cols+1); r++) {
		            	cols_a.push(transitions.slice(cols_length*(r-1), cols_length*r));
		            }
		            function lin_fade (e, last) {
		            	var el = e;
		            	$.each(el, function (i, e) {
		            		function _fade () {
		            			if (last != true) {
		            				setTimeout(function () {el.eq(i).fadeOut()}, Math.floor(Math.random() * 5) * 100); )
		            			} else {
		            				el.eq(i).delay(200).fadeOut(function () {
		            					transitions.parent().remove();
		            				});
		            			}
		            		}
		            		setTimeout(function () {_fade()}, 100*i)
		            	})
		            }
		            
		            $.each(cols_a, function (i, e) {
			            function rain () {
			                if (i < cols_a.length - 1) {
								lin_fade(cols_a[i]);
			                } else {
			                    lin_fade(cols_a[i], true);
			                }
			            }
						setTimeout(function () { rain(); }, 120*i)
		            });
		    });
*/
		    
		    self.bind("crossFadeReady", function () {
		       	var transitions = self.find("#transitions div.cb"),
		        	cols = ($('#transitions').width()/80),
		        	cols_length = ($('#transitions').height()/80),
		        	cols_a = [],
		        	r;
	            for (r = 1; r < (cols+1); r++) {
	            	cols_a.push(transitions.slice(cols_length*(r-1), cols_length*r));
	            }
	            function lin_fade (e, last) {
	            	var el = e;
	            	$.each(el, function (i, e) {
	            		function _fade () {
	            			if (last != true) {
	            				el.eq(i).fadeOut(opts.speed);
	            			} else {
	            				el.eq(i).fadeOut(opts.speed);
	            				function x () {transitions.parent().remove()}		            				
	            				setTimeout(x, 1500);
							}
	            		}
	            		setTimeout(function () {_fade()}, 100*i)
	            	})
	            }
	            $.each(cols_a, function (i, e) {
		            function rain () {
		                if (i < cols_a.length - 1) {
							lin_fade(cols_a[i]);
		                } else {
		                    lin_fade(cols_a[i], true);
		                }
		            }
					setTimeout(rain, 120*i)
	            });
		    });
		    
		   	self.bind("col_fadeReady", function () {
		       	var transitions = self.find("#transitions div.cb"),
		        	cols = ($('#transitions').width()/80),
		        	cols_length = ($('#transitions').height()/80),
		        	cols_a = [],
		        	r;
		            for (r = 1; r < (cols+1); r++) {cols_a.push(transitions.slice(cols_length*(r-1), cols_length*r))}
		            $.each(cols_a, function (i, e) {
			            function rain () {
			                if (i < cols_a.length - 1) {
			                    cols_a[i].fadeOut(opts.speed, "linear");
			                } else {
			                    cols_a[i].fadeOut(opts.speed, "linear", function () {
			                        transitions.parent().remove();
			                    });
			                }
			            }
						setTimeout(function () { rain(); }, 120*i)
		            });
		            
		    });
		
		    //ui handler
		    var ui = opts.uilocation ? $(opts.uilocation) : self.find(".slidr-ui");
		    if (opts.auto == true) {
		    	var auto = setInterval("$('#next.slidr-ui').click();",opts.autoTimer);
		    }
		    ui.live("click", function (e) {
		        e.preventDefault();
		        if (!$("#transitions div").is(":animated")) {
		            if (opts.auto == true) {auto = window.clearInterval(auto)}	                        		
		            var containerCopy = container.clone(),
		            	li = lis.eq(currentLi),
		            	animation;
					if (li.children('img').length == 1 && li.children().length == 1) {
						containerCopy.find("div").css({
			                backgroundImage: "url(" + lis.eq(currentLi).find('img').attr("src") + ")"
			            });						
					} else {
			            containerCopy.find("div").each( function (i, e) {
			                $(this).append( li.clone().css({
			                	top: ("-" + $(this).css('top')),
			                	left: ("-" + $(this).css('left'))
			                }) );
			            });						
					} 		            
		            containerCopy.css("zIndex", topZindex + 2).appendTo(self);
					//move to next image
		            if (this.id === "prev") {
		                currentLi = (currentLi === 0) ? lis.length - 1 : currentLi - 1;
		            } else {
		                currentLi = (currentLi === lis.length - 1) ? 0 : currentLi + 1;
		            }
		            self.find(".current").removeClass("current");
		            lis.eq(currentLi).addClass("current").css("zIndex", topZindex + 1);
		            topZindex++;
					if (opts.animation == "all") {
						animation = animations[ Math.floor(Math.random()*animations.length)];
					} else if ( $.isArray(opts.animation) ) {
						animation = opts.animation[ Math.floor(Math.random()*opts.animation.length)];
					} else if ( typeof opts.animation == "string" ) {
						animation = opts.animation;
					} else {
						//falback...
						animation = "blind";
					};
					if (typeof auto == 'undefined' && opts.auto == true) {	
						auto = setInterval("$('#next.slidr-ui').click();",opts.autoTimer)
					}
		            self.trigger( animation + "Ready");
		        }
		    });
		    
	    });
	};
})( jQuery );