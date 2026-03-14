import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { AppNavigationGroup } from "@/lib/app-navigation";

type SidebarAccordionGroupProps = {
  group: AppNavigationGroup;
  isExpanded: boolean;
  isGroupActive: boolean;
  isItemActive: (url: string, exact?: boolean) => boolean;
};

export function SidebarAccordionGroup({
  group,
  isExpanded,
  isGroupActive,
  isItemActive,
}: SidebarAccordionGroupProps) {
  const GroupIcon = group.icon;

  return (
    <AccordionItem
      value={group.id}
      className={cn(
        "overflow-hidden rounded-[1.35rem] border border-sidebar-border/65 bg-white/[0.02] px-0 shadow-[0_18px_46px_-28px_rgba(0,0,0,0.7)] transition-colors duration-300",
        "dark:bg-white/[0.025]",
        (isExpanded || isGroupActive) && "border-primary/30 bg-primary/[0.08]",
      )}
    >
      <AccordionTrigger
        className={cn(
          "group w-full px-3 py-3 text-left no-underline transition-colors hover:no-underline",
          "data-[state=open]:pb-2.5",
        )}
      >
        <div className="flex min-w-0 items-start gap-3">
          <div
            className={cn(
              "mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-sidebar-accent/45 text-sidebar-foreground transition-all duration-300",
              "group-hover:border-primary/25 group-hover:bg-primary/14 group-hover:text-primary",
              (isExpanded || isGroupActive) && "border-primary/25 bg-primary text-primary-foreground shadow-ventra",
            )}
          >
            <GroupIcon className="h-4.5 w-4.5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold tracking-[-0.01em] text-sidebar-foreground">{group.title}</p>
              {isGroupActive ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
            </div>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{group.description}</p>
          </div>
        </div>

        <div
          className={cn(
            "ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-black/10 text-muted-foreground transition-all duration-300",
            "group-hover:border-primary/15 group-hover:text-primary",
            isExpanded && "border-primary/20 bg-primary/10 text-primary",
          )}
        >
          <ChevronRight className={cn("h-4 w-4 transition-transform duration-300", isExpanded && "rotate-90")} />
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-3 pb-3 pt-0">
        <div className="relative ml-[3.45rem] space-y-1 border-l border-white/6 pl-4 before:absolute before:bottom-0 before:left-0 before:top-1 before:w-px before:bg-gradient-to-b before:from-primary/55 before:via-primary/10 before:to-transparent">
          {group.children.map((item) => {
            const ItemIcon = item.icon;
            const isActive = isItemActive(item.url, item.exact);

            return (
              <Link
                key={item.url}
                to={item.url}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group/item flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent/85 text-sidebar-foreground shadow-[inset_0_0_0_1px_rgba(16,185,129,0.18)]"
                    : "text-muted-foreground hover:bg-white/[0.04] hover:text-sidebar-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors duration-200",
                    isActive
                      ? "border-primary/15 bg-primary/10 text-primary"
                      : "group-hover/item:border-white/10 group-hover/item:bg-black/10 group-hover/item:text-sidebar-foreground",
                  )}
                >
                  <ItemIcon className="h-4 w-4" />
                </span>

                <span className="min-w-0 flex-1 truncate font-medium">{item.title}</span>

                <ChevronRight
                  className={cn(
                    "h-3.5 w-3.5 shrink-0 transition-all duration-200",
                    isActive ? "translate-x-0 text-primary" : "text-muted-foreground/40 group-hover/item:translate-x-0.5",
                  )}
                />
              </Link>
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
