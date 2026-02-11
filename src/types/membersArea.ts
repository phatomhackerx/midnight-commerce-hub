export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: {
    name: string;
    avatar: string;
  };
  category: string;
  totalLessons: number;
  totalDuration: string;
  enrolledStudents: number;
  rating: number;
  status: 'published' | 'draft';
  modules: Module[];
  createdAt: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  isLocked: boolean;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'text' | 'quiz';
  duration: string;
  videoUrl?: string;
  content?: string;
  order: number;
  isFree: boolean;
}

export interface StudentProgress {
  courseId: string;
  lessonId: string;
  completed: boolean;
  watchedSeconds: number;
  completedAt?: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  studentId: string;
  enrolledAt: string;
  progress: number;
  lastLessonId?: string;
  completedLessons: string[];
}
