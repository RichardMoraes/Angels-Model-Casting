import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground border-gray-200 [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        // Figma Design System Variants
        premium:
          "border-transparent bg-gradient-to-r from-[#7B3FF2] to-[#4B1B6F] text-white shadow-md hover:shadow-lg",
        success:
          "border-transparent bg-gradient-to-r from-green-500 to-green-600 text-white",
        warning:
          "border-transparent bg-gradient-to-r from-amber-500 to-orange-500 text-white",
        info:
          "border-transparent bg-gradient-to-r from-blue-500 to-blue-600 text-white",
        count:
          "border-transparent bg-red-500 text-white min-w-[20px] h-5 px-1.5 text-[10px] font-semibold",
        subtle:
          "border-figma-primary/20 bg-figma-primary/10 text-[#4B1B6F]",
        glass:
          "border-white/30 bg-white/20 backdrop-blur-md text-white",
        department:
          "border-transparent px-3 py-1.5 text-white shadow-sm hover:shadow-md hover:scale-105",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Department color mapping for dynamic styling
const departmentColors: Record<string, string> = {
  F: "bg-[#5B6BFF]", // Fotografia - Blue
  E: "bg-[#4CAF50]", // Eventos - Green
  O: "bg-[#FF9500]", // Online - Orange
  R: "bg-[#FF5722]", // Rádio/TV - Red
}

interface BadgeProps extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  asChild?: boolean
  department?: "F" | "E" | "O" | "R"
}

function Badge({
  className,
  variant,
  asChild = false,
  department,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span"

  // Apply department color if variant is department
  const departmentClass = variant === "department" && department 
    ? departmentColors[department] 
    : ""

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), departmentClass, className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
