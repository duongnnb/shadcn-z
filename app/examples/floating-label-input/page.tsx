import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FloatingLabelInput } from "@/components/ui/floating-ui/floating-label-input";
export default function FloatingLabelInputPage() {
  return (
    <div className="flex">
      <Card>
        <CardHeader>
          <CardDescription>Input</CardDescription>
        </CardHeader>
        <CardContent>
          <FloatingLabelInput label="Type here" />
        </CardContent>
      </Card>
    </div>
  );
}
