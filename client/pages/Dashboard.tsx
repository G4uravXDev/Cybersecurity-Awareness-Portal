import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { coursesData, getCourseById } from "@/lib/coursesData";
import { quizzesData } from "@/lib/quizzesData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Shield,
  BookOpen,
  Calendar,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

// Security level progression system
const getSecurityLevel = (completedCourses: number) => {
  if (completedCourses === 0) {
    return {
      level: "Newbie",
      levelNumber: 1,
      variant: "secondary" as const,
      nextLevel: "Beginner",
      coursesNeeded: 4,
    };
  } else if (completedCourses < 4) {
    return {
      level: "Newbie",
      levelNumber: 1,
      variant: "secondary" as const,
      nextLevel: "Beginner",
      coursesNeeded: 4 - completedCourses,
    };
  } else if (completedCourses < 8) {
    return {
      level: "Beginner",
      levelNumber: 2,
      variant: "outline" as const,
      nextLevel: "Intermediate",
      coursesNeeded: 8 - completedCourses,
    };
  } else if (completedCourses < 15) {
    return {
      level: "Intermediate",
      levelNumber: 3,
      variant: "default" as const,
      nextLevel: "Advanced",
      coursesNeeded: 15 - completedCourses,
    };
  } else if (completedCourses < 25) {
    return {
      level: "Advanced",
      levelNumber: 4,
      variant: "default" as const,
      nextLevel: "Expert",
      coursesNeeded: 25 - completedCourses,
    };
  } else if (completedCourses < 40) {
    return {
      level: "Expert",
      levelNumber: 5,
      variant: "destructive" as const,
      nextLevel: "Master",
      coursesNeeded: 40 - completedCourses,
    };
  } else {
    return {
      level: "Master",
      levelNumber: 6,
      variant: "destructive" as const,
      nextLevel: "Max Level",
      coursesNeeded: 0,
    };
  }
};

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    coursesInProgress: 0,
    quizzesTaken: 0,
    averageScore: 0,
    studyStreak: 0,
    totalCourses: coursesData.length,
    totalQuizzes: quizzesData.length,
  });

  useEffect(() => {
    const enrolledCoursesCount = user?.enrolledCourses?.length || 0;
    const completedCourses = Math.min(enrolledCoursesCount, 3);
    const inProgressCourses = enrolledCoursesCount - completedCourses;
    const quizzesTaken = completedCourses * 2;
    const averageScore =
      completedCourses > 0 ? Math.floor(Math.random() * 25) + 75 : 0;
    const studyStreak =
      enrolledCoursesCount > 0 ? Math.floor(Math.random() * 20) + 5 : 0;

    setStats({
      coursesCompleted: completedCourses,
      coursesInProgress: inProgressCourses,
      quizzesTaken,
      averageScore,
      studyStreak,
      totalCourses: coursesData.length,
      totalQuizzes: quizzesData.length,
    });
  }, [user?.enrolledCourses]);

  const securityInfo = getSecurityLevel(stats.coursesCompleted);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container px-4 py-10 flex-1">
        {/* Welcome Section */}
        <div className="mb-10 animate-fade-up">
          <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Security Overview
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 text-foreground">
            Welcome back, {user?.name || "Defender"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor your cybersecurity curriculum, certifications, and threat readiness
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <Card className="border border-border/60 bg-card shadow-sm animate-fade-up delay-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Courses Completed
                  </p>
                  <p className="text-3xl font-bold tracking-tight text-foreground mt-1">
                    {stats.coursesCompleted}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-muted/60 flex items-center justify-center text-muted-foreground">
                  <BookOpen className="h-5 w-5" />
                </div>
              </div>
              <div>
                <Progress
                  value={
                    stats.coursesCompleted > 0
                      ? (stats.coursesCompleted / 4) * 100
                      : 0
                  }
                  className="h-1.5"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {stats.coursesCompleted > 0
                    ? `${Math.round((stats.coursesCompleted / 4) * 100)}% of primary track completed`
                    : "Enroll in your first module to begin"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-card shadow-sm animate-fade-up delay-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Security Level
                  </p>
                  <p className="text-3xl font-bold tracking-tight text-foreground mt-1">
                    {securityInfo.level}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-muted/60 flex items-center justify-center text-muted-foreground">
                  <Shield className="h-5 w-5" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant={securityInfo.variant}
                    className="text-xs font-normal"
                  >
                    Level {securityInfo.levelNumber}
                  </Badge>
                  {securityInfo.coursesNeeded > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {securityInfo.coursesNeeded} more to {securityInfo.nextLevel}
                    </p>
                  )}
                </div>
                {securityInfo.coursesNeeded > 0 && (
                  <Progress
                    value={
                      securityInfo.level === "Newbie"
                        ? (stats.coursesCompleted / 4) * 100
                        : ((stats.coursesCompleted - 4) / 4) * 100
                    }
                    className="h-1.5"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2 space-y-6 animate-fade-up delay-300">
            <Card className="border border-border/60 bg-card shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  Enrolled Courses
                </CardTitle>
                <CardDescription className="text-xs">
                  Active learning modules and curriculum progression
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user?.enrolledCourses && user.enrolledCourses.length > 0 ? (
                    user.enrolledCourses.map((courseId, index) => {
                      const course = getCourseById(courseId);
                      if (!course) return null;

                      const baseProgress = Math.max(0, 100 - index * 25);
                      const progress = Math.min(100, Math.max(10, baseProgress));
                      const isCompleted = progress >= 95;

                      return (
                        <div
                          key={courseId}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors gap-3"
                        >
                          <div className="space-y-1">
                            <p className="font-medium text-sm text-foreground">
                              {course.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {course.category} • {course.difficulty} • {course.duration}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-24">
                              <Progress value={progress} className="h-1.5" />
                            </div>
                            <Badge
                              variant={isCompleted ? "default" : "outline"}
                              className="text-xs font-normal"
                            >
                              {isCompleted ? "Completed" : `${progress}%`}
                            </Badge>
                            <Button size="sm" variant="ghost" asChild className="h-8 px-2 text-xs">
                              <Link to={`/learning/${course.id}/enrolled`}>
                                Continue
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12 border border-dashed border-border/60 rounded-xl">
                      <BookOpen className="h-8 w-8 mx-auto text-muted-foreground/60 mb-3" />
                      <p className="text-sm font-medium text-foreground">No active enrollments</p>
                      <p className="text-xs text-muted-foreground mb-4 mt-0.5">
                        Explore expert-curated security pathways to build defense expertise.
                      </p>
                      <Button asChild size="sm" className="rounded-full px-5 text-xs">
                        <Link to="/learning">Browse Courses</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 animate-fade-up delay-400">
            <Card className="border border-border/60 bg-card shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Webinar</span>
                    <span>Tomorrow, 2:00 PM</span>
                  </div>
                  <p className="font-medium text-sm text-foreground">
                    Zero Trust Network Architecture
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Live session with enterprise security architects.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Assessment</span>
                    <span>3 days left</span>
                  </div>
                  <p className="font-medium text-sm text-foreground">
                    Incident Response Certification
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Complete your practical mitigation test.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
