"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const base =
    "px-5 py-2.5 rounded-xl font-medium transition-all focus:outline-none shadow-sm";

  const variants = {
    primary:
      "bg-purple-500 hover:bg-purple-600 text-white active:scale-95 disabled:bg-purple-300",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-800 active:scale-95",
    danger:
      "bg-red-500 hover:bg-red-600 text-white active:scale-95",
  };

  return (
    <button
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
