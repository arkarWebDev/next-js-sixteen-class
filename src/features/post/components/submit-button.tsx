import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

type SubmitButtonProps = {
  label: string;
  isPending: boolean;
};
function SubmitButton({ label, isPending }: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={isPending}>
      {isPending ? <LoaderCircle className=" animate-spin h-4 w-4" /> : label}
    </Button>
  );
}

export default SubmitButton;
