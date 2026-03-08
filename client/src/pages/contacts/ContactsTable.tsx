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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { useTranslation } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  MoreHorizontal,
  Edit,
  Trash2,
  MessageSquare,
  Shield,
  CheckCircle,
  FolderPlus,
} from "lucide-react";
import { type Contact } from "./types";

interface ContactsTableProps {
  contacts: Contact[];
  selectedContactIds: string[];
  allSelected: boolean;
  toggleSelectAll: () => void;
  toggleSelectOne: (id: string) => void;
  searchQuery: string;
  selectedGroup: string | null;
  selectedStatus: string | null;
  clearAllFilters: () => void;
  setShowAddDialog: (show: boolean) => void;
  setSelectedContact: (contact: Contact | null) => void;
  setShowMessageDialog: (show: boolean) => void;
  setShowEditDialog: (show: boolean) => void;
  handleDeleteContact: (id: string) => void;
  handleToggleContactStatus: (id: string, currentStatus: string | null) => void;
  handleOpenAssignGroup: (contactIds: string[]) => void;
  fetchTemplates: () => void;
  activeChannel: any;
  channels: any;
  user: any;
  deleteContactMutation: any;
  toast: any;
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  setLimit: (limit: number) => void;
  setCurrentPage: (page: number) => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  getPageNumbers: () => number[];
  goToPage: (page: number) => void;
}

