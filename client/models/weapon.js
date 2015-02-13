/* global _ */
/* exported Weapon */

'use strict';

function Weapon(name, image) {
  this.name = name;
  this.image = image;
  this.damage = _.random(1, 20);
}
