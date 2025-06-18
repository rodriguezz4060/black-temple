import { useState } from 'react';
import { Ability, VerticalRow } from '@root/@types/prisma';

export function useRotationState() {
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

  // Добавление способности
  const handleAddAbility = (zoneId: string) => {
    const parsed = parseWowheadUrl(dialogUrl);
    if (!parsed) return;

    const newAbility: Ability = {
      id: `ability-${Date.now()}`,
      ...parsed,
      url: parsed.finalUrl,
      isPrepull: zoneId === 'prepull-zone',
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
      ...parsed,
      url: parsed.finalUrl,
      isPrepull: false,
    };

    const newRow: VerticalRow = {
      id: `row-${Date.now()}`,
      abilities: [newAbility],
      positionAfter: afterAbilityId,
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
      ...parsed,
      url: parsed.finalUrl,
      isPrepull: false,
    };

    setVerticalRows(rows =>
      rows.map(row =>
        row.id === rowId
          ? { ...row, abilities: [newAbility, ...row.abilities] }
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
