'use strict';

const DES_MAX_LEVEL = 712;
const DESR_MAX_LEVEL = 712;
const DAS_MAX_LEVEL = 713;
const DSR_MAX_LEVEL = 713;
const DSR_MAX_WEAPON_LEVEL = 15;
const DS2_MAX_LEVEL = 838;
const DS3_MAX_LEVEL = 802;
const DS3_MAX_WEAPON_LEVEL = 10;
const BB_MIN_LEVEL = 4;
const BB_MAX_LEVEL = 544;

const MAX_LEVEL = Math.max(DES_MAX_LEVEL, DESR_MAX_LEVEL, DAS_MAX_LEVEL, DSR_MAX_LEVEL, DS2_MAX_LEVEL, DS3_MAX_LEVEL);

const DS3_WL_MAP = {
  [0]: [0, 1],
  [1]: [0, 2],
  [2]: [1, 3],
  [3]: [2, 4],
  [4]: [3, 6],
  [5]: [4, 7],
  [6]: [4, 8],
  [7]: [5, 9],
  [8]: [6, 10],
  [9]: [7, 10],
  [10]: [8, 10]
};

const clamp = (num, min, max) => {
  if (num < min) {
    return min;
  }

  if (num > max) {
    return max;
  }

  return num;
}

class DES {
  static clampLevel(level) {
    return clamp(level, 1, DES_MAX_LEVEL);
  }
}

class DESR {
  static clampLevel(level) {
    return clamp(level, 1, DESR_MAX_LEVEL);
  }
}

class DAS {
  static clampLevel(level) {
    return clamp(level, 1, DAS_MAX_LEVEL);
  }
}

class DSR {
  static clampLevel(level) {
    return clamp(level, 1, DSR_MAX_LEVEL);
  }

  static clampWeaponLevel(level) {
    return clamp(level, 0, DSR_MAX_WEAPON_LEVEL);
  }
}

class DS3 {
  static clampLevel(level) {
    return clamp(level, 1, DS3_MAX_LEVEL);
  }

  static clampWeaponLevel(level) {
    return clamp(level, 0, DS3_MAX_WEAPON_LEVEL);
  }
}

class BB {
  static clampLevel(level) {
    return clamp(level, BB_MIN_LEVEL, BB_MAX_LEVEL);
  }
}

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const getLevel = () => {
  const lvl = parseInt($('#level').value, 10);
  return lvl === NaN ? 1 : lvl;
};

const getWeaponLevel = () => {
  const wl = parseInt($('#weapon-level').value, 10);
  return wl === NaN ? 0 : wl;
};

const max = (...values) => Math.max(...values);
const floor = num => Math.floor(num);
const ceil = num => Math.ceil(num);

const calculateMax = (level, formula, max) => {
  for (let x = max; x > 0; x--) {
    const target = formula(x);
    if (target <= level) {
      return x;
    }
  }

  return 1;
};

const calculateMin = (level, formula, max) => {
  for (let x = 0; x < max; x++) {
    const target = formula(x);

    if (target >= level) {
      return x;
    }
  }

  return max;
};

const calculateDemonsSouls = level => {
  const cl = l => DES.clampLevel(l);
  level = cl(level);
  const bresMin = l => cl(l - (10 + floor(0.1 * l)));
  const bresMax = l => cl(l + (10 + floor(0.1 * l)));
  const bresHostMin = bresMin(level);
  const bresHostMax = bresMax(level);
  const bresPhantomMin = cl(calculateMin(level, bresMax, DES_MAX_LEVEL));
  const bresPhantomMax = cl(calculateMax(level, bresMin, DES_MAX_LEVEL));
  const besMin = l => cl(l - (12 + floor(0.1 * l)));
  const besMax = l => cl(l - 2);
  const besHostMin = level < 3 ? 'N/A' : besMin(level);
  const besHostMax = level < 3 ? 'N/A' : besMax(level);
  const besPhantomMin = max(3, cl(calculateMin(level, besMax, DES_MAX_LEVEL)));
  const besPhantomMax = cl(calculateMax(level, besMin, DES_MAX_LEVEL));
  const tomHostMin = cl(level - 40);
  const tomHostMax = cl(level + 10);
  const tomPhantomMin = cl(level - 10);
  const tomPhantomMax = cl(level + 40);

  $('.des .bres .host .min.level').innerText = bresHostMin;
  $('.des .bres .host .max.level').innerText = bresHostMax;
  $('.des .bres .phantom .min.level').innerText = bresPhantomMin;
  $('.des .bres .phantom .max.level').innerText = bresPhantomMax;
  $('.des .bes .host .min.level').innerText = besHostMin;
  $('.des .bes .host .max.level').innerText = besHostMax;
  $('.des .bes .phantom .min.level').innerText = besPhantomMin;
  $('.des .bes .phantom .max.level').innerText = besPhantomMax;
  $('.des .tom .host .min.level').innerText = tomHostMin;
  $('.des .tom .host .max.level').innerText = tomHostMax;
  $('.des .tom .phantom .min.level').innerText = tomPhantomMin;
  $('.des .tom .phantom .max.level').innerText = tomPhantomMax;
};

