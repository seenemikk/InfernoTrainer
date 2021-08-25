'use strict'

import { Mob } from '../../../../sdk/Mob'
import JalAkRekMejImage from '../../assets/images/Jal-AkRek-Mej.png'
import { MagicWeapon } from '../../../../sdk/weapons/MagicWeapon'
import { Settings } from '../../../../sdk/Settings'
import { UnitBonuses } from '../../../../sdk/Unit'
import { EntityName } from "../../../../sdk/EntityName"
import { World } from '../../../../sdk/World'
import { Location } from '../../../../sdk/Location'

export class JalAkRekMej extends Mob {

  mobName(): EntityName { 
    return EntityName.JAL_AK_REK_MEJ;
  }

  get combatLevel () {
    return 70
  }

  get combatLevelColor () {
    return 'lime'
  }

  drawUnderTile(tickPercent: number) {

    if (this.dying > -1) {
      this.world.region.context.fillStyle = '#964B0073'
    }{
      this.world.region.context.fillStyle = '#0000FF'
    }

    // Draw mob
    this.world.region.context.fillRect(
      -(this.size * Settings.tileSize) / 2,
      -(this.size * Settings.tileSize) / 2,
      this.size * Settings.tileSize,
      this.size * Settings.tileSize
    )
  }


  setStats () {

    this.weapons = {
      magic: new MagicWeapon()
    }

    // non boosted numbers
    this.stats = {
      attack: 1,
      strength: 1,
      defence: 95,
      range: 1,
      magic: 120,
      hitpoint: 15
    }

    // with boosts
    this.currentStats = JSON.parse(JSON.stringify(this.stats))

  }

  get bonuses(): UnitBonuses {
    return {
      attack: {
        stab: 0,
        slash: 0,
        crush: 0,
        magic: 25,
        range: 0
      },
      defence: {
        stab: 0,
        slash: 0,
        crush: 0,
        magic: 25,
        range: 0
      },
      other: {
        meleeStrength: 0,
        rangedStrength: 0,
        magicDamage: 1.25,
        prayer: 0
      }
    };
  }

  get cooldown () {
    return 4
  }

  get attackRange () {
    return 5
  }

  get size () {
    return 1
  }

  get image () {
    return JalAkRekMejImage
  }

  get sound (): string {
    return null
  }

  attackStyleForNewAttack () {
    return 'magic'
  }

  attackAnimation (tickPercent: number) {
    this.world.region.context.translate(Math.sin(tickPercent * Math.PI * 4) * 2, Math.sin(tickPercent * Math.PI * -2))
  }
}
