import React from 'react';

// Lexical Core
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';

// Lexical Commands and Utilities
import { 
  $getRoot, 
  $getSelection, 
  $isRangeSelection, 
  FORMAT_TEXT_COMMAND, 
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND, 
  REDO_COMMAND
} from 'lexical';
import type { EditorState } from 'lexical';

// Lexical List
import { 
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  ListItemNode
} from '@lexical/list';

// Lexical Rich Text
import { HeadingNode, QuoteNode } from '@lexical/rich-text';

// Icons
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Undo, 
  Redo,
  Palette,
  Highlighter
} from 'lucide-react';

interface InputTextFieldProps {
  placeholder?: string;
  onChange: (content: string, editorStateJSON?: string) => void;
  className?: string;
}

// Toolbar Plugin Component
function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);
  const [isStrikethrough, setIsStrikethrough] = React.useState(false);
  const [isCode, setIsCode] = React.useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = React.useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = React.useState(false);

  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsCode(selection.hasFormat('code'));
    }
  }, []);

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  const formatText = (format: 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code') => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const formatAlignment = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
  };

  const formatList = (listType: 'bullet' | 'number') => {
    if (listType === 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  };

  const applyTextColor = (color: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();
        nodes.forEach((node) => {
          const parent = node.getParent();
          if (parent && node.getType() === 'text') {
            const textNode = node as any;
            const currentStyle = textNode.getStyle() || '';
            // Remove existing color style
            const newStyle = currentStyle.replace(/color:[^;]+;?/g, '').trim();
            textNode.setStyle(newStyle ? `${newStyle}; color: ${color}` : `color: ${color}`);
          }
        });
      }
    });
    setShowTextColorPicker(false);
  };

  const applyBackgroundColor = (color: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();
        nodes.forEach((node) => {
          const parent = node.getParent();
          if (parent && node.getType() === 'text') {
            const textNode = node as any;
            const currentStyle = textNode.getStyle() || '';
            // Remove existing background-color style
            const newStyle = currentStyle.replace(/background-color:[^;]+;?/g, '').trim();
            const bgStyle = color === 'transparent' ? '' : `background-color: ${color}`;
            if (bgStyle) {
              textNode.setStyle(newStyle ? `${newStyle}; ${bgStyle}` : bgStyle);
            } else {
              textNode.setStyle(newStyle);
            }
          }
        });
      }
    });
    setShowBgColorPicker(false);
  };

  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Pink', value: '#ec4899' },
  ];

  const bgColors = [
    { name: 'None', value: 'transparent' },
    { name: 'Yellow', value: '#fef08a' },
    { name: 'Green', value: '#bbf7d0' },
    { name: 'Blue', value: '#bfdbfe' },
    { name: 'Purple', value: '#e9d5ff' },
    { name: 'Pink', value: '#fbcfe8' },
    { name: 'Gray', value: '#e5e7eb' },
  ];

  return (
    <div className="flex items-center gap-1 p-2 border-b border-gray-300 bg-gray-50 flex-wrap">
      {/* Undo/Redo */}
      <button
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        className="p-2 hover:bg-gray-200 rounded"
        aria-label="Undo"
        type="button"
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className="p-2 hover:bg-gray-200 rounded"
        aria-label="Redo"
        type="button"
      >
        <Redo className="w-4 h-4" />
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-1" />
      
      {/* Text Formatting */}
      <button
        onClick={() => formatText('bold')}
        className={`p-2 hover:bg-gray-200 rounded ${isBold ? 'bg-gray-300' : ''}`}
        aria-label="Bold"
        type="button"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => formatText('italic')}
        className={`p-2 hover:bg-gray-200 rounded ${isItalic ? 'bg-gray-300' : ''}`}
        aria-label="Italic"
        type="button"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => formatText('underline')}
        className={`p-2 hover:bg-gray-200 rounded ${isUnderline ? 'bg-gray-300' : ''}`}
        aria-label="Underline"
        type="button"
      >
        <Underline className="w-4 h-4" />
      </button>
      <button
        onClick={() => formatText('strikethrough')}
        className={`p-2 hover:bg-gray-200 rounded ${isStrikethrough ? 'bg-gray-300' : ''}`}
        aria-label="Strikethrough"
        type="button"
      >
        <Strikethrough className="w-4 h-4" />
      </button>
      <button
        onClick={() => formatText('code')}
        className={`p-2 hover:bg-gray-200 rounded ${isCode ? 'bg-gray-300' : ''}`}
        aria-label="Code"
        type="button"
      >
        <Code className="w-4 h-4" />
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-1" />
      
      {/* Text Alignment */}
      <button
        onClick={() => formatAlignment('left')}
        className="p-2 hover:bg-gray-200 rounded"
        aria-label="Align Left"
        type="button"
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => formatAlignment('center')}
        className="p-2 hover:bg-gray-200 rounded"
        aria-label="Align Center"
        type="button"
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      <button
        onClick={() => formatAlignment('right')}
        className="p-2 hover:bg-gray-200 rounded"
        aria-label="Align Right"
        type="button"
      >
        <AlignRight className="w-4 h-4" />
      </button>
      <button
        onClick={() => formatAlignment('justify')}
        className="p-2 hover:bg-gray-200 rounded"
        aria-label="Align Justify"
        type="button"
      >
        <AlignJustify className="w-4 h-4" />
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-1" />
      
      {/* Lists */}
      <button
        onClick={() => formatList('bullet')}
        className="p-2 hover:bg-gray-200 rounded"
        aria-label="Bullet List"
        type="button"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        onClick={() => formatList('number')}
        className="p-2 hover:bg-gray-200 rounded"
        aria-label="Numbered List"
        type="button"
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-1" />
      
      {/* Text Color */}
      <div className="relative">
        <button
          onClick={() => {
            setShowTextColorPicker(!showTextColorPicker);
            setShowBgColorPicker(false);
          }}
          className="p-2 hover:bg-gray-200 rounded"
          aria-label="Text Color"
          type="button"
        >
          <Palette className="w-4 h-4" />
        </button>
        {showTextColorPicker && (
          <div className="absolute top-full left-0 mt-1 p-2 bg-white border border-gray-300 rounded shadow-lg z-10 flex gap-1">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => applyTextColor(color.value)}
                className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                style={{ backgroundColor: color.value }}
                title={color.name}
                type="button"
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Background Color */}
      <div className="relative">
        <button
          onClick={() => {
            setShowBgColorPicker(!showBgColorPicker);
            setShowTextColorPicker(false);
          }}
          className="p-2 hover:bg-gray-200 rounded"
          aria-label="Background Color"
          type="button"
        >
          <Highlighter className="w-4 h-4" />
        </button>
        {showBgColorPicker && (
          <div className="absolute top-full left-0 mt-1 p-2 bg-white border border-gray-300 rounded shadow-lg z-10 flex gap-1">
            {bgColors.map((color) => (
              <button
                key={color.value}
                onClick={() => applyBackgroundColor(color.value)}
                className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                style={{ backgroundColor: color.value }}
                title={color.name}
                type="button"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function InputTextField({ 
  placeholder = '오늘 하루는 어떠셨나요? 자유롭게 작성해주세요...', 
  onChange,
  className = ''
}: InputTextFieldProps) {
  const editorConfig = {
    namespace: 'DiaryEditor',
    nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode],
    theme: {
      paragraph: 'mb-2',
      heading: {
        h1: 'text-3xl font-bold mb-2',
        h2: 'text-2xl font-bold mb-2',
        h3: 'text-xl font-bold mb-2',
      },
      list: {
        nested: {
          listitem: 'list-none',
        },
        ol: 'list-decimal ml-4',
        ul: 'list-disc ml-4',
        listitem: 'ml-2',
      },
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
        code: 'bg-gray-100 px-1 py-0.5 font-mono text-sm rounded',
      },
    },
    onError: (error: Error) => {
      console.error(error);
    },
  };

  const handleEditorChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const textContent = root.getTextContent();
      // Serialize the editor state to JSON
      const editorStateJSON = JSON.stringify(editorState.toJSON());
      onChange(textContent, editorStateJSON);
    });
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={`border border-gray-300 rounded-md overflow-hidden ${className}`}>
        <ToolbarPlugin />
        <div className="relative ">
          <RichTextPlugin
            contentEditable={
              <ContentEditable 
                className="min-h-[300px] p-3 outline-none overflow-auto" 
              />
            }
            placeholder={
              <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
                {placeholder}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <OnChangePlugin onChange={handleEditorChange} />
        </div>
      </div>
    </LexicalComposer>
  );
}