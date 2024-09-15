"use client";

import * as React from "react";
import { SelectOption } from "../types/select-option";
import { Combobox, MultiCombobox } from "../ui/combobox";

const frameworks: SelectOption[] = [
  {
    value: 1,
    label:
      "Next.js (React)  (React)  (React)  (React)  (React)  (React)  (React)  (React) ",
  },
  {
    value: 2,
    label: "SvelteKit",
  },
  {
    value: 3,
    label: "Nuxt.js",
  },
  {
    value: 4,
    label: "Remix",
  },
  {
    value: 5,
    label: "Astro",
  },
];

const frameworks2 = [
  {
    value: "1.js",
    label: "Next.js",
  },
  {
    value: "2",
    label: "SvelteKit",
  },
  {
    value: "3.js",
    label: "Nuxt.js",
  },
  {
    value: "4",
    label: "Remix",
  },
  {
    value: "5",
    label: "Astro",
  },
];

const frameworks3 = [
  {
    id: 1,
    name: "Next.js",
  },
  {
    id: 2,
    name: "SvelteKit SvelteKit SvelteKit SvelteKit SvelteKit SvelteKit SvelteKit SvelteKit SvelteKit ",
  },
  {
    id: 3,
    name: "Nuxt.js",
  },
  {
    id: 4,
    name: "Remix",
  },
  {
    id: 5,
    name: "Astro",
  },
];

export function ComboboxDemo() {
  const [value, setValue] = React.useState<number | undefined>(undefined);
  const [value2, setValue2] = React.useState<string | undefined>(undefined);
  const [value3, setValue3] = React.useState<number[]>([]);

  return (
    <div className="w-[250px] space-y-2">
      <Combobox
        label="Select some label that is really long..."
        options={frameworks}
        defaultValue={value}
        onValueChange={(newValue) => {
          console.log("newValue", newValue);
          setValue(newValue?.value);
        }}
      />
      <Combobox
        options={frameworks2}
        defaultValue={value2}
        valueField="value"
        labelField="label"
        onValueChange={(newValue) => {
          console.log("newValue", newValue);
          setValue2(newValue?.value);
        }}
      />
      <MultiCombobox
        label="MultiCombobox some label that is really long..."
        options={frameworks3}
        defaultValue={value3}
        valueField="id"
        labelField="name"
        onValueChange={(newValue) => {
          // console.log("newValue", newValue);
          setValue3(newValue?.map((item) => item.id) ?? []);
        }}
      />
    </div>
  );
}
