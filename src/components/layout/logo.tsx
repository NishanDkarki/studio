import { Link2 } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2 p-2 text-sidebar-primary-foreground">
        <Link2 className="h-8 w-8" />
        <h1 className="text-xl font-bold tracking-tight">LinkPulse</h1>
    </div>
  )
}
