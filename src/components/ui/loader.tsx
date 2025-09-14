import { Loader2 } from "lucide-react";

export default function Loader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="text-center">
        <Loader2 className="animate-spin mx-auto text-accent" size={48} />
        <div className="mt-4 font-bold text-accent">
          {text}
        </div>
      </div>
    </div>
  );
}
