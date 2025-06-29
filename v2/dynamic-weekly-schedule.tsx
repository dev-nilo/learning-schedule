"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Calendar,
  Clock,
  Target,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Circle,
  Timer,
  BarChart3,
  BookOpen,
  Lightbulb,
  Star,
} from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  estimatedTime: number
  actualTime: number
  priority: "high" | "medium" | "low"
  category: "theory" | "practice" | "project" | "review"
  completed: boolean
  deadline?: string
  notes: string
}

interface Challenge {
  id: string
  description: string
  impact: "high" | "medium" | "low"
  solution: string
  resolved: boolean
  dateEncountered: string
}

interface WeeklyGoal {
  id: string
  goal: string
  progress: number
  completed: boolean
  priority: "high" | "medium" | "low"
}

interface DaySchedule {
  [key: string]: Task[]
}

export default function DynamicWeeklySchedule() {
  const [currentWeek, setCurrentWeek] = useState(1)
  const [currentPhase, setCurrentPhase] = useState("Foundation")
  const [weekStartDate, setWeekStartDate] = useState("")
  const [selectedDay, setSelectedDay] = useState("Monday")
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isChallengeDialogOpen, setIsChallengeDialogOpen] = useState(false)

  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoal[]>([
    { id: "1", goal: "Complete JavaScript fundamentals", progress: 0, completed: false, priority: "high" },
    { id: "2", goal: "Build calculator project", progress: 0, completed: false, priority: "high" },
    { id: "3", goal: "Make 7 GitHub commits", progress: 0, completed: false, priority: "medium" },
    { id: "4", goal: "Solve 15 coding exercises", progress: 0, completed: false, priority: "medium" },
  ])

  const [challenges, setChallenges] = useState<Challenge[]>([])

  const [schedule, setSchedule] = useState<DaySchedule>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  })

  const [weeklyReflection, setWeeklyReflection] = useState({
    achievements: "",
    challenges: "",
    learnings: "",
    improvements: "",
    nextWeekFocus: "",
    timeManagement: "",
    skillsGained: "",
    blockers: "",
  })

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "theory":
        return <BookOpen className="w-4 h-4" />
      case "practice":
        return <Target className="w-4 h-4" />
      case "project":
        return <Star className="w-4 h-4" />
      case "review":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Circle className="w-4 h-4" />
    }
  }

  const addTask = (day: string, task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
    }
    setSchedule((prev) => ({
      ...prev,
      [day]: [...prev[day], newTask],
    }))
  }

  const updateTask = (day: string, taskId: string, updates: Partial<Task>) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].map((task) => (task.id === taskId ? { ...task, ...updates } : task)),
    }))
  }

  const deleteTask = (day: string, taskId: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].filter((task) => task.id !== taskId),
    }))
  }

  const addChallenge = (challenge: Omit<Challenge, "id">) => {
    const newChallenge: Challenge = {
      ...challenge,
      id: Date.now().toString(),
    }
    setChallenges((prev) => [...prev, newChallenge])
  }

  const updateChallenge = (challengeId: string, updates: Partial<Challenge>) => {
    setChallenges((prev) =>
      prev.map((challenge) => (challenge.id === challengeId ? { ...challenge, ...updates } : challenge)),
    )
  }

  const calculateWeekProgress = () => {
    const allTasks = Object.values(schedule).flat()
    if (allTasks.length === 0) return 0
    const completedTasks = allTasks.filter((task) => task.completed).length
    return Math.round((completedTasks / allTasks.length) * 100)
  }

  const calculateTimeEfficiency = () => {
    const allTasks = Object.values(schedule)
      .flat()
      .filter((task) => task.actualTime > 0)
    if (allTasks.length === 0) return 0
    const totalEstimated = allTasks.reduce((sum, task) => sum + task.estimatedTime, 0)
    const totalActual = allTasks.reduce((sum, task) => sum + task.actualTime, 0)
    return Math.round((totalEstimated / totalActual) * 100)
  }

  const TaskDialog = () => {
    const [taskForm, setTaskForm] = useState<Omit<Task, "id">>({
      title: "",
      description: "",
      estimatedTime: 60,
      actualTime: 0,
      priority: "medium",
      category: "theory",
      completed: false,
      notes: "",
    })

    useEffect(() => {
      if (editingTask) {
        setTaskForm(editingTask)
      } else {
        setTaskForm({
          title: "",
          description: "",
          estimatedTime: 60,
          actualTime: 0,
          priority: "medium",
          category: "theory",
          completed: false,
          notes: "",
        })
      }
    }, [editingTask])

    const handleSubmit = () => {
      if (editingTask) {
        updateTask(selectedDay, editingTask.id, taskForm)
      } else {
        addTask(selectedDay, taskForm)
      }
      setIsTaskDialogOpen(false)
      setEditingTask(null)
    }

    return (
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                value={taskForm.title}
                onChange={(e) => setTaskForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter task title"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={taskForm.description}
                onChange={(e) => setTaskForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Task description"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={taskForm.priority}
                  onValueChange={(value: any) => setTaskForm((prev) => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={taskForm.category}
                  onValueChange={(value: any) => setTaskForm((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="estimatedTime">Estimated Time (min)</Label>
                <Input
                  id="estimatedTime"
                  type="number"
                  value={taskForm.estimatedTime}
                  onChange={(e) =>
                    setTaskForm((prev) => ({ ...prev, estimatedTime: Number.parseInt(e.target.value) || 0 }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="actualTime">Actual Time (min)</Label>
                <Input
                  id="actualTime"
                  type="number"
                  value={taskForm.actualTime}
                  onChange={(e) =>
                    setTaskForm((prev) => ({ ...prev, actualTime: Number.parseInt(e.target.value) || 0 }))
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="deadline">Deadline (optional)</Label>
              <Input
                id="deadline"
                type="date"
                value={taskForm.deadline || ""}
                onChange={(e) => setTaskForm((prev) => ({ ...prev, deadline: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={taskForm.notes}
                onChange={(e) => setTaskForm((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes"
                rows={2}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsTaskDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>{editingTask ? "Update" : "Add"} Task</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const ChallengeDialog = () => {
    const [challengeForm, setChallengeForm] = useState({
      description: "",
      impact: "medium" as "high" | "medium" | "low",
      solution: "",
      resolved: false,
      dateEncountered: new Date().toISOString().split("T")[0],
    })

    const handleSubmit = () => {
      addChallenge(challengeForm)
      setIsChallengeDialogOpen(false)
      setChallengeForm({
        description: "",
        impact: "medium",
        solution: "",
        resolved: false,
        dateEncountered: new Date().toISOString().split("T")[0],
      })
    }

    return (
      <Dialog open={isChallengeDialogOpen} onOpenChange={setIsChallengeDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Challenge/Roadblock</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="challenge-desc">Challenge Description</Label>
              <Textarea
                id="challenge-desc"
                value={challengeForm.description}
                onChange={(e) => setChallengeForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the challenge or roadblock"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="impact">Impact Level</Label>
              <Select
                value={challengeForm.impact}
                onValueChange={(value: any) => setChallengeForm((prev) => ({ ...prev, impact: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Impact</SelectItem>
                  <SelectItem value="medium">Medium Impact</SelectItem>
                  <SelectItem value="low">Low Impact</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="solution">Solution/Strategy</Label>
              <Textarea
                id="solution"
                value={challengeForm.solution}
                onChange={(e) => setChallengeForm((prev) => ({ ...prev, solution: e.target.value }))}
                placeholder="How did you solve it or plan to solve it?"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="date">Date Encountered</Label>
              <Input
                id="date"
                type="date"
                value={challengeForm.dateEncountered}
                onChange={(e) => setChallengeForm((prev) => ({ ...prev, dateEncountered: e.target.value }))}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="resolved"
                checked={challengeForm.resolved}
                onCheckedChange={(checked) => setChallengeForm((prev) => ({ ...prev, resolved: !!checked }))}
              />
              <Label htmlFor="resolved">Challenge Resolved</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsChallengeDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Add Challenge</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white print:p-4">
      {/* Header Section */}
      <div className="mb-8 print:mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dynamic Learning Schedule</h1>
            <p className="text-gray-600 mt-1">
              Week {currentWeek} - {currentPhase} Phase
            </p>
          </div>
          <div className="flex space-x-2 print:hidden">
            <Button onClick={() => window.print()}>Print Schedule</Button>
            <Button variant="outline" onClick={() => setIsChallengeDialogOpen(true)}>
              <AlertTriangle className="w-4 h-4 mr-2" />
              Add Challenge
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <label className="text-sm font-medium">Week Starting:</label>
              <Input
                type="date"
                value={weekStartDate}
                onChange={(e) => setWeekStartDate(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-600" />
            <div>
              <label className="text-sm font-medium">Progress:</label>
              <p className="font-semibold">{calculateWeekProgress()}% Complete</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Timer className="w-5 h-5 text-purple-600" />
            <div>
              <label className="text-sm font-medium">Time Efficiency:</label>
              <p className="font-semibold">{calculateTimeEfficiency()}%</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-orange-600" />
            <div>
              <label className="text-sm font-medium">Total Tasks:</label>
              <p className="font-semibold">{Object.values(schedule).flat().length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Goals with Progress */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Weekly Goals & Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyGoals.map((goal) => (
              <div key={goal.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                <Checkbox
                  checked={goal.completed}
                  onCheckedChange={(checked) =>
                    setWeeklyGoals((prev) => prev.map((g) => (g.id === goal.id ? { ...g, completed: !!checked } : g)))
                  }
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">{goal.goal}</span>
                    <Badge className={getPriorityColor(goal.priority)}>{goal.priority}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={goal.progress}
                      onChange={(e) =>
                        setWeeklyGoals((prev) =>
                          prev.map((g) =>
                            g.id === goal.id ? { ...g, progress: Number.parseInt(e.target.value) || 0 } : g,
                          ),
                        )
                      }
                      className="w-16 h-6 text-xs"
                    />
                    <span className="text-xs text-gray-500">%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Daily Schedule */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Daily Schedule</span>
            </div>
            <div className="flex items-center space-x-2 print:hidden">
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger className="w-32">
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
              <Button
                size="sm"
                onClick={() => {
                  setEditingTask(null)
                  setIsTaskDialogOpen(true)
                }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Task
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {days.map((day) => (
              <div key={day} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold flex items-center space-x-2">
                    <span>{day}</span>
                    <Badge variant="outline" className="text-xs">
                      {schedule[day].length} tasks
                    </Badge>
                  </h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="print:hidden"
                    onClick={() => {
                      setSelectedDay(day)
                      setEditingTask(null)
                      setIsTaskDialogOpen(true)
                    }}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {schedule[day]
                    .sort((a, b) => {
                      const priorityOrder = { high: 3, medium: 2, low: 1 }
                      return priorityOrder[b.priority] - priorityOrder[a.priority]
                    })
                    .map((task) => (
                      <div key={task.id} className="border rounded-lg p-3 space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-2 flex-1">
                            <Checkbox
                              checked={task.completed}
                              onCheckedChange={(checked) => updateTask(day, task.id, { completed: !!checked })}
                              className="mt-1"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                {getCategoryIcon(task.category)}
                                <span className="font-medium text-sm">{task.title}</span>
                                <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>{task.priority}</Badge>
                              </div>
                              {task.description && <p className="text-xs text-gray-600 mb-2">{task.description}</p>}
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>Est: {task.estimatedTime}min</span>
                                {task.actualTime > 0 && (
                                  <span
                                    className={task.actualTime > task.estimatedTime ? "text-red-600" : "text-green-600"}
                                  >
                                    Actual: {task.actualTime}min
                                  </span>
                                )}
                                {task.deadline && <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-1 print:hidden">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setSelectedDay(day)
                                setEditingTask(task)
                                setIsTaskDialogOpen(true)
                              }}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => deleteTask(day, task.id)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        {task.notes && (
                          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                            <strong>Notes:</strong> {task.notes}
                          </div>
                        )}

                        {!task.completed && task.actualTime === 0 && (
                          <div className="flex items-center space-x-2">
                            <Label className="text-xs">Actual time:</Label>
                            <Input
                              type="number"
                              placeholder="minutes"
                              className="h-6 text-xs w-20"
                              onChange={(e) =>
                                updateTask(day, task.id, { actualTime: Number.parseInt(e.target.value) || 0 })
                              }
                            />
                          </div>
                        )}
                      </div>
                    ))}

                  {schedule[day].length === 0 && (
                    <div className="text-center text-gray-400 py-4">
                      <p className="text-sm">No tasks scheduled</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="mt-2 print:hidden"
                        onClick={() => {
                          setSelectedDay(day)
                          setEditingTask(null)
                          setIsTaskDialogOpen(true)
                        }}
                      >
                        Add first task
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Challenges & Roadblocks */}
      {challenges.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Challenges & Solutions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(challenge.impact)}>{challenge.impact} impact</Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(challenge.dateEncountered).toLocaleDateString()}
                      </span>
                    </div>
                    <Checkbox
                      checked={challenge.resolved}
                      onCheckedChange={(checked) => updateChallenge(challenge.id, { resolved: !!checked })}
                    />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <strong className="text-sm">Challenge:</strong>
                      <p className="text-sm text-gray-700">{challenge.description}</p>
                    </div>
                    {challenge.solution && (
                      <div>
                        <strong className="text-sm">Solution:</strong>
                        <p className="text-sm text-gray-700">{challenge.solution}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Reflection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5" />
            <span>Weekly Reflection & Review</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">🎯 Key Achievements</Label>
                <Textarea
                  value={weeklyReflection.achievements}
                  onChange={(e) => setWeeklyReflection((prev) => ({ ...prev, achievements: e.target.value }))}
                  placeholder="What did you accomplish this week?"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">🤔 Main Challenges</Label>
                <Textarea
                  value={weeklyReflection.challenges}
                  onChange={(e) => setWeeklyReflection((prev) => ({ ...prev, challenges: e.target.value }))}
                  placeholder="What obstacles did you face?"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">💡 Key Learnings</Label>
                <Textarea
                  value={weeklyReflection.learnings}
                  onChange={(e) => setWeeklyReflection((prev) => ({ ...prev, learnings: e.target.value }))}
                  placeholder="What new concepts did you master?"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">🚀 Skills Gained</Label>
                <Textarea
                  value={weeklyReflection.skillsGained}
                  onChange={(e) => setWeeklyReflection((prev) => ({ ...prev, skillsGained: e.target.value }))}
                  placeholder="What new skills did you develop?"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">📈 Areas for Improvement</Label>
                <Textarea
                  value={weeklyReflection.improvements}
                  onChange={(e) => setWeeklyReflection((prev) => ({ ...prev, improvements: e.target.value }))}
                  placeholder="What could you do better next week?"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">⏰ Time Management Insights</Label>
                <Textarea
                  value={weeklyReflection.timeManagement}
                  onChange={(e) => setWeeklyReflection((prev) => ({ ...prev, timeManagement: e.target.value }))}
                  placeholder="How was your time estimation and management?"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">🚧 Blockers & Solutions</Label>
                <Textarea
                  value={weeklyReflection.blockers}
                  onChange={(e) => setWeeklyReflection((prev) => ({ ...prev, blockers: e.target.value }))}
                  placeholder="What blocked your progress and how did you solve it?"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">🎯 Next Week's Focus</Label>
                <Textarea
                  value={weeklyReflection.nextWeekFocus}
                  onChange={(e) => setWeeklyReflection((prev) => ({ ...prev, nextWeekFocus: e.target.value }))}
                  placeholder="What will you prioritize next week?"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Analysis */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Time Analysis & Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Object.values(schedule)
                  .flat()
                  .reduce((sum, task) => sum + task.estimatedTime, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Estimated (min)</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(schedule)
                  .flat()
                  .reduce((sum, task) => sum + task.actualTime, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Actual (min)</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div
                className={`text-2xl font-bold ${calculateTimeEfficiency() >= 90 ? "text-green-600" : calculateTimeEfficiency() >= 70 ? "text-yellow-600" : "text-red-600"}`}
              >
                {calculateTimeEfficiency()}%
              </div>
              <div className="text-sm text-gray-600">Time Efficiency</div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-3">Task Category Breakdown</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["theory", "practice", "project", "review"].map((category) => {
                const categoryTasks = Object.values(schedule)
                  .flat()
                  .filter((task) => task.category === category)
                const totalTime = categoryTasks.reduce((sum, task) => sum + task.actualTime, 0)
                return (
                  <div key={category} className="text-center p-3 border rounded">
                    <div className="flex items-center justify-center mb-1">
                      {getCategoryIcon(category)}
                      <span className="ml-1 text-sm font-medium capitalize">{category}</span>
                    </div>
                    <div className="text-lg font-bold">{totalTime}min</div>
                    <div className="text-xs text-gray-500">{categoryTasks.length} tasks</div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <TaskDialog />
      <ChallengeDialog />

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body { font-size: 11px !important; }
          .print\\:hidden { display: none !important; }
          .print\\:p-4 { padding: 1rem !important; }
        }
      `}</style>
    </div>
  )
}
