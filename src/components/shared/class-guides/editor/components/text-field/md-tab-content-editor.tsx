import React from 'react';
import { cn } from '@root/lib/utils';
import { useTheme } from 'next-themes';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import TurndownService from 'turndown';
import MDEditor from '@uiw/react-md-editor';

interface MDTabContentEditorProps {
  content: string;
  onContentChange: (value: string) => void;
  className?: string;
}

export const MDTabContentEditor: React.FC<MDTabContentEditorProps> = ({
  content,
  onContentChange,
  className,
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [isMounted, setIsMounted] = React.useState(false);

  // Инициализация Turndown для преобразования HTML в Markdown
  const turndownService = new TurndownService({
    linkStyle: 'inlined', // Используем [текст](URL) формат
  });

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Обработчик события вставки
  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();

    // Получаем данные из буфера обмена
    const clipboardData = event.clipboardData;
    const html = clipboardData.getData('text/html'); // Получаем HTML-данные
    const plainText = clipboardData.getData('text/plain'); // Получаем текст

    let newContent = content;

    if (html) {
      // Преобразуем HTML в Markdown
      const markdown = turndownService.turndown(html);
      newContent = content + markdown;
    } else if (plainText) {
      // Если HTML нет, вставляем обычный текст
      newContent = content + plainText;
    }

    // Обновляем содержимое редактора
    onContentChange(newContent);
  };

  if (!isMounted) return null;

  return (
    <div
      className={cn(
        'prose prose-img:mt-0 prose-img:mb-0 dark:prose-strong:text-white dark:prose-h1:text-white dark:prose-h2:text-white dark:prose-h3:text-white dark:prose-h4:text-white dark:prose-code:text-white prose-code:text-black max-w-full px-2',
        isDarkMode && 'dark',
        className
      )}
      data-color-mode={isDarkMode ? 'dark' : 'light'}
      onPaste={handlePaste}
    >
      <MDEditor
        value={content}
        onChange={value => onContentChange(value || '')}
        height={200}
        preview='live'
      />
    </div>
  );
};
