"use client";

import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

export const SidebarItem = ({ icon: Icon, label, href }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === href;

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center relative gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-emerald-600 bg-emerald-200/20 hover:bg-emerald-200/20 hover:text-emerald-600"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-emerald-600")}
        />
        {label}
      </div>

    {isActive && (
    <div className="absolute right-0 top-0 h-full w-1 bg-emerald-600" />
  )}

    </button>
  );
};
