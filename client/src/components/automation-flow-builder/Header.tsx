/**
 * ============================================================
 * © 2025 Diploy — a brand of Bisht Technologies Private Limited
 * Original Author: BTPL Engineering Team
 * Website: https://diploy.in
 * Contact: cs@diploy.in
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Loader2, Zap } from "lucide-react";

interface HeaderProps {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  trigger: string;
  setTrigger: (trigger: string) => void;
  automation: any;
  onClose: () => void;
  onSave: () => void;
  isSaving: boolean;
  isDemo: boolean;
}

export function Header({
  name,
  setName,
  description,
  setDescription,
  trigger,
  setTrigger,
  automation,
  onClose,
  onSave,
  isSaving,
  isDemo,
}: HeaderProps) {
  return (
    <div className="bg-[#0a0a0a] border-b border-[#1a1a1a] px-4 py-2.5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg bg-[#0a0a0a] hover:bg-gray-200 flex items-center justify-center text-[#555] hover:text-[#999] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="h-6 w-px bg-gray-200" />

        <div className="flex flex-col">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Untitled Flow"
            className="h-7 text-sm font-semibold border-none shadow-none p-0 focus-visible:ring-0 bg-transparent placeholder:text-gray-300 text-[#e0e0e0]"
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description..."
            className="h-5 text-[11px] text-[#555] border-none shadow-none p-0 focus-visible:ring-0 bg-transparent placeholder:text-gray-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 bg-[#050505] rounded-lg px-2.5 py-1.5 border border-[#1a1a1a]">
          <Zap className="w-3 h-3 text-[#555]" />
          <span className="text-[11px] text-[#555]">Trigger:</span>
          <Select value={trigger} onValueChange={setTrigger}>
            <SelectTrigger className="h-5 text-[11px] w-[130px] border-none bg-transparent shadow-none p-0 focus:ring-0 font-medium text-[#999]">
              <SelectValue placeholder="Select trigger" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new_conversation">New conversation</SelectItem>
              <SelectItem value="message_received">Message received</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Badge
          variant="outline"
          className={`text-[10px] h-5 px-2 font-medium rounded ${
            automation?.id
              ? "bg-blue-50 text-blue-600 border-blue-200"
              : "bg-green-50 text-green-600 border-green-200"
          }`}
        >
          {automation?.id ? "Editing" : "New Flow"}
        </Badge>

        <Button
          size="sm"
          onClick={onSave}
          disabled={isDemo || isSaving}
          className="h-8 px-4 text-xs font-medium gap-1.5"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              Save Flow
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