const calculateDemonsSoulsRemake = level => {
  const cl = l => DESR.clampLevel(l);
  level = cl(level);

  const bresMin = l => cl(l - (10 + floor(0.1 * l)));
  const bresMax = l => cl(l + (10 + floor(0.1 * l)));
  const bresHostMin = bresMin(level);
  const bresHostMax = bresMax(level);
  const bresPhantomMin = cl(calculateMin(level, bresMax, DES_MAX_LEVEL));
  const bresPhantomMax = cl(calculateMax(level, bresMin, DES_MAX_LEVEL));
  const besMin = l => cl(l - (12 + floor(0.1 * l)));
  const besMax = l => cl((l - 2) + floor(0.1 * l));
  const besHostMin = level < 3 ? 'N/A' : besMin(level);
  const besHostMax = level < 3 ? 'N/A' : besMax(level);
  const besPhantomMin = max(3, cl(calculateMin(level, besMax, DES_MAX_LEVEL)));
  const besPhantomMax = cl(calculateMax(level, besMin, DES_MAX_LEVEL));
  const tomHostMin = cl(level - 40);
  const tomHostMax = cl(level + 10);
  const tomPhantomMin = cl(level - 10);
  const tomPhantomMax = cl(level + 40);

  $('.desr .bres .host .min.level').innerText = bresHostMin;
  $('.desr .bres .host .max.level').innerText = bresHostMax;
  $('.desr .bres .phantom .min.level').innerText = bresPhantomMin;
  $('.desr .bres .phantom .max.level').innerText = bresPhantomMax;
  $('.desr .bes .host .min.level').innerText = besHostMin;
  $('.desr .bes .host .max.level').innerText = besHostMax;
  $('.desr .bes .phantom .min.level').innerText = besPhantomMin;
  $('.desr .bes .phantom .max.level').innerText = besPhantomMax;
  $('.desr .tom .host .min.level').innerText = tomHostMin;
  $('.desr .tom .host .max.level').innerText = tomHostMax;
  $('.desr .tom .phantom .min.level').innerText = tomPhantomMin;
  $('.desr .tom .phantom .max.level').innerText = tomPhantomMax;
}

const calculateDarkSouls = level => {
  level = DAS.clampLevel(level);
  const wssMin = x => DAS.clampLevel(x - (10 + floor(0.1 * x)));
  const wssMax = x => DAS.clampLevel(x + (10 + floor(0.1 * x)));
  const rssMin = wssMin;
  const reoMin = x => DAS.clampLevel(x - floor(0.1 * x));
  const beoMin = x => DAS.clampLevel(x - (50 + floor(0.2 * x)));
  const beoMax = x => DAS.clampLevel(x + (10 + floor(0.1 * x)));
  const wssPhantomMin = wssMin(level);
  const wssPhantomMax = wssMax(level);
  const wssHostMin = DAS.clampLevel(calculateMin(level, wssMax, DAS_MAX_LEVEL));
  const wssHostMax = DAS.clampLevel(calculateMax(level, wssMin, DAS_MAX_LEVEL));
  const rssPhantomMin = rssMin(level);
  const rssHostMax = DAS.clampLevel(calculateMax(level, rssMin, DAS_MAX_LEVEL));
  const reoPhantomMin = reoMin(level);
  const reoHostMax = DAS.clampLevel(calculateMax(level, reoMin, DAS_MAX_LEVEL));
  const beoPhantomMin = beoMin(level);
  const beoPhantomMax = beoMax(level);
  const beoHostMin = DAS.clampLevel(calculateMin(level, beoMax, DAS_MAX_LEVEL));
  const beoHostMax = DAS.clampLevel(calculateMax(level, beoMin, DAS_MAX_LEVEL));
  $('.das .wss .host .min').innerText = wssHostMin;
  $('.das .wss .host .max').innerText = wssHostMax;
  $('.das .wss .phantom .min').innerText = wssPhantomMin;
  $('.das .wss .phantom .max').innerText = wssPhantomMax;
  $('.das .rss .host .min').innerText = 1;
  $('.das .rss .host .max').innerText = rssHostMax;
  $('.das .rss .phantom .min').innerText = rssPhantomMin;
  $('.das .rss .phantom .max').innerText = DAS_MAX_LEVEL;
  $('.das .reo .host .min').innerText = 1;
  $('.das .reo .host .max').innerText = reoHostMax;
  $('.das .reo .phantom .min').innerText = reoPhantomMin;
  $('.das .reo .phantom .max').innerText = DAS_MAX_LEVEL;
  $('.das .beo .host .min').innerText = beoHostMin;
  $('.das .beo .host .max').innerText = beoHostMax;
  $('.das .beo .phantom .min').innerText = beoPhantomMin;
  $('.das .beo .phantom .max').innerText = beoPhantomMax;
};

