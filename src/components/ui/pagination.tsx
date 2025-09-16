import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Pagination({ className, children, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full items-center justify-center", className)}
      {...props}
    >
      {children}
    </nav>
  )
}

export function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul className={cn("flex flex-row items-center gap-2", className)} {...props} />
  )
}

export function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("", className)} {...props} />
}

export type PaginationLinkProps = React.ComponentProps<typeof Button> & {
  isActive?: boolean
}

export function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      className={cn("h-9 w-9 p-0", className)}
      {...props}
    />
  )
}

export function PaginationPrevious({ className, children = "Previous", ...props }: React.ComponentProps<typeof Button> & { children?: React.ReactNode }) {
  return (
    <Button variant="outline" className={cn("h-9 px-3", className)} {...props}>
      <ChevronLeft className="h-4 w-4 mr-2" />
      {children}
    </Button>
  )
}

export function PaginationNext({ className, children = "Next", ...props }: React.ComponentProps<typeof Button> & { children?: React.ReactNode }) {
  return (
    <Button variant="outline" className={cn("h-9 px-3", className)} {...props}>
      {children}
      <ChevronRight className="h-4 w-4 ml-2" />
    </Button>
  )
}

export function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}
