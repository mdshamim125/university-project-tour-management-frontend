// components/modules/admin/analytics/StatCard.tsx
import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: ReactNode;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        {icon && (
          <div className="text-primary bg-primary/10 p-3 rounded-xl">
            {icon}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