const calculateDarkSoulsRemastered = (level, weaponLevel) => {
  const cl = l => DSR.clampLevel(l);
  const cwl = wl => DSR.clampWeaponLevel(wl);
  level = cl(level);
  weaponLevel = cwl(weaponLevel);
  const wlMin = wl => cwl(wl - (wl <= 9 ? 5 : 6));
  const wlMax = wl => cwl(wl + (wl <= 3 ? 5 : 6));
  const summonMin = x => cl(x - (10 + floor(0.1 * x)));
  const summonMax = x => cl(x + (10 + floor(0.1 * x)));
  const invadeMin = x => cl(x - floor(0.1 * x));
  const invadeMax = x => cl(x + (20 + floor(0.1 * x)));
  const ringMin = x => cl(x - (20 + floor(0.2 * x)));
  const ringMax = x => cl(x + floor(0.1 * x));
  const summonHostMin = summonMin(level);
  const summonHostMax = summonMax(level);
  const summonPhantomMin = cl(calculateMin(level, summonMax, DSR_MAX_LEVEL));
  const summonPhantomMax = cl(calculateMax(level, summonMin, DSR_MAX_LEVEL));
  const summonHostMinWl = wlMin(weaponLevel);
  const summonHostMaxWl = wlMax(weaponLevel);
  const summonPhantomMinWl = cwl(calculateMin(weaponLevel, wlMax, DSR_MAX_WEAPON_LEVEL));
  const summonPhantomMaxWl = cwl(calculateMax(weaponLevel, wlMin, DSR_MAX_WEAPON_LEVEL));
  const invadePhantomMin = invadeMin(level);
  const invadePhantomMax = invadeMax(level);
  const invadeHostMin = cl(calculateMin(level, invadeMax, DSR_MAX_LEVEL));
  const invadeHostMax = cl(calculateMax(level, invadeMin, DSR_MAX_LEVEL));
  const invadePhantomMinWl = wlMin(weaponLevel);
  const invadePhantomMaxWl = wlMax(weaponLevel);
  const invadeHostMinWl = cwl(calculateMin(weaponLevel, wlMax, DSR_MAX_WEAPON_LEVEL));
  const invadeHostMaxWl = cwl(calculateMax(weaponLevel, wlMin, DSR_MAX_WEAPON_LEVEL));
  const ringHostMin = ringMin(level);
  const ringHostMax = ringMax(level);
  const ringPhantomMin = cl(calculateMin(level, ringMax, DSR_MAX_LEVEL));
  const ringPhantomMax = cl(calculateMax(level, ringMin, DSR_MAX_LEVEL));
  const ringHostMinWl = wlMin(weaponLevel);
  const ringHostMaxWl = wlMax(weaponLevel);
  const ringPhantomMinWl = cwl(calculateMin(weaponLevel, wlMax, DSR_MAX_WEAPON_LEVEL));
  const ringPhantomMaxWl = cwl(calculateMax(weaponLevel, wlMin, DSR_MAX_WEAPON_LEVEL));
  $('.dsr .summon .host .min.level').innerText = summonHostMin;
  $('.dsr .summon .host .max.level').innerText = summonHostMax;
  $('.dsr .summon .phantom .min.level').innerText = summonPhantomMin;
  $('.dsr .summon .phantom .max.level').innerText = summonPhantomMax;
  $('.dsr .summon .host .min.wl').innerText = summonHostMinWl;
  $('.dsr .summon .host .max.wl').innerText = summonHostMaxWl;
  $('.dsr .summon .phantom .min.wl').innerText = summonPhantomMinWl;
  $('.dsr .summon .phantom .max.wl').innerText = summonPhantomMaxWl;
  $('.dsr .invade .host .min.level').innerText = invadeHostMin;
  $('.dsr .invade .host .max.level').innerText = invadeHostMax;
  $('.dsr .invade .phantom .min.level').innerText = invadePhantomMin;
  $('.dsr .invade .phantom .max.level').innerText = invadePhantomMax;
  $('.dsr .invade .host .min.wl').innerText = invadeHostMinWl;
  $('.dsr .invade .host .max.wl').innerText = invadeHostMaxWl;
  $('.dsr .invade .phantom .min.wl').innerText = invadePhantomMinWl;
  $('.dsr .invade .phantom .max.wl').innerText = invadePhantomMaxWl;
  $('.dsr .ring .host .min.level').innerText = ringHostMin;
  $('.dsr .ring .host .max.level').innerText = ringHostMax;
  $('.dsr .ring .phantom .min.level').innerText = ringPhantomMin;
  $('.dsr .ring .phantom .max.level').innerText = ringPhantomMax;
  $('.dsr .ring .host .min.wl').innerText = ringHostMinWl;
  $('.dsr .ring .host .max.wl').innerText = ringHostMaxWl;
  $('.dsr .ring .phantom .min.wl').innerText = ringPhantomMinWl;
  $('.dsr .ring .phantom .max.wl').innerText = ringPhantomMaxWl;
};

