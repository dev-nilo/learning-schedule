"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface PhaseTemplate {
  name: string
  duration: string
  description: string
  weeklyGoals: string[]
  dailyTasks: {
    [key: string]: Array<{
      task: string
      timeEstimate: string
      type: "theory" | "practice" | "project"
    }>
  }
  milestones: string[]
  resources: string[]
}

export default function PhaseTemplates() {
  const [selectedPhase, setSelectedPhase] = useState<string>("foundation")

  const phaseTemplates: Record<string, PhaseTemplate> = {
    foundation: {
      name: "Foundation Phase",
      duration: "Months 1-3",
      description: "Master JavaScript fundamentals, HTML/CSS, and basic web development concepts",
      weeklyGoals: [
        "Complete JavaScript fundamentals module",
        "Build one practical project",
        "Make 7+ GitHub commits",
        "Solve 10+ coding exercises",
        "Read 3 technical articles",
      ],
      dailyTasks: {
        Monday: [
          { task: "JavaScript Theory: Variables & Data Types", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: Variable exercises", timeEstimate: "30 min", type: "practice" },
          { task: "Project: Calculator functions", timeEstimate: "45 min", type: "project" },
        ],
        Tuesday: [
          { task: "JavaScript Theory: Conditionals", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: Conditional exercises", timeEstimate: "30 min", type: "practice" },
          { task: "Project: Logic-based features", timeEstimate: "45 min", type: "project" },
        ],
        Wednesday: [
          { task: "JavaScript Theory: Functions", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: Function exercises", timeEstimate: "30 min", type: "practice" },
          { task: "Project: Modular code structure", timeEstimate: "45 min", type: "project" },
        ],
        Thursday: [
          { task: "JavaScript Theory: Arrays & Objects", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: Data structure exercises", timeEstimate: "30 min", type: "practice" },
          { task: "Project: Data management features", timeEstimate: "45 min", type: "project" },
        ],
        Friday: [
          { task: "JavaScript Theory: DOM Manipulation", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: DOM exercises", timeEstimate: "30 min", type: "practice" },
          { task: "Project: Interactive features", timeEstimate: "45 min", type: "project" },
        ],
        Saturday: [
          { task: "Review: Week's concepts", timeEstimate: "60 min", type: "theory" },
          { task: "Debug: Previous exercises", timeEstimate: "30 min", type: "practice" },
          { task: "Plan: Weekend project", timeEstimate: "30 min", type: "project" },
        ],
        Sunday: [
          { task: "Project: Complete weekly project", timeEstimate: "90 min", type: "project" },
          { task: "Document: Update GitHub", timeEstimate: "30 min", type: "practice" },
          { task: "Plan: Next week goals", timeEstimate: "30 min", type: "theory" },
        ],
      },
      milestones: [
        "Build 3 JavaScript projects",
        "Complete 50+ coding exercises",
        "Create responsive portfolio website",
        "Master Git workflow",
      ],
      resources: ["freeCodeCamp JavaScript Course", "JavaScript.info", "MDN Web Docs", "Eloquent JavaScript"],
    },
    frontend: {
      name: "Front-End Development",
      duration: "Months 4-6",
      description: "Master React, Next.js, and modern front-end development practices",
      weeklyGoals: [
        "Master React concepts",
        "Build Next.js application",
        "Implement modern CSS",
        "Add testing coverage",
        "Deploy to production",
      ],
      dailyTasks: {
        Monday: [
          { task: "React Theory: Components & JSX", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: Component exercises", timeEstimate: "30 min", type: "practice" },
          { task: "Project: React component library", timeEstimate: "45 min", type: "project" },
        ],
        Tuesday: [
          { task: "React Theory: State & Props", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: State management exercises", timeEstimate: "30 min", type: "practice" },
          { task: "Project: Interactive React app", timeEstimate: "45 min", type: "project" },
        ],
        Wednesday: [
          { task: "Next.js Theory: App Router", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: Routing exercises", timeEstimate: "30 min", type: "practice" },
          { task: "Project: Multi-page Next.js app", timeEstimate: "45 min", type: "project" },
        ],
        Thursday: [
          { task: "Styling Theory: Tailwind CSS", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: Responsive design", timeEstimate: "30 min", type: "practice" },
          { task: "Project: UI component styling", timeEstimate: "45 min", type: "project" },
        ],
        Friday: [
          { task: "Testing Theory: Jest & Testing Library", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: Write component tests", timeEstimate: "30 min", type: "practice" },
          { task: "Project: Add test coverage", timeEstimate: "45 min", type: "project" },
        ],
        Saturday: [
          { task: "Review: Front-end concepts", timeEstimate: "60 min", type: "theory" },
          { task: "Optimize: Performance improvements", timeEstimate: "30 min", type: "practice" },
          { task: "Deploy: Production deployment", timeEstimate: "30 min", type: "project" },
        ],
        Sunday: [
          { task: "Project: Complete React/Next.js app", timeEstimate: "90 min", type: "project" },
          { task: "Document: Project documentation", timeEstimate: "30 min", type: "practice" },
          { task: "Plan: Next week's focus", timeEstimate: "30 min", type: "theory" },
        ],
      },
      milestones: [
        "Build 3 React applications",
        "Deploy 2 Next.js projects",
        "Implement component testing",
        "Master responsive design",
      ],
      resources: ["React Documentation", "Next.js Learn Course", "Tailwind CSS Docs", "Testing Library Guides"],
    },
    backend: {
      name: "Back-End Development",
      duration: "Months 7-9",
      description: "Learn server-side development, databases, and API creation",
      weeklyGoals: [
        "Build RESTful APIs",
        "Master database design",
        "Implement authentication",
        "Deploy server applications",
        "Write API documentation",
      ],
      dailyTasks: {
        Monday: [
          { task: "Node.js Theory: Server fundamentals", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: Server setup exercises", timeEstimate: "30 min", type: "practice" },
          { task: "Project: Basic HTTP server", timeEstimate: "45 min", type: "project" },
        ],
        Tuesday: [
          { task: "API Theory: RESTful design", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: API endpoint exercises", timeEstimate: "30 min", type: "practice" },
          { task: "Project: CRUD API development", timeEstimate: "45 min", type: "project" },
        ],
        Wednesday: [
          { task: "Database Theory: SQL & PostgreSQL", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: Database queries", timeEstimate: "30 min", type: "practice" },
          { task: "Project: Database integration", timeEstimate: "45 min", type: "project" },
        ],
        Thursday: [
          { task: "Auth Theory: JWT & Sessions", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: Authentication exercises", timeEstimate: "30 min", type: "practice" },
          { task: "Project: Secure API endpoints", timeEstimate: "45 min", type: "project" },
        ],
        Friday: [
          { task: "Testing Theory: API testing", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: Write API tests", timeEstimate: "30 min", type: "practice" },
          { task: "Project: Test coverage implementation", timeEstimate: "45 min", type: "project" },
        ],
        Saturday: [
          { task: "Review: Back-end concepts", timeEstimate: "60 min", type: "theory" },
          { task: "Optimize: Performance tuning", timeEstimate: "30 min", type: "practice" },
          { task: "Deploy: Server deployment", timeEstimate: "30 min", type: "project" },
        ],
        Sunday: [
          { task: "Project: Full-stack application", timeEstimate: "90 min", type: "project" },
          { task: "Document: API documentation", timeEstimate: "30 min", type: "practice" },
          { task: "Plan: Integration strategies", timeEstimate: "30 min", type: "theory" },
        ],
      },
      milestones: [
        "Build 2 RESTful APIs",
        "Design 3 database schemas",
        "Implement secure authentication",
        "Deploy production servers",
      ],
      resources: ["Node.js Documentation", "PostgreSQL Tutorial", "Prisma Guides", "API Design Best Practices"],
    },
    fullstack: {
      name: "Advanced Full-Stack",
      duration: "Months 10-12",
      description: "Integrate all skills, focus on deployment, testing, and professional development",
      weeklyGoals: [
        "Build complete applications",
        "Implement CI/CD pipelines",
        "Master testing strategies",
        "Contribute to open source",
        "Prepare for job interviews",
      ],
      dailyTasks: {
        Monday: [
          { task: "DevOps Theory: CI/CD & Deployment", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: Pipeline setup", timeEstimate: "30 min", type: "practice" },
          { task: "Project: Automated deployment", timeEstimate: "45 min", type: "project" },
        ],
        Tuesday: [
          { task: "Testing Theory: E2E & Integration", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: Comprehensive testing", timeEstimate: "30 min", type: "practice" },
          { task: "Project: Test automation", timeEstimate: "45 min", type: "project" },
        ],
        Wednesday: [
          { task: "Architecture Theory: System design", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: Design patterns", timeEstimate: "30 min", type: "practice" },
          { task: "Project: Scalable architecture", timeEstimate: "45 min", type: "project" },
        ],
        Thursday: [
          { task: "Performance Theory: Optimization", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: Performance tuning", timeEstimate: "30 min", type: "practice" },
          { task: "Project: Performance monitoring", timeEstimate: "45 min", type: "project" },
        ],
        Friday: [
          { task: "Open Source: Contribution research", timeEstimate: "45 min", type: "theory" },
          { task: "Practice: Code contributions", timeEstimate: "30 min", type: "practice" },
          { task: "Project: Community engagement", timeEstimate: "45 min", type: "project" },
        ],
        Saturday: [
          { task: "Review: Advanced concepts", timeEstimate: "60 min", type: "theory" },
          { task: "Interview: Technical preparation", timeEstimate: "30 min", type: "practice" },
          { task: "Portfolio: Project refinement", timeEstimate: "30 min", type: "project" },
        ],
        Sunday: [
          { task: "Project: Capstone development", timeEstimate: "90 min", type: "project" },
          { task: "Network: Community engagement", timeEstimate: "30 min", type: "practice" },
          { task: "Plan: Career preparation", timeEstimate: "30 min", type: "theory" },
        ],
      },
      milestones: [
        "Deploy 3 production applications",
        "Contribute to 5 open source projects",
        "Complete comprehensive portfolio",
        "Pass technical interviews",
      ],
      resources: ["System Design Primer", "DevOps Handbook", "Open Source Guides", "Interview Preparation Resources"],
    },
  }

  const currentTemplate = phaseTemplates[selectedPhase]

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case "theory":
        return "bg-blue-100 text-blue-800"
      case "practice":
        return "bg-green-100 text-green-800"
      case "project":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Learning Phase Templates</h1>
        <p className="text-gray-600 mb-4">
          Choose your current learning phase to get a customized weekly schedule template.
        </p>

        <Select value={selectedPhase} onValueChange={setSelectedPhase}>
          <SelectTrigger className="w-full max-w-md">
            <SelectValue placeholder="Select learning phase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="foundation">Foundation Phase (Months 1-3)</SelectItem>
            <SelectItem value="frontend">Front-End Development (Months 4-6)</SelectItem>
            <SelectItem value="backend">Back-End Development (Months 7-9)</SelectItem>
            <SelectItem value="fullstack">Advanced Full-Stack (Months 10-12)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {currentTemplate && (
        <div className="space-y-6">
          {/* Phase Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{currentTemplate.name}</span>
                <Badge variant="outline">{currentTemplate.duration}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{currentTemplate.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Weekly Goals:</h4>
                  <ul className="space-y-1">
                    {currentTemplate.weeklyGoals.map((goal, index) => (
                      <li key={index} className="text-sm flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Key Milestones:</h4>
                  <ul className="space-y-1">
                    {currentTemplate.milestones.map((milestone, index) => (
                      <li key={index} className="text-sm flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {milestone}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Schedule Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Schedule Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {Object.entries(currentTemplate.dailyTasks).map(([day, tasks]) => (
                  <div key={day} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">{day}</h4>
                    <div className="space-y-2">
                      {tasks.map((task, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className={`text-xs ${getTaskTypeColor(task.type)}`}>
                                {task.type}
                              </Badge>
                              <span className="font-medium">{task.task}</span>
                            </div>
                          </div>
                          <span className="text-gray-500 text-xs ml-2">{task.timeEstimate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentTemplate.resources.map((resource, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span className="text-sm">{resource}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button onClick={() => window.print()} className="flex-1">
              Print This Template
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Download as PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
