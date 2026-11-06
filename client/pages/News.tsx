import { useState, useEffect } from "react";
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
import {
  Newspaper,
  Search,
  Clock,
  Shield,
  RefreshCw,
  Loader2,
  Eye,
} from "lucide-react";
import { newsService, NewsArticle } from "@/lib/newsService";

export default function News() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const categories = [
    "All",
    "Data Breach",
    "Ransomware",
    "Phishing",
    "Vulnerability",
    "Malware",
    "APT",
    "Cloud Security",
  ];

  useEffect(() => {
    loadLatestNews();
  }, []);

  useEffect(() => {
    let filtered = newsArticles;

    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory,
      );
    }

    setFilteredArticles(filtered);
  }, [newsArticles, searchQuery, selectedCategory]);

  const loadLatestNews = async () => {
    try {
      setIsLoading(true);
      const articles = await newsService.fetchLatestCyberSecurityNews();
      const articlesWithOverviews = articles.map((article) => ({
        ...article,
        overview: newsService.getFallbackOverview(article),
      }));

      setNewsArticles(articlesWithOverviews);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to load news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      setNewsArticles([]);
      setFilteredArticles([]);

      const articles = await newsService.fetchLatestCyberSecurityNews();
      const articlesWithOverviews = articles.map((article) => ({
        ...article,
        overview: newsService.getFallbackOverview(article),
      }));

      setNewsArticles(articlesWithOverviews);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to refresh news:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === "All" ? null : category);
  };

  const getSeverityVariant = (severity: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (severity) {
      case "Critical":
        return "destructive";
      case "High":
        return "destructive";
      case "Medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container px-4 py-12 flex-1">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-up">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-muted/50 text-muted-foreground border-border/60 mb-4">
            <Newspaper className="mr-1.5 h-3.5 w-3.5 text-primary" />
            Threat Telemetry & Feed
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Security Intelligence
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Real-time cybersecurity advisories, disclosure reports, and emerging attack vector summaries.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8 max-w-5xl mx-auto animate-fade-up delay-100">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search advisories, CVEs, or attack tactics..."
                className="pl-9 h-9 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleRefresh}
                disabled={isRefreshing}
                size="sm"
                variant="outline"
                className="h-9 text-xs border-border/60"
              >
                {isRefreshing ? (
                  <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                ) : (
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                )}
                Refresh
              </Button>
              <span className="text-xs text-muted-foreground hidden sm:inline-block">
                {lastUpdated ? `Sync: ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ""}
              </span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <Button
                key={category}
                variant={
                  (category === "All" && !selectedCategory) ||
                  category === selectedCategory
                    ? "default"
                    : "outline"
                }
                size="sm"
                className="h-7 text-xs px-2.5 rounded-full"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="text-xs text-muted-foreground pt-1">
            Showing {filteredArticles.length} of {newsArticles.length} advisories
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="border border-border/60 bg-card p-5 space-y-4 animate-pulse">
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-muted/70 rounded" />
                  <div className="h-4 w-16 bg-muted/70 rounded" />
                </div>
                <div className="h-5 w-3/4 bg-muted/70 rounded" />
                <div className="space-y-2">
                  <div className="h-3.5 w-full bg-muted/50 rounded" />
                  <div className="h-3.5 w-2/3 bg-muted/50 rounded" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* News Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto animate-fade-up delay-200">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                className="border border-border/60 bg-card hover:border-border transition-all duration-300 flex flex-col justify-between"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant={getSeverityVariant(article.severity)}
                      className="text-xs font-normal"
                    >
                      {article.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{article.category}</span>
                  </div>

                  <CardTitle className="text-base font-semibold leading-snug">
                    {article.title}
                  </CardTitle>

                  <CardDescription className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mt-1">
                    {article.summary}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3 pt-3 border-t border-border/40">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {article.views.toLocaleString()} reads
                      </div>
                      <span>{article.source}</span>
                    </div>

                    {/* Overview snippet */}
                    {article.overview && (
                      <div className="p-3 rounded-lg bg-muted/30 border border-border/40 text-xs">
                        <div className="flex items-center gap-1.5 font-medium text-foreground mb-1">
                          <Shield className="h-3.5 w-3.5 text-primary" />
                          Security Context
                        </div>
                        <p className="text-muted-foreground text-[11px] leading-relaxed line-clamp-2">
                          {article.overview}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
