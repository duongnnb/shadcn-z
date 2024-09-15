"use client";

import { useState } from "react";
import { FloatingCombobox } from "../ui/floating-ui/floating-combobox";

const colors = [
  { value: "1red", label: "Red" },
  { value: "2green", label: "Green" },
  { value: "3blue", label: "Blue" },
];

export function FloatingComboboxDemo() {
  const [selected, setSelected] = useState<any>();

  return (
    <FloatingCombobox
      label="Select a color"
      options={colors}
      valueField="value"
      labelField="label"
      defaultValue={selected?.value}
      onValueChange={(value) => setSelected(value)}
    //   id="floating-combobox-demo"
    />
  );
}
