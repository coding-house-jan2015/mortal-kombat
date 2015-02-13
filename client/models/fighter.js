/* global _, hitEffect */
/* exported Fighter */

'use strict';

function Fighter(name, image) {
  this.name = name;
  this.image = image;
  this.strength = _.random(1, 20);
  this.health = 100;
  this.armor = _.random(1, 5);
}

Fighter.prototype.hit = function(defender) {
  var hitTypes = [0, 0.25, 0.50, 0.75, 1];
  var hitPercent = _.sample(hitTypes);
  var attack = (this.strength + this.weapon.damage) * hitPercent;
  var total = (attack - defender.armor) < 0 ? 0 : attack - defender.armor;
  defender.health -= total;
  hitEffect.play();
};
