'use strict'

import { BasePrayer } from './BasePrayer'
import { Settings } from '../Settings'

export class MysticLore extends BasePrayer {
  get name () {
    return 'Mystic Lore'
  }

  get groups () {
    return [BasePrayer.groups.MAGIC, BasePrayer.groups.DEFENCE]
  }

  isOverhead () {
    return false
  }

  feature () {
    return 'offensiveMagic'
  }

  playOnSound () {
    if (Settings.playsAudio) {
      // new Audio(OnSound).play();
    }
  }

  playOffSound () {
    if (Settings.playsAudio) {
      // new Audio(OffSound).play();
    }
  }
}
