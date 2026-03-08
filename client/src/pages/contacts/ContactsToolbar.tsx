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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  Upload,
  Plus,
  Download,
  Trash2,
  FolderPlus,
} from "lucide-react";
import { type Contact } from "./types";

interface ContactsToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedGroup: string | null;
  setSelectedGroup: (group: string | null) => void;
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
  groupsData: any[];
  handleExportAllContacts: () => void;
  handleCSVUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleExcelUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleExcelDownload: () => void;
  handleExportSelectedContacts: () => void;
  handleOpenAssignGroup: (contactIds: string[]) => void;
  setShowBulkDeleteDialog: (show: boolean) => void;
  selectedContactIds: string[];
  user: any;
  setLocation: (path: string) => void;
}

export function ContactsToolbar({
  searchQuery,
  setSearchQuery,
  selectedGroup,
  setSelectedGroup,
  selectedStatus,
  setSelectedStatus,
  groupsData,
  handleExportAllContacts,
  handleCSVUpload,
  handleExcelUpload,
  handleExcelDownload,
  handleExportSelectedContacts,
  handleOpenAssignGroup,
  setShowBulkDeleteDialog,
  selectedContactIds,
  user,
  setLocation,
}: ContactsToolbarProps) {
  const { t } = useTranslation();

  return (
    <>
      <Card className="rounded-none border-[#1a1a1a] bg-[#0a0a0a]">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col gap-4">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#444] group-focus-within:text-[#00ff88] transition-colors" />
              <Input
                placeholder={t("contacts.searchContacts").toUpperCase()}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full h-11 bg-transparent border-[#1a1a1a] focus:border-[#00ff88] text-xs font-bold uppercase tracking-widest placeholder:text-[#333] transition-all rounded-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-4 rounded-none border-[#1a1a1a] bg-transparent hover:border-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
                  >
                    <Filter className="w-3.5 h-3.5 mr-2" />
                    <span className="hidden sm:inline">
                      {selectedGroup || t("contacts.allGroups")}
                    </span>
                    <span className="sm:hidden">
                      {selectedGroup ? selectedGroup.substring(0, 8) + "..." : "GROUPS"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem
                    onClick={() => setSelectedGroup(null)}
                    className={!selectedGroup ? "bg-white/10" : ""}
                  >
                    {t("contacts.allGroups")}
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setLocation("/groups")}
                    className="text-[#00ff88]"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t("groups.createButton") || "CREATE GROUP"}
                  </DropdownMenuItem>
                  {groupsData?.length > 0 && (
                    <>
                      <DropdownMenuItem disabled className="opacity-50 text-[9px] font-bold tracking-widest">
                        {t("contacts.availableGroups").toUpperCase()}
                      </DropdownMenuItem>

                      {groupsData?.map((group) => (
                        <DropdownMenuItem
                          key={group.id}
                          onClick={() => setSelectedGroup(group.name)}
                          className={selectedGroup === group.name ? "bg-white/10" : ""}
                        >
                          {group.name}
                        </DropdownMenuItem>
                      ))}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-4 rounded-none border-[#1a1a1a] bg-transparent hover:border-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
                  >
                    <Filter className="w-3.5 h-3.5 mr-2" />
                    <span className="hidden sm:inline">
                      {selectedStatus || t("contacts.allStatuses")}
                    </span>
                    <span className="sm:hidden">STATUS</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem
                    onClick={() => setSelectedStatus(null)}
                    className={!selectedStatus ? "bg-white/10" : ""}
                  >
                    {t("contacts.allStatuses")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedStatus("active")}
                    className={selectedStatus === "active" ? "bg-white/10" : ""}
                  >
                    {t("contacts.active")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedStatus("blocked")}
                    className={selectedStatus === "blocked" ? "bg-white/10" : ""}
                  >
                    {t("contacts.blocked")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="h-4 w-px bg-[#1a1a1a] mx-2 hidden md:block" />

              <div className="flex items-center gap-2 ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportAllContacts}
                  disabled={user?.username === "demouser"}
                  className="h-9 px-4 rounded-none border-[#1a1a1a] bg-transparent hover:border-[#00ff88] hover:text-[#00ff88] text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
                >
                  <Upload className="w-3.5 h-3.5 mr-2" />
                  <span className="hidden lg:inline">
                    {t("contacts.exportAllContacts")}
                  </span>
                  <span className="lg:hidden">EXPORT</span>
                </Button>

                {user?.username === "demouser" ? (
                  <Button
                    disabled={true}
                    variant="outline"
                    size="sm"
                    className="h-9 px-4 rounded-none border-[#1a1a1a] opacity-50 text-[10px] font-bold uppercase tracking-[0.2em]"
                  >
                    <Download className="w-3.5 h-3.5 mr-2" />
                    <span className="hidden lg:inline">
                      {t("contacts.importContacts")}
                    </span>
                    <span className="lg:hidden">IMPORT</span>
                  </Button>
                ) : (
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".csv,.xlsx"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]?.name.endsWith(".csv")) {
                          handleCSVUpload(e);
                        } else {
                          handleExcelUpload(e);
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-4 rounded-none border-[#1a1a1a] bg-transparent hover:border-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
                      asChild
                    >
                      <span>
                        <Download className="w-3.5 h-3.5 mr-2" />
                        <span className="hidden lg:inline">
                          {t("contacts.importContacts")}
                        </span>
                        <span className="lg:hidden">IMPORT</span>
                      </span>
                    </Button>
                  </label>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExcelDownload}
                  className="h-9 px-4 rounded-none border-[#1a1a1a] bg-[#050505] hover:bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
                >
                  <Download className="w-3.5 h-3.5 mr-2" />
                  <span className="hidden xl:inline">
                    {t("contacts.downloadSampleExcel")}
                  </span>
                  <span className="xl:hidden text-[#555]">SAMPLE</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedContactIds.length > 0 && (
        <Card className="rounded-none border-[#1a1a1a] bg-[#050505] border-t-0">
          <CardContent className="p-3 sm:p-4 animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#00ff88] flex items-center justify-center text-black font-bold text-xs">
                  {selectedContactIds.length}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999]">
                  {t("contacts.selected").toUpperCase()}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportSelectedContacts}
                  disabled={user?.username === "demouser"}
                  className="h-8 px-3 rounded-none border-[#1a1a1a] bg-transparent hover:border-[#00ff88] text-[9px] font-bold uppercase tracking-widest transition-all"
                >
                  <Download className="w-3 h-3 mr-2" />
                  EXPORT
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenAssignGroup(selectedContactIds)}
                  disabled={user?.username === "demouser"}
                  className="h-8 px-3 rounded-none border-[#1a1a1a] bg-transparent hover:border-white text-[9px] font-bold uppercase tracking-widest transition-all"
                >
                  <FolderPlus className="w-3 h-3 mr-2" />
                  ASSIGN GROUP
                </Button>
                <Button
                  disabled={user?.username === "demouser"}
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 rounded-none border-[#1a1a1a] hover:border-red-500 hover:text-red-500 text-[9px] font-bold uppercase tracking-widest transition-all"
                  onClick={() => setShowBulkDeleteDialog(true)}
                >
                  <Trash2 className="w-3 h-3 mr-2" />
                  DELETE
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
