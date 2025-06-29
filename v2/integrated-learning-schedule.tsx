"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Target,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Circle,
  BookOpen,
  Lightbulb,
  Star,
  Trophy,
  Code,
  Database,
  Globe,
  TrendingUp,
} from "lucide-react";

// Types
interface Task {
  id: string;
  title: string;
  description: string;
  estimatedTime: number;
  actualTime: number;
  priority: "high" | "medium" | "low";
  category: "theory" | "practice" | "project" | "review" | "milestone";
  completed: boolean;
  deadline?: string;
  notes: string;
  skillArea: string;
  difficultyLevel: 1 | 2 | 3 | 4 | 5;
  resources: string[];
}

interface Challenge {
  id: string;
  description: string;
  impact: "high" | "medium" | "low";
  solution: string;
  resolved: boolean;
  dateEncountered: string;
  skillArea: string;
  lessonLearned: string;
}

interface WeeklyGoal {
  id: string;
  goal: string;
  progress: number;
  completed: boolean;
  priority: "high" | "medium" | "low";
  alignedMilestone: string;
  skillArea: string;
}

interface LearningPhase {
  id: string;
  name: string;
  duration: string;
  description: string;
  currentWeek: number;
  totalWeeks: number;
  skills: string[];
  milestones: Milestone[];
  resources: Resource[];
  weeklyFocus: { [week: number]: WeeklyFocus };
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  targetWeek: number;
  completed: boolean;
  completedDate?: string;
  skillsRequired: string[];
  deliverables: string[];
}

interface Resource {
  title: string;
  type: "course" | "book" | "article" | "video" | "practice";
  url?: string;
  priority: "essential" | "recommended" | "optional";
  estimatedTime: string;
}

interface WeeklyFocus {
  primarySkill: string;
  secondarySkills: string[];
  mainProject: string;
  practiceAreas: string[];
  theoryTopics: string[];
  assessmentCriteria: string[];
}

interface SkillProgress {
  skillName: string;
  currentLevel: number;
  targetLevel: number;
  lastAssessed: string;
  evidence: string[];
}

