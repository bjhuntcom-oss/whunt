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

import React, { useState } from "react";
import {
  Smartphone,
  Plus,
  Settings,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Edit,
  Activity,
  Clock,
  MessageSquare,
  BarChart3,
  Search,
  Download,
  Upload,
  MoreVertical,
} from "lucide-react";

const WABAConnection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showTokens, setShowTokens] = useState<{ [key: string]: boolean }>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Mock data for WABA connections
  const connections = [
    {
      id: "1",
      businessName: "TechCorp Solutions",
      phoneNumber: "+1 (555) 123-4567",
      status: "connected",
      health: "healthy",
      lastSync: "2 minutes ago",
      messagesCount: 1247,
      templatesCount: 12,
      token: "EAABwzLixnjYBAO7ZZC0Q8...",
      webhookUrl: "https://api.example.com/webhook",
      verifyToken: "verify_token_123",
      createdAt: "2024-01-15",
      lastActivity: "2024-01-20 14:30",
    },
    {
      id: "2",
      businessName: "E-Commerce Store",
      phoneNumber: "+1 (555) 987-6543",
      status: "pending",
      health: "warning",
      lastSync: "1 hour ago",
      messagesCount: 892,
      templatesCount: 8,
      token: "EAABwzLixnjYBAP8ZZD1R9...",
      webhookUrl: "https://api.store.com/webhook",
      verifyToken: "verify_token_456",
      createdAt: "2024-01-18",
      lastActivity: "2024-01-20 13:15",
    },
    {
      id: "3",
      businessName: "Local Restaurant",
      phoneNumber: "+1 (555) 456-7890",
      status: "disconnected",
      health: "error",
      lastSync: "3 days ago",
      messagesCount: 234,
      templatesCount: 5,
      token: "EAABwzLixnjYBAQ9ZZE2S0...",
      webhookUrl: "https://api.restaurant.com/webhook",
      verifyToken: "verify_token_789",
      createdAt: "2024-01-10",
      lastActivity: "2024-01-17 09:45",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "disconnected":
        return "text-red-600 bg-red-100";
      default:
        return "text-[#999] bg-[#0a0a0a]";
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case "healthy":
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />;
      case "warning":
        return (
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
        );
      case "error":
        return <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#555]" />;
    }
  };

  const toggleTokenVisibility = (id: string) => {
    setShowTokens((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const filteredConnections = connections.filter((connection) => {
    const matchesSearch =
      connection.businessName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      connection.phoneNumber.includes(searchTerm);
    const matchesFilter =
      filterStatus === "all" || connection.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <div className="bg-[#0a0a0a] shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Title + subtitle */}
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#e0e0e0] flex items-center">
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-green-600 mr-2 flex-shrink-0" />
                <span className="truncate">WABA Connection Management</span>
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-[#999] mt-1">
                Manage your WhatsApp Business API connections
              </p>
            </div>

            {/* CTA */}
            <button
              className="w-full sm:w-auto inline-flex items-center justify-center bg-green-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              aria-label="Add Connection"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Add Connection
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
          <div className="bg-[#0a0a0a] p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-[#999] mb-1">
                  Total Connections
                </p>
                <p className="text-xl sm:text-2xl font-bold text-[#e0e0e0]">3</p>
              </div>
              <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
            </div>
          </div>
          <div className="bg-[#0a0a0a] p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-[#999] mb-1">
                  Active Connections
                </p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">
                  1
                </p>
              </div>
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 flex-shrink-0" />
            </div>
          </div>
          <div className="bg-[#0a0a0a] p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-[#999] mb-1">
                  Total Messages
                </p>
                <p className="text-xl sm:text-2xl font-bold text-[#e0e0e0]">
                  2,373
                </p>
              </div>
              <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 flex-shrink-0" />
            </div>
          </div>
          <div className="bg-[#0a0a0a] p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-[#999] mb-1">
                  Health Score
                </p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-600">
                  75%
                </p>
              </div>
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-[#0a0a0a] p-3 sm:p-4 rounded-lg shadow-sm mb-4 sm:mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 flex-1">
              <div className="relative flex-1 sm:max-w-md">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#555]" />
                <input
                  type="text"
                  placeholder="Search connections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-[#252525] rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-[#252525] rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="connected">Connected</option>
                <option value="pending">Pending</option>
                <option value="disconnected">Disconnected</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base border border-[#252525] rounded-lg hover:bg-[#050505] transition-colors flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm sm:text-base border border-[#252525] rounded-lg hover:bg-[#050505] transition-colors flex items-center justify-center">
                <Upload className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Import</span>
              </button>
            </div>
          </div>
        </div>

        {/* Connections List */}
        <div className="space-y-3 sm:space-y-4">
          {filteredConnections.map((connection) => (
            <div
              key={connection.id}
              className="bg-[#0a0a0a] rounded-lg shadow-sm border"
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-[#e0e0e0] truncate">
                        {connection.businessName}
                      </h3>
                      <p className="text-sm sm:text-base text-[#999] truncate">
                        {connection.phoneNumber}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            connection.status
                          )}`}
                        >
                          {connection.status.charAt(0).toUpperCase() +
                            connection.status.slice(1)}
                        </span>
                        <div className="flex items-center gap-1">
                          {getHealthIcon(connection.health)}
                          <span className="text-xs sm:text-sm text-[#999]">
                            Health
                          </span>
                        </div>
                        <div className="hidden sm:flex items-center gap-1">
                          <Clock className="w-4 h-4 text-[#555]" />
                          <span className="text-sm text-[#999]">
                            Last sync: {connection.lastSync}
                          </span>
                        </div>
                      </div>
                      {/* Mobile Last Sync */}
                      <div className="sm:hidden flex items-center gap-1 mt-2">
                        <Clock className="w-3 h-3 text-[#555]" />
                        <span className="text-xs text-[#999]">
                          {connection.lastSync}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Action Buttons */}
                  <div className="hidden md:flex items-center gap-1 flex-shrink-0">
                    <button
                      className="p-2 text-[#555] hover:text-[#999] hover:bg-[#050505] rounded-lg transition-colors"
                      title="Refresh"
                      aria-label="Refresh"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 text-[#555] hover:text-[#999] hover:bg-[#050505] rounded-lg transition-colors"
                      title="Edit"
                      aria-label="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 text-[#555] hover:text-[#999] hover:bg-[#050505] rounded-lg transition-colors"
                      title="Settings"
                      aria-label="Settings"
                    >
                      <Settings className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Mobile Dropdown Menu */}
                  <div className="relative md:hidden flex-shrink-0">
                    <button
                      onClick={() => toggleDropdown(connection.id)}
                      className="p-2 text-[#999] hover:bg-[#0a0a0a] rounded-lg transition-colors"
                      aria-label="More actions"
                      aria-expanded={openDropdown === connection.id}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {openDropdown === connection.id && (
                      <>
                        {/* Backdrop */}
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenDropdown(null)}
                        />

                        {/* Dropdown Menu */}
                        <div className="absolute right-0 top-full mt-1 w-48 bg-[#0a0a0a] rounded-lg shadow-lg border border-[#1a1a1a] py-1 z-20">
                          <button
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#999] hover:bg-[#050505] transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                          </button>
                          <button
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#999] hover:bg-[#050505] transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#999] hover:bg-[#050505] transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </button>
                          <div className="border-t border-[#1a1a1a] my-1"></div>
                          <button
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Connection Details */}
                <div className="mt-4 sm:mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-[#050505] p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-[#999] mb-1">
                          Messages Sent
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-[#e0e0e0]">
                          {connection.messagesCount.toLocaleString()}
                        </p>
                      </div>
                      <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                    </div>
                  </div>
                  <div className="bg-[#050505] p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-[#999] mb-1">
                          Templates
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-[#e0e0e0]">
                          {connection.templatesCount}
                        </p>
                      </div>
                      <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0" />
                    </div>
                  </div>
                  <div className="bg-[#050505] p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-[#999] mb-1">
                          Created
                        </p>
                        <p className="text-xs sm:text-sm text-[#e0e0e0]">
                          {connection.createdAt}
                        </p>
                      </div>
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
                    </div>
                  </div>
                  <div className="bg-[#050505] p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-[#999] mb-1">
                          Last Activity
                        </p>
                        <p className="text-xs sm:text-sm text-[#e0e0e0]">
                          {connection.lastActivity}
                        </p>
                      </div>
                      <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 flex-shrink-0" />
                    </div>
                  </div>
                </div>

                {/* Token and Webhook Information */}
                <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                  <div className="bg-[#050505] p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs sm:text-sm font-medium text-[#999]">
                        Access Token
                      </h4>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleTokenVisibility(connection.id)}
                          className="p-1 text-[#555] hover:text-[#999] transition-colors"
                          aria-label="Toggle token visibility"
                        >
                          {showTokens[connection.id] ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => copyToClipboard(connection.token)}
                          className="p-1 text-[#555] hover:text-[#999] transition-colors"
                          aria-label="Copy token"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-mono text-[#999] bg-[#0a0a0a] p-2 rounded border break-all">
                      {showTokens[connection.id]
                        ? connection.token
                        : "••••••••••••••••••••"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-[#050505] p-3 sm:p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs sm:text-sm font-medium text-[#999]">
                          Webhook URL
                        </h4>
                        <button
                          onClick={() => copyToClipboard(connection.webhookUrl)}
                          className="p-1 text-[#555] hover:text-[#999] transition-colors"
                          aria-label="Copy webhook URL"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-mono text-[#999] bg-[#0a0a0a] p-2 rounded border break-all">
                        {connection.webhookUrl}
                      </p>
                    </div>
                    <div className="bg-[#050505] p-3 sm:p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs sm:text-sm font-medium text-[#999]">
                          Verify Token
                        </h4>
                        <button
                          onClick={() =>
                            copyToClipboard(connection.verifyToken)
                          }
                          className="p-1 text-[#555] hover:text-[#999] transition-colors"
                          aria-label="Copy verify token"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-mono text-[#999] bg-[#0a0a0a] p-2 rounded border break-all">
                        {connection.verifyToken}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredConnections.length === 0 && (
          <div className="bg-[#0a0a0a] rounded-lg shadow-sm p-8 sm:p-12 text-center">
            <Smartphone className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-[#e0e0e0] mb-2">
              No connections found
            </h3>
            <p className="text-sm sm:text-base text-[#999] mb-6">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by adding your first WhatsApp Business API connection."}
            </p>
            <button className="bg-green-600 text-white px-4 sm:px-6 py-2 text-sm sm:text-base rounded-lg hover:bg-green-700 transition-colors flex items-center mx-auto">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Add Connection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WABAConnection;
