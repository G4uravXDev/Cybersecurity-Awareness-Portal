import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Search,
  Clock,
  Users,
  PlayCircle,
  Star,
  Filter,
  Trophy,
  Target,
  Shield,
  Lock,
} from "lucide-react";
import { coursesData, CourseData } from "@/lib/coursesData";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Learning() {
  const { user, isEnrolledInCourse } = useAuth();
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setCourses(coursesData);
    setFilteredCourses(coursesData);
  }, []);

  useEffect(() => {
    let filtered = courses;

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory,
      );
    }

    if (selectedDifficulty) {
      filtered = filtered.filter(
        (course) => course.difficulty === selectedDifficulty,
      );
    }

    setFilteredCourses(filtered);
  }, [courses, searchQuery, selectedCategory, selectedDifficulty]);

  const enrolledCourses = user?.enrolledCourses
    ? courses.filter((course) => user.enrolledCourses.includes(course.id))
    : [];
  const availableCourses = filteredCourses;

  const totalCourses = courses.length;
  const totalStudents = courses.reduce(
    (sum, course) => sum + course.students,
    0,
  );
  const averageRating =
    courses.length > 0
      ? (
          courses.reduce((sum, course) => sum + course.rating, 0) /
          courses.length
        ).toFixed(1)
      : "0.0";

  const completionRate =
    user?.enrolledCourses?.length > 0
      ? Math.min(95, Math.round(enrolledCourses.length * 15 + 65))
      : 95;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container px-4 py-12 flex-1">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-up">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-muted/50 text-muted-foreground border-border/60 mb-4">
            <BookOpen className="mr-1.5 h-3.5 w-3.5 text-primary" />
            Curriculum Directory
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Master Cybersecurity Skills
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Advance your security expertise with interactive courses designed by industry engineers and threat analysts.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto animate-fade-up delay-100">
          <Card className="border border-border/60 bg-card text-center">
            <CardContent className="p-5">
              <BookOpen className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold tracking-tight">{totalCourses}</div>
              <p className="text-xs text-muted-foreground">Courses</p>
            </CardContent>
          </Card>
          <Card className="border border-border/60 bg-card text-center">
            <CardContent className="p-5">
              <Users className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold tracking-tight">
                {(totalStudents / 1000).toFixed(0)}K+
              </div>
              <p className="text-xs text-muted-foreground">Students</p>
            </CardContent>
          </Card>
          <Card className="border border-border/60 bg-card text-center">
            <CardContent className="p-5">
              <Trophy className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold tracking-tight">{completionRate}%</div>
              <p className="text-xs text-muted-foreground">Completion Rate</p>
            </CardContent>
          </Card>
          <Card className="border border-border/60 bg-card text-center">
            <CardContent className="p-5">
              <Target className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold tracking-tight">{averageRating}</div>
              <p className="text-xs text-muted-foreground">Avg. Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* My Learning Section */}
        {enrolledCourses.length > 0 && (
          <section className="mb-14 animate-fade-up delay-200">
            <h2 className="text-xl font-bold tracking-tight mb-5">Continue Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {enrolledCourses.map((course) => (
                <Card
                  key={course.id}
                  className="border border-border/60 bg-card hover:border-border transition-all duration-300 shadow-sm"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs font-normal">
                        {course.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{course.category}</span>
                    </div>
                    <CardTitle className="text-base font-semibold leading-snug">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Progress: {(course as any).progress || 35}%</span>
                        <span>{course.duration}</span>
                      </div>
                      <Progress value={(course as any).progress || 35} className="h-1.5" />
                      <Button className="w-full h-8 text-xs font-medium" asChild>
                        <Link to={`/learning/${course.id}`}>
                          <PlayCircle className="mr-1.5 h-3.5 w-3.5" />
                          Resume Lesson
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Search and Filters */}
        <div className="space-y-4 mb-8 max-w-5xl mx-auto animate-fade-up delay-200">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by topic, instructor, or skill..."
                className="pl-9 h-9 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedDifficulty ? "outline" : "default"}
                size="sm"
                className="h-9 text-xs"
                onClick={() => setSelectedDifficulty(null)}
              >
                <Filter className="mr-1.5 h-3.5 w-3.5" />
                All Levels
              </Button>
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <Button
                  key={level}
                  variant={selectedDifficulty === level ? "default" : "outline"}
                  size="sm"
                  className="h-9 text-xs"
                  onClick={() => setSelectedDifficulty(level)}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-1.5">
            <Button
              variant={selectedCategory ? "outline" : "default"}
              size="sm"
              className="h-7 text-xs px-2.5 rounded-full"
              onClick={() => setSelectedCategory(null)}
            >
              All Topics
            </Button>
            {[...new Set(courses.map((c) => c.category))]
              .slice(0, 8)
              .map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  className="h-7 text-xs px-2.5 rounded-full"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
          </div>

          <div className="text-xs text-muted-foreground pt-1">
            Showing {filteredCourses.length} of {courses.length} courses
          </div>
        </div>

        {/* Available Courses */}
        <section className="max-w-5xl mx-auto animate-fade-up delay-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {availableCourses.map((course) => (
              <Card
                key={course.id}
                className="border border-border/60 bg-card hover:border-border hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs font-normal">
                      {course.difficulty}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{course.category}</span>
                  </div>
                  <CardTitle className="text-base font-semibold leading-snug">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2 leading-relaxed">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 pt-3 border-t border-border/40">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>By {course.instructor}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="font-medium text-foreground">{course.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {course.students.toLocaleString()}
                      </div>
                    </div>

                    {isEnrolledInCourse(course.id) ? (
                      <Button className="w-full h-8 text-xs font-medium" asChild>
                        <Link to={`/learning/${course.id}/enrolled`}>
                          Continue
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        className="w-full h-8 text-xs font-medium border-border/60"
                        variant="outline"
                        asChild
                      >
                        <Link to={`/learning/${course.id}`}>Enroll Free</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Career Paths */}
        <section className="mt-20 max-w-5xl mx-auto animate-fade-up">
          <h2 className="text-xl font-bold tracking-tight mb-6">
            Recommended Specializations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card className="p-6 border border-border/60 bg-muted/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-foreground">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">
                    Endpoint Security Engineering
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Comprehensive endpoint telemetry and EDR response
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                Master proactive endpoint hardening, lateral movement detection, and OS-level security telemetry.
              </p>
              <Button size="sm" className="w-full h-8 text-xs" asChild>
                <Link to="/learning/course-13">View Pathway</Link>
              </Button>
            </Card>

            <Card className="p-6 border border-border/60 bg-muted/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-foreground">
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">
                    Cloud Infrastructure Security
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    IAM, VPC controls, and CSPM posture management
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                Architect secure multi-tenant cloud ecosystems following CIS benchmark recommendations.
              </p>
              <Button size="sm" variant="outline" className="w-full h-8 text-xs border-border/60" asChild>
                <Link to="/learning/cloud-security">View Pathway</Link>
              </Button>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
