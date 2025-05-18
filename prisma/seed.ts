import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function up() {
  // Seed SpecRoles (Tank, Healer, DPS)
  await prisma.specRole.createMany({
    data: [
      {
        name: 'Танк',
        roleIcon: '/assets/class/role-icons/role-icon-tank.webp',
      },
      {
        name: 'Лекарь',
        roleIcon: '/assets/class/role-icons/role-icon-healer.webp',
      },
      { name: 'УВС', roleIcon: '/assets/class/role-icons/role-icon-dps.webp' },
    ],
    skipDuplicates: true,
  });

  // Seed ClassSelections (WoW Classes)
  await prisma.classSelection.createMany({
    data: [
      {
        name: 'Воин',
        classIcon: '/assets/class/warrior/class_warrior.jpg',
        classColor: '#c69b6d',
      },
      {
        name: 'Друид',
        classIcon: '/assets/class/druid/class_druid.jpg',
        classColor: '#ff7c0a',
      },
      {
        name: 'Жрец',
        classIcon: '/assets/class/priest/class_priest.jpg',
        classColor: '#e5e7eb',
      },
      {
        name: 'Маг',
        classIcon: '/assets/class/mage/class_mage.jpg',
        classColor: '#3fc7eb',
      },
      {
        name: 'Монах',
        classIcon: '/assets/class/monk/class_monk.jpg',
        classColor: '#00ff98',
      },
      {
        name: 'Охотник',
        classIcon: '/assets/class/hunter/class_hunter.jpg',
        classColor: '#aad372',
      },
      {
        name: 'Охотник на демонов',
        classIcon: '/assets/class/dh/class_demonhunter.jpg',
        classColor: '#a330c9',
      },
      {
        name: 'Паладин',
        classIcon: '/assets/class/paladin/class_paladin.jpg',
        classColor: '#f48cba',
      },
      {
        name: 'Пробудитель',
        classIcon: '/assets/class/evoker/class_evoker.jpg',
        classColor: '#33937f',
      },
      {
        name: 'Разбойник',
        classIcon: '/assets/class/rogue/class_rogue.jpg',
        classColor: '#fff468',
      },
      {
        name: 'Рыцарь смерти',
        classIcon: '/assets/class/dk/class_deathknight.jpg',
        classColor: '#c41e3a',
      },
      {
        name: 'Чернокнижник',
        classIcon: '/assets/class/warlock/class_warlock.jpg',
        classColor: '#8788ee',
      },
      {
        name: 'Шаман',
        classIcon: '/assets/class/shaman/class_shaman.jpg',
        classColor: '#0070dd',
      },
    ],
    skipDuplicates: true,
  });

  // Fetch created roles and classes for relationships
  const tankRole = await prisma.specRole.findUnique({
    where: { name: 'Танк' },
  });
  const healerRole = await prisma.specRole.findUnique({
    where: { name: 'Лекарь' },
  });
  const dpsRole = await prisma.specRole.findUnique({ where: { name: 'УВС' } });

  const warriorClass = await prisma.classSelection.findUnique({
    where: { name: 'Воин' },
  });

  const druidClass = await prisma.classSelection.findUnique({
    where: { name: 'Друид' },
  });

  const priestClass = await prisma.classSelection.findUnique({
    where: { name: 'Жрец' },
  });

  const mageClass = await prisma.classSelection.findUnique({
    where: { name: 'Маг' },
  });

  const monkClass = await prisma.classSelection.findUnique({
    where: { name: 'Монах' },
  });

  const hunterClass = await prisma.classSelection.findUnique({
    where: { name: 'Охотник' },
  });

  const dhClass = await prisma.classSelection.findUnique({
    where: { name: 'Охотник на демонов' },
  });

  const paladinClass = await prisma.classSelection.findUnique({
    where: { name: 'Паладин' },
  });

  const evokerClass = await prisma.classSelection.findUnique({
    where: { name: 'Пробудитель' },
  });

  const rogueClass = await prisma.classSelection.findUnique({
    where: { name: 'Разбойник' },
  });

  const dkClass = await prisma.classSelection.findUnique({
    where: { name: 'Рыцарь смерти' },
  });

  const warlockClass = await prisma.classSelection.findUnique({
    where: { name: 'Чернокнижник' },
  });

  const shamanClass = await prisma.classSelection.findUnique({
    where: { name: 'Шаман' },
  });

  // Seed ClassSpecializations
  await prisma.classSpecialization.createMany({
    data: [
      {
        name: 'Защита',
        specIcon: '/assets/class/warrior/ability_warrior_defensivestance.jpg',
        specBackground:
          '/assets/class/warrior/warrior-protection-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/warrior/warrior-protection-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/warrior/warrior-protection.webp',
        classId: warriorClass!.id,
        specRoleId: tankRole!.id,
      },
      {
        name: 'Оружие',
        specIcon: '/assets/class/warrior/ability_warrior_savageblow.jpg',
        specBackground:
          '/assets/class/warrior/warrior-arms-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/warrior/warrior-arms-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/warrior/warrior-arms.webp',
        classId: warriorClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Неистовство',
        specIcon: '/assets/class/warrior/ability_warrior_innerrage.jpg',
        specBackground:
          '/assets/class/warrior/warrior-fury-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/warrior/warrior-fury-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/warrior/warrior-fury.webp',
        classId: warriorClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Баланс',
        specIcon: '/assets/class/druid/spell_nature_starfall.jpg',
        specBackground:
          '/assets/class/druid/druid-balance-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/druid/druid-balance-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/druid/druid-balance.webp',
        classId: druidClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Сила зверя',
        specIcon: '/assets/class/druid/ability_druid_catform.jpg',
        specBackground: '/assets/class/druid/druid-feral-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/druid/druid-feral-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/druid/druid-feral.webp',
        classId: druidClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Страж',
        specIcon: '/assets/class/druid/ability_racial_bearform.jpg',
        specBackground:
          '/assets/class/druid/druid-guardian-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/druid/druid-guardian-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/druid/druid-guardian.webp',
        classId: druidClass!.id,
        specRoleId: tankRole!.id,
      },
      {
        name: 'Исцеление',
        specIcon: '/assets/class/druid/spell_nature_healingtouch.jpg',
        specBackground:
          '/assets/class/druid/druid-restoration-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/druid/druid-restoration-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/druid/druid-restoration.webp',
        classId: druidClass!.id,
        specRoleId: healerRole!.id,
      },
      //Priest
      {
        name: 'Послушание',
        specIcon: '/assets/class/priest/spell_holy_powerwordshield.jpg',
        specBackground:
          '/assets/class/priest/priest-discipline-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/priest/priest-discipline-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/priest/priest-discipline.webp',
        classId: priestClass!.id,
        specRoleId: healerRole!.id,
      },
      {
        name: 'Свет',
        specIcon: '/assets/class/priest/spell_holy_guardianspirit.jpg',
        specBackground: '/assets/class/priest/priest-holy-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/priest/priest-holy-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/priest/priest-holy.webp',
        classId: priestClass!.id,
        specRoleId: healerRole!.id,
      },
      {
        name: 'Тьма',
        specIcon: '/assets/class/priest/spell_shadow_shadowwordpain.jpg',
        specBackground:
          '/assets/class/priest/priest-shadow-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/priest/priest-shadow-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/priest/priest-shadow.webp',
        classId: priestClass!.id,
        specRoleId: dpsRole!.id,
      },
      //mage
      {
        name: 'Тайная магия',
        specIcon: '/assets/class/mage/spell_holy_magicalsentry.jpg',
        specBackground: '/assets/class/mage/mage-arcane-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/mage/mage-arcane-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/mage/mage-arcane.webp',
        classId: mageClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Огонь',
        specIcon: '/assets/class/mage/spell_fire_firebolt02.jpg',
        specBackground: '/assets/class/mage/mage-fire-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/mage/mage-fire-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/mage/mage-fire.webp',
        classId: mageClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Лед',
        specIcon: '/assets/class/mage/spell_frost_frostbolt02.jpg',
        specBackground: '/assets/class/mage/mage-frost-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/mage/mage-frost-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/mage/mage-frost.webp',
        classId: mageClass!.id,
        specRoleId: dpsRole!.id,
      },
      //monk
      {
        name: 'Хмелевар',
        specIcon: '/assets/class/monk/spell_monk_brewmaster_spec.jpg',
        specBackground:
          '/assets/class/monk/monk-brewmaster-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/monk/monk-brewmaster-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/monk/monk-brewmaster.webp',
        classId: monkClass!.id,
        specRoleId: tankRole!.id,
      },
      {
        name: 'Танцующий с ветром',
        specIcon: '/assets/class/monk/spell_monk_windwalker_spec.jpg',
        specBackground:
          '/assets/class/monk/monk-windwalker-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/monk/monk-windwalker-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/monk/monk-windwalker.webp',
        classId: monkClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Ткач туманов',
        specIcon: '/assets/class/monk/spell_monk_mistweaver_spec.jpg',
        specBackground:
          '/assets/class/monk/monk-mistweaver-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/monk/monk-mistweaver-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/monk/monk-mistweaver.webp',
        classId: monkClass!.id,
        specRoleId: healerRole!.id,
      },
      //hunter
      {
        name: 'Повелитель зверей',
        specIcon: '/assets/class/hunter/ability_hunter_bestialdiscipline.jpg',
        specBackground:
          '/assets/class/hunter/hunter-beast-mastery-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/hunter/hunter-beastmastery-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/hunter/hunter-beastmastery.webp',
        classId: hunterClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Стрельба',
        specIcon: '/assets/class/hunter/ability_hunter_focusedaim.jpg',
        specBackground:
          '/assets/class/hunter/hunter-marksmanship-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/hunter/hunter-marksmanship-spec-background.webp',
        gearBanner: '/assets/class/hunter/hunter-marksmanship.webp',
        classId: hunterClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Выживание',
        specIcon: '/assets/class/hunter/ability_hunter_camouflage.jpg',
        specBackground:
          '/assets/class/hunter/hunter-survival-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/hunter/hunter-survival-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/hunter/hunter-survival.webp',
        classId: hunterClass!.id,
        specRoleId: dpsRole!.id,
      },
      //DH
      {
        name: 'Истребление',
        specIcon: '/assets/class/dh/ability_demonhunter_specdps.jpg',
        specBackground: '/assets/class/dh/dh-havoc-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/dh/dh-havoc-difficulty-bar-banner.png',
        gearBanner: '/assets/class/dh/demonhunter-havoc.webp',
        classId: dhClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Месть',
        specIcon: '/assets/class/dh/ability_demonhunter_spectank.jpg',
        specBackground: '/assets/class/dh/dh-vengeance-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/dh/dh-vengeance-difficulty-bar-banner.png',
        gearBanner: '/assets/class/dh/demonhunter-vengeance.webp',
        classId: dhClass!.id,
        specRoleId: tankRole!.id,
      },
      //paladin
      {
        name: 'Свет',
        specIcon: '/assets/class/paladin/spell_holy_holybolt.jpg',
        specBackground:
          '/assets/class/paladin/paladin-holy-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/paladin/paladin-holy-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/paladin/paladin-holy.webp',
        classId: paladinClass!.id,
        specRoleId: healerRole!.id,
      },
      {
        name: 'Защита',
        specIcon:
          '/assets/class/paladin/ability_paladin_shieldofthetemplar.jpg',
        specBackground:
          '/assets/class/paladin/paladin-protection-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/paladin/paladin-protection-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/paladin/paladin-protection.webp',
        classId: paladinClass!.id,
        specRoleId: tankRole!.id,
      },
      {
        name: 'Воздаяние',
        specIcon: '/assets/class/paladin/spell_holy_auraoflight.jpg',
        specBackground:
          '/assets/class/paladin/paladin-retribution-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/paladin/paladin-retribution-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/paladin/paladin-retribution.webp',
        classId: paladinClass!.id,
        specRoleId: dpsRole!.id,
      },
      //evoker
      {
        name: 'Насыщатель',
        specIcon: '/assets/class/evoker/classicon_evoker_augmentation.jpg',
        specBackground:
          '/assets/class/evoker/evoker-augmentation-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/evoker/evoker-augmentation-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/evoker/evoker-augmentation.webp',
        classId: evokerClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Опустошитель',
        specIcon: '/assets/class/evoker/classicon_evoker_devastation.jpg',
        specBackground:
          '/assets/class/evoker/evoker-devastation-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/evoker/evoker-devastation-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/evoker/evoker-devastation.webp',
        classId: evokerClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Хранитель',
        specIcon: '/assets/class/evoker/classicon_evoker_preservation.jpg',
        specBackground:
          '/assets/class/evoker/evoker-preservation-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/evoker/evoker-preservation-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/evoker/evoker-preservation.webp',
        classId: evokerClass!.id,
        specRoleId: healerRole!.id,
      },
      //rogue
      {
        name: 'Ликвидация',
        specIcon: '/assets/class/rogue/ability_rogue_deadlybrew.jpg',
        specBackground:
          '/assets/class/rogue/rogue-assassination-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/rogue/rogue-assassination-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/rogue/rogue-assassination.webp',
        classId: rogueClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Головорез',
        specIcon: '/assets/class/rogue/ability_rogue_waylay.jpg',
        specBackground: '/assets/class/rogue/rogue-outlaw-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/rogue/rogue-outlaw-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/rogue/rogue-outlaw.webp',
        classId: rogueClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Скрытность',
        specIcon: '/assets/class/rogue/ability_stealth.jpg',
        specBackground:
          '/assets/class/rogue/rogue-subtlety-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/rogue/rogue-subtlety-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/rogue/rogue-subtlety.webp',
        classId: rogueClass!.id,
        specRoleId: dpsRole!.id,
      },
      //dk
      {
        name: 'Кровь',
        specIcon: '/assets/class/dk/spell_deathknight_bloodpresence.jpg',
        specBackground: '/assets/class/dk/dk-blood-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/dk/dk-blood-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/dk/deathknight-blood.webp',
        classId: dkClass!.id,
        specRoleId: tankRole!.id,
      },
      {
        name: 'Лед',
        specIcon: '/assets/class/dk/spell_deathknight_frostpresence.jpg',
        specBackground: '/assets/class/dk/dk-frost-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/dk/dk-frost-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/dk/deathknight-frost.webp',
        classId: dkClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Нечестивость',
        specIcon: '/assets/class/dk/spell_deathknight_unholypresence.jpg',
        specBackground: '/assets/class/dk/dk-unholy-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/dk/dk-unholy-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/dk/deathknight-unholy.webp',
        classId: dkClass!.id,
        specRoleId: dpsRole!.id,
      },
      //warlock
      {
        name: 'Колдовство',
        specIcon: '/assets/class/warlock/spell_shadow_deathcoil.jpg',
        specBackground:
          '/assets/class/warlock/warlock-affliction-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/warlock/warlock-affliction-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/warlock/warlock-affliction.webp',
        classId: warlockClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Разрушение',
        specIcon: '/assets/class/warlock/spell_shadow_rainoffire.jpg',
        specBackground:
          '/assets/class/warlock/warlock-destruction-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/warlock/warlock-destruction-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/warlock/warlock-destruction.webp',
        classId: warlockClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Демонология',
        specIcon: '/assets/class/warlock/spell_shadow_metamorphosis.jpg',
        specBackground:
          '/assets/class/warlock/warlock-demonology-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/warlock/warlock-demonology-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/warlock/warlock-demonology.webp',
        classId: warlockClass!.id,
        specRoleId: dpsRole!.id,
      },
      //shaman
      {
        name: 'Стихии',
        specIcon: '/assets/class/shaman/spell_nature_lightning.jpg',
        specBackground:
          '/assets/class/shaman/shaman-elemental-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/shaman/shaman-elemental-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/shaman/shaman-elemental.webp',
        classId: shamanClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Совершенствование',
        specIcon: '/assets/class/shaman/spell_shaman_improvedstormstrike.jpg',
        specBackground:
          '/assets/class/shaman/shaman-enhancement-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/shaman/shaman-enhancement-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/shaman/shaman-enhancement.webp',
        classId: shamanClass!.id,
        specRoleId: dpsRole!.id,
      },
      {
        name: 'Исцеление',
        specIcon: '/assets/class/shaman/spell_nature_magicimmunity.jpg',
        specBackground:
          '/assets/class/shaman/shaman-restoration-spec-background.webp',
        difficultyBarBanner:
          '/assets/class/shaman/shaman-restoration-difficulty-bar-banner.webp',
        gearBanner: '/assets/class/shaman/shaman-restoration.webp',
        classId: shamanClass!.id,
        specRoleId: healerRole!.id,
      },
    ],
    skipDuplicates: true,
  });

  // Seed Modes (Mythic+, Raids, PvP)
  await prisma.mode.createMany({
    data: [
      {
        name: 'Мифический+',
        activityBg: '/assets/activity/mythic-plus-activity-bg-wow.webp',
        activityIcon: '/assets/activity/mythic-plus-activity-icon.webp',
      },
      {
        name: 'Рейд',
        activityBg: '/assets/activity/raid-activity-bg-wow.webp',
        activityIcon: '/assets/activity/raid-activity-icon.webp',
      },
      {
        name: 'PvP',
        activityBg: '/assets/activity/leveling-activity-bg-wow.webp',
        activityIcon: '/assets/activity/leveling-activity-icon.webp',
      },
    ],
    skipDuplicates: true,
  });

  console.log('Database seeded successfully!');
}

async function down() {}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.log(e);
  }
}

main().then(async () => {
  await prisma.$disconnect();
});
