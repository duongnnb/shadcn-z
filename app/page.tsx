import FloatingLabelLayout from "@/app/examples/floating-label-input/layout";
import FloatingLabelInput from "@/app/examples/floating-label-input/page";
import ExamplesLayout from "@/app/examples/layout";

export default function Home() {
  return (
    <ExamplesLayout>
      <FloatingLabelLayout>
        <FloatingLabelInput />
      </FloatingLabelLayout>
    </ExamplesLayout>
  );
}
