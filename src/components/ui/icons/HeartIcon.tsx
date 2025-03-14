interface HeartIconProps {
  className?: string;
  variant?: 'filled' | 'outlined';
}

export function HeartIcon({ className = '', variant = 'filled' }: HeartIconProps) {
  return variant === 'filled' ? (
    <svg
      aria-label="heart-filled"
      className={`text-red-500 ${className}`}
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3.80348L6 0.161865L0 3.80348V11.607L12 21.8382L24 11.607V3.80348L18 0.161865L12 3.80348Z"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  ) : (
    <svg
      aria-label="heart-clear"
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 1.6123L4.51885 0.757439L4 0.442531L3.48115 0.757439L4 1.6123ZM7 3.43311L6.48115 4.28798L7 4.60289L7.51885 4.28798L7 3.43311ZM1 3.43311L0.481151 2.57825L0 2.87028V3.43311H1ZM1 7.33485H0V7.79637L0.351203 8.09581L1 7.33485ZM7 12.4505L6.3512 13.2114L7 13.7646L7.6488 13.2114L7 12.4505ZM13 7.33485L13.6488 8.09581L14 7.79637V7.33485H13ZM13 3.43311H14V2.87028L13.5188 2.57825L13 3.43311ZM10 1.6123L10.5189 0.757439L10 0.442531L9.48115 0.757439L10 1.6123ZM3.48115 2.46717L6.48115 4.28798L7.51885 2.57825L4.51885 0.757439L3.48115 2.46717ZM1.51885 4.28798L4.51885 2.46717L3.48115 0.757439L0.481151 2.57825L1.51885 4.28798ZM2 7.33485V3.43311H0V7.33485H2ZM7.6488 11.6895L1.6488 6.57389L0.351203 8.09581L6.3512 13.2114L7.6488 11.6895ZM7.6488 13.2114L13.6488 8.09581L12.3512 6.57389L6.3512 11.6895L7.6488 13.2114ZM14 7.33485V3.43311H12V7.33485H14ZM13.5188 2.57825L10.5189 0.757439L9.48115 2.46717L12.4812 4.28798L13.5188 2.57825ZM9.48115 0.757439L6.48115 2.57825L7.51885 4.28798L10.5189 2.46717L9.48115 0.757439Z"
        fill="white"
      />
    </svg>
  );
}
