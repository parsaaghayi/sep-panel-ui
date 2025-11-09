export interface DatePickerProps {
  // Basic Props
  id: string;
  label?: string;
  className?: string;
  placeholder?: string;
  value?: Date | string | null;
  onChange: (date: Date | null) => void;
  
  // Icon Props
  firstIconSrc?: string;
  lastIconSrc?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  iconPosition?: "start" | "end";
  iconClick?: () => void;
  
  // Message Props
  guidMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  
  // State Props
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  
  // Locale Props
  locale?: "fa" | "en";
  direction?: "rtl" | "ltr";
  
  // Date Props
  minDate?: Date;
  maxDate?: Date;
  format?: string;
  
  // Styling Props
  size?: "sm" | "md" | "lg";
  variant?: "outlined" | "filled" | "standard";
  color?: "primary" | "secondary" | "error" | "warning" | "success";
  fullWidth?: boolean;
  
  // Accessibility Props
  "aria-label"?: string;
  "aria-describedby"?: string;
  role?: string;
}

export interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onClose: () => void;
  locale: "fa" | "en";
  direction: "rtl" | "ltr";
  minDate?: Date;
  maxDate?: Date;
}

export interface JalaliDate {
  year: number;
  month: number;
  day: number;
}

export interface LocaleConfig {
  months: string[];
  weekDays: string[];
  weekDaysShort: string[];
  direction: "rtl" | "ltr";
  firstDayOfWeek: number;
}
