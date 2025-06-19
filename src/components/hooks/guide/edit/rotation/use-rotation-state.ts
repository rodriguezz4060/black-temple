import { useState, useEffect } from 'react';
import { Ability, VerticalRow, TabData } from '@root/@types/prisma';

export function useRotationState(initialTab?: TabData) {
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [verticalRows, setVerticalRows] = useState<VerticalRow[]>([]);
  const [dialogUrl, setDialogUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showAddAbilityDialog, setShowAddAbilityDialog] = useState<
    string | null
  >(null);
  const [showVerticalRowDialog, setShowVerticalRowDialog] = useState<
    string | null
  >(null);
  const [showVerticalAbilityDialog, setShowVerticalAbilityDialog] = useState<
    string | null
  >(null);

  // Парсинг Wowhead-ссылки
  const parseWowheadUrl = (url: string) => {
    if (!url.trim()) {
      setError('Введите ссылку');
      return null;
    }

    const wowheadRegex =
      /https?:\/\/(?:www\.|ptr\.|ru\.)?(?:wowhead\.com(?:\/(ptr-2|ptr|[a-z]{2}))?)\/(spell|item)=(\d+)(?:\/([\w-]+))?/i;
    const match = url.match(wowheadRegex);

    if (!match) {
      setError(
        'Введите действительную ссылку на способность или предмет с Wowhead'
      );
      return null;
    }

    const [, prefix, type, spellId, slug] = match;
    const isPtr = prefix === 'ptr' || prefix === 'ptr-2';
    const baseUrl: string =
      prefix === 'ptr'
        ? 'https://www.wowhead.com/ptr'
        : prefix === 'ptr-2'
          ? 'https://www.wowhead.com/ptr-2'
          : 'https://www.wowhead.com';
    const finalUrl = `${baseUrl}/${type}=${spellId}${slug ? `/${slug}` : ''}`;
    const name = slug
      ? slug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : `${type.charAt(0).toUpperCase() + type.slice(1)} ${spellId}`;

    return { name, finalUrl, spellId, type: type as 'spell' | 'item', isPtr };
  };

  // Инициализация состояния на основе initialTab.rotation
  useEffect(() => {
    if (initialTab?.rotation) {
      setAbilities(
        initialTab.rotation.abilities
          .filter(ability => !ability.verticalRowId)
          .map(ability => {
            const parsed = parseWowheadUrl(ability.url);
            if (!parsed) {
              console.warn(`Invalid URL in DB: ${ability.url}`);
              return {
                id: ability.id,
                url: ability.url,
                spellId: undefined,
                type: undefined,
                isPtr: undefined,
                isPrepull: ability.isPrepull ?? false,
                order: ability.order || 0,
                verticalRowId: null,
              };
            }
            return {
              id: ability.id,
              url: parsed.finalUrl,
              spellId: parsed.spellId,
              type: parsed.type,
              isPtr: parsed.isPtr,
              isPrepull: ability.isPrepull ?? false,
              order: ability.order || 0,
              verticalRowId: null,
            };
          })
      );

      setVerticalRows(
        (initialTab.rotation.verticalRows || []).map(row => ({
          id: row.id,
          positionAfter: row.positionAfter || undefined,
          order: row.order || 0,
          abilities: row.abilities.map(ability => {
            const parsed = parseWowheadUrl(ability.url);
            if (!parsed) {
              console.warn(`Invalid URL in DB: ${ability.url}`);
              return {
                id: ability.id,
                url: ability.url,
                spellId: undefined,
                type: undefined,
                isPtr: undefined,
                isPrepull: ability.isPrepull ?? false,
                order: ability.order || 0,
              };
            }
            return {
              id: ability.id,
              url: parsed.finalUrl,
              spellId: parsed.spellId,
              type: parsed.type,
              isPtr: parsed.isPtr,
              isPrepull: ability.isPrepull ?? false,
              order: ability.order || 0,
            };
          }),
        }))
      );
    }
  }, [initialTab?.rotation, initialTab?.rotation?.id]);

  // Добавление способности
  const handleAddAbility = (zoneId: string) => {
    const parsed = parseWowheadUrl(dialogUrl);
    if (!parsed) return;

    const newAbility: Ability = {
      id: `ability-${Date.now()}`,
      url: parsed.finalUrl,
      spellId: parsed.spellId,
      type: parsed.type,
      isPtr: parsed.isPtr,
      isPrepull: zoneId === 'prepull-zone', // Устанавливаем на основе зоны
      order: abilities.length,
    };

    setAbilities([...abilities, newAbility]);
    setDialogUrl('');
    setError(null);
    setShowAddAbilityDialog(null);
  };

  // Добавление вертикального ряда
  const handleAddVerticalRow = (url: string, afterAbilityId: string) => {
    const parsed = parseWowheadUrl(url);
    if (!parsed) return;

    const newAbility: Ability = {
      id: `ability-${Date.now()}`,
      url: parsed.finalUrl,
      spellId: parsed.spellId,
      type: parsed.type,
      isPtr: parsed.isPtr,
      isPrepull: false, // Вертикальные ряды всегда в зоне "Пулл"
      order: 0,
    };

    const newRow: VerticalRow = {
      id: `row-${Date.now()}`,
      abilities: [newAbility],
      positionAfter: afterAbilityId,
      order: verticalRows.length,
    };

    setVerticalRows([...verticalRows, newRow]);
    setShowVerticalRowDialog(null);
    setDialogUrl('');
    setError(null);
  };

  // Добавление способности в вертикальный ряд
  const handleAddVerticalAbility = (url: string, rowId: string) => {
    const parsed = parseWowheadUrl(url);
    if (!parsed) return;

    const newAbility: Ability = {
      id: `ability-${Date.now()}`,
      url: parsed.finalUrl,
      spellId: parsed.spellId,
      type: parsed.type,
      isPtr: parsed.isPtr,
      isPrepull: false, // Способности в рядах всегда в зоне "Пулл"
      order: verticalRows.find(row => row.id === rowId)?.abilities.length || 0,
    };

    setVerticalRows(rows =>
      rows.map(row =>
        row.id === rowId
          ? { ...row, abilities: [...row.abilities, newAbility] }
          : row
      )
    );
    setShowVerticalAbilityDialog(null);
    setDialogUrl('');
    setError(null);
  };

  // Удаление способности
  const removeAbility = (id: string) => {
    setAbilities(abilities.filter(ability => ability.id !== id));
    setVerticalRows(rows =>
      rows
        .map(row => ({
          ...row,
          abilities: row.abilities.filter(ability => ability.id !== id),
        }))
        .filter(row => row.abilities.length > 0)
    );
  };

  return {
    abilities,
    setAbilities,
    verticalRows,
    setVerticalRows,
    dialogUrl,
    setDialogUrl,
    error,
    setError,
    showAddAbilityDialog,
    setShowAddAbilityDialog,
    showVerticalRowDialog,
    setShowVerticalRowDialog,
    showVerticalAbilityDialog,
    setShowVerticalAbilityDialog,
    handleAddAbility,
    handleAddVerticalRow,
    handleAddVerticalAbility,
    removeAbility,
  };
}
