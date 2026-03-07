import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505]">
      <div className="text-center max-w-sm px-6">
        <p className="font-mono text-[11px] text-[#ff3b3b] uppercase tracking-widest mb-4">
          404 — Not Found
        </p>
        <h1 className="font-sans font-black text-3xl text-white tracking-tight mb-3">
          Page Not Found
        </h1>
        <p className="font-mono text-[12px] text-[#555] mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-[#00ff88] text-black font-mono font-bold text-[12px] rounded-md px-5 py-2.5 hover:opacity-85 transition-opacity"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
