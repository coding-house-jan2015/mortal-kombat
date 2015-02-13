'use strict';

$(document).ready(init);

function init() {
  playTheme();
}

function playTheme() {
  $('audio').attr('src', '/audio/theme.mp3');
  $('audio')[0].play()
}
