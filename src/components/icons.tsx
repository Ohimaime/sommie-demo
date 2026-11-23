import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const PlayIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7.5 5.2v13.6a.6.6 0 0 0 .9.5l10.8-6.8a.6.6 0 0 0 0-1L8.4 4.7a.6.6 0 0 0-.9.5Z" />
  </Base>
);

export const PauseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 5v14M16 5v14" />
  </Base>
);

export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Base>
);

export const CalendarIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.75" y="5.25" width="16.5" height="15" rx="2" />
    <path d="M3.75 9.75h16.5M8.25 3v4.5M15.75 3v4.5" />
  </Base>
);

export const ClockIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.25" />
    <path d="M12 7.5V12l3 2" />
  </Base>
);

export const CameraIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="6.75" width="12.75" height="10.5" rx="2" />
    <path d="M15.75 10.5 21 7.5v9l-5.25-3" />
  </Base>
);

export const SeatIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.75 12V6.75a2.25 2.25 0 0 1 2.25-2.25h6a2.25 2.25 0 0 1 2.25 2.25V12" />
    <path d="M4.5 12h15v3.75h-15zM6.75 15.75V20M17.25 15.75V20" />
  </Base>
);

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Base>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 12h15M13.5 6l6 6-6 6" />
  </Base>
);

export const StarIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.75l2.47 5.01 5.53.8-4 3.9.94 5.5L12 16.36l-4.94 2.6.94-5.5-4-3.9 5.53-.8L12 3.75Z" />
  </Base>
);

export const QuoteIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 7.5C6.5 8.5 4.5 11 4.5 14.25A2.25 2.25 0 0 0 6.75 16.5 2.25 2.25 0 0 0 9 14.25 2.25 2.25 0 0 0 6.75 12" />
    <path d="M19.5 7.5c-3.5 1-5.5 3.5-5.5 6.75a2.25 2.25 0 0 0 2.25 2.25 2.25 2.25 0 0 0 2.25-2.25A2.25 2.25 0 0 0 16.25 12" />
  </Base>
);

export const PersonIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="8.25" r="3.75" />
    <path d="M4.5 20.25a7.5 7.5 0 0 1 15 0" />
  </Base>
);

export const FilmIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.75" y="4.5" width="16.5" height="15" rx="2.25" />
    <path d="M10.5 9.5v5l4-2.5-4-2.5Z" />
  </Base>
);

export const LockIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="5.25" y="10.5" width="13.5" height="9.75" rx="2" />
    <path d="M8.25 10.5V7.5a3.75 3.75 0 0 1 7.5 0v3" />
  </Base>
);

export const InstagramIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="4.5" />
    <circle cx="12" cy="12" r="3.75" />
    <path d="M16.9 7.1h.01" />
  </Base>
);

export const YouTubeIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.75" y="5.5" width="18.5" height="13" rx="3.5" />
    <path d="M10.25 9.25v5.5L15 12l-4.75-2.75Z" />
  </Base>
);

export const TikTokIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M13.5 3.75v11.5a3.25 3.25 0 1 1-3.25-3.25" />
    <path d="M13.5 3.75c.4 2.6 2.2 4.4 4.75 4.75" />
  </Base>
);

export const XIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 4.5l15 15M19.5 4.5l-6.3 6.3M10.8 13.2 4.5 19.5" />
  </Base>
);

export const WhatsAppIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 19.5l1.1-3.7A8.25 8.25 0 1 1 8.4 18.6L4.5 19.5Z" />
    <path d="M9.2 8.6c.2-.4.5-.4.8-.4l.5 1.2-.6.8c.5 1 1.3 1.8 2.3 2.3l.8-.6 1.2.5c0 .3 0 .6-.4.8-.9.6-2.6.2-4-1.2s-1.8-3.1-1.2-4Z" />
  </Base>
);
