import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
    title: string
    value: string | number
    change?: string
    changeType?: 'positive' | 'negative' | 'neutral'
    icon?: React.ReactNode
    className?: string
}

export function MetricCard({
    title,
    value,
    change,
    changeType = 'neutral',
    icon,
    className
}: MetricCardProps) {
    const changeColors = {
        positive: 'text-success',
        negative: 'text-destructive',
        neutral: 'text-muted-foreground'
    }

    return (
        <Card className={cn(
            "p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-200",className
        )}>
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
                            {change && (
                                <span className={cn("text-xs font-medium", changeColors[changeType])}>{change}</span>
                            )}
                    </div>
                </div>
                {icon && (
                    <div className="p-3 rounded-xl bg-primary-subtle text-primary">{icon}</div>
                )}
            </div>
        </Card>
    )
}