export function ContactsTable({
  contacts,
  selectedContactIds,
  allSelected,
  toggleSelectAll,
  toggleSelectOne,
  searchQuery,
  selectedGroup,
  selectedStatus,
  clearAllFilters,
  setShowAddDialog,
  setSelectedContact,
  setShowMessageDialog,
  setShowEditDialog,
  handleDeleteContact,
  handleToggleContactStatus,
  handleOpenAssignGroup,
  fetchTemplates,
  activeChannel,
  channels,
  user,
  deleteContactMutation,
  toast,
  page,
  totalPages,
  total,
  limit,
  setLimit,
  setCurrentPage,
  goToPreviousPage,
  goToNextPage,
  getPageNumbers,
  goToPage,
}: ContactsTableProps) {
  const { t } = useTranslation();

  const handleMessageClick = async (contact: Contact) => {
    if (!activeChannel?.id) {
      toast({
        title: "No active channel",
        description: "Please select an active WhatsApp channel",
        variant: "destructive",
      });
      return;
    }

    setSelectedContact(contact);
    setShowMessageDialog(true);

    await fetchTemplates();
  };

  return (
    <Card>
      <CardContent className="p-0">
        {!contacts.length ? (
          <EmptyState
            icon={Users}
            title={`${t("contacts.noContactsFound")}`}
            description={
              searchQuery || selectedGroup || selectedStatus
                ? `${t("contacts.noFilters")}`
                : `${t("contacts.noContactsYet")}`
            }
            action={
              !(searchQuery || selectedGroup || selectedStatus)
                ? {
                  label: `${t("contacts.addYourFirstContact")}`,
                  onClick: () => setShowAddDialog(true),
                }
                : {
                  label: ` ${t("contacts.clearFilters")}`,
                  onClick: clearAllFilters,
                }
            }
            className="py-8 sm:py-12"
          />
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#050505]">
                  <tr>
                    <th className="text-left px-3 lg:px-6 py-4 text-[10px] font-bold text-[#555] uppercase tracking-[0.2em] border-b border-[#1a1a1a]">
                      <input
                        type="checkbox"
                        className="rounded-none border-[#252525] bg-transparent"
                        checked={allSelected}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="text-left px-3 lg:px-6 py-4 text-[10px] font-bold text-[#555] uppercase tracking-[0.2em] border-b border-[#1a1a1a]">
                      {t("contacts.contact")}
                    </th>
                    <th className="text-left px-3 lg:px-6 py-4 text-[10px] font-bold text-[#555] uppercase tracking-[0.2em] border-b border-[#1a1a1a]">
                      {t("contacts.phone")}
                    </th>
                    <th className="text-left px-3 lg:px-6 py-4 text-[10px] font-bold text-[#555] uppercase tracking-[0.2em] border-b border-[#1a1a1a] hidden lg:table-cell">
                      {t("contacts.groups")}
                    </th>
                    <th className="text-left px-3 lg:px-6 py-4 text-[10px] font-bold text-[#555] uppercase tracking-[0.2em] border-b border-[#1a1a1a]">
                      {t("contacts.status")}
                    </th>
                    <th className="text-left px-3 lg:px-6 py-4 text-[10px] font-bold text-[#555] uppercase tracking-[0.2em] border-b border-[#1a1a1a] hidden xl:table-cell">
                      {t("contacts.lastContact")}
                    </th>
                    <th className="text-left px-3 lg:px-6 py-4 text-[10px] font-bold text-[#555] uppercase tracking-[0.2em] border-b border-[#1a1a1a]">
                      {t("contacts.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#0a0a0a] divide-y divide-[#151515]">
                  {contacts.map((contact: Contact) => (
                    <tr
                      key={contact.id}
                      className="hover:bg-[#080808] transition-all duration-300 group"
                    >
                      <td className="px-3 lg:px-6 py-4">
                        <input
                          type="checkbox"
                          className="rounded-none border-[#252525] bg-transparent"
                          checked={selectedContactIds.includes(contact.id)}
                          onChange={() => toggleSelectOne(contact.id)}
                        />
                      </td>
                      <td className="px-3 lg:px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 lg:w-9 lg:h-9 bg-[#111] border border-[#1a1a1a] rounded-none flex items-center justify-center flex-shrink-0 group-hover:border-[#00ff88] transition-colors">
                            <span className="text-[10px] font-bold text-[#00ff88]">
                              {contact.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-2 lg:ml-4 min-w-0">
                            <div className="text-xs lg:text-sm font-bold text-[#e0e0e0] truncate group-hover:text-white transition-colors">
                              {user?.username === "demouser"
                                ? contact.name
                                  .slice(0, -1)
                                  .replace(/./g, "*") +
                                contact.name.slice(-1)
                                : contact.name}
                            </div>
                            {contact.email && (
                              <div className="text-[10px] text-[#555] truncate font-mono">
                                {user?.username === "demouser"
                                  ? contact.email
                                    .split("@")[0]
                                    .slice(0, -2)
                                    .replace(/./g, "*") +
                                  contact.email.slice(
                                    contact.email.indexOf("@") - 2
                                  )
                                  : contact.email}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-4 text-xs lg:text-sm text-[#999] font-mono group-hover:text-[#ccc] transition-colors">
                        {user?.username === "demouser"
                          ? contact.phone.slice(0, -4).replace(/\d/g, "*") +
                          contact.phone.slice(-4)
                          : contact.phone}
                      </td>
                      <td className="px-3 lg:px-6 py-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(contact.groups) &&
                            contact.groups.length > 0 ? (
                            contact.groups.map(
                              (group: string, index: number) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-[9px] h-5"
                                >
                                  {group}
                                </Badge>
                              )
                            )
                          ) : (
                            <span className="text-[10px] text-[#444] uppercase font-mono tracking-wider italic">
                              {t("contacts.noGroups")}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 lg:px-6 py-4">
                        <Badge
                          variant={contact.status === "active" ? "default" : "destructive"}
                          className="h-5 px-1.5"
                        >
                          {contact.status?.toLocaleUpperCase() || "N/A"}
                        </Badge>
                      </td>
                      <td className="px-3 lg:px-6 py-4 text-[10px] text-[#555] font-mono hidden xl:table-cell">
                        {contact.lastContact
                          ? new Date(
                            contact.lastContact
                          ).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-3 lg:px-6 py-4">
                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMessageClick(contact)}
                            disabled={!channels || channels.length === 0}
                            className="h-8 w-8 hover:bg-[#00ff88]/10 hover:text-[#00ff88] transition-all"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedContact(contact);
                              setShowEditDialog(true);
                            }}
                            className="h-8 w-8 hover:bg-white/10 hidden lg:flex"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteContact(contact.id)}
                            disabled={
                              user?.username === "demouser"
                                ? true
                                : deleteContactMutation.isPending
                            }
                            className="h-8 w-8 hover:bg-red-500/10 text-[#555] hover:text-red-500 hidden lg:flex"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3 p-3 bg-[#0a0a0a]">
              {contacts.map((contact: Contact) => (
                <div
                  key={contact.id}
                  className="bg-[#050505] border border-[#1a1a1a] rounded-none p-4 transition-all duration-300 active:border-[#00ff88]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        className="rounded-none border-[#252525] mt-1 flex-shrink-0 bg-transparent"
                        checked={selectedContactIds.includes(contact.id)}
                        onChange={() => toggleSelectOne(contact.id)}
                      />
                      <div className="w-10 h-10 bg-[#111] border border-[#1a1a1a] rounded-none flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-[#00ff88]">
                          {contact.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-[#e0e0e0] truncate">
                          {user?.username === "demouser"
                            ? contact.name.slice(0, -1).replace(/./g, "*") +
                            contact.name.slice(-1)
                            : contact.name}
                        </div>
                        <div className="text-[10px] text-[#555] font-mono truncate">
                          {contact.phone}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={contact.status === "active" ? "default" : "destructive"}
                      className="h-5"
                    >
                      {contact.status?.toLocaleUpperCase() || "N/A"}
                    </Badge>
                  </div>

                  <div className="flex justify-between gap-2 mt-4 pt-4 border-t border-[#1a1a1a]">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMessageClick(contact)}
                      disabled={!channels || channels.length === 0}
                      className="flex-1 h-9 bg-transparent border-[#1a1a1a] hover:border-[#00ff88] hover:text-[#00ff88] transition-all text-[10px] font-bold uppercase tracking-widest"
                    >
                      <MessageSquare className="w-3.5 h-3.5 mr-2" />
                      Message
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowEditDialog(true);
                      }}
                      className="flex-1 h-9 bg-transparent border-[#1a1a1a] hover:border-white transition-all text-[10px] font-bold uppercase tracking-widest"
                    >
                      <Edit className="w-3.5 h-3.5 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteContact(contact.id)}
                      disabled={user?.username === "demouser"}
                      className="w-10 h-9 p-0 bg-transparent border-[#1a1a1a] hover:border-red-500 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {contacts.length > 0 && (
          <div className="bg-[#050505] px-3 sm:px-4 md:px-6 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-[#1a1a1a] gap-3">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <div className="text-xs sm:text-sm text-[#999] text-center sm:text-left">
                Showing{" "}
                <span className="font-medium">
                  {(page - 1) * limit + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min((page - 1) * limit + limit, total)}
                </span>{" "}
                of <span className="font-medium">{total}</span> contacts
              </div>

              <Select
                value={limit.toString()}
                onValueChange={(value) => {
                  setLimit(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-20 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousPage}
                disabled={page === 1}
                className="text-xs px-2 sm:px-3"
              >
                <span className="hidden sm:inline">
                  {t("contacts.previous")}
                </span>
                <span className="sm:hidden">Prev</span>
              </Button>

              <div className="flex gap-1 overflow-x-auto max-w-[150px] sm:max-w-none">
                {getPageNumbers().map((pageNum) => (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(pageNum)}
                    className={`text-xs px-2 sm:px-3 min-w-[32px] ${page === pageNum
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : ""
                      }`}
                  >
                    {pageNum}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={page === totalPages}
                className="text-xs px-2 sm:px-3"
              >
                {t("contacts.next")}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
