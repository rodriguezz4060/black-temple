import { cn } from "@root/lib/utils";
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import React from "react";

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
  const isDarkMode = theme === "dark";

  return (
    <div className={cn("px-2", className)}>
      <MDEditor
        value={content}
        onChange={(value) => onContentChange(value || "")}
        height={400}
        previewOptions={{}}
        data-color-mode={isDarkMode ? "dark" : "light"}
      />
    </div>
  );
};
