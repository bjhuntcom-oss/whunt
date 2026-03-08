/**
 * ============================================================
 * © 2025 Whunt — WhatsApp Marketing Platform
 * Original Author: BTPL Engineering Team
 * Website: https://whunt.io
 * Contact: support@whunt.io
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

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  selectedMenu: string | null;
  setSelectedMenu: (menu: string | null) => void;
  isCollapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false); // <- yahan define karo
  const [isCollapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const toggle = () => setOpen((open) => !open);
  const open = () => setOpen(true);
  const close = () => setOpen(false);

  // agar resize logic chahiye to yahan useEffect me likho

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggle,
        open,
        close,
        selectedMenu,
        setSelectedMenu,
        isCollapsed,
        setCollapsed,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
