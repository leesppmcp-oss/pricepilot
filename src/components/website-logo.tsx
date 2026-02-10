import { Building } from "lucide-react";

export function WebsiteLogo({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
        <Building className="h-5 w-5" />
      </div>
      <span className="font-medium text-base">{name}</span>
    </div>
  );
}
