import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById, getEnrollmentByCourse, toggleLessonComplete } from "@/data/coursesData";
import { Lesson, Module } from "@/types/membersArea";
import {
  ArrowLeft, CheckCircle2, ChevronDown, ChevronRight, ChevronLeft, ChevronRight as ChevronRightIcon,
  Play, Lock, FileText, Menu, X, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export default function LessonPlayerPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [, forceUpdate] = useState(0);

  const course = getCourseById(courseId || "");
  const enrollment = getEnrollmentByCourse(courseId || "");

  if (!course) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <h2 className="text-xl font-bold">Curso não encontrado</h2>
      </div>
    );
  }

  // Find current lesson
  let currentLesson: Lesson | undefined;
  let currentModule: Module | undefined;
  let allLessons: { lesson: Lesson; module: Module }[] = [];

  course.modules.forEach(mod => {
    mod.lessons.forEach(les => {
      allLessons.push({ lesson: les, module: mod });
      if (les.id === lessonId) {
        currentLesson = les;
        currentModule = mod;
      }
    });
  });

  const currentIndex = allLessons.findIndex(l => l.lesson.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  if (!currentLesson) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Aula não encontrada</h2>
          <Button onClick={() => navigate(`/area-membros/${courseId}`)}>Voltar ao curso</Button>
        </div>
      </div>
    );
  }

  const isCompleted = enrollment?.completedLessons.includes(currentLesson.id) || false;

  const handleToggleComplete = () => {
    if (courseId && lessonId) {
      toggleLessonComplete(courseId, lessonId);
      forceUpdate(n => n + 1);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full z-50 bg-card/95 backdrop-blur-xl border-r border-border/50 transition-all duration-300",
        sidebarOpen ? "w-80" : "w-0 overflow-hidden"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-2 min-w-0">
            <Button variant="ghost" size="icon" onClick={() => navigate(`/area-membros/${courseId}`)} className="shrink-0">
              <ArrowLeft size={18} />
            </Button>
            <h3 className="font-semibold text-sm truncate">{course.title}</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="shrink-0">
            <X size={18} />
          </Button>
        </div>

        {enrollment && (
          <div className="px-4 py-3 border-b border-border/30">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{enrollment.completedLessons.length} de {allLessons.length} aulas</span>
              <span>{enrollment.progress}%</span>
            </div>
            <Progress value={enrollment.progress} className="h-1.5" />
          </div>
        )}

        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="p-3 space-y-2">
            {course.modules.map((module, mIdx) => (
              <Collapsible key={module.id} defaultOpen={module.id === currentModule?.id}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/40 transition-colors">
                    <span className="text-xs font-semibold text-muted-foreground">
                      Módulo {mIdx + 1}: {module.title}
                    </span>
                    <ChevronDown size={14} className="text-muted-foreground" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="space-y-0.5 mt-1">
                    {module.lessons.map(lesson => {
                      const isActive = lesson.id === lessonId;
                      const done = enrollment?.completedLessons.includes(lesson.id);
                      return (
                        <div
                          key={lesson.id}
                          className={cn(
                            "flex items-center gap-2 p-2 rounded-lg cursor-pointer text-sm transition-colors",
                            isActive ? "bg-primary/10 text-primary" : "hover:bg-secondary/40 text-foreground",
                            done && !isActive && "text-muted-foreground"
                          )}
                          onClick={() => navigate(`/area-membros/${courseId}/aula/${lesson.id}`)}
                        >
                          {done ? (
                            <CheckCircle2 size={14} className="text-success shrink-0" />
                          ) : module.isLocked ? (
                            <Lock size={12} className="shrink-0 text-muted-foreground" />
                          ) : (
                            <Play size={12} className="shrink-0" />
                          )}
                          <span className="truncate flex-1">{lesson.title}</span>
                          <span className="text-xs text-muted-foreground shrink-0">{lesson.duration}</span>
                        </div>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className={cn("flex-1 transition-all duration-300", sidebarOpen ? "ml-80" : "ml-0")}>
        {/* Toggle sidebar */}
        {!sidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-40 bg-card/80 backdrop-blur-sm border border-border/50"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={18} />
          </Button>
        )}

        {/* Video Player Area */}
        <div className="bg-black aspect-video w-full flex items-center justify-center max-h-[70vh]">
          {currentLesson.type === 'video' ? (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                <Play size={36} className="text-primary ml-1" />
              </div>
              <p className="text-muted-foreground text-sm">Player de vídeo</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Integração com serviço de streaming</p>
            </div>
          ) : (
            <div className="text-center">
              <FileText size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Conteúdo em texto/PDF</p>
            </div>
          )}
        </div>

        {/* Lesson Info */}
        <div className="p-6 max-w-4xl mx-auto space-y-6">
          {/* Title + Actions */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">{currentModule?.title}</Badge>
                {currentLesson.isFree && (
                  <Badge variant="outline" className="text-xs border-success/50 text-success">Grátis</Badge>
                )}
              </div>
              <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
              <p className="text-muted-foreground mt-1">{currentLesson.description}</p>
            </div>
            <Button
              variant={isCompleted ? "outline" : "default"}
              onClick={handleToggleComplete}
              className="gap-2 shrink-0"
            >
              <CheckCircle2 size={16} />
              {isCompleted ? "Concluída" : "Marcar concluída"}
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            <Button
              variant="ghost"
              disabled={!prevLesson}
              onClick={() => prevLesson && navigate(`/area-membros/${courseId}/aula/${prevLesson.lesson.id}`)}
              className="gap-2"
            >
              <ChevronLeft size={16} /> Aula anterior
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} de {allLessons.length}
            </span>
            <Button
              variant={nextLesson ? "default" : "ghost"}
              disabled={!nextLesson}
              onClick={() => nextLesson && navigate(`/area-membros/${courseId}/aula/${nextLesson.lesson.id}`)}
              className="gap-2"
            >
              Próxima aula <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