// Learning Phases Data
const phases = {
  foundation: {
    id: "foundation",
    name: "Foundation Phase",
    duration: "Months 1-3",
    description:
      "Master JavaScript fundamentals, HTML/CSS, and basic web development concepts",
    currentWeek: 1,
    totalWeeks: 12,
    skills: [
      "JavaScript Fundamentals",
      "HTML5 & Semantic Markup",
      "CSS3 & Responsive Design",
      "DOM Manipulation",
      "Git & Version Control",
      "Problem Solving",
      "Debugging",
      "Web APIs",
    ],
    milestones: [
      {
        id: "m1",
        title: "JavaScript Proficiency",
        description:
          "Complete understanding of JS fundamentals including functions, objects, arrays, and async programming",
        targetWeek: 4,
        completed: false,
        skillsRequired: [
          "Variables & Data Types",
          "Functions",
          "Objects & Arrays",
          "Async Programming",
        ],
        deliverables: ["Quiz App", "Calculator", "Todo List"],
      },
      {
        id: "m2",
        title: "Responsive Web Development",
        description:
          "Build responsive, accessible websites using modern HTML/CSS",
        targetWeek: 8,
        completed: false,
        skillsRequired: [
          "HTML5",
          "CSS3",
          "Flexbox",
          "Grid",
          "Responsive Design",
        ],
        deliverables: [
          "Portfolio Website",
          "Multi-page Site",
          "Mobile-first Design",
        ],
      },
      {
        id: "m3",
        title: "Interactive Web Applications",
        description:
          "Create dynamic web applications with DOM manipulation and API integration",
        targetWeek: 12,
        completed: false,
        skillsRequired: [
          "DOM Manipulation",
          "Event Handling",
          "Fetch API",
          "Local Storage",
        ],
        deliverables: [
          "Weather App",
          "Interactive Dashboard",
          "API-driven Project",
        ],
      },
    ],
    resources: [
      {
        title: "freeCodeCamp JavaScript Course",
        type: "course",
        priority: "essential",
        estimatedTime: "40 hours",
      },
      {
        title: "JavaScript.info",
        type: "book",
        priority: "essential",
        estimatedTime: "30 hours",
      },
      {
        title: "MDN Web Docs",
        type: "article",
        priority: "essential",
        estimatedTime: "ongoing",
      },
      {
        title: "Eloquent JavaScript",
        type: "book",
        priority: "recommended",
        estimatedTime: "25 hours",
      },
    ],
    weeklyFocus: {
      1: {
        primarySkill: "JavaScript Basics",
        secondarySkills: ["Problem Solving", "Development Environment"],
        mainProject: "Calculator Functions",
        practiceAreas: ["Variables", "Functions", "Basic Logic"],
        theoryTopics: ["Data Types", "Operators", "Control Flow"],
        assessmentCriteria: [
          "Can write basic functions",
          "Understands variable scope",
          "Uses proper syntax",
        ],
      },
      2: {
        primarySkill: "Control Flow & Functions",
        secondarySkills: ["Debugging", "Code Organization"],
        mainProject: "Number Guessing Game",
        practiceAreas: ["Loops", "Conditionals", "Function Parameters"],
        theoryTopics: ["Loop Types", "Function Scope", "Return Values"],
        assessmentCriteria: [
          "Masters loop patterns",
          "Writes reusable functions",
          "Handles edge cases",
        ],
      },
      // ... more weeks
    },
  },
  frontend: {
    id: "frontend",
    name: "Front-End Development",
    duration: "Months 4-6",
    description:
      "Master React, Next.js, and modern front-end development practices",
    currentWeek: 13,
    totalWeeks: 12,
    skills: [
      "React Fundamentals",
      "Next.js Framework",
      "Component Architecture",
      "State Management",
      "Modern CSS",
      "Testing",
      "Performance Optimization",
      "Accessibility",
    ],
    milestones: [
      {
        id: "m4",
        title: "React Mastery",
        description:
          "Build complex React applications with hooks and modern patterns",
        targetWeek: 16,
        completed: false,
        skillsRequired: [
          "Components",
          "Hooks",
          "State Management",
          "Event Handling",
        ],
        deliverables: [
          "React Todo App",
          "Component Library",
          "Interactive Dashboard",
        ],
      },
      {
        id: "m5",
        title: "Next.js Applications",
        description:
          "Deploy production-ready Next.js applications with SSR/SSG",
        targetWeek: 20,
        completed: false,
        skillsRequired: [
          "App Router",
          "Server Components",
          "API Routes",
          "Deployment",
        ],
        deliverables: ["Blog Platform", "E-commerce Site", "SaaS Landing Page"],
      },
      {
        id: "m6",
        title: "Professional Front-End",
        description:
          "Implement testing, optimization, and accessibility best practices",
        targetWeek: 24,
        completed: false,
        skillsRequired: ["Testing", "Performance", "Accessibility", "SEO"],
        deliverables: [
          "Tested Application",
          "Performance Report",
          "Accessibility Audit",
        ],
      },
    ],
    resources: [
      {
        title: "React Documentation",
        type: "article",
        priority: "essential",
        estimatedTime: "20 hours",
      },
      {
        title: "Next.js Learn Course",
        type: "course",
        priority: "essential",
        estimatedTime: "15 hours",
      },
      {
        title: "Testing Library Docs",
        type: "article",
        priority: "recommended",
        estimatedTime: "10 hours",
      },
    ],
    weeklyFocus: {
      13: {
        primarySkill: "React Components",
        secondarySkills: ["JSX", "Props", "Event Handling"],
        mainProject: "React Calculator",
        practiceAreas: [
          "Component Creation",
          "Props Passing",
          "Event Handling",
        ],
        theoryTopics: [
          "Virtual DOM",
          "Component Lifecycle",
          "React Philosophy",
        ],
        assessmentCriteria: [
          "Creates functional components",
          "Manages props effectively",
          "Handles user interactions",
        ],
      },
      // ... more weeks
    },
  },
  backend: {
    id: "backend",
    name: "Back-End Development",
    duration: "Months 7-9",
    description: "Learn server-side development, databases, and API creation",
    currentWeek: 25,
    totalWeeks: 12,
    skills: [
      "Node.js & Express",
      "Database Design",
      "API Development",
      "Authentication",
      "Security",
      "Testing",
      "Deployment",
      "Performance",
    ],
    milestones: [
      {
        id: "m7",
        title: "API Development",
        description:
          "Build secure, scalable RESTful APIs with proper documentation",
        targetWeek: 28,
        completed: false,
        skillsRequired: [
          "Node.js",
          "Express",
          "Database Integration",
          "API Design",
        ],
        deliverables: ["REST API", "API Documentation", "Database Schema"],
      },
      {
        id: "m8",
        title: "Authentication & Security",
        description:
          "Implement secure authentication and authorization systems",
        targetWeek: 32,
        completed: false,
        skillsRequired: [
          "JWT",
          "OAuth",
          "Security Best Practices",
          "Data Validation",
        ],
        deliverables: ["Auth System", "Security Audit", "Protected Routes"],
      },
      {
        id: "m9",
        title: "Production Deployment",
        description: "Deploy and monitor production-ready backend services",
        targetWeek: 36,
        completed: false,
        skillsRequired: ["Deployment", "Monitoring", "Performance", "Scaling"],
        deliverables: [
          "Production API",
          "Monitoring Dashboard",
          "Performance Report",
        ],
      },
    ],
    resources: [
      {
        title: "Node.js Documentation",
        type: "article",
        priority: "essential",
        estimatedTime: "15 hours",
      },
      {
        title: "PostgreSQL Tutorial",
        type: "course",
        priority: "essential",
        estimatedTime: "20 hours",
      },
      {
        title: "API Design Best Practices",
        type: "article",
        priority: "recommended",
        estimatedTime: "8 hours",
      },
    ],
    weeklyFocus: {
      25: {
        primarySkill: "Node.js Fundamentals",
        secondarySkills: ["NPM", "File System", "HTTP"],
        mainProject: "Basic HTTP Server",
        practiceAreas: [
          "Server Creation",
          "Request Handling",
          "Response Formatting",
        ],
        theoryTopics: ["Event Loop", "Modules", "Asynchronous Programming"],
        assessmentCriteria: [
          "Creates HTTP servers",
          "Handles requests/responses",
          "Uses Node.js modules",
        ],
      },
      // ... more weeks
    },
  },
  fullstack: {
    id: "fullstack",
    name: "Advanced Full-Stack",
    duration: "Months 10-12",
    description:
      "Integrate all skills, focus on deployment, testing, and professional development",
    currentWeek: 37,
    totalWeeks: 12,
    skills: [
      "Full-Stack Integration",
      "DevOps & CI/CD",
      "Advanced Testing",
      "Performance Optimization",
      "System Design",
      "Open Source",
      "Career Preparation",
      "Leadership",
    ],
    milestones: [
      {
        id: "m10",
        title: "Full-Stack Application",
        description:
          "Build and deploy a complete full-stack application with all modern practices",
        targetWeek: 40,
        completed: false,
        skillsRequired: [
          "Full-Stack Integration",
          "Testing",
          "Deployment",
          "Performance",
        ],
        deliverables: ["SaaS Application", "Test Suite", "CI/CD Pipeline"],
      },
      {
        id: "m11",
        title: "Open Source Contribution",
        description: "Make meaningful contributions to open source projects",
        targetWeek: 44,
        completed: false,
        skillsRequired: [
          "Code Review",
          "Collaboration",
          "Documentation",
          "Community Engagement",
        ],
        deliverables: [
          "5 Pull Requests",
          "Project Documentation",
          "Community Participation",
        ],
      },
      {
        id: "m12",
        title: "Job Readiness",
        description: "Complete portfolio and demonstrate job-ready skills",
        targetWeek: 48,
        completed: false,
        skillsRequired: [
          "Portfolio",
          "Interview Skills",
          "System Design",
          "Communication",
        ],
        deliverables: [
          "Professional Portfolio",
          "Interview Performance",
          "Technical Presentation",
        ],
      },
    ],
    resources: [
      {
        title: "System Design Primer",
        type: "book",
        priority: "essential",
        estimatedTime: "30 hours",
      },
      {
        title: "DevOps Handbook",
        type: "book",
        priority: "recommended",
        estimatedTime: "25 hours",
      },
      {
        title: "Open Source Guides",
        type: "article",
        priority: "essential",
        estimatedTime: "10 hours",
      },
    ],
    weeklyFocus: {
      37: {
        primarySkill: "DevOps & Deployment",
        secondarySkills: ["CI/CD", "Monitoring", "Security"],
        mainProject: "Automated Deployment Pipeline",
        practiceAreas: ["Docker", "GitHub Actions", "Cloud Deployment"],
        theoryTopics: [
          "DevOps Principles",
          "Infrastructure as Code",
          "Monitoring",
        ],
        assessmentCriteria: [
          "Sets up CI/CD",
          "Deploys to cloud",
          "Monitors applications",
        ],
      },
      // ... more weeks
    },
  },
};

