# SLIDR v0.1

"A jQuery image and HTML animated slider using grid based transitions"
By Chris Finch (chrisfinchy@gmail.com) for Hovr

### License 

Copyright 2011, Hovr Ltd
Licensed under the GPL Version 3 license.

Date: Fri 25th november 2011

### Usage

Sample controls:

	<ul>
		<a class="slidr-ui" id="prev" href="#">&laquo;</a>
		<a class="slidr-ui" id="next" href="#">&raquo;</a>
		<li></li>
	</ul>

Sample script calls + css:

	<link href="/assets/slidr.css" rel="stylesheet" type="text/css" />
	<script src="/assets/js/slidr.js" type="text/javascript"></script>

available animations: 'chequerboard', 'blind', 'curtain', 'threeBoard', 'left', 'right', 'up', 'down', 'fade', 'col_fade', 'crossFade'

Sample options:

	{
		animations	: ['chequerboard', 'blind', 'curtain', 'threeBoard', 'left', 'right', 'up', 'down', 'fade', 'col_fade', 'crossFade'],	// a single animation, array of animations or 'all'
		speed 		: 	900,	// speed of the animations (ms)
		uiLocation	:	$('.slidr-ui'),		//jQuery selector with location of next and prev buttons
		auto		: 	true,	// advance the slide automagically? (true/false)
		autoTimer	:	5000	// how long to wait between automatic transitions? (ms)
	}