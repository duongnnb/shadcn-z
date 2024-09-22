"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FloatingMultiCombobox } from "@/components/ui/floating-ui/floating-label-multi-combobox ";
import { FloatingLabelMultiComboboxVirtualized } from "@/components/ui/floating-ui/floating-label-multi-combobox-virtualized";
import { faker } from "@faker-js/faker";
import { useState } from "react";

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
const randomNumber = (min: number, max: number) =>
  faker.number.int({ min, max });

const sentences = new Array(2000).fill(true).map((_, index) => ({
  label: faker.lorem.sentence(randomNumber(1, 30)),
  value: index + 1,
}));
export default function FloatingLabelMultiComboboxPage() {
  const [value, setValue] = useState<number[]>([]);

  return (
    <div className="flex w-full">
      <Card className="w-72">
        <CardHeader>
          <CardDescription>
            FloatingLabelMultiComboboxVirtualized
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FloatingLabelMultiComboboxVirtualized
            label="Floating Label Multi Combobox"
            options={sentences}
            valueField="value"
            labelField="label"
            defaultValue={value}
            onValueChange={(newValue) => {
              console.log("newValue", newValue);
              setValue(newValue?.map((v) => v.value) ?? []);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