export default function IntegratedLearningSchedule() {
  // State Management
  const [currentPhase, setCurrentPhase] = useState<LearningPhase>(
    phases.foundation
  );
  const [currentWeek, setCurrentWeek] = useState(1);
  const [weekStartDate, setWeekStartDate] = useState("");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isChallengeDialogOpen, setIsChallengeDialogOpen] = useState(false);
  const [isMilestoneDialogOpen, setIsMilestoneDialogOpen] = useState(false);

  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoal[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [schedule, setSchedule] = useState<{ [key: string]: Task[] }>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const [skillProgress, setSkillProgress] = useState<SkillProgress[]>([]);
  const [weeklyReflection, setWeeklyReflection] = useState({
    achievements: "",
    challenges: "",
    learnings: "",
    improvements: "",
    nextWeekFocus: "",
    timeManagement: "",
    skillsGained: "",
    blockers: "",
    milestoneProgress: "",
    communityEngagement: "",
  });

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Initialize phase-specific goals and skills
  useEffect(() => {
    const phaseGoals = generatePhaseGoals(currentPhase, currentWeek);
    setWeeklyGoals(phaseGoals);

    const phaseSkills = generateSkillProgress(currentPhase);
    setSkillProgress(phaseSkills);

    // Generate suggested tasks based on current week focus
    const suggestedTasks = generateSuggestedTasks(currentPhase, currentWeek);
    // This would populate the schedule with suggested tasks
  }, [currentPhase, currentWeek]);

  // Helper Functions
  const generatePhaseGoals = (
    phase: LearningPhase,
    week: number
  ): WeeklyGoal[] => {
    const weekFocus = phase.weeklyFocus[week];
    if (!weekFocus) return [];

    return [
      {
        id: "g1",
        goal: `Master ${weekFocus.primarySkill}`,
        progress: 0,
        completed: false,
        priority: "high",
        alignedMilestone:
          phase.milestones.find((m) => m.targetWeek >= week)?.title || "",
        skillArea: weekFocus.primarySkill,
      },
      {
        id: "g2",
        goal: `Complete ${weekFocus.mainProject}`,
        progress: 0,
        completed: false,
        priority: "high",
        alignedMilestone:
          phase.milestones.find((m) => m.targetWeek >= week)?.title || "",
        skillArea: "Project Work",
      },
      {
        id: "g3",
        goal: `Practice ${weekFocus.practiceAreas.join(", ")}`,
        progress: 0,
        completed: false,
        priority: "medium",
        alignedMilestone:
          phase.milestones.find((m) => m.targetWeek >= week)?.title || "",
        skillArea: "Practice",
      },
      {
        id: "g4",
        goal: "Maintain daily coding habit",
        progress: 0,
        completed: false,
        priority: "medium",
        alignedMilestone: "Consistency",
        skillArea: "Habits",
      },
    ];
  };

  const generateSkillProgress = (phase: LearningPhase): SkillProgress[] => {
    return phase.skills.map((skill, index) => ({
      skillName: skill,
      currentLevel: Math.floor(Math.random() * 3) + 1, // Simulated current level
      targetLevel: 4,
      lastAssessed: new Date().toISOString().split("T")[0],
      evidence: [],
    }));
  };

  const generateSuggestedTasks = (phase: LearningPhase, week: number) => {
    const weekFocus = phase.weeklyFocus[week];
    if (!weekFocus) return [];

    // Generate tasks based on the weekly focus
    const tasks = [
      ...weekFocus.theoryTopics.map((topic, index) => ({
        title: `Study: ${topic}`,
        category: "theory" as const,
        estimatedTime: 45,
        priority: "high" as const,
        skillArea: weekFocus.primarySkill,
      })),
      ...weekFocus.practiceAreas.map((area, index) => ({
        title: `Practice: ${area}`,
        category: "practice" as const,
        estimatedTime: 60,
        priority: "high" as const,
        skillArea: weekFocus.primarySkill,
      })),
      {
        title: `Work on: ${weekFocus.mainProject}`,
        category: "project" as const,
        estimatedTime: 90,
        priority: "high" as const,
        skillArea: "Project Work",
      },
    ];

    return tasks;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "theory":
        return <BookOpen className="w-4 h-4" />;
      case "practice":
        return <Target className="w-4 h-4" />;
      case "project":
        return <Star className="w-4 h-4" />;
      case "review":
        return <CheckCircle className="w-4 h-4" />;
      case "milestone":
        return <Trophy className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const calculatePhaseProgress = () => {
    const totalWeeks = currentPhase.totalWeeks;
    const completedWeeks = currentWeek - (currentPhase.currentWeek - 1);
    return Math.min(Math.round((completedWeeks / totalWeeks) * 100), 100);
  };

  const calculateMilestoneProgress = () => {
    const completedMilestones = currentPhase.milestones.filter(
      (m) => m.completed
    ).length;
    return Math.round(
      (completedMilestones / currentPhase.milestones.length) * 100
    );
  };

  const calculateSkillMastery = () => {
    if (skillProgress.length === 0) return 0;
    const totalProgress = skillProgress.reduce(
      (sum, skill) => sum + skill.currentLevel / skill.targetLevel,
      0
    );
    return Math.round((totalProgress / skillProgress.length) * 100);
  };

  // Task Management Functions
  const addTask = (day: string, task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
    };
    setSchedule((prev) => ({
      ...prev,
      [day]: [...prev[day], newTask],
    }));
  };

  const updateTask = (day: string, taskId: string, updates: Partial<Task>) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      ),
    }));
  };

  const deleteTask = (day: string, taskId: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].filter((task) => task.id !== taskId),
    }));
  };

  const addChallenge = (challenge: Omit<Challenge, "id">) => {
    const newChallenge: Challenge = {
      ...challenge,
      id: Date.now().toString(),
    };
    setChallenges((prev) => [...prev, newChallenge]);
  };

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
      skillArea: currentPhase.skills[0] || "",
      difficultyLevel: 3,
      resources: [],
    });

    useEffect(() => {
      if (editingTask) {
        setTaskForm(editingTask);
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
          skillArea: currentPhase.skills[0] || "",
          difficultyLevel: 3,
          resources: [],
        });
      }
    }, [editingTask]);

    const handleSubmit = () => {
      if (editingTask) {
        updateTask(selectedDay, editingTask.id, taskForm);
      } else {
        addTask(selectedDay, taskForm);
      }
      setIsTaskDialogOpen(false);
      setEditingTask(null);
    };

    return (
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingTask ? "Edit Task" : "Add New Task"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={taskForm.title}
                  onChange={(e) =>
                    setTaskForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <Label htmlFor="skillArea">Skill Area</Label>
                <Select
                  value={taskForm.skillArea}
                  onValueChange={(value) =>
                    setTaskForm((prev) => ({ ...prev, skillArea: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currentPhase.skills.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={taskForm.description}
                onChange={(e) =>
                  setTaskForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Task description and learning objectives"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={taskForm.priority}
                  onValueChange={(value: any) =>
                    setTaskForm((prev) => ({ ...prev, priority: value }))
                  }
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
                  onValueChange={(value: any) =>
                    setTaskForm((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theory">Theory</SelectItem>
                    <SelectItem value="practice">Practice</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="milestone">Milestone</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="difficulty">Difficulty (1-5)</Label>
                <Select
                  value={taskForm.difficultyLevel.toString()}
                  onValueChange={(value) =>
                    setTaskForm((prev) => ({
                      ...prev,
                      difficultyLevel: Number.parseInt(value) as
                        | 1
                        | 2
                        | 3
                        | 4
                        | 5,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Beginner</SelectItem>
                    <SelectItem value="2">2 - Easy</SelectItem>
                    <SelectItem value="3">3 - Medium</SelectItem>
                    <SelectItem value="4">4 - Hard</SelectItem>
                    <SelectItem value="5">5 - Expert</SelectItem>
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
                    setTaskForm((prev) => ({
                      ...prev,
                      estimatedTime: Number.parseInt(e.target.value) || 0,
                    }))
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
                    setTaskForm((prev) => ({
                      ...prev,
                      actualTime: Number.parseInt(e.target.value) || 0,
                    }))
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
                onChange={(e) =>
                  setTaskForm((prev) => ({ ...prev, deadline: e.target.value }))
                }
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes & Learning Outcomes</Label>
              <Textarea
                id="notes"
                value={taskForm.notes}
                onChange={(e) =>
                  setTaskForm((prev) => ({ ...prev, notes: e.target.value }))
                }
                placeholder="Additional notes, learning outcomes, or reflections"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsTaskDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingTask ? "Update" : "Add"} Task
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Header with Phase Navigation */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Full-Stack Developer Journey
            </h1>
            <p className="text-gray-600 mt-2">
              {currentPhase.name} - Week {currentWeek} of{" "}
              {currentPhase.totalWeeks}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => window.print()}>Print Schedule</Button>
            <Button
              variant="outline"
              onClick={() => setIsChallengeDialogOpen(true)}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Add Challenge
            </Button>
          </div>
        </div>

        {/* Phase Selection */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {Object.values(phases).map((phase) => (
            <Card
              key={phase.id}
              className={`cursor-pointer transition-all ${
                currentPhase.id === phase.id
                  ? "ring-2 ring-blue-500 bg-blue-50"
                  : "hover:shadow-md"
              }`}
              onClick={() => setCurrentPhase(phase)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  {phase.id === "foundation" && (
                    <Code className="w-5 h-5 text-blue-600" />
                  )}
                  {phase.id === "frontend" && (
                    <Globe className="w-5 h-5 text-green-600" />
                  )}
                  {phase.id === "backend" && (
                    <Database className="w-5 h-5 text-purple-600" />
                  )}
                  {phase.id === "fullstack" && (
                    <Star className="w-5 h-5 text-orange-600" />
                  )}
                  <span className="font-semibold text-sm">{phase.name}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{phase.duration}</p>
                <Progress
                  value={
                    phase.id === currentPhase.id ? calculatePhaseProgress() : 0
                  }
                  className="h-2"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {calculatePhaseProgress()}%
              </div>
              <div className="text-xs text-gray-600">Phase Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {calculateMilestoneProgress()}%
              </div>
              <div className="text-xs text-gray-600">Milestones</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {calculateSkillMastery()}%
              </div>
              <div className="text-xs text-gray-600">Skill Mastery</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {
                  Object.values(schedule)
                    .flat()
                    .filter((t) => t.completed).length
                }
              </div>
              <div className="text-xs text-gray-600">Tasks Done</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {challenges.filter((c) => !c.resolved).length}
              </div>
              <div className="text-xs text-gray-600">Active Issues</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">
                {currentWeek}
              </div>
              <div className="text-xs text-gray-600">Current Week</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="reflection">Reflection</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        {/* Weekly Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          {/* Weekly Goals with Phase Alignment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>
                  Weekly Goals -{" "}
                  {currentPhase.weeklyFocus[currentWeek]?.primarySkill ||
                    "General Focus"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg"
                  >
                    <Checkbox
                      checked={goal.completed}
                      onCheckedChange={(checked) =>
                        setWeeklyGoals((prev) =>
                          prev.map((g) =>
                            g.id === goal.id
                              ? { ...g, completed: !!checked }
                              : g
                          )
                        )
                      }
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium">{goal.goal}</span>
                        <Badge className={getPriorityColor(goal.priority)}>
                          {goal.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {goal.skillArea}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-gray-600">
                          Aligned with: {goal.alignedMilestone}
                        </span>
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
                                g.id === goal.id
                                  ? {
                                      ...g,
                                      progress:
                                        Number.parseInt(e.target.value) || 0,
                                    }
                                  : g
                              )
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Daily Schedule</span>
                </div>
                <div className="flex items-center space-x-2">
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
                      setEditingTask(null);
                      setIsTaskDialogOpen(true);
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
                        onClick={() => {
                          setSelectedDay(day);
                          setEditingTask(null);
                          setIsTaskDialogOpen(true);
                        }}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {schedule[day]
                        .sort((a, b) => {
                          const priorityOrder = { high: 3, medium: 2, low: 1 };
                          return (
                            priorityOrder[b.priority] -
                            priorityOrder[a.priority]
                          );
                        })
                        .map((task) => (
                          <div
                            key={task.id}
                            className="border rounded-lg p-3 space-y-2"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-2 flex-1">
                                <Checkbox
                                  checked={task.completed}
                                  onCheckedChange={(checked) =>
                                    updateTask(day, task.id, {
                                      completed: !!checked,
                                    })
                                  }
                                  className="mt-1"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2 mb-1">
                                    {getCategoryIcon(task.category)}
                                    <span className="font-medium text-sm">
                                      {task.title}
                                    </span>
                                    <Badge
                                      className={`text-xs ${getPriorityColor(
                                        task.priority
                                      )}`}
                                    >
                                      {task.priority}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center space-x-2 mb-1">
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {task.skillArea}
                                    </Badge>
                                    <div className="flex items-center">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-3 h-3 ${
                                            i < task.difficultyLevel
                                              ? "text-yellow-400 fill-current"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  {task.description && (
                                    <p className="text-xs text-gray-600 mb-2">
                                      {task.description}
                                    </p>
                                  )}
                                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                                    <span>Est: {task.estimatedTime}min</span>
                                    {task.actualTime > 0 && (
                                      <span
                                        className={
                                          task.actualTime > task.estimatedTime
                                            ? "text-red-600"
                                            : "text-green-600"
                                        }
                                      >
                                        Actual: {task.actualTime}min
                                      </span>
                                    )}
                                    {task.deadline && (
                                      <span>
                                        Due:{" "}
                                        {new Date(
                                          task.deadline
                                        ).toLocaleDateString()}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setSelectedDay(day);
                                    setEditingTask(task);
                                    setIsTaskDialogOpen(true);
                                  }}
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => deleteTask(day, task.id)}
                                >
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
                                    updateTask(day, task.id, {
                                      actualTime:
                                        Number.parseInt(e.target.value) || 0,
                                    })
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
                            className="mt-2"
                            onClick={() => {
                              setSelectedDay(day);
                              setEditingTask(null);
                              setIsTaskDialogOpen(true);
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
        </TabsContent>

        {/* Milestones Tab */}
        <TabsContent value="milestones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>{currentPhase.name} Milestones</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {currentPhase.milestones.map((milestone, index) => (
                  <div key={milestone.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            milestone.completed
                              ? "bg-green-100 text-green-600"
                              : milestone.targetWeek <= currentWeek
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {milestone.completed ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Trophy className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            milestone.targetWeek <= currentWeek
                              ? "default"
                              : "outline"
                          }
                        >
                          Week {milestone.targetWeek}
                        </Badge>
                        {milestone.completed && milestone.completedDate && (
                          <p className="text-xs text-green-600 mt-1">
                            Completed:{" "}
                            {new Date(
                              milestone.completedDate
                            ).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Required Skills:</h4>
                        <div className="space-y-1">
                          {milestone.skillsRequired.map((skill, skillIndex) => (
                            <div
                              key={skillIndex}
                              className="flex items-center space-x-2"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Deliverables:</h4>
                        <div className="space-y-1">
                          {milestone.deliverables.map(
                            (deliverable, delIndex) => (
                              <div
                                key={delIndex}
                                className="flex items-center space-x-2"
                              >
                                <Star className="w-4 h-4 text-blue-500" />
                                <span className="text-sm">{deliverable}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    {!milestone.completed && (
                      <div className="mt-4 pt-4 border-t">
                        <Button
                          size="sm"
                          onClick={() => {
                            // Mark milestone as completed
                            setCurrentPhase((prev) => ({
                              ...prev,
                              milestones: prev.milestones.map((m) =>
                                m.id === milestone.id
                                  ? {
                                      ...m,
                                      completed: true,
                                      completedDate: new Date().toISOString(),
                                    }
                                  : m
                              ),
                            }));
                          }}
                        >
                          Mark as Completed
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Skill Progress Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillProgress.map((skill, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{skill.skillName}</h4>
                      <Badge variant="outline">
                        {skill.currentLevel}/{skill.targetLevel}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Progress</span>
                        <span>
                          {Math.round(
                            (skill.currentLevel / skill.targetLevel) * 100
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={(skill.currentLevel / skill.targetLevel) * 100}
                        className="h-2"
                      />
                    </div>

                    <div className="mt-3 flex items-center space-x-2">
                      <Label className="text-xs">Current Level:</Label>
                      <Select
                        value={skill.currentLevel.toString()}
                        onValueChange={(value) => {
                          setSkillProgress((prev) =>
                            prev.map((s, i) =>
                              i === index
                                ? {
                                    ...s,
                                    currentLevel: Number.parseInt(value),
                                    lastAssessed: new Date()
                                      .toISOString()
                                      .split("T")[0],
                                  }
                                : s
                            )
                          );
                        }}
                      >
                        <SelectTrigger className="w-20 h-6 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4].map((level) => (
                            <SelectItem key={level} value={level.toString()}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="mt-2 text-xs text-gray-500">
                      Last assessed:{" "}
                      {new Date(skill.lastAssessed).toLocaleDateString()}
                    </div>

                    {skill.evidence.length > 0 && (
                      <div className="mt-3">
                        <h5 className="text-xs font-medium mb-1">Evidence:</h5>
                        <div className="space-y-1">
                          {skill.evidence.map((evidence, evidenceIndex) => (
                            <div
                              key={evidenceIndex}
                              className="text-xs text-gray-600 bg-gray-50 p-1 rounded"
                            >
                              {evidence}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Challenges Tab */}
        <TabsContent value="challenges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Challenges & Solutions</span>
                </div>
                <Button onClick={() => setIsChallengeDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Challenge
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {challenges.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No challenges recorded yet</p>
                  <p className="text-sm">
                    Document obstacles as they arise to track your
                    problem-solving progress
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {challenges.map((challenge) => (
                    <div key={challenge.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(challenge.impact)}>
                            {challenge.impact} impact
                          </Badge>
                          <Badge variant="outline">{challenge.skillArea}</Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(
                              challenge.dateEncountered
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <Checkbox
                          checked={challenge.resolved}
                          onCheckedChange={(checked) => {
                            setChallenges((prev) =>
                              prev.map((c) =>
                                c.id === challenge.id
                                  ? { ...c, resolved: !!checked }
                                  : c
                              )
                            );
                          }}
                        />
                      </div>

                      <div className="space-y-3">
                        <div>
                          <strong className="text-sm">Challenge:</strong>
                          <p className="text-sm text-gray-700 mt-1">
                            {challenge.description}
                          </p>
                        </div>

                        {challenge.solution && (
                          <div>
                            <strong className="text-sm">Solution:</strong>
                            <p className="text-sm text-gray-700 mt-1">
                              {challenge.solution}
                            </p>
                          </div>
                        )}

                        {challenge.lessonLearned && (
                          <div>
                            <strong className="text-sm">Lesson Learned:</strong>
                            <p className="text-sm text-gray-700 mt-1">
                              {challenge.lessonLearned}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reflection Tab */}
        <TabsContent value="reflection" className="space-y-6">
          <Card>
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
                    <Label className="text-sm font-medium">
                      🎯 Key Achievements
                    </Label>
                    <Textarea
                      value={weeklyReflection.achievements}
                      onChange={(e) =>
                        setWeeklyReflection((prev) => ({
                          ...prev,
                          achievements: e.target.value,
                        }))
                      }
                      placeholder="What did you accomplish this week?"
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      🤔 Main Challenges
                    </Label>
                    <Textarea
                      value={weeklyReflection.challenges}
                      onChange={(e) =>
                        setWeeklyReflection((prev) => ({
                          ...prev,
                          challenges: e.target.value,
                        }))
                      }
                      placeholder="What obstacles did you face?"
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      💡 Key Learnings
                    </Label>
                    <Textarea
                      value={weeklyReflection.learnings}
                      onChange={(e) =>
                        setWeeklyReflection((prev) => ({
                          ...prev,
                          learnings: e.target.value,
                        }))
                      }
                      placeholder="What new concepts did you master?"
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      🚀 Skills Gained
                    </Label>
                    <Textarea
                      value={weeklyReflection.skillsGained}
                      onChange={(e) =>
                        setWeeklyReflection((prev) => ({
                          ...prev,
                          skillsGained: e.target.value,
                        }))
                      }
                      placeholder="What new skills did you develop?"
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      🏆 Milestone Progress
                    </Label>
                    <Textarea
                      value={weeklyReflection.milestoneProgress}
                      onChange={(e) =>
                        setWeeklyReflection((prev) => ({
                          ...prev,
                          milestoneProgress: e.target.value,
                        }))
                      }
                      placeholder="How did you progress toward your milestones?"
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">
                      📈 Areas for Improvement
                    </Label>
                    <Textarea
                      value={weeklyReflection.improvements}
                      onChange={(e) =>
                        setWeeklyReflection((prev) => ({
                          ...prev,
                          improvements: e.target.value,
                        }))
                      }
                      placeholder="What could you do better next week?"
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      ⏰ Time Management Insights
                    </Label>
                    <Textarea
                      value={weeklyReflection.timeManagement}
                      onChange={(e) =>
                        setWeeklyReflection((prev) => ({
                          ...prev,
                          timeManagement: e.target.value,
                        }))
                      }
                      placeholder="How was your time estimation and management?"
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      🚧 Blockers & Solutions
                    </Label>
                    <Textarea
                      value={weeklyReflection.blockers}
                      onChange={(e) =>
                        setWeeklyReflection((prev) => ({
                          ...prev,
                          blockers: e.target.value,
                        }))
                      }
                      placeholder="What blocked your progress and how did you solve it?"
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      👥 Community Engagement
                    </Label>
                    <Textarea
                      value={weeklyReflection.communityEngagement}
                      onChange={(e) =>
                        setWeeklyReflection((prev) => ({
                          ...prev,
                          communityEngagement: e.target.value,
                        }))
                      }
                      placeholder="How did you engage with the developer community?"
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      🎯 Next Week's Focus
                    </Label>
                    <Textarea
                      value={weeklyReflection.nextWeekFocus}
                      onChange={(e) =>
                        setWeeklyReflection((prev) => ({
                          ...prev,
                          nextWeekFocus: e.target.value,
                        }))
                      }
                      placeholder="What will you prioritize next week?"
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>{currentPhase.name} Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentPhase.resources.map((resource, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {resource.type === "course" && (
                            <BookOpen className="w-4 h-4 text-blue-600" />
                          )}
                          {resource.type === "book" && (
                            <BookOpen className="w-4 h-4 text-green-600" />
                          )}
                          {resource.type === "article" && (
                            <Globe className="w-4 h-4 text-purple-600" />
                          )}
                          {resource.type === "video" && (
                            <Star className="w-4 h-4 text-red-600" />
                          )}
                          {resource.type === "practice" && (
                            <Target className="w-4 h-4 text-orange-600" />
                          )}
                          <span className="font-medium text-sm">
                            {resource.title}
                          </span>
                        </div>
                        <Badge
                          variant={
                            resource.priority === "essential"
                              ? "default"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {resource.priority}
                        </Badge>
                      </div>

                      <div className="text-xs text-gray-600 mb-2">
                        <span className="capitalize">{resource.type}</span> •{" "}
                        {resource.estimatedTime}
                      </div>

                      {resource.url && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-xs bg-transparent"
                          asChild
                        >
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Access Resource
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Weekly Focus Resources */}
              {currentPhase.weeklyFocus[currentWeek] && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    This Week's Focus
                  </h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Primary Skill</h4>
                        <p className="text-sm text-gray-700">
                          {currentPhase.weeklyFocus[currentWeek].primarySkill}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Main Project</h4>
                        <p className="text-sm text-gray-700">
                          {currentPhase.weeklyFocus[currentWeek].mainProject}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Theory Topics</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {currentPhase.weeklyFocus[
                            currentWeek
                          ].theoryTopics.map((topic, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <Circle className="w-2 h-2 fill-current" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Practice Areas</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {currentPhase.weeklyFocus[
                            currentWeek
                          ].practiceAreas.map((area, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <Circle className="w-2 h-2 fill-current" />
                              <span>{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">Assessment Criteria</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {currentPhase.weeklyFocus[
                          currentWeek
                        ].assessmentCriteria.map((criteria, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-700">
                              {criteria}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Challenge Dialog */}
      <Dialog
        open={isChallengeDialogOpen}
        onOpenChange={setIsChallengeDialogOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Challenge/Roadblock</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="challenge-desc">Challenge Description</Label>
              <Textarea
                id="challenge-desc"
                placeholder="Describe the challenge or roadblock you encountered"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="impact">Impact Level</Label>
                <Select defaultValue="medium">
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
                <Label htmlFor="skill-area">Skill Area</Label>
                <Select defaultValue={currentPhase.skills[0]}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currentPhase.skills.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="solution">Solution/Strategy</Label>
              <Textarea
                id="solution"
                placeholder="How did you solve it or plan to solve it?"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="lesson">Lesson Learned</Label>
              <Textarea
                id="lesson"
                placeholder="What did you learn from this challenge?"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="date">Date Encountered</Label>
              <Input
                id="date"
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="resolved" />
              <Label htmlFor="resolved">Challenge Resolved</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsChallengeDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Add challenge logic here
                  setIsChallengeDialogOpen(false);
                }}
              >
                Add Challenge
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <TaskDialog />

      {/* Footer with Navigation */}
      <div className="mt-12 pt-8 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              disabled={currentWeek <= 1}
              onClick={() => setCurrentWeek((prev) => Math.max(1, prev - 1))}
            >
              ← Previous Week
            </Button>
            <span className="text-sm text-gray-600">
              Week {currentWeek} of {currentPhase.totalWeeks}
            </span>
            <Button
              variant="outline"
              disabled={currentWeek >= currentPhase.totalWeeks}
              onClick={() =>
                setCurrentWeek((prev) =>
                  Math.min(currentPhase.totalWeeks, prev + 1)
                )
              }
            >
              Next Week →
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Full-Stack Developer Journey - {calculatePhaseProgress()}%
              Complete
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Stay consistent, code daily, and celebrate small wins!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
