import type { ReactNode } from 'react'

type IconProps = { className?: string }

/** Every icon is a 24px outline drawn in currentColor, so size and colour come from the caller. */
function Svg({ className = 'h-5 w-5', children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  )
}

export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.2 3.5h3l1.4 4-2 1.4a12.5 12.5 0 0 0 6.5 6.5l1.4-2 4 1.4v3a1.6 1.6 0 0 1-1.8 1.6C10.6 18.8 5.2 13.4 4.6 5.3A1.6 1.6 0 0 1 6.2 3.5Z" />
  </Svg>
)

export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </Svg>
)

export const PinIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M19 10c0 5-7 11-7 11s-7-6-7-11a7 7 0 1 1 14 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
)

export const ClockIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
)

export const ArrowIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
)

export const CheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
)

export const PlusIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
)

export const PaperclipIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m20 11.5-7.8 7.8a5 5 0 0 1-7.1-7.1l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8" />
  </Svg>
)

export const ExpandIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" />
  </Svg>
)

export const NavigationIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M21 3 3 10.5l7.5 3 3 7.5L21 3Z" />
  </Svg>
)

/* Services */

export const SawIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 15 15 3l3 3L6 18" />
    <path d="m6 12 2 2M9 9l2 2M12 6l2 2" />
    <path d="M4 20h16" />
  </Svg>
)

export const DryingIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 4h16" />
    <path d="M7 8c-1.2 1.5 1.2 3-0 4.5s1.2 3 0 4.5M12 8c-1.2 1.5 1.2 3 0 4.5s1.2 3 0 4.5M17 8c-1.2 1.5 1.2 3 0 4.5s1.2 3 0 4.5" />
    <path d="M4 21h16" />
  </Svg>
)

export const TruckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.5 6h11v10h-11zM13.5 9.5h4l3 3.5v3h-7z" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </Svg>
)

export const ForkliftIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 16V8h6l3 5v3" />
    <path d="M16 3v14h5" />
    <path d="M16 12h-4" />
    <circle cx="6" cy="18.5" r="1.8" />
    <circle cx="11.5" cy="18.5" r="1.8" />
  </Svg>
)

/* Product categories */

export const PlanksIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="4.5" width="18" height="4" rx="1" />
    <rect x="3" y="10" width="18" height="4" rx="1" />
    <rect x="3" y="15.5" width="18" height="4" rx="1" />
  </Svg>
)

export const FloorIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 6h13l2 2.5-2 2.5H3z" />
    <path d="M3 13h13l2 2.5-2 2.5H3z" />
  </Svg>
)

export const PanelIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="3" width="4" height="18" rx="1" />
    <rect x="10" y="3" width="4" height="18" rx="1" />
    <rect x="16" y="3" width="4" height="18" rx="1" />
  </Svg>
)

export const GlulamIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="M3 9.5h18M3 14h18" />
  </Svg>
)

export const BeamIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 9 9 5h12l-6 4H3z" />
    <path d="M3 9v10h12V9M15 19l6-4V5" />
  </Svg>
)

export const LathsIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m3 7 18 6M3 17l18-6" />
    <path d="m3 9.5 18 6M3 14.5l18-6" />
  </Svg>
)
