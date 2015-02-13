/* global _, Weapon, Fighter */
'use strict';

$(document).ready(init);

function init() {
  loadSoundEffects();
  playTheme();
  createWeapons();
  paintWeapons();
  createFighters();
  paintFighters();
  chooseFighter();
  $('#weapons').on('click', '.weapon:not(".picked")', clickWeapon);
  $('#fight').click(clickFight);
}

var weapons = [];
var fighters = [];
var equipped = [];
var deadFighters = [];
var hitEffect = null;

function clickFight() {
  if (equipped.length >= 2) {
    var p1 = _.sample(equipped);
    var p2;
    while (true) {
      p2 = _.sample(equipped);
      if (p2.name !== p1.name) {
        break;
      }
    }

    p1.hit(p2);
    if (p2.health > 0) {
      p2.hit(p1);
    }

    playerFuneral(p1);
    playerFuneral(p2);

    $('.fighter:not(".dead")').css('background-color', 'white');
    paintPlayer(p1, 'red');
    paintPlayer(p2, 'blue');
  }
}

function paintPlayer(player, color) {
  var $player = $('.fighter:contains("' + player.name + '")');
  $player.find('.health').text('h: ' + player.health);

  if (player.health <= 0) {
    $player.addClass('dead');
  } else {
    $player.css('background-color', color);
  }
}

function playerFuneral(player) {
  if (player.health <= 0) {
    deadFighters.push(_.remove(equipped, function(f) {return f.name === player.name;})[0]);
  }
}

function clickWeapon() {
  var weaponName = $(this).find('.name').text();
  var weapon = _.find(weapons, function(w) {return w.name === weaponName;});
  var $fighter = $('.choose');
  var fighterName = $fighter.find('.name').text();
  var fighter = _.find(fighters, function(f) {return f.name === fighterName;});
  fighter.weapon = weapon;
  addWeaponToFighter($fighter, weapon);
  equipped.push(_.remove(fighters, function(f) {return f.name === fighterName;})[0]);
  $(this).addClass('picked');
  $fighter.removeClass('choose');

  if (fighters.length) {
    chooseFighter();
  }
}

function chooseFighter() {
  var fighter = _.sample(fighters);
  var $fighter = $('.fighter:contains("' + fighter.name + '")');
  $fighter.addClass('choose');
}

function playTheme() {
  $('#music').attr('src', '/audio/theme.mp3');
  $('#music')[0].play();
}

function loadSoundEffects() {
  $('#effects').attr('src', '/audio/hit.wav');
  hitEffect = $('#effects')[0];
}

function createWeapons() {
  var w1 = new Weapon('scythe', 'http://img1.wikia.nocookie.net/__cb20120712091234/finalfantasy/images/a/ae/FFXI_Scythe_2B.png');
  var w2 = new Weapon('railgun', 'http://digital-art-gallery.com/oid/24/1300x662_5871_Railgun_3d_sci_fi_gun_weapon_picture_image_digital_art.jpg');
  var w3 = new Weapon('magic', 'http://hollichristinemccormick.com/wp-content/uploads/2014/07/magic.gif');

  weapons.push(w1, w2, w3);
}

function createFighters() {
  var f1 = new Fighter('alien', 'http://news.toyark.com/wp-content/uploads/sites/4/2014/03/MonsterArts-Alien-24.jpg');
  var f2 = new Fighter('predator', 'http://www.sideshowtoy.com/wp-content/uploads/2013/06/902001-product-thumb.jpg');
  var f3 = new Fighter('viking', 'http://static.giantbomb.com/uploads/original/5/58746/1703000-viking.jpg');

  fighters.push(f1, f2, f3);
}

function paintWeapons() {
  weapons.forEach(function(weapon) {
    var $outer = $('<div>');
    $outer.addClass('weapon');

    var $img = $('<div>');
    $img.css('background-image', 'url("' + weapon.image + '")');

    var $info = $('<div>');
    var $name = $('<div>');
    $name.addClass('name');
    $name.text(weapon.name);

    var $damage = $('<div>');
    $damage.text('d: ' + weapon.damage);

    $outer.append($img, $info);
    $info.append($name, $damage);
    $('#weapons').append($outer);
  });
}

function paintFighters() {
  fighters.forEach(function(fighter) {
    var $outer = $('<div>');
    $outer.addClass('fighter');

    var $img = $('<div>');
    $img.css('background-image', 'url("' + fighter.image + '")');

    var $info = $('<div>');
    var $name = $('<div>');
    $name.addClass('name');
    $name.text(fighter.name);

    var $armor = $('<div>');
    $armor.text('a: ' + fighter.armor);

    var $health = $('<div>');
    $health.text('h: ' + fighter.health);
    $health.addClass('health');

    var $strength = $('<div>');
    $strength.text('s: ' + fighter.strength);

    $outer.append($img, $info);
    $info.append($name, $armor, $health, $strength);
    $('#fighters').append($outer);
  });
}

function addWeaponToFighter($fighter, weapon) {
  $fighter.children().eq(1).append('<div>w: ' + weapon.name + '</div>');
}
