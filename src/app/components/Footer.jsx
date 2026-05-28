import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black px-6 py-8 text-gray-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
        <p>© 2026 Deepanshu Rana. Portfolio admin dashboard.</p>

        <div className="flex flex-wrap gap-5">
          <Link href="/" className="transition hover:text-cyan-400">
            Portfolio
          </Link>
          <Link href="/dashboard" className="transition hover:text-cyan-400">
            Dashboard
          </Link>
          <Link href="/add-project" className="transition hover:text-cyan-400">
            Add Project
          </Link>
        </div>
      </div>
    </footer>
  );
}
