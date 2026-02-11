import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById, getEnrollmentByCourse, toggleLessonComplete } from "@/data/coursesData";
import { Play, Lock, CheckCircle2, ChevronDown, ChevronRight, Clock, BookOpen, ArrowLeft, FileText, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = getCourseById(courseId || "");
  const enrollment = getEnrollmentByCourse(courseId || "");
  const [openModules, setOpenModules] = useState<string[]>(
    course?.modules.map(m => m.id) || []
  );

  if (!course) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Curso não encontrado</h2>
          <Button onClick={() => navigate("/area-membros")}>Voltar</Button>
        </div>
      </div>
    );
  }

  const toggleModule = (id: string) => {
    setOpenModules(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const totalLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0);

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Hero */}
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-72 object-cover brightness-[0.3]"
        />
        <div className="absolute inset-0 flex items-end p-8">
          <div className="max-w-3xl">
            <Button variant="ghost" size="sm" className="mb-4 gap-1 text-muted-foreground" onClick={() => navigate("/area-membros")}>
              <ArrowLeft size={16} /> Voltar
            </Button>
            <Badge variant="secondary" className="mb-3">{course.category}</Badge>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><BookOpen size={14} /> {totalLessons} aulas</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {course.totalDuration}</span>
              <span>Por {course.instructor.name}</span>
            </div>
            {enrollment && (
              <div className="mt-4 flex items-center gap-3">
                <Progress value={enrollment.progress} className="w-48 h-2" />
                <span className="text-sm">{enrollment.progress}% concluído</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modules */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-xl font-semibold mb-6">Conteúdo do curso</h2>

          {course.modules.map((module, mIdx) => (
            <Collapsible
              key={module.id}
              open={openModules.includes(module.id)}
              onOpenChange={() => toggleModule(module.id)}
            >
              <CollapsibleTrigger className="w-full">
                <div className={cn(
                  "flex items-center justify-between p-4 rounded-xl transition-colors cursor-pointer",
                  "bg-secondary/40 hover:bg-secondary/60 border border-border/30"
                )}>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm font-bold">
                      {mIdx + 1}
                    </span>
                    <div className="text-left">
                      <h3 className="font-semibold">{module.title}</h3>
                      <p className="text-xs text-muted-foreground">{module.lessons.length} aulas • {module.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {module.isLocked && <Lock size={16} className="text-muted-foreground" />}
                    {openModules.includes(module.id) ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-4 mt-1 space-y-1 border-l border-border/30 pl-6">
                  {module.lessons.map(lesson => {
                    const isCompleted = enrollment?.completedLessons.includes(lesson.id);
                    return (
                      <div
                        key={lesson.id}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors group",
                          "hover:bg-secondary/40",
                          isCompleted && "opacity-70"
                        )}
                        onClick={() => {
                          if (!module.isLocked) {
                            navigate(`/area-membros/${course.id}/aula/${lesson.id}`);
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          {isCompleted ? (
                            <CheckCircle2 size={18} className="text-success shrink-0" />
                          ) : module.isLocked ? (
                            <Lock size={16} className="text-muted-foreground shrink-0" />
                          ) : lesson.type === 'video' ? (
                            <Play size={16} className="text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                          ) : (
                            <FileText size={16} className="text-muted-foreground shrink-0" />
                          )}
                          <div>
                            <p className={cn("text-sm font-medium", isCompleted && "line-through")}>{lesson.title}</p>
                            <p className="text-xs text-muted-foreground">{lesson.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {lesson.isFree && (
                            <Badge variant="outline" className="text-xs border-success/50 text-success">Grátis</Badge>
                          )}
                          <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </main>
    </div>
  );
}
