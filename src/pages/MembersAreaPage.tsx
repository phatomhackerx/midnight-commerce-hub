import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { mockCourses, getEnrollments } from "@/data/coursesData";
import { Play, Clock, Users, Star, BookOpen, Search, Filter, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function MembersAreaPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed">("all");
  const navigate = useNavigate();
  const enrollments = getEnrollments();

  const enrolledCourses = useMemo(() => {
    return mockCourses
      .map(course => {
        const enrollment = enrollments.find(e => e.courseId === course.id);
        return { course, enrollment };
      })
      .filter(({ enrollment }) => !!enrollment)
      .filter(({ course }) =>
        course.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter(({ enrollment }) => {
        if (filter === "in-progress") return enrollment && enrollment.progress < 100;
        if (filter === "completed") return enrollment && enrollment.progress === 100;
        return true;
      });
  }, [search, filter, enrollments]);

  const continueCourse = enrolledCourses.find(
    ({ enrollment }) => enrollment && enrollment.progress > 0 && enrollment.progress < 100
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-6 py-6">
        <div className="max-w-[1400px] mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Área de Membros</h1>
              <p className="text-muted-foreground mt-1">Seus cursos e conteúdos</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="Buscar curso..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 w-64 bg-secondary/40 border-border/40"
                />
              </div>
            </div>
          </div>

          {/* Continue Watching */}
          {continueCourse && (
            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() =>
                navigate(`/area-membros/${continueCourse.course.id}/aula/${continueCourse.enrollment?.lastLessonId}`)
              }
            >
              <img
                src={continueCourse.course.thumbnail}
                alt={continueCourse.course.title}
                className="w-full h-64 object-cover brightness-50 group-hover:brightness-[0.35] transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center p-8">
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-3 bg-primary/20 text-primary border-0">
                    Continuar assistindo
                  </Badge>
                  <h2 className="text-2xl font-bold mb-2">{continueCourse.course.title}</h2>
                  <p className="text-muted-foreground mb-4 max-w-xl line-clamp-2">
                    {continueCourse.course.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <Progress value={continueCourse.enrollment?.progress} className="w-48 h-2" />
                    <span className="text-sm text-muted-foreground">
                      {continueCourse.enrollment?.progress}% concluído
                    </span>
                  </div>
                </div>
                <Button size="lg" className="rounded-full w-16 h-16 p-0 shadow-lg group-hover:scale-110 transition-transform">
                  <Play size={28} className="ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="flex items-center gap-2">
            {(["all", "in-progress", "completed"] as const).map(f => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className="rounded-full"
              >
                {f === "all" ? "Todos" : f === "in-progress" ? "Em andamento" : "Concluídos"}
              </Button>
            ))}
          </div>

          {/* Course Grid */}
          {enrolledCourses.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="mx-auto text-muted-foreground mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Nenhum curso encontrado</h3>
              <p className="text-muted-foreground">Explore o marketplace para encontrar cursos incríveis.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map(({ course, enrollment }) => (
                <div
                  key={course.id}
                  className="premium-card rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => navigate(`/area-membros/${course.id}`)}
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="icon" className="rounded-full w-12 h-12 shadow-lg">
                        <Play size={20} className="ml-0.5" />
                      </Button>
                    </div>
                    <Badge className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-foreground border-0">
                      {course.category}
                    </Badge>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock size={14} /> {course.totalDuration}</span>
                      <span className="flex items-center gap-1"><BookOpen size={14} /> {course.totalLessons} aulas</span>
                      <span className="flex items-center gap-1"><Star size={14} className="text-warning" /> {course.rating}</span>
                    </div>
                    {enrollment && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{enrollment.completedLessons.length} de {course.totalLessons} aulas</span>
                          <span>{enrollment.progress}%</span>
                        </div>
                        <Progress value={enrollment.progress} className="h-1.5" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* All Courses */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Explorar cursos</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/marketplace')} className="gap-1">
                Ver todos <ChevronRight size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCourses
                .filter(c => !enrollments.find(e => e.courseId === c.id))
                .map(course => (
                  <div
                    key={course.id}
                    className="minimal-card rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => navigate(`/area-membros/${course.id}`)}
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold line-clamp-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Users size={12} /> {course.enrolledStudents.toLocaleString()}</span>
                        <span className="flex items-center gap-1"><Star size={12} className="text-warning" /> {course.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