const calculateDarkSouls3 = (level, weaponLevel) => {
  const cl = l => DS3.clampLevel(l);
  const cwl = wl => DS3.clampWeaponLevel(wl);
  level = cl(level);
  const [minWl, maxWl] = DS3_WL_MAP[cwl(weaponLevel)];

  const signHostMin = cl(ceil(level - 10 - level * 0.1));
  const signHostMax = cl(ceil(level + 10 + level * 0.1));
  const signPhantomMin = cl(ceil((level - 10) / 1.1));
  const signPhantomMax = cl(ceil((level + 10) / 0.9));
  const wotbHostMin = cl(ceil(level - 15 - level * 0.1));
  const wotbHostMax = cl(ceil(level + 15 + level * 0.1));
  const wotbPhantomMin = cl(ceil((level - 15) / 1.1));
  const wotbPhantomMax = cl(ceil((level + 15) / 0.9));
  const dsHostMin = cl(ceil((level - 20) / 1.1));
  const dsHostMax = cl(ceil(level / 0.9));
  const dsPhantomMin = cl(ceil(0.9 * level));
  const dsPhantomMax = cl(ceil(1.1 * level + 20));
  const mmHostMin = cl(ceil((level - 20) / 1.15));
  const mmHostMax = cl(ceil(level / 0.9));
  const mmPhantomMin = cl(ceil(0.9 * level));
  const mmPhantomMax = cl(ceil(1.15 * level + 20));
  const cHostMin = cl(ceil(level - 20 - level * 0.2));
  const cHostMax = cl(ceil(level * 1.1));
  const cPhantomMin = cl(ceil(level / 1.1));
  const cPhantomMax = cl(ceil((level + 20) / 0.8));

  $('.ds3 .sign .host .min.level').innerText = signHostMin;
  $('.ds3 .sign .host .max.level').innerText = signHostMax;
  $('.ds3 .sign .phantom .min.level').innerText = signPhantomMin;
  $('.ds3 .sign .phantom .max.level').innerText = signPhantomMax;
  $('.ds3 .sign .host .min.wl').innerText = minWl;
  $('.ds3 .sign .host .max.wl').innerText = maxWl;
  $('.ds3 .sign .phantom .min.wl').innerText = minWl;
  $('.ds3 .sign .phantom .max.wl').innerText = maxWl;
  $('.ds3 .wotb .host .min.level').innerText = wotbHostMin;
  $('.ds3 .wotb .host .max.level').innerText = wotbHostMax;
  $('.ds3 .wotb .phantom .min.level').innerText = wotbPhantomMin;
  $('.ds3 .wotb .phantom .max.level').innerText = wotbPhantomMax;
  $('.ds3 .wotb .host .min.wl').innerText = minWl;
  $('.ds3 .wotb .host .max.wl').innerText = maxWl;
  $('.ds3 .wotb .phantom .min.wl').innerText = minWl;
  $('.ds3 .wotb .phantom .max.wl').innerText = maxWl;
  $('.ds3 .dark-spirit .host .min.level').innerText = dsHostMin;
  $('.ds3 .dark-spirit .host .max.level').innerText = dsHostMax;
  $('.ds3 .dark-spirit .phantom .min.level').innerText = dsPhantomMin;
  $('.ds3 .dark-spirit .phantom .max.level').innerText = dsPhantomMax;
  $('.ds3 .dark-spirit .host .min.wl').innerText = minWl;
  $('.ds3 .dark-spirit .host .max.wl').innerText = maxWl;
  $('.ds3 .dark-spirit .phantom .min.wl').innerText = minWl;
  $('.ds3 .dark-spirit .phantom .max.wl').innerText = maxWl;
  $('.ds3 .mm .host .min.level').innerText = mmHostMin;
  $('.ds3 .mm .host .max.level').innerText = mmHostMax;
  $('.ds3 .mm .phantom .min.level').innerText = mmPhantomMin;
  $('.ds3 .mm .phantom .max.level').innerText = mmPhantomMax;
  $('.ds3 .mm .host .min.wl').innerText = minWl;
  $('.ds3 .mm .host .max.wl').innerText = maxWl;
  $('.ds3 .mm .phantom .min.wl').innerText = minWl;
  $('.ds3 .mm .phantom .max.wl').innerText = maxWl;
  $('.ds3 .covenant .host .min.level').innerText = cHostMin;
  $('.ds3 .covenant .host .max.level').innerText = cHostMax;
  $('.ds3 .covenant .phantom .min.level').innerText = cPhantomMin;
  $('.ds3 .covenant .phantom .max.level').innerText = cPhantomMax;
  $('.ds3 .covenant .host .min.wl').innerText = minWl;
  $('.ds3 .covenant .host .max.wl').innerText = maxWl;
  $('.ds3 .covenant .phantom .min.wl').innerText = minWl;
  $('.ds3 .covenant .phantom .max.wl').innerText = maxWl;
};

