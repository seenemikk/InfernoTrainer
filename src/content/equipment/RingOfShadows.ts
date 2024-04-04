import { ImageLoader } from "../../sdk/utils/ImageLoader";
import InventImage from '../../assets/images/equipment/Ring_of_shadows.png';
import { Ring } from "../../sdk/gear/Ring";
import { ItemName } from "../../sdk/ItemName";

export class RingOfShadows extends Ring{
  inventorySprite: HTMLImageElement = ImageLoader.createImage(this.inventoryImage)

  get inventoryImage () {
    return InventImage
  }
  get itemName(): ItemName {
    return ItemName.RING_OF_SHADOWS
  }

  get weight(): number {
    return 0.004;
  }

  constructor() {
    super();
    this.bonuses = {
      attack: {
        stab: 4,
        slash: 4,
        crush: 4,
        magic: 5,
        range: 4
      },
      defence: {
        stab: 0,
        slash: 0,
        crush: 0,
        magic: 5,
        range: 0
      },
      other: {
        meleeStrength: 2,
        rangedStrength: 0,
        magicDamage: 0,
        prayer: 2
      },
      targetSpecific: {
        undead: 0,
        slayer: 0
      }
    }
  }
}