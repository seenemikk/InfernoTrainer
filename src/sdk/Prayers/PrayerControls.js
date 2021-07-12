
import PrayerPanel from "../../assets/images/panels/prayer.png";
import PrayerTab from "../../assets/images/tabs/prayer.png";
import Pathing from "../Pathing";
import Point from "../Point";
import BaseControls from "../ControlPanels/BaseControls";
import ProtectMelee from "./ProtectMelee";
import ProtectMage from "./ProtectMage";
import ProtectRange from "./ProtectRange";
import _ from "lodash";
import BrowserUtils from "../BrowserUtils";
import Rigour from "./Rigour";
import SharpEye from "./SharpEye";
import HawkEye from "./HawkEye";
import EagleEye from "./EagleEye";
import MysticWill from "./MysticWill";
import MysticLore from "./MysticLore";
import MysticMight from "./MysticMight";
import Augury from "./Augury";

export default class PrayerControls extends BaseControls{

  get panelImageReference() {
    return PrayerPanel;
  }

  get tabImageReference() {
    return PrayerTab;
  }


  get keyBinding() {
    return BrowserUtils.getQueryVar("pray_key") || "3";
  }


  static prayers = [
    'Thick Skin',
    'Burst of Strength',
    'Clarity of Thought',
    new SharpEye(),
    new MysticWill(),
    'Rock Skin',
    'Superhuman Strength',
    'Improved Reflexes',
    'Rapid Restore',
    'Rapid Heal',
    'Protect Item',
    new HawkEye(),
    new MysticLore(),
    'Steel Skin',
    'Ultimate Strength',
    'Incredible Reflexes',
    new ProtectMage(),
    new ProtectRange(),
    new ProtectMelee(),
    new EagleEye(),
    new MysticMight(),
    'Retribution',
    'Redemption',
    'Smite',
    'Preserve',
    'Chivalry',
    'Piety',
    new Rigour(),
    new Augury()
  ];

  getCurrentActivePrayers() {
    return PrayerControls.prayers.filter((prayer) => prayer.isActive);
  }

  clickedPanel(stage, x, y){
    const gridX = x - 14;
    const gridY = y - 22;

    const clickedPrayer = PrayerControls.prayers[Math.floor(gridY / 35) * 5 + Math.floor(gridX / 35)];
    if (clickedPrayer && typeof clickedPrayer !== 'string') {
      this.getCurrentActivePrayers().forEach((prayer) => {
        if (!prayer || !prayer.groups) {
          return;
        }
        if (_.intersection(prayer.groups, clickedPrayer.groups).length && prayer != clickedPrayer){
          prayer.deactivate();
        }
      })

      clickedPrayer.activate();
    }
  }

  draw(ctx, x, y) {

    super.draw(ctx, x, y);

    PrayerControls.prayers.forEach((prayer, index) => {

      const x = index 
      if (prayer.isActive) {

        const x2 = index % 5;
        const y2 = Math.floor(index / 5);
        
        ctx.beginPath();
        ctx.fillStyle = "#D1BB7773";
        ctx.arc(37 + (x2 + 0.5) * 36.8, 16 + y + (y2 + 0.5) * 37, 18, 0, 2 * Math.PI);
        ctx.fill();
      }

    });
    
  }
}
