import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { AppNavigationGroup } from "@/lib/app-navigation";

type SidebarNavGroupProps = {
  group: AppNavigationGroup;
  isExpanded: boolean;
  isGroupActive: boolean;
  isItemActive: (url: string, exact?: boolean) => boolean;
};

export function SidebarNavGroup({
  group,
  isExpanded,
  isGroupActive,
  isItemActive,
}: SidebarNavGroupProps) {
  const GroupIcon = group.icon;

  return (
    <AccordionItem value={group.id} className="border-none">
      <AccordionTrigger
        className={cn(
          "group h-11 w-full rounded-xl border border-transparent px-2.5 py-0 text-left no-underline transition-all duration-200 hover:no-underline",
          "hover:bg-white/[0.035] hover:text-sidebar-foreground",
          (isExpanded || isGroupActive) && "border-white/8 bg-white/[0.045] text-sidebar-foreground",
        )}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/6 bg-white/[0.04] text-muted-foreground transition-all duration-200",
              "group-hover:border-primary/20 group-hover:text-sidebar-foreground",
              (isExpanded || isGroupActive) && "border-primary/20 bg-primary/12 text-primary",
            )}
          >
            <GroupIcon className="h-4 w-4" />
          </div>

          <div className="min-w-0 flex flex-1 items-center gap-2">
            <p className="truncate text-[13px] font-medium tracking-[-0.01em] text-sidebar-foreground">{group.title}</p>
            {isGroupActive ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> : null}
          </div>
        </div>

        <div
          className={cn(
            "ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-all duration-200",
            "group-hover:text-sidebar-foreground",
            isExpanded && "text-primary",
          )}
        >
          <ChevronRight className={cn("h-4 w-4 transition-transform duration-200", isExpanded && "rotate-90")} />
        </div>
      </AccordionTrigger>

      <AccordionContent className="pb-1 pl-[2.9rem] pr-2 pt-1">
        <div className="space-y-0.5 border-l border-white/8 pl-3">
          {group.children.map((item) => {
            const ItemIcon = item.icon;
            const isActive = isItemActive(item.url, item.exact);

            return (
              <Link
                key={item.url}
                to={item.url}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group/item flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-[13px] transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-sidebar-foreground shadow-[inset_0_0_0_1px_rgba(16,185,129,0.16)]"
                    : "text-muted-foreground hover:bg-white/[0.035] hover:text-sidebar-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground transition-colors duration-200",
                    isActive
                      ? "text-primary"
                      : "group-hover/item:text-sidebar-foreground",
                  )}
                >
                  <ItemIcon className="h-3.5 w-3.5" />
                </span>

                <span className="min-w-0 flex-1 truncate font-medium">{item.title}</span>
                {isActive ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> : null}
              </Link>
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
