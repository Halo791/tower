import type { SVGProps } from "react";

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L12 22" />
      <path d="M18 5L12 8L6 5" />
      <path d="M18 12L12 15L6 12" />
      <path d="M18 19L12 22L6 19" />
      <path d="M12 2v2.5" />
    </svg>
  );
}
