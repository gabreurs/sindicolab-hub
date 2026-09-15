import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center p-0 leading-none [&_svg]:block [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90",
        surface: "bg-surface-elevated text-ink hover:bg-background",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-8 w-8 rounded-sm [&_svg]:size-4",
        md: "h-10 w-10 rounded-md [&_svg]:size-4",
        lg: "h-12 w-12 rounded-md [&_svg]:size-5",
      },
    },
    defaultVariants: { variant: "ghost", size: "md" },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  label: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, label, title, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={title ?? label}
      data-icon-button
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
IconButton.displayName = "IconButton";

export { iconButtonVariants };