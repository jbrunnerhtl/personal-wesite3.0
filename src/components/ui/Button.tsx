import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  className?: string;
}

export default function Button({ children, href, onClick, variant = "primary", icon, className = "" }: ButtonProps) {
  const classes = [
    "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium",
    "transition-[transform,background-color,border-color,color] duration-500 ease-out-expo active:scale-[0.97]",
    variant === "primary"
      ? "bg-fg text-bg hover:bg-fg/85"
      : "border border-line text-fg hover:border-tint/25 hover:bg-tint/[0.04]",
    className,
  ].join(" ");

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5">{icon}</span>
      )}
    </>
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <a href={href} className={classes} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
