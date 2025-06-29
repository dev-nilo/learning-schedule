"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Target, TrendingUp, CheckSquare, BookOpen, Code, Users, Award } from "lucide-react"

interface DailyTask {
  id: string
  task: string
  timeEstimate: string
  completed: boolean
}

interface WeeklyGoal {
  id: string
  goal: string
  completed: boolean
}

export default function WeeklyScheduleTemplate() {
  const [currentWeek, setCurrentWeek] = useState(1)
  const [currentPhase, setCurrentPhase] = useState("Foundation")
  const [weekStartDate, setWeekStartDate] = useState("")

  // Sample data structure - you can modify based on your current phase
  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoal[]>([
    { id: "1", goal: "Complete JavaScript fundamentals module", completed: false },
    { id: "2", goal: "Build calculator project", completed: false },
    { id: "3", goal: "Make 7 GitHub commits", completed: false },
    { id: "4", goal: "Solve 10 coding exercises", completed: false },
  ])

  const [dailyHabits] = useState([
    "Coded for 1+ hours",
    "Made Git commit",
    "Updated learning log",
    "Solved coding problem",
    "Community engagement",
    "Read tech article",
  ])

  const [weeklySchedule] = useState({
    Monday: [
      { id: "m1", task: "Theory: Variables & Data Types", timeEstimate: "45 min", completed: false },
      { id: "m2", task: "Practice: 10 variable exercises", timeEstimate: "30 min", completed: false },
      { id: "m3", task: "Project: Simple calculator functions", timeEstimate: "45 min", completed: false },
    ],
    Tuesday: [
      { id: "t1", task: "Theory: Conditionals & Booleans", timeEstimate: "45 min", completed: false },
      { id: "t2", task: "Practice: 8 conditional exercises", timeEstimate: "30 min", completed: false },
      { id: "t3", task: "Project: Age verification system", timeEstimate: "45 min", completed: false },
    ],
    Wednesday: [
      { id: "w1", task: "Theory: Functions fundamentals", timeEstimate: "45 min", completed: false },
      { id: "w2", task: "Practice: Create 10 utility functions", timeEstimate: "30 min", completed: false },
      { id: "w3", task: "Project: Temperature converter", timeEstimate: "45 min", completed: false },
    ],
    Thursday: [
      { id: "th1", task: "Theory: Arrays fundamentals", timeEstimate: "45 min", completed: false },
      { id: "th2", task: "Practice: 15 array exercises", timeEstimate: "30 min", completed: false },
      { id: "th3", task: "Project: Shopping list manager", timeEstimate: "45 min", completed: false },
    ],
    Friday: [
      { id: "f1", task: "Theory: Objects introduction", timeEstimate: "45 min", completed: false },
      { id: "f2", task: "Practice: 12 object exercises", timeEstimate: "30 min", completed: false },
      { id: "f3", task: "Project: Student grade tracker", timeEstimate: "45 min", completed: false },
    ],
    Saturday: [
      { id: "s1", task: "Review: Week's concepts", timeEstimate: "60 min", completed: false },
      { id: "s2", task: "Debug: Previous exercises", timeEstimate: "30 min", completed: false },
      { id: "s3", task: "Plan: Weekend project", timeEstimate: "30 min", completed: false },
    ],
    Sunday: [
      { id: "su1", task: "Project: Personal Info Card", timeEstimate: "90 min", completed: false },
      { id: "su2", task: "Document: Project in GitHub", timeEstimate: "30 min", completed: false },
      { id: "su3", task: "Plan: Next week's goals", timeEstimate: "30 min", completed: false },
    ],
  })

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const handlePrint = () => {
    window.print()
  }

  const calculateProgress = () => {
    const totalTasks = Object.values(weeklySchedule).flat().length
    const completedTasks = Object.values(weeklySchedule)
      .flat()
      .filter((task) => task.completed).length
    return Math.round((completedTasks / totalTasks) * 100)
  }

  const calculateGoalProgress = () => {
    const completedGoals = weeklyGoals.filter((goal) => goal.completed).length
    return Math.round((completedGoals / weeklyGoals.length) * 100)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white print:p-4 print:max-w-none">
      {/* Header Section */}
      <div className="mb-8 print:mb-6">
        <div className="flex items-center justify-between mb-4 print:flex-col print:items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 print:text-2xl">Full-Stack Developer Learning Schedule</h1>
            <p className="text-gray-600 mt-1">
              Week {currentWeek} - {currentPhase} Phase
            </p>
          </div>
          <Button onClick={handlePrint} className="print:hidden">
            Print Schedule
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:grid-cols-3 print:gap-2">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <label className="text-sm font-medium">Week Starting:</label>
              <Input
                type="date"
                value={weekStartDate}
                onChange={(e) => setWeekStartDate(e.target.value)}
                className="mt-1 print:border print:border-gray-300"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-600" />
            <div>
              <label className="text-sm font-medium">Current Phase:</label>
              <p className="font-semibold">{currentPhase}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <div>
              <label className="text-sm font-medium">Week Progress:</label>
              <p className="font-semibold">{calculateProgress()}% Complete</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Goals Section */}
      <Card className="mb-6 print:mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>Weekly Goals</span>
            <span className="text-sm text-gray-500">({calculateGoalProgress()}% Complete)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyGoals.map((goal) => (
              <div key={goal.id} className="flex items-center space-x-3">
                <Checkbox id={goal.id} checked={goal.completed} className="print:w-4 print:h-4" />
                <label htmlFor={goal.id} className="text-sm font-medium flex-1">
                  {goal.goal}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 print:grid-cols-1 print:gap-3">
        {days.map((day) => (
          <Card key={day} className="print:break-inside-avoid">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Clock className="w-4 h-4" />
                <span>{day}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weeklySchedule[day as keyof typeof weeklySchedule].map((task) => (
                  <div key={task.id} className="flex items-start space-x-3 p-2 rounded border print:border-gray-300">
                    <Checkbox id={task.id} checked={task.completed} className="mt-1 print:w-4 print:h-4" />
                    <div className="flex-1 min-w-0">
                      <label htmlFor={task.id} className="text-sm font-medium block">
                        {task.task}
                      </label>
                      <p className="text-xs text-gray-500 mt-1">Est. Time: {task.timeEstimate}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Daily Notes Section */}
              <div className="mt-4 pt-3 border-t">
                <label className="text-xs font-medium text-gray-600">Daily Notes:</label>
                <div className="mt-1 h-8 border-b border-gray-200 print:border-gray-400"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Habit Tracker */}
      <Card className="mb-6 print:mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <CheckSquare className="w-5 h-5" />
            <span>Daily Habit Tracker</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Habit</th>
                  {days.map((day) => (
                    <th key={day} className="text-center py-2 font-medium w-16">
                      {day.slice(0, 3)}
                    </th>
                  ))}
                  <th className="text-center py-2 font-medium w-16">Total</th>
                </tr>
              </thead>
              <tbody>
                {dailyHabits.map((habit, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 font-medium">{habit}</td>
                    {days.map((day) => (
                      <td key={day} className="text-center py-2">
                        <Checkbox className="mx-auto print:w-4 print:h-4" />
                      </td>
                    ))}
                    <td className="text-center py-2 font-medium">
                      <span className="text-xs">__/7</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Progress Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 print:grid-cols-2 print:gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Code className="w-5 h-5" />
              <span>Code Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Lines of code written:</span>
              <div className="w-16 h-6 border-b border-gray-300 print:border-gray-400"></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">GitHub commits:</span>
              <div className="w-16 h-6 border-b border-gray-300 print:border-gray-400"></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Projects completed:</span>
              <div className="w-16 h-6 border-b border-gray-300 print:border-gray-400"></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Exercises solved:</span>
              <div className="w-16 h-6 border-b border-gray-300 print:border-gray-400"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <BookOpen className="w-5 h-5" />
              <span>Learning Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">New concepts learned:</span>
              <div className="w-16 h-6 border-b border-gray-300 print:border-gray-400"></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Articles read:</span>
              <div className="w-16 h-6 border-b border-gray-300 print:border-gray-400"></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Videos watched:</span>
              <div className="w-16 h-6 border-b border-gray-300 print:border-gray-400"></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Community posts:</span>
              <div className="w-16 h-6 border-b border-gray-300 print:border-gray-400"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Reflection */}
      <Card className="mb-6 print:mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Weekly Reflection</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">🎯 Goals Achieved This Week:</label>
            <div className="mt-2 h-16 border border-gray-300 rounded print:border-gray-400"></div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">🤔 Biggest Challenge & How I Overcame It:</label>
            <div className="mt-2 h-16 border border-gray-300 rounded print:border-gray-400"></div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">⭐ Technical Breakthrough or Win:</label>
            <div className="mt-2 h-16 border border-gray-300 rounded print:border-gray-400"></div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">📈 What I'll Do Differently Next Week:</label>
            <div className="mt-2 h-16 border border-gray-300 rounded print:border-gray-400"></div>
          </div>
        </CardContent>
      </Card>

      {/* Next Week Planning */}
      <Card className="print:break-inside-avoid">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Next Week's Focus</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">🎯 Primary Learning Objective:</label>
            <div className="mt-2 h-12 border border-gray-300 rounded print:border-gray-400"></div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">🚀 Main Project to Complete:</label>
            <div className="mt-2 h-12 border border-gray-300 rounded print:border-gray-400"></div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">💪 Skills to Practice:</label>
            <div className="mt-2 h-12 border border-gray-300 rounded print:border-gray-400"></div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">📚 Resources to Use:</label>
            <div className="mt-2 h-12 border border-gray-300 rounded print:border-gray-400"></div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t text-center text-sm text-gray-500 print:mt-4">
        <p>Full-Stack Developer Learning Journey - Week {currentWeek}</p>
        <p className="mt-1">Consistency is key! Code every day, even if it's just 30 minutes.</p>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body { 
            font-size: 12px !important; 
            line-height: 1.3 !important;
          }
          .print\\:hidden { 
            display: none !important; 
          }
          .print\\:break-inside-avoid { 
            break-inside: avoid !important; 
          }
          .print\\:p-4 { 
            padding: 1rem !important; 
          }
          .print\\:max-w-none { 
            max-width: none !important; 
          }
          .print\\:mb-4 { 
            margin-bottom: 1rem !important; 
          }
          .print\\:mb-6 { 
            margin-bottom: 1.5rem !important; 
          }
          .print\\:grid-cols-1 { 
            grid-template-columns: repeat(1, minmax(0, 1fr)) !important; 
          }
          .print\\:grid-cols-2 { 
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important; 
          }
          .print\\:grid-cols-3 { 
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important; 
          }
          .print\\:gap-2 { 
            gap: 0.5rem !important; 
          }
          .print\\:gap-3 { 
            gap: 0.75rem !important; 
          }
          .print\\:gap-4 { 
            gap: 1rem !important; 
          }
          .print\\:border { 
            border-width: 1px !important; 
          }
          .print\\:border-gray-300 { 
            border-color: #d1d5db !important; 
          }
          .print\\:border-gray-400 { 
            border-color: #9ca3af !important; 
          }
          .print\\:w-4 { 
            width: 1rem !important; 
          }
          .print\\:h-4 { 
            height: 1rem !important; 
          }
          .print\\:text-2xl { 
            font-size: 1.5rem !important; 
          }
          .print\\:flex-col { 
            flex-direction: column !important; 
          }
          .print\\:items-start { 
            align-items: flex-start !important; 
          }
        }
      `}</style>
    </div>
  )
}
