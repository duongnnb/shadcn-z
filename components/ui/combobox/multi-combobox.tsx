"use client";

import * as React from "react";
import { Check, ChevronsUpDown, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { getLabelField, getValueField } from "./combobox.utils";
import { Checkbox } from "../checkbox";
import { Badge } from "../badge";
import { FixMeLater } from "@/components/types/fix-me-later";
import { get } from "http";

interface ComboboxProps<
  TData = SelectOption,
  TValue extends keyof TData = keyof TData,
  TLabel extends keyof TData = {
    [K in keyof TData]: TData[K] extends string ? K : never;
  }[keyof TData]
> {
  label?: string;
  options?: TData[];
  valueField?: TValue;
  labelField?: TLabel;
  defaultValue?: TData[TValue][];
  onValueChange?: (value?: TData[]) => void;
}

export function MultiCombobox<
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
  defaultValue = [],
  onValueChange,
}: ComboboxProps<TData, TValue, TLabel>) {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<TData[]>(() => {
    return options.filter((item) => defaultValue.includes(item[valueField]));
  }); //FIXME - Fix this

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setOpen(true);
    } else if (event.key === "Backspace" && !event.currentTarget.value) {
      const newSelectedValues = [...selectedValues];
      newSelectedValues.pop();
      setSelectedValues(newSelectedValues);
      onValueChange?.(newSelectedValues);
    }
  };

  const handleClear = () => {
    setSelectedValues([]);
    onValueChange?.([]);
  };

  const toggleOption = React.useCallback(
    (option?: TData) => {
      if (!option) return;

      const optionHasExist = selectedValues.findIndex(
        (item) => item[valueField] === option[valueField]
      );

      if (optionHasExist !== -1) {
        const newSelectedValues = selectedValues.filter(
          (item) => item[valueField] !== option[valueField]
        );
        setSelectedValues(newSelectedValues);
        onValueChange?.(newSelectedValues);
        return;
      } else {
        setSelectedValues([...selectedValues, option]);
        onValueChange?.([...selectedValues, option]);
      }
    },
    [selectedValues, onValueChange, valueField]
  );

  const toggleAll = () => {
    if (selectedValues.length === options.length) {
      handleClear();
    } else {
      setSelectedValues(options);
      onValueChange?.(options);
    }
  };

  const displayValue = React.useMemo(() => {
    if (defaultValue.length === 0) {
      return <p className="truncate">{label}</p>;
    }

    return (
      <div className="flex flex-wrap gap-0.5">
        {defaultValue?.slice(0, 5).map((value) => {
          const option = options.find((item) => item[valueField] === value);
          return (
            <Badge
              key={value as FixMeLater}
              // className={cn(
              //   multiSelectVariants({ variant })
              // )}
            >
              <p>{option?.[labelField] as FixMeLater}</p>
              <XCircle
                className="ml-2 h-4 w-4 cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleOption(option as FixMeLater);
                }}
              />
            </Badge>
          );
        })}
      </div>
    );
  }, [defaultValue, options, label, valueField, labelField, toggleOption]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-auto"
        >
          {displayValue}
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
          <CommandInput
            placeholder="Search ..."
            onKeyDown={handleInputKeyDown}
          />
          <CommandList>
            <CommandEmpty>Empty Data</CommandEmpty>
            <CommandGroup>
              <CommandItem key="all" onSelect={toggleAll} className="gap-x-2">
                <Checkbox checked={selectedValues.length === options.length} />
                <span>(Select All)</span>
              </CommandItem>
              {options.map((item) => {
                const isSelected = defaultValue?.includes(item[valueField]);

                return (
                  <CommandItem
                    key={getValueField(item, valueField)}
                    value={getValueField(item, valueField)}
                    keywords={[getLabelField(item, labelField)]}
                    onSelect={() => {
                      toggleOption(item);
                    }}
                    className={cn(
                      "bg-white gap-x-2",
                      isSelected && "bg-accent"
                    )}
                  >
                    <Checkbox checked={isSelected} />
                    <p>{getLabelField(item, labelField)}</p>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
