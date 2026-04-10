import { cn } from "@/lib/utils";
import { type Editor } from "@tiptap/react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  Bold,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Italic,
  ListIcon,
  ListOrderedIcon,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface MenuBarProps {
  editor: Editor | null;
}

export function MenuBar({ editor }: MenuBarProps) {
  if (!editor) return null;

  return (
    <div className="border border-input border-t-0 border-x-0 rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center">
      <div className="flex flex-wrap gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive("bold")}
              onPressedChange={() => editor.chain().focus().toggleBold().run()}
              className={cn(
                editor.isActive("bold") && "bg-muted text-muted-foreground",
              )}
            >
              <Bold />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Bold</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive("italic")}
              onPressedChange={() =>
                editor.chain().focus().toggleItalic().run()
              }
              className={cn(
                editor.isActive("italic") && "bg-muted text-muted-foreground",
              )}
            >
              <Italic />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Italic</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive("strike")}
              onPressedChange={() =>
                editor.chain().focus().toggleStrike().run()
              }
              className={cn(
                editor.isActive("strike") && "bg-muted text-muted-foreground",
              )}
            >
              <Strikethrough />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Strike</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive("heading", { level: 1 })}
              onPressedChange={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={cn(
                editor.isActive("heading", { level: 1 }) &&
                  "bg-muted text-muted-foreground",
              )}
            >
              <Heading1Icon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Heading 1</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive("heading", { level: 2 })}
              onPressedChange={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={cn(
                editor.isActive("heading", { level: 2 }) &&
                  "bg-muted text-muted-foreground",
              )}
            >
              <Heading2Icon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Heading 2</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive("heading", { level: 3 })}
              onPressedChange={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={cn(
                editor.isActive("heading", { level: 3 }) &&
                  "bg-muted text-muted-foreground",
              )}
            >
              <Heading3Icon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Heading 3</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive("bulletlist")}
              onPressedChange={() =>
                editor.chain().focus().toggleBulletList().run()
              }
              className={cn(
                editor.isActive("bulletlist") &&
                  "bg-muted text-muted-foreground",
              )}
            >
              <ListIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Bullet List</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive("orderedlist")}
              onPressedChange={() =>
                editor.chain().focus().toggleOrderedList().run()
              }
              className={cn(
                editor.isActive("orderedlist") &&
                  "bg-muted text-muted-foreground",
              )}
            >
              <ListOrderedIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Ordered List</TooltipContent>
        </Tooltip>
      </div>

      <div className="w-px h-6 bg-order mx-2"></div>

      <div className="flex flex-wrap gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive({ textAlign: "left" })}
              onPressedChange={() =>
                editor.chain().focus().setTextAlign("left").run()
              }
              className={cn(
                editor.isActive({ textAlign: "left" }) &&
                  "bg-muted text-muted-foreground",
              )}
            >
              <AlignLeftIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Left Align</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive({ textAlign: "center" })}
              onPressedChange={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={cn(
                editor.isActive({ textAlign: "center" }) &&
                  "bg-muted text-muted-foreground",
              )}
            >
              <AlignCenterIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Center Align</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive({ textAlign: "right" })}
              onPressedChange={() =>
                editor.chain().focus().setTextAlign("right").run()
              }
              className={cn(
                editor.isActive({ textAlign: "right" }) &&
                  "bg-muted text-muted-foreground",
              )}
            >
              <AlignRightIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Right Align</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive({ textAlign: "justify" })}
              onPressedChange={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              className={cn(
                editor.isActive({ textAlign: "justify" }) &&
                  "bg-muted text-muted-foreground",
              )}
            >
              <AlignJustifyIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Justify Align</TooltipContent>
        </Tooltip>
      </div>

      <div className="w-px h-6 bg-order mx-2"></div>

      <div className="flex flex-wrap gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
            >
              <Undo />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
            >
              <Redo />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
