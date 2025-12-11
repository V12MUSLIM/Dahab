import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function StayInfoCards({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
      {items.map(({ icon: Icon, title, value }, idx) => (
        <Card
          key={idx}
          className="border border-border/60 hover:border-amber-500/60 hover:shadow-lg transition-all"
        >
          <CardHeader className="pb-2 flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
            <Icon className="w-6 h-6 text-amber-600" />
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground">{value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
