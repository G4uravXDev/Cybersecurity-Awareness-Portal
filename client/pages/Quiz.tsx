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
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  HelpCircle,
  Trophy,
  Clock,
  Target,
  Brain,
  CheckCircle,
  XCircle,
  RotateCcw,
  Play,
  Search,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  quizzesData,
  QuizData,
  generateQuizQuestionsOnDemand,
} from "@/lib/quizzesData";
import { Link } from "react-router-dom";

export default function Quiz() {
  const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);

  useEffect(() => {
    setQuizzes(quizzesData);
    setFilteredQuizzes(quizzesData);
  }, []);

  useEffect(() => {
    let filtered = quizzes;

    if (searchQuery) {
      filtered = filtered.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          quiz.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((quiz) => quiz.category === selectedCategory);
    }

    setFilteredQuizzes(filtered);
  }, [quizzes, searchQuery, selectedCategory]);

  const startQuiz = async (quizId: string) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz) return;

    setIsLoadingQuiz(true);

    try {
      let finalQuiz = quiz;
      if (quizId.startsWith("quiz-") && parseInt(quizId.split("-")[1]) >= 6) {
        const aiQuiz = await generateQuizQuestionsOnDemand(quizId);
        if (aiQuiz) {
          finalQuiz = aiQuiz;
          setQuizzes((prev) => prev.map((q) => (q.id === quizId ? aiQuiz : q)));
          setFilteredQuizzes((prev) =>
            prev.map((q) => (q.id === quizId ? aiQuiz : q)),
          );
        }
      }

      setCurrentQuiz(finalQuiz);
      setCurrentQuestion(0);
      setUserAnswers([]);
      setShowResults(false);
      setQuizCompleted(false);
      setSelectedAnswer("");
    } catch (error) {
      console.error("Error starting quiz:", error);
      setCurrentQuiz(quiz);
      setCurrentQuestion(0);
      setUserAnswers([]);
      setShowResults(false);
      setQuizCompleted(false);
      setSelectedAnswer("");
    } finally {
      setIsLoadingQuiz(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!currentQuiz) return;

    const answerIndex = parseInt(selectedAnswer);
    const newAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newAnswers);

    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    if (!currentQuiz) return 0;

    let correct = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === currentQuiz.questions[index].correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / currentQuiz.questions.length) * 100);
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
    setSelectedAnswer("");
  };

  if (currentQuiz && !showResults) {
    const question = currentQuiz.questions[currentQuestion];
    const progress =
      ((currentQuestion + 1) / currentQuiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="container px-4 py-12 max-w-2xl flex-1 animate-fade-up">
          {/* Quiz Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground">
                Question {currentQuestion + 1} of {currentQuiz.questions.length}
              </span>
              <Button variant="ghost" size="sm" onClick={resetQuiz} className="h-7 text-xs text-muted-foreground hover:text-foreground">
                Exit Assessment
              </Button>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>

          {/* Question Card */}
          <Card className="border border-border/60 bg-card shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{currentQuiz.category}</span>
                <Badge variant="outline" className="text-[11px] font-normal">
                  {question.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-lg font-semibold leading-relaxed">
                {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswer}
                onValueChange={handleAnswerSelect}
                className="space-y-2.5"
              >
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3.5 rounded-lg border text-sm transition-all cursor-pointer ${
                      selectedAnswer === index.toString()
                        ? "border-primary bg-primary/5"
                        : "border-border/60 hover:bg-muted/30"
                    }`}
                    onClick={() => handleAnswerSelect(index.toString())}
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer font-normal text-sm"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === ""}
                className="w-full mt-6 h-9 text-sm"
              >
                {currentQuestion === currentQuiz.questions.length - 1
                  ? "Submit Assessment"
                  : "Next Question"}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (showResults && currentQuiz) {
    const score = calculateScore();
    const correct = userAnswers.filter(
      (answer, index) => answer === currentQuiz.questions[index].correctAnswer,
    ).length;

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="container px-4 py-12 max-w-2xl flex-1 animate-fade-up">
          {/* Results Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted/60 text-foreground mb-3">
              <Trophy className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Assessment Completed
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Review your results and rationales</p>
          </div>

          {/* Score Card */}
          <Card className="border border-border/60 bg-card mb-8 text-center p-6 shadow-sm">
            <div className="text-5xl font-extrabold tracking-tight text-foreground mb-2">
              {score}%
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              {correct} of {currentQuiz.questions.length} questions answered correctly
            </p>
            <Badge
              variant={score >= 80 ? "default" : score >= 60 ? "secondary" : "outline"}
              className="text-xs font-normal px-3 py-1"
            >
              {score >= 80
                ? "Exemplary Knowledge"
                : score >= 60
                  ? "Proficient"
                  : "Needs Review"}
            </Badge>
          </Card>

          {/* Question Review */}
          <div className="space-y-4 mb-8">
            <h2 className="text-base font-semibold">Answer Rationales</h2>
            {currentQuiz.questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <Card key={question.id} className="border border-border/60 bg-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-muted-foreground">Question {index + 1}</span>
                      <div className="flex items-center gap-1.5 text-xs">
                        {isCorrect ? (
                          <span className="text-emerald-500 flex items-center gap-1">
                            <CheckCircle className="h-3.5 w-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="text-rose-500 flex items-center gap-1">
                            <XCircle className="h-3.5 w-3.5" /> Incorrect
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-foreground">{question.question}</p>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0 text-xs">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">
                        Your answer:{" "}
                        <span className="font-medium text-foreground">
                          {question.options[userAnswer]}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-muted-foreground">
                          Correct answer:{" "}
                          <span className="font-medium text-emerald-500">
                            {question.options[question.correctAnswer]}
                          </span>
                        </p>
                      )}
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 border border-border/40 text-muted-foreground leading-relaxed">
                      {question.explanation}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={resetQuiz} variant="outline" className="h-9 text-xs border-border/60">
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
              Retake / Other Quizzes
            </Button>
            <Button className="h-9 text-xs" asChild>
              <Link to="/learning">Review Study Modules</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container px-4 py-12 flex-1">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-up">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-muted/50 text-muted-foreground border-border/60 mb-4">
            <HelpCircle className="mr-1.5 h-3.5 w-3.5 text-primary" />
            Security Assessment
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Test Your Knowledge
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Validate and reinforce your defense capabilities with interactive practical quizzes.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto animate-fade-up delay-100">
          <Card className="border border-border/60 bg-card text-center">
            <CardContent className="p-5">
              <Brain className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold tracking-tight">
                {quizzes.reduce((total, quiz) => total + quiz.questions.length, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Total Questions</p>
            </CardContent>
          </Card>
          <Card className="border border-border/60 bg-card text-center">
            <CardContent className="p-5">
              <Target className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold tracking-tight">85%</div>
              <p className="text-xs text-muted-foreground">Average Pass Rate</p>
            </CardContent>
          </Card>
          <Card className="border border-border/60 bg-card text-center">
            <CardContent className="p-5">
              <Trophy className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold tracking-tight">5K+</div>
              <p className="text-xs text-muted-foreground">Completed Tests</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8 max-w-4xl mx-auto animate-fade-up delay-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assessments by keyword or topic..."
              className="pl-9 h-9 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
            {[...new Set(quizzes.map((q) => q.category))].slice(0, 8).map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="h-7 text-xs px-2.5 rounded-full"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="text-xs text-muted-foreground pt-1">
            Showing {filteredQuizzes.length} of {quizzes.length} assessments
          </div>
        </div>

        {/* Quiz Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto animate-fade-up delay-300">
          {filteredQuizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="border border-border/60 bg-card hover:border-border hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs font-normal">
                    {quiz.difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{quiz.category}</span>
                </div>
                <CardTitle className="text-base font-semibold leading-snug">
                  {quiz.title}
                </CardTitle>
                <CardDescription className="text-xs line-clamp-2 leading-relaxed">
                  {quiz.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 pt-3 border-t border-border/40">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <HelpCircle className="h-3 w-3" />
                      {quiz.questions.length} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {quiz.timeLimit} mins
                    </span>
                  </div>
                  <Button
                    onClick={() => startQuiz(quiz.id)}
                    className="w-full h-8 text-xs font-medium"
                    disabled={isLoadingQuiz}
                  >
                    <Play className="mr-1.5 h-3.5 w-3.5" />
                    {isLoadingQuiz ? "Loading Assessment..." : "Start Assessment"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
