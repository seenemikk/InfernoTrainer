'use strict'


import chebyshev from 'chebyshev'
import { GameObject, Location } from '../GameObject'
import { Unit } from '../Unit'
import { ImageLoader } from '../utils/ImageLoader'
import { Weapon } from '../gear/Weapon'

export interface ProjectileOptions {
  forceSWTile?: boolean;
  hidden?: boolean;
  reduceDelay?: number;
}

export class Projectile {
  weapon: Weapon;
  damage: number;
  from: Unit;
  to: Unit;
  distance: number;
  options: ProjectileOptions = {};
  remainingDelay: number;
  currentLocation: Location;
  attackStyle: string;

  offsetX: number;
  offsetY: number;
  image: HTMLImageElement;

  /*
    This should take the player and mob object, and do chebyshev on the size of them
  */
  constructor (weapon: Weapon, damage: number, from: Unit, to: Unit, attackStyle: string, options: ProjectileOptions = {}) {

    this.attackStyle = attackStyle;
    this.damage = Math.floor(damage)
    if (this.damage > to.currentStats.hitpoint) {
      this.damage = to.currentStats.hitpoint
    }
    this.options = options;

    this.currentLocation = {
      x: from.location.x + from.size / 2,
      y: from.location.y - from.size / 2 + 1
    }
    this.from = from
    this.to = to
    this.distance = 999999

    if (Weapon.isMeleeAttackStyle(attackStyle)) {
      this.distance = 0
      this.remainingDelay = 1
      return
    }

    if (weapon.image){
      this.image = ImageLoader.createImage(weapon.image);
    }

    if (options.forceSWTile) {
      // Things like ice barrage calculate distance to SW tile only
      this.distance = chebyshev([this.from.location.x, this.from.location.y], [this.to.location.x, this.to.location.y])
    } else {
      let closestTile = to.getClosestTileTo(this.from.location.x, this.from.location.y);
      this.distance = chebyshev([this.from.location.x, this.from.location.y], [closestTile[0], closestTile[1]]);  
    }
    
    this.remainingDelay = Math.floor(1 + (3 + this.distance) / 6) + 1;
    if (this.options.reduceDelay) { 
      this.remainingDelay -= this.options.reduceDelay;
      if (this.remainingDelay < 1) {
        this.remainingDelay = 1;
      }
    }

  }
}
