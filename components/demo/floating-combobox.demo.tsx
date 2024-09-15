"use client";

import { useState } from "react";
import { FloatingCombobox } from "../ui/floating-ui/floating-combobox";
import { FloatingMultiCombobox } from "../ui/floating-ui/floating-label-multi-combobox ";

const colors = [
  { value: "1red", label: "Red" },
  { value: "2green", label: "Green" },
  { value: "3blue", label: "Blue" },
  {
    value: "4yellow",
    label:
      "Yellow long text long text long text long text long text long text long text ",
  },
  { value: "5orange", label: "Orange" },
  { value: "6purple", label: "Purple" },
  { value: "7pink", label: "Pink" },
  { value: "8brown", label: "Brown" },
  { value: "9black", label: "Black" },
  { value: "10white", label: "White" },
  { value: "11gray", label: "Gray" },
  { value: "12cyan", label: "Cyan" },
  { value: "13magenta", label: "Magenta" },
  { value: "14lime", label: "Lime" },
  { value: "15indigo", label: "Indigo" },
  { value: "16teal", label: "Teal" },
  { value: "17maroon", label: "Maroon" },
  { value: "18navy", label: "Navy" },
  { value: "19olive", label: "Olive" },
  { value: "20silver", label: "Silver" },
  { value: "21aqua", label: "Aqua" },
  { value: "22fuchsia", label: "Fuchsia" },
  { value: "23lime", label: "Lime" },
  { value: "24purple", label: "Purple" },
  { value: "25teal", label: "Teal" },
  { value: "26maroon", label: "Maroon" },
  { value: "27navy", label: "Navy" },
  { value: "28olive", label: "Olive" },
  { value: "29silver", label: "Silver" },
  { value: "30aqua", label: "Aqua" },
  { value: "31fuchsia", label: "Fuchsia" },
  { value: "32lime", label: "Lime" },
  { value: "33purple", label: "Purple" },
  { value: "34teal", label: "Teal" },
  { value: "35maroon", label: "Maroon" },
  { value: "36navy", label: "Navy" },
];

export function FloatingComboboxDemo() {
  const [selected, setSelected] = useState<string>('14lime');

  const [value, setValue] = useState<string[]>(["6purple"]);

  return (
    <div className="w-[300px] space-y-2">
      <FloatingCombobox
        label="Floating Label Combobox"
        options={colors}
        valueField="value"
        labelField="label"
        defaultValue={selected}
        onValueChange={(value) => setSelected(value?.value ?? "")}
        //   id="floating-combobox-demo"
      />
      <FloatingMultiCombobox
        label="Floating Label Multi Combobox"
        options={colors}
        valueField="value"
        labelField="label"
        defaultValue={value}
        onValueChange={(newValue) =>
          setValue(newValue?.map((v) => v.value) ?? [])
        }
      />
    </div>
  );
}