const calculateBloodborne = level => {
  const cl = l => BB.clampLevel(l);
  level = cl(level);

  const summonMin = l => cl(l - (20 + floor(0.2 * l)));
  const summonMax = l => cl(l + (20 + floor(0.2 * l)));
  const invadeMin = l => cl(l - (20 + floor(0.2 * l)));
  const invadeMax = l => cl(l + (10 + floor(0.1 * l)));

  const summonHostMin = summonMin(level);
  const summonHostMax = summonMax(level);
  const summonPhantomMin = cl(calculateMin(level, summonMax, BB_MAX_LEVEL));
  const summonPhantomMax = cl(calculateMax(level, summonMin, BB_MAX_LEVEL));
  const invadeHostMin = invadeMin(level);
  const invadeHostMax = invadeMax(level);
  const invadePhantomMin = cl(calculateMin(level, invadeMax, BB_MAX_LEVEL));
  const invadePhantomMax = cl(calculateMax(level, invadeMin, BB_MAX_LEVEL));

  $('.bb .summon .host .min.level').innerText = summonHostMin;
  $('.bb .summon .host .max.level').innerText = summonHostMax;
  $('.bb .summon .phantom .min.level').innerText = summonPhantomMin;
  $('.bb .summon .phantom .max.level').innerText = summonPhantomMax;
  $('.bb .invade .host .min.level').innerText = invadeHostMin;
  $('.bb .invade .host .max.level').innerText = invadeHostMax;
  $('.bb .invade .phantom .min.level').innerText = invadePhantomMin;
  $('.bb .invade .phantom .max.level').innerText = invadePhantomMax;
};

const calculate = () => {
  const level = getLevel();
  const weaponLevel = getWeaponLevel();
  calculateDemonsSouls(level);
  calculateDemonsSoulsRemake(level);
  calculateDarkSouls(level);
  calculateDarkSoulsRemastered(level, weaponLevel);
  calculateDarkSouls3(level, weaponLevel);
  calculateBloodborne(level);
};

$('#level').addEventListener('focus', function() {
  this.select();
});

$('#weapon-level').addEventListener('focus', function() {
  this.select();
});

$('#level').addEventListener('input', () => calculate());
$('#weapon-level').addEventListener('input', () => calculate());

$('#level').max = MAX_LEVEL;

calculate();
