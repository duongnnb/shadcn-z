import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cva, VariantProps } from "class-variance-authority";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const floatingLabelVariants = cva(
  [
    "absolute top-2 transform transition-all start-4 z-10 origin-[0] duration-300 truncate select-none",
    "text-gray-500 peer-focus:secondary peer-focus:dark:secondary",
    "rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4",
  ],
  {
    variants: {
      size: {
        default: [
          "text-xs leading-5 right-4",
          "peer-focus:text-xs peer-placeholder-shown:text-sm",
          "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2",
          "-translate-y-2 peer-focus:top-2 peer-focus:-translate-y-2",
        ],
        sm: "",
        lg: "",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        placeholder=" "
        className={cn("peer pt-5 px-4", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
FloatingInput.displayName = "FloatingInput";

const FloatingLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> &
    VariantProps<typeof floatingLabelVariants>
>(({ className, size, ...props }, ref) => {
  return (
    <Label
      className={cn(floatingLabelVariants({ size }), className)}
      ref={ref}
      {...props}
    />
  );
});
FloatingLabel.displayName = "FloatingLabel";

type FloatingLabelInputProps = InputProps & { label?: string };

const FloatingLabelInput = React.forwardRef<
  React.ElementRef<typeof FloatingInput>,
  React.PropsWithoutRef<FloatingLabelInputProps>
>(({ id, label, ...props }, ref) => {

  const localRef = React.useRef<HTMLInputElement>(null);
  const inputRef = (ref as React.RefObject<HTMLInputElement>) || localRef;

  const handleLabelClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative overflow-hidden">
      <FloatingInput ref={inputRef} id={id} {...props} />
      <FloatingLabel htmlFor={id} onClick={handleLabelClick}>
        {label}
      </FloatingLabel>
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingInput, FloatingLabel, FloatingLabelInput };
