"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FloatingLabelInput } from "@/components/ui/floating-ui/floating-label-input";
import { useRef, useState } from "react";
export default function FloatingLabelInputPage() {
  const localRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(0);
  
  const increase = () => {
    setValue(value + 1);    
  }

  const focus = () => {
    localRef.current?.focus();
  }

  return (
    <div className="flex">
      <Card>
        <CardHeader>
          <CardDescription>Input</CardDescription>
        </CardHeader>
        <CardContent>
          value: {value}
          <button onClick={increase}>Increase</button>
          <button onClick={focus}>Focus</button>
          <FloatingLabelInput label="Type here" ref={localRef}/>
        </CardContent>
      </Card>
    </div>
  );
}
