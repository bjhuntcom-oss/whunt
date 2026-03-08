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
  Webhook,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Play,
  Pause,
  Edit,
  Copy,
  Settings,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  Globe,
  Shield,
  AlertTriangle,
  Download,
  Upload,
} from "lucide-react";

const Webhooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWebhooks, setSelectedWebhooks] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");

  const webhooks = [
    {
      id: "1",
      name: "Message Received",
      url: "https://api.example.com/webhooks/messages",
      event: "message.received",
      status: "active",
      lastTriggered: "2 minutes ago",
      successRate: 98.5,
      totalCalls: 15420,
      failedCalls: 23,
      avgResponseTime: "145ms",
      retryCount: 3,
      timeout: 30,
      secret: "••••••••••••••••",
    },
    {
      id: "2",
      name: "Message Status Update",
      url: "https://api.example.com/webhooks/status",
      event: "message.status",
      status: "active",
      lastTriggered: "5 minutes ago",
      successRate: 99.2,
      totalCalls: 8930,
      failedCalls: 7,
      avgResponseTime: "98ms",
      retryCount: 3,
      timeout: 30,
      secret: "••••••••••••••••",
    },
    {
      id: "3",
      name: "Contact Updated",
      url: "https://api.example.com/webhooks/contacts",
      event: "contact.updated",
      status: "paused",
      lastTriggered: "1 hour ago",
      successRate: 97.8,
      totalCalls: 2340,
      failedCalls: 12,
      avgResponseTime: "203ms",
      retryCount: 5,
      timeout: 45,
      secret: "••••••••••••••••",
    },
    {
      id: "4",
      name: "Campaign Completed",
      url: "https://api.example.com/webhooks/campaigns",
      event: "campaign.completed",
      status: "error",
      lastTriggered: "3 hours ago",
      successRate: 85.2,
      totalCalls: 567,
      failedCalls: 84,
      avgResponseTime: "1.2s",
      retryCount: 3,
      timeout: 60,
      secret: "••••••••••••••••",
    },
    {
      id: "5",
      name: "Lead Generated",
      url: "https://api.example.com/webhooks/leads",
      event: "lead.created",
      status: "active",
      lastTriggered: "15 minutes ago",
      successRate: 99.8,
      totalCalls: 4521,
      failedCalls: 1,
      avgResponseTime: "67ms",
      retryCount: 2,
      timeout: 20,
      secret: "••••••••••••••••",
    },
  ];

  const filteredWebhooks = webhooks.filter((webhook) => {
    const matchesSearch =
      webhook.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      webhook.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      webhook.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || webhook.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "paused":
        return <Pause className="w-4 h-4 text-yellow-500" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-[#555]" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-[#0a0a0a] text-[#e0e0e0]";
    }
  };

  const handleSelectWebhook = (webhookId: string) => {
    setSelectedWebhooks((prev) =>
      prev.includes(webhookId)
        ? prev.filter((id) => id !== webhookId)
        : [...prev, webhookId]
    );
  };

  const handleSelectAll = () => {
    if (selectedWebhooks.length === filteredWebhooks.length) {
      setSelectedWebhooks([]);
    } else {
      setSelectedWebhooks(filteredWebhooks.map((webhook) => webhook.id));
    }
  };

  const stats = [
    {
      label: "Total Webhooks",
      value: webhooks.length.toString(),
      icon: Webhook,
      color: "text-blue-600",
    },
    {
      label: "Active Webhooks",
      value: webhooks.filter((w) => w.status === "active").length.toString(),
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "Total Calls Today",
      value: "31.8K",
      icon: Activity,
      color: "text-purple-600",
    },
    {
      label: "Avg Success Rate",
      value: "96.1%",
      icon: Shield,
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-wrap items-start md:items-center md:justify-between gap-3 md:gap-4">
            {/* Left: Title + subtitle */}
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#e0e0e0] truncate">
                Webhooks
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-[#999] mt-1 break-words">
                Manage webhook endpoints and monitor delivery
              </p>
            </div>

            {/* Right: Actions */}
            <div className="w-full md:w-auto">
              {/* On small screens this is a grid that wraps; on md+ it becomes a single row */}
              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 min-[680px]:grid-cols-3 md:grid-cols-3 md:flex md:flex-nowrap gap-2 md:gap-3">
                <button
                  className="w-full md:w-auto inline-flex items-center justify-center px-3 md:px-4 py-2 text-[#999] bg-[#0a0a0a] border border-[#252525] rounded-lg hover:bg-[#050505] text-sm md:text-base"
                  aria-label="Export webhooks"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="max-[360px]:sr-only">Export</span>
                  <span className="max-[360px]:hidden">Export</span>
                </button>

                <button
                  className="w-full md:w-auto inline-flex items-center justify-center px-3 md:px-4 py-2 text-[#999] bg-[#0a0a0a] border border-[#252525] rounded-lg hover:bg-[#050505] text-sm md:text-base"
                  aria-label="Import webhooks"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  <span className="max-[360px]:sr-only">Import</span>
                  <span className="max-[360px]:hidden">Import</span>
                </button>

                <button
                  className="w-full md:w-auto inline-flex items-center justify-center px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm md:text-base"
                  aria-label="Add webhook"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="max-[360px]:sr-only">Add</span>
                  <span className="max-[360px]:hidden">Add Webhook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#0a0a0a] p-6 rounded-lg shadow-sm border border-[#1a1a1a]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#999]">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-[#e0e0e0] mt-1">
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-[#0a0a0a] rounded-lg shadow-sm border border-[#1a1a1a] mb-6">
          <div className="p-4 border-b border-[#1a1a1a]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-wrap space-y-3 sm:space-y-0">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#555]" />
                  <input
                    type="text"
                    placeholder="Search webhooks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-[#252525] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-[#555]" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-[#252525] rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="error">Error</option>
                  </select>
                </div>
              </div>
              {selectedWebhooks.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#999]">
                    {selectedWebhooks.length} selected
                  </span>
                  <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                    Enable
                  </button>
                  <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200">
                    Pause
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Webhooks List */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#050505]">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedWebhooks.length === filteredWebhooks.length &&
                        filteredWebhooks.length > 0
                      }
                      onChange={handleSelectAll}
                      className="rounded border-[#252525] text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#555] uppercase tracking-wider">
                    Webhook
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#555] uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#555] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#555] uppercase tracking-wider">
                    Success Rate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#555] uppercase tracking-wider">
                    Last Triggered
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#555] uppercase tracking-wider">
                    Response Time
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[#555] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#0a0a0a] divide-y divide-gray-200">
                {filteredWebhooks.map((webhook) => (
                  <tr key={webhook.id} className="hover:bg-[#050505]">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedWebhooks.includes(webhook.id)}
                        onChange={() => handleSelectWebhook(webhook.id)}
                        className="rounded border-[#252525] text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="flex items-center">
                          <Webhook className="w-4 h-4 text-[#555] mr-2" />
                          <span className="font-medium text-[#e0e0e0]">
                            {webhook.name}
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Globe className="w-3 h-3 text-[#555] mr-1" />
                          <span className="text-xs text-[#555] truncate max-w-xs">
                            {webhook.url}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {webhook.event}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        {getStatusIcon(webhook.status)}
                        <span
                          className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            webhook.status
                          )}`}
                        >
                          {webhook.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-medium text-[#e0e0e0]">
                          {webhook.successRate}%
                        </div>
                        <div className="text-xs text-[#555]">
                          {webhook.totalCalls.toLocaleString()} calls
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-[#e0e0e0]">
                        {webhook.lastTriggered}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-[#e0e0e0]">
                        {webhook.avgResponseTime}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {webhook.status === "active" ? (
                          <button className="p-1 text-yellow-600 hover:text-yellow-700">
                            <Pause className="w-4 h-4" />
                          </button>
                        ) : (
                          <button className="p-1 text-green-600 hover:text-green-700">
                            <Play className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-1 text-blue-600 hover:text-blue-700">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-[#999] hover:text-[#999]">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-[#999] hover:text-[#999]">
                          <Settings className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-[#555] hover:text-[#999]">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredWebhooks.length === 0 && (
            <div className="text-center py-12">
              <Webhook className="w-12 h-12 text-[#555] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#e0e0e0] mb-2">
                No webhooks found
              </h3>
              <p className="text-[#555] mb-4">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first webhook endpoint"}
              </p>
              {!searchTerm && filterStatus === "all" && (
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Webhook
                </button>
              )}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-[#0a0a0a] rounded-lg shadow-sm border border-[#1a1a1a]">
          <div className="p-4 border-b border-[#1a1a1a]">
            <h3 className="text-lg font-medium text-[#e0e0e0]">
              Recent Webhook Activity
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {[
                {
                  time: "2 minutes ago",
                  event: "Message Received webhook triggered",
                  status: "success",
                  webhook: "Message Received",
                },
                {
                  time: "5 minutes ago",
                  event: "Message Status Update webhook triggered",
                  status: "success",
                  webhook: "Message Status Update",
                },
                {
                  time: "12 minutes ago",
                  event: "Lead Generated webhook triggered",
                  status: "success",
                  webhook: "Lead Generated",
                },
                {
                  time: "18 minutes ago",
                  event: "Campaign Completed webhook failed",
                  status: "error",
                  webhook: "Campaign Completed",
                },
                {
                  time: "25 minutes ago",
                  event: "Contact Updated webhook triggered",
                  status: "success",
                  webhook: "Contact Updated",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center">
                    {activity.status === "success" ? (
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-500 mr-3" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-[#e0e0e0]">
                        {activity.event}
                      </p>
                      <p className="text-xs text-[#555]">
                        {activity.webhook}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-[#555]">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webhooks;
