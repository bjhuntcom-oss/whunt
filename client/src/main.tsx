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

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
}



createRoot(document.getElementById("root")!).render(<App />);
