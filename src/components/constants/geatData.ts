export interface GearItem {
  slot: string;
  name: string;
  icon: string;
  gem?: string[];
  enchantments: string[];
}

export const GearData = (): GearItem[] => {
  const gearData: GearItem[] = [
    {
      slot: 'Head',
      name: "Fel-Dealer's Visor",
      icon: 'https://wow.zamimg.com/images/wow/icons/large/inv_helm_leather_raiddemonhuntergoblin_d_01.jpg',
      gem: ['https://assets-ng.maxroll.gg/wow/icons/463531.webp'],
      enchantments: ['https://assets-ng.maxroll.gg/wow/icons/348538.webp'],
    },
    {
      slot: 'Neck',
      name: "Undermine Merc's Dog Tags",
      icon: 'https://wow.zamimg.com/images/wow/icons/large/inv_11_0_ventureco_necklace01_color4.jpg',
      enchantments: [
        'https://assets-ng.maxroll.gg/wow/icons/5931403.webp',
        'https://assets-ng.maxroll.gg/wow/icons/5931403.webp',
      ],
    },
    {
      slot: 'Shoulder',
      name: "Fel-Dealer's Recycled Reavers",
      icon: 'https://wow.zamimg.com/images/wow/icons/large/inv_shoulder_leather_raiddemonhuntergoblin_d_01.jpg',
      enchantments: [],
    },
    {
      slot: 'Back',
      name: "Chef Chewie's Towel",
      icon: 'https://assets-ng.maxroll.gg/wow/icons/5359648.webp',
      enchantments: ['https://assets-ng.maxroll.gg/wow/icons/463531.webp'],
    },
    {
      slot: 'Chest',
      name: "Fel-Dealer's Soul Engine",
      icon: 'https://assets-ng.maxroll.gg/wow/icons/6009145.webp',
      enchantments: ['https://assets-ng.maxroll.gg/wow/icons/463531.webp'],
    },
    {
      slot: 'Wrist',
      name: 'Rune-Branded Armbands',
      icon: 'https://assets-ng.maxroll.gg/wow/icons/5648238.webp',
      enchantments: [
        'https://assets-ng.maxroll.gg/wow/icons/463531.webp',
        'https://assets-ng.maxroll.gg/wow/icons/5931403.webp',
      ],
    },
    {
      slot: 'Hand',
      name: 'Rune-Branded Grips',
      icon: 'https://assets-ng.maxroll.gg/wow/icons/5648238.webp',
      enchantments: [],
    },
    {
      slot: 'Belt',
      name: 'Rune-Branded Cinch',
      icon: 'https://assets-ng.maxroll.gg/wow/icons/5648238.webp',
      enchantments: ['https://assets-ng.maxroll.gg/wow/icons/5931403.webp'],
    },
    {
      slot: 'Legs',
      name: 'Rune-Branded Legguards',
      icon: 'https://assets-ng.maxroll.gg/wow/icons/5648238.webp',
      enchantments: ['https://assets-ng.maxroll.gg/wow/icons/5931403.webp'],
    },
    {
      slot: 'Feet',
      name: 'Rune-Branded Treads',
      icon: 'https://assets-ng.maxroll.gg/wow/icons/5648238.webp',
      enchantments: ['https://assets-ng.maxroll.gg/wow/icons/5931403.webp'],
    },
    {
      slot: 'Finger1',
      name: 'Rune-Branded Band',
      icon: 'https://assets-ng.maxroll.gg/wow/icons/5648238.webp',
      enchantments: [
        'https://assets-ng.maxroll.gg/wow/icons/5931403.webp',
        'https://assets-ng.maxroll.gg/wow/icons/5931403.webp',
        'https://assets-ng.maxroll.gg/wow/icons/5931403.webp',
      ],
    },
    {
      slot: 'Finger2',
      name: 'Rune-Branded Signet',
      icon: 'https://assets-ng.maxroll.gg/wow/icons/5648238.webp',
      enchantments: [
        'https://assets-ng.maxroll.gg/wow/icons/5931403.webp',
        'https://assets-ng.maxroll.gg/wow/icons/5931403.webp',
        'https://assets-ng.maxroll.gg/wow/icons/5931403.webp',
      ],
    },
    {
      slot: 'Trinket1',
      name: 'Rune-Branded Charm',
      icon: '',
      enchantments: [],
    },
    {
      slot: 'Trinket2',
      name: 'Rune-Branded Talisman',
      icon: '',
      enchantments: [],
    },
    {
      slot: 'MainHand',
      name: "Capo's Molten Knuckles",
      icon: 'https://assets-ng.maxroll.gg/wow/icons/6214305.webp',
      enchantments: ['https://assets-ng.maxroll.gg/wow/icons/5931403.webp'],
    },
    {
      slot: 'OffHand',
      name: 'Everforged Warglaive',
      icon: 'https://assets-ng.maxroll.gg/wow/icons/5524353.webp',
      enchantments: ['https://assets-ng.maxroll.gg/wow/icons/5931403.webp'],
    },
  ];

  return gearData;
};
