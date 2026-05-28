"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Briefcase,
  ChevronDown,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  MailPlus,
  Menu,
  PlusCircle,
  UserRound,
  X,
} from "lucide-react";

import { clearAuthToken } from "@/services/api";
import { getProfile } from "@/services/profileservice";

const adminItems = [
  { name: "New Project", href: "/add-project", icon: FolderKanban },
  { name: "New Contact", href: "/dashboard/contact/new", icon: MailPlus },
  { name: "Skills", href: "/dashboard/profile", icon: PlusCircle },
  { name: "Experience", href: "/dashboard/profile", icon: Briefcase },
];

const profileItems = [
  { name: "About", href: "/dashboard/profile", icon: UserRound },
  { name: "Resume", href: "/dashboard/profile", icon: FileText },
];

const mobileItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  ...adminItems,
  ...profileItems,
];

export default function AdminNavbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
    const [profile, setProfile] = useState(null);
      const [loadingProfile, setLoadingProfile] = useState(true);



  const handleLogout = () => {
    clearAuthToken();
    setProfileOpen(false);
    setOpen(false);
    router.push("/login");
  };
  useEffect(() => {
      const loadProfile = async () => {
        try {
          const response = await getProfile();
          setProfile(response.data || null);
        } catch (error) {
          console.log(error);
        } finally {
          setLoadingProfile(false);
        }
      };
  
      loadProfile();
    }, []);
  

const profileAvatar =
  profile?.profileImage && !imageError ? (
    <img
      src={profile.profileImage}
      alt="Admin profile"
      onError={() => setImageError(true)}
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-cyan-500 text-sm font-bold text-black">
      {profile?.fullName?.charAt(0) || "A"}
    </div>
  );
  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-2xl font-bold text-white">
            <LayoutDashboard size={24} className="text-cyan-400" />
            {profile?.fullName ? profile.fullName.split(" ")[0] : "Admin"}
          </Link>

          <div className="hidden items-center gap-5 lg:flex">
            {adminItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 border border-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  <Icon size={16} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((current) => !current)}
                className="flex items-center gap-2 text-gray-300 transition hover:text-cyan-400"
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
              >
                <span className="h-11 w-11 overflow-hidden rounded-full border-2 border-cyan-400 bg-black">
                  {profileAvatar}
                </span>
                <ChevronDown size={16} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 border border-gray-800 bg-[#111] p-2 shadow-xl">
                  {profileItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 transition hover:bg-black hover:text-cyan-400"
                      >
                        <Icon size={16} />
                        {item.name}
                      </Link>
                    );
                  })}
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 transition hover:bg-black hover:text-cyan-400"
                  >
                    <UserRound size={16} />
                    Profile Settings
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-gray-300 transition hover:bg-black hover:text-orange-400"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            className="text-white lg:hidden"
            onClick={() => setOpen((current) => !current)}
            aria-label="Toggle admin menu"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-800 bg-black lg:hidden">
          <div className="flex flex-col gap-4 px-6 py-5">
            <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
              <span className="h-12 w-12 overflow-hidden rounded-full border-2 border-cyan-400 bg-black">
                {profileAvatar}
              </span>
              <div>
                <h2 className="font-semibold text-white">Deepanshu Rana</h2>
                <p className="text-sm text-gray-400">Admin Dashboard</p>
              </div>
            </div>

            {mobileItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-gray-300 transition hover:text-cyan-400"
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 text-left text-gray-300 transition hover:text-orange-400"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
