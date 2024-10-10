import Image from "next/image";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="font-bold underline text-slate-500 text-3xl">
      <h1>Hello</h1>
      <Button>Click Me</Button>
    </div>
  );
}
