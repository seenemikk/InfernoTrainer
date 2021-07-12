import Projectile from "./Projectile";
import { Weapon } from "./Weapon";

export default class MagicWeapon extends Weapon {
  attack(from, to, bonuses){
    if (from.isMob === false){
      const offensivePrayer = _.find(from.prayers, (prayer) => prayer.feature() === 'offensiveMagic');
      if (offensivePrayer) {
        bonuses.offensivePrayer = offensivePrayer;
      }
    }
    bonuses.isAccurate = bonuses.isAccurate || false;
    bonuses.voidMultiplier = bonuses.voidMultiplier || 1;
    bonuses.gearMultiplier = bonuses.gearMultiplier || 1;
    
    to.addProjectile(new Projectile(this._rollAttack(from, to, bonuses), from, to, 'magic'));
  }

  _rollAttack(from, to, bonuses){
    return (Math.random() > this._hitChance(from, to, bonuses)) ? 0 : Math.floor(Math.random() * this._maxHit(from, to, bonuses));
  }
  
  _magicLevel(from, to, bonuses){
    
    const prayerMultiplier = 1;
    if (bonuses.offensivePrayer){
      if (bonuses.offensivePrayer.Name === 'Mystic Will'){
        prayerMultiplier = 1.05;
      }else if (bonuses.offensivePrayer.Name === 'Mystic Lore'){
        prayerMultiplier = 1.1;
      }else if (bonuses.offensivePrayer.Name === 'Mystic Might'){
        prayerMultiplier = 1.15;
      }else if (bonuses.offensivePrayer.Name === 'Augury'){
        prayerMultiplier = 1.2;
      }
    }
    return Math.floor(Math.floor(from.currentStats.magic * prayerMultiplier) * bonuses.voidMultiplier + (bonuses.isAccurate ? 2 : 0) + 9)
  }
  _equipmentBonus(from, to, bonuses) {
    return from.bonuses.attack.magic;
  }

  _magicDamageBonusMultiplier(from, to, bonuses) {
    return 1; // needs to scan from for gear
  }

  _attackRoll(from, to, bonuses) {
    return Math.floor(this._magicLevel(from, to, bonuses) * (this._equipmentBonus(from, to, bonuses) + 64) * bonuses.gearMultiplier)
  }
  _defenceRoll(from, to, bonuses) {
    const prayerMultiplier = 1;
    if (bonuses.offensivePrayer){
      if (bonuses.offensivePrayer.Name === 'Thick Skin'){
        prayerMultiplier = 1.05;
      }else if (bonuses.offensivePrayer.Name === 'Mystic Will'){
        prayerMultiplier = 1.05;
      }else if (bonuses.offensivePrayer.Name === 'Rock Skin'){
        prayerMultiplier = 1.1;
      }else if (bonuses.offensivePrayer.Name === 'Mystic Lore'){
        prayerMultiplier = 1.1;
      }else if (bonuses.offensivePrayer.Name === 'Steel Skin'){
        prayerMultiplier = 1.15;
      }else if (bonuses.offensivePrayer.Name === 'Mystic Might'){
        prayerMultiplier = 1.15;
      } else if (bonuses.offensivePrayer.Name === 'Chivalry'){
        prayerMultiplier = 1.2;
      }else if (bonuses.offensivePrayer.Name === 'Piety'){
        prayerMultiplier = 1.25;
      } else if (bonuses.offensivePrayer.Name === 'Rigour'){
        prayerMultiplier = 1.25;
      } else if (bonuses.offensivePrayer.Name === 'Augury'){
        prayerMultiplier = 1.25;
      } 
    }

    return (9 + to.currentStats.magic * prayerMultiplier) * (to.bonuses.defence.magic + 64)
  }

  _hitChance(from, to, bonuses) {
    const attackRoll = this._attackRoll(from, to, bonuses) ;
    const defenceRoll = this._defenceRoll(from, to, bonuses);
    return (attackRoll > defenceRoll) ? (1 - (defenceRoll + 2) / (2 * attackRoll + 1)) : (attackRoll / (2 * defenceRoll + 1));    

  }

  _maxHit(from, to, bonuses) {
    return Math.floor(this._baseSpellDamage(from, to, bonuses) * (this._magicDamageBonusMultiplier(from, to, bonuses)));
    // TODO: Most of this isn't implemented
// Spell Base damage +3 if casting bolt spells with chaos gauntlets
// Answer * (1 + magic damage bonus)
// Round the answer down to the nearest integer
// Answer * salve amulet bonus (Salve bonus does not stack with slayer bonus, skip to step 7 if using salve amulet)
// Round the answer down to the nearest integer
// Answer * slayer bonus
// Round the answer down to the nearest integer
// Answer * Tome of fire bonus
// Round the answer down to the nearest integer
// Answer * castle wars bonus
// Round the answer down to the nearest integer
// That is the max hit
  }
  _baseSpellDamage(from, to, bonuses) {
    return bonuses.magicBaseSpellDamage; // Jal-Zek specific number for now. 
  }
}