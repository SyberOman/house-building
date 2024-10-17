import { Progress } from '@/components/ui/progress'

export default function StagesTab({ stages }) {
  return (
    <div className="space-y-4">
      {stages.map((stage, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="w-1/4">{stage.name}</span>
          <Progress value={stage.progress} className="w-1/2" />
          <span className="w-1/4 text-right">{stage.status}</span>
        </div>
      ))}
    </div>
  )
}