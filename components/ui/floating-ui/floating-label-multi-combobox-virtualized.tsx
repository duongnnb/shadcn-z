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
import { ChevronsUpDown, XCircle } from "lucide-react";
import * as React from "react";
import { FloatingLabel } from "./floating-label-input";
import { getLabelField, getValueField } from "../combobox";
import { FixMeLater } from "@/components/types/fix-me-later";
import { Checkbox } from "../checkbox";

const HEIGHT = 300;

export interface FloatingLabelMultiComboboxVirtualizedProps<
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
  defaultValue?: TData[TValue][];
  onValueChange?: (value?: TData[]) => void;
}

interface VirtualizedCommandProps<
  TData = SelectOption,
  TValue extends keyof TData = keyof TData,
  TLabel extends keyof TData = {
    [K in keyof TData]: TData[K] extends string ? K : never;
  }[keyof TData]
> extends FloatingLabelMultiComboboxVirtualizedProps<TData, TValue, TLabel> {
  toggleOption: (value?: TData) => void;
  toggleAll: () => void;
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
  defaultValue = [],
  toggleOption,
  toggleAll,
}: VirtualizedCommandProps<TData, TValue, TLabel>) {
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
              <CommandItem key="all" onSelect={toggleAll} className="gap-x-2">
                <Checkbox checked={defaultValue.length === filteredOptions.length} />
                <span>(Select All)</span>
              </CommandItem>
              {items.map((virtualRow) => {
                const isSelected = defaultValue?.includes(
                  filteredOptions[virtualRow.index][valueField]
                );
                return (
                  <CommandItem
                    key={virtualRow.key}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                    value={`${getValueField(
                      filteredOptions[virtualRow.index],
                      valueField
                    )}`}
                    onSelect={() => {
                      toggleOption?.(filteredOptions[virtualRow.index]);
                    }}
                    className={cn(
                      "bg-white gap-x-2",
                      isSelected && "bg-accent"
                    )}
                  >
                    <Checkbox checked={isSelected} />
                    <p>
                      {getLabelField(
                        filteredOptions[virtualRow.index],
                        labelField
                      )}
                    </p>
                  </CommandItem>
                );
              })}
            </div>
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export function FloatingLabelMultiComboboxVirtualized<
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
}: FloatingLabelMultiComboboxVirtualizedProps<TData, TValue, TLabel>) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedValues, setSelectedValues] = React.useState<TData[]>(() => {
    return options.filter((item) => defaultValue.includes(item[valueField]));
  }); //FIXME - Fix this

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
    return (
      <div className="inline-flex w-full items-center h-full box-border truncate mr-1 pt-4">
        <div className="flex flex-wrap w-full gap-1 py-0.5 text-md">
          {defaultValue?.map((value) => {
            const option = options.find((item) => item[valueField] === value);
            return (
              <div
                key={value as FixMeLater}
                className={cn(
                  "flex gap-1 text-white rounded-sm cursor-default bg-primary"
                )}
              >
                <div className="px-1 text-left text-wrap">
                  {option?.[labelField] as FixMeLater}
                </div>
                <div className="flex items-center px-1.5 bg-transparent rounded-full hover:opacity-50 cursor-pointer">
                  <XCircle
                    className="ml-2 size-3 cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleOption(option as FixMeLater);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [defaultValue, options, valueField, labelField, toggleOption]);

  const floatingInputValue = React.useMemo(() => {
    if (defaultValue?.length > 0 || open) {
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
          className="w-full justify-between min-h-10 h-auto relative py-0"
        >
          {displayValue}

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
          toggleOption={toggleOption}
          toggleAll={toggleAll}
        />
      </PopoverContent>
    </Popover>
  );
}
