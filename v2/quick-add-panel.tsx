"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Clock, Target, Zap } from "lucide-react"

interface QuickTask {
  title: string
  estimatedTime: number
  priority: "high" | "medium" | "low"
  category: "theory" | "practice" | "project" | "review"
}

export default function QuickAddPanel() {
  const [quickTask, setQuickTask] = useState<QuickTask>({
    title: "",
    estimatedTime: 30,
    priority: "medium",
    category: "theory",
  })

  const [selectedDay, setSelectedDay] = useState("Monday")

  const quickTaskTemplates = [
    { title: "Review yesterday's code", estimatedTime: 15, priority: "medium" as const, category: "review" as const },
    { title: "Read documentation", estimatedTime: 30, priority: "low" as const, category: "theory" as const },
    { title: "Practice coding exercises", estimatedTime: 45, priority: "high" as const, category: "practice" as const },
    { title: "Work on current project", estimatedTime: 60, priority: "high" as const, category: "project" as const },
    { title: "Debug previous issues", estimatedTime: 30, priority: "medium" as const, category: "practice" as const },
    { title: "Plan next feature", estimatedTime: 20, priority: "medium" as const, category: "theory" as const },
  ]

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const handleQuickAdd = () => {
    if (quickTask.title.trim()) {
      // This would integrate with the main schedule component
      console.log("Adding quick task:", quickTask, "to", selectedDay)
      setQuickTask({
        title: "",
        estimatedTime: 30,
        priority: "medium",
        category: "theory",
      })
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const useTemplate = (template: QuickTask) => {
    setQuickTask(template)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-5 h-5" />
          <span>Quick Add</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Task Form */}
        <div className="space-y-3">
          <div>
            <Input
              placeholder="Task title..."
              value={quickTask.title}
              onChange={(e) => setQuickTask((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-gray-500" />
              <Input
                type="number"
                value={quickTask.estimatedTime}
                onChange={(e) =>
                  setQuickTask((prev) => ({ ...prev, estimatedTime: Number.parseInt(e.target.value) || 0 }))
                }
                className="text-xs"
                min="5"
                max="300"
              />
              <span className="text-xs text-gray-500">min</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Select
              value={quickTask.priority}
              onValueChange={(value: any) => setQuickTask((prev) => ({ ...prev, priority: value }))}
            >
              <SelectTrigger className="text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={quickTask.category}
              onValueChange={(value: any) => setQuickTask((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="theory">Theory</SelectItem>
                <SelectItem value="practice">Practice</SelectItem>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="review">Review</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleQuickAdd} className="w-full" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add to {selectedDay}
          </Button>
        </div>

        {/* Quick Templates */}
        <div>
          <h4 className="text-sm font-medium mb-2">Quick Templates</h4>
          <div className="space-y-2">
            {quickTaskTemplates.map((template, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border rounded cursor-pointer hover:bg-gray-50"
                onClick={() => setQuickTask(template)}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{template.title}</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={`text-xs ${getPriorityColor(template.priority)}`}>{template.priority}</Badge>
                    <span className="text-xs text-gray-500">{template.estimatedTime}min</span>
                    <span className="text-xs text-gray-500 capitalize">{template.category}</span>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="ml-2">
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Focus */}
        <div className="pt-3 border-t">
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <Target className="w-4 h-4 mr-1" />
            Today's Priority
          </h4>
          <div className="p-2 bg-blue-50 rounded text-sm">
            <div className="font-medium">Complete JavaScript Arrays</div>
            <div className="text-gray-600 text-xs mt-1">Focus on array methods and practice exercises</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
