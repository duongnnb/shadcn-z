"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectOption } from "@/components/types/select-option";
import { getLabelField, getValueField } from "../combobox/combobox.utils";
import { FloatingLabel, FloatingLabelInput } from "./floating-label-input";
import { FixMeLater } from "@/components/types/fix-me-later";

interface ComboboxProps<
  TData = SelectOption,
  TValue extends keyof TData = keyof TData,
  TLabel extends keyof TData = {
    [K in keyof TData]: TData[K] extends string ? K : never;
  }[keyof TData]
> extends Omit<ButtonProps, "defaultValue"> {
  label?: string;
  options?: TData[];
  valueField?: TValue;
  labelField?: TLabel;
  defaultValue?: TData[TValue] | null;
  onValueChange?: (value?: TData) => void;
}

export function FloatingCombobox<
  TData,
  TValue extends keyof TData,
  TLabel extends {
    [K in keyof TData]: TData[K] extends string ? K : never;
  }[keyof TData]
>({
  label = "Select ...",
  options = [],
  valueField = "value" as TValue,
  labelField = "label" as TLabel,
  defaultValue = null,
  onValueChange,
  id,
}: ComboboxProps<TData, TValue, TLabel>) {
  const [open, setOpen] = React.useState(false);

  const displayValue = React.useMemo(() => {
    if (defaultValue) {
      const selectedOption = options.find(
        (item) => item[valueField] === defaultValue
      );

      if (selectedOption) return getLabelField(selectedOption, labelField);
    }

    return "";
  }, [defaultValue, options, valueField, labelField]);

  const floatingInputValue = React.useMemo(() => {
    if (defaultValue || open) {
      return "opening";
    }

    return "";
  }, [defaultValue, open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between overflow-hidden relative"
        >
          <p className="truncate pt-3">{displayValue}</p>
          <input
            placeholder=" "
            value={floatingInputValue}
            className="peer hidden"
            readOnly
          />
          <FloatingLabel className="text-left cursor-pointer">
            {label}
          </FloatingLabel>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 popover-content-width-full">
        <Command
          filter={(value, search, keywords = []) => {
            const extendValue = value + " " + keywords.join(" ");
            if (extendValue.toLowerCase().includes(search.toLowerCase())) {
              return 1;
            }
            return 0;
          }}
        >
          <CommandInput placeholder="Search ..." />
          <CommandList>
            <CommandEmpty>Empty Data</CommandEmpty>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={getValueField(item, valueField)}
                  value={getValueField(item, valueField)}
                  keywords={[getLabelField(item, labelField)]}
                  onSelect={(currentValue) => {
                    if (currentValue === defaultValue) {
                      onValueChange?.(undefined);
                    } else {
                      onValueChange?.(item);
                    }
                    setOpen(false);
                  }}
                  className={cn(
                    "bg-white",
                    defaultValue === item[valueField] && "bg-accent"
                  )}
                >
                  <p>{getLabelField(item, labelField)}</p>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
