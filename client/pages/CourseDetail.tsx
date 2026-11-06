import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  CheckCircle,
  PlayCircle,
  Award,
  ArrowLeft,
  Shield,
  Layers,
} from "lucide-react";
import { getCourseById } from "@/lib/coursesData";

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { enrollInCourse, isEnrolledInCourse } = useAuth();
  const course = courseId ? getCourseById(courseId) : null;
  const isEnrolled = courseId ? isEnrolledInCourse(courseId) : false;

  const handleEnrollment = () => {
    if (courseId) {
      enrollInCourse(courseId);
      setTimeout(() => {
        navigate(`/learning/${courseId}/enrolled`);
      }, 600);
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="container px-4 py-16 text-center max-w-md mx-auto flex-1 flex flex-col items-center justify-center">
          <Shield className="h-10 w-10 text-muted-foreground mb-4" />
          <h1 className="text-xl font-bold tracking-tight text-foreground mb-2">
            Module Not Found
          </h1>
          <p className="text-xs text-muted-foreground mb-6">
            The requested course specification could not be located in the catalog.
          </p>
          <Button asChild size="sm" variant="outline" className="h-8 text-xs">
            <Link to="/learning">Return to Learning Center</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const getDifficultyVariant = (difficulty: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (difficulty) {
      case "Beginner":
        return "secondary";
      case "Intermediate":
        return "default";
      case "Advanced":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container px-4 py-10 flex-1">
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center justify-between mb-8 animate-fade-down">
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground" asChild>
            <Link to="/learning">
              <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
              All Courses
            </Link>
          </Button>
          <div className="flex items-center space-x-1.5 text-xs text-muted-foreground">
            <span>Learning</span>
            <span>/</span>
            <span className="text-muted-foreground">{course.category}</span>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[200px]">{course.title}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 animate-fade-up">
            {/* Course Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant={getDifficultyVariant(course.difficulty)} className="text-xs font-normal">
                  {course.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs font-normal border-border/80">
                  {course.category}
                </Badge>
                {course.certification && (
                  <Badge variant="outline" className="text-xs font-normal text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                    <Award className="h-3 w-3 mr-1" />
                    Certification Available
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                {course.title}
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                {course.description}
              </p>

              {/* Enrollment Banner */}
              <div className="p-4 rounded-xl border border-border/80 bg-card/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs font-medium text-foreground">Self-Paced Comprehensive Track</p>
                  <p className="text-[11px] text-muted-foreground">Includes hands-on labs, interactive quizzes, and credential badge.</p>
                </div>
                {isEnrolled ? (
                  <Button className="h-9 px-5 text-xs font-medium" asChild>
                    <Link to={`/learning/${courseId}/enrolled`}>
                      <PlayCircle className="h-3.5 w-3.5 mr-1.5" />
                      Resume Course
                    </Link>
                  </Button>
                ) : (
                  <Button onClick={handleEnrollment} className="h-9 px-6 text-xs font-medium shadow-md shadow-primary/20">
                    <PlayCircle className="h-3.5 w-3.5 mr-1.5" />
                    Enroll Free & Begin
                  </Button>
                )}
              </div>

              {/* Course Metric Blocks */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-xl border border-border/70 bg-card/60 text-center">
                  <Clock className="h-4 w-4 mx-auto mb-2 text-primary" />
                  <div className="text-xl font-bold font-mono text-foreground">{course.duration}</div>
                  <div className="text-[11px] text-muted-foreground">Duration</div>
                </div>
                <div className="p-4 rounded-xl border border-border/70 bg-card/60 text-center">
                  <Users className="h-4 w-4 mx-auto mb-2 text-primary" />
                  <div className="text-xl font-bold font-mono text-foreground">{course.students ? (course.students / 1000).toFixed(1) + 'k' : '2.4k'}</div>
                  <div className="text-[11px] text-muted-foreground">Active Learners</div>
                </div>
                <div className="p-4 rounded-xl border border-border/70 bg-card/60 text-center">
                  <Star className="h-4 w-4 mx-auto mb-2 text-amber-400 fill-amber-400" />
                  <div className="text-xl font-bold font-mono text-foreground">{course.rating || '4.8'}</div>
                  <div className="text-[11px] text-muted-foreground">Rating</div>
                </div>
                <div className="p-4 rounded-xl border border-border/70 bg-card/60 text-center">
                  <BookOpen className="h-4 w-4 mx-auto mb-2 text-primary" />
                  <div className="text-xl font-bold font-mono text-foreground">{course.syllabus?.length || 8}</div>
                  <div className="text-[11px] text-muted-foreground">Core Modules</div>
                </div>
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="curriculum" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 h-9 bg-muted/50 p-1">
                <TabsTrigger value="curriculum" className="text-xs">Syllabus</TabsTrigger>
                <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                <TabsTrigger value="instructor" className="text-xs">Lead Instructor</TabsTrigger>
              </TabsList>

              {/* Curriculum Tab */}
              <TabsContent value="curriculum" className="space-y-4">
                <Card className="border border-border/80 bg-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold">Course Syllabus</CardTitle>
                    <CardDescription className="text-xs">
                      Module structure, topics covered, and scheduled exercises
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {course.syllabus ? (
                      <div className="space-y-4">
                        {course.syllabus.map((module, index) => (
                          <div key={index} className="border border-border/60 rounded-xl p-4 bg-muted/20">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-sm text-foreground">
                                Module {index + 1}: {(module as any).title || module.module}
                              </h4>
                              {module.duration && (
                                <span className="text-[11px] font-mono text-muted-foreground">{module.duration}</span>
                              )}
                            </div>
                            <ul className="space-y-1.5 pt-2 border-t border-border/40">
                              {module.topics.map((topic, topicIndex) => (
                                <li
                                  key={topicIndex}
                                  className="text-xs text-muted-foreground flex items-center space-x-2"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">Comprehensive module syllabus available upon enrollment.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <Card className="border border-border/80 bg-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold">Track Description</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                    <p className="text-foreground font-medium text-sm">
                      {course.description}
                    </p>
                    <p>
                      This curriculum is structured for practitioners seeking real-world defensive proficiency in {course.category.toLowerCase()}. All concepts include technical context, incident scenarios, and practical countermeasures.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Instructor Tab */}
              <TabsContent value="instructor">
                <Card className="border border-border/80 bg-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold">Instructor Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-primary font-mono">
                          {course.instructor?.charAt(0) || "CS"}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-foreground">
                          {course.instructor || "Principal Security Engineer"}
                        </h4>
                        <p className="text-xs text-primary font-medium mb-2">
                          Enterprise Threat Analysis & SecOps Leader
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Over 12 years of hands-on security architecture, penetration testing, and enterprise incident response consulting.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-5 animate-fade-up delay-200">
            {/* Learning Objectives */}
            <Card className="border border-border/80 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  What You'll Master
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5 text-xs text-muted-foreground">
                  {course.objectives?.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{objective}</span>
                    </li>
                  )) || (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>Core security principles and threat mechanics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>Tactical incident mitigation and posture evaluation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>Industry frameworks including NIST CSF and CIS Controls</span>
                      </li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Quick Details */}
            <Card className="border border-border/80 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-primary" />
                  Track Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-border/60 text-xs">
                <div className="flex justify-between py-2 first:pt-0">
                  <span className="text-muted-foreground">Prerequisites</span>
                  <span className="font-medium text-foreground">Basic IT Knowledge</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Credential</span>
                  <span className="font-medium text-emerald-400">Verified Certificate</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Access</span>
                  <span className="font-medium text-foreground">Full Lifetime</span>
                </div>
                <div className="flex justify-between py-2 last:pb-0">
                  <span className="text-muted-foreground">Language</span>
                  <span className="font-medium text-foreground">English</span>
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
