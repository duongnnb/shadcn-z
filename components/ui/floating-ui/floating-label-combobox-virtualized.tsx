import { SelectOption } from "@/components/types/select-option";
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
import { cn } from "@/lib/utils";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { FloatingLabel } from "./floating-label-input";
import { getLabelField, getValueField } from "../combobox";

const HEIGHT = 300;

export interface FloatingLabelComboboxVirtualizedProps<
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

function VirtualizedCommand<
  TData,
  TValue extends keyof TData,
  TLabel extends {
    [K in keyof TData]: TData[K] extends string ? K : never;
  }[keyof TData]
>({
  options = [],
  valueField = "value" as TValue,
  labelField = "label" as TLabel,
  defaultValue = null,
  onValueChange,
}: FloatingLabelComboboxVirtualizedProps<TData, TValue, TLabel>) {
  const [filteredOptions, setFilteredOptions] =
    React.useState<TData[]>(options);
  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    // overscan: 5,
    // measureElement: (index, element) => {
    //    console.log('element', element)
    //    return 1
    // }
  });

  const items = virtualizer.getVirtualItems();

  const handleSearch = (search: string) => {
    setFilteredOptions(
      options.filter((option) =>
        getLabelField(option, labelField)
          .toLowerCase()
          .includes(search.toLowerCase() ?? [])
      )
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
    }
  };

  return (
    <Command shouldFilter={false} onKeyDown={handleKeyDown}>
      <CommandInput onValueChange={handleSearch} placeholder="Search ..." />
      <CommandEmpty>Empty Data</CommandEmpty>
      <CommandList className="max-h-[300px]">
        <CommandGroup
          ref={parentRef}
          style={{
            height: `${HEIGHT}px`,
            width: "100%",
            overflowY: "auto",
            contain: "strict",
          }}
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${items[0]?.start ?? 0}px)`,
              }}
            >
              {items.map((virtualRow) => (
                <CommandItem
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={virtualizer.measureElement}
                  value={`${getValueField(
                    filteredOptions[virtualRow.index],
                    valueField
                  )}`}
                  onSelect={(currentValue) => {
                    if (currentValue === defaultValue) {
                      onValueChange?.(undefined);
                    } else {
                      onValueChange?.(filteredOptions[virtualRow.index]);
                    }
                  }}
                  className={cn(
                    "bg-white",
                    defaultValue ===
                      filteredOptions[virtualRow.index][valueField] &&
                      "bg-accent"
                  )}
                >
                  <p>
                    {getLabelField(
                      filteredOptions[virtualRow.index],
                      labelField
                    )}
                  </p>
                </CommandItem>
              ))}
            </div>
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export function FloatingLabelComboboxVirtualized<
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
}: FloatingLabelComboboxVirtualizedProps<TData, TValue, TLabel>) {
  const [open, setOpen] = React.useState<boolean>(false);

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
      <PopoverContent className="p-0">
        <VirtualizedCommand
          options={options}
          valueField={valueField}
          labelField={labelField}
          defaultValue={defaultValue}
          onValueChange={(currentValue) => {
            onValueChange?.(currentValue);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
