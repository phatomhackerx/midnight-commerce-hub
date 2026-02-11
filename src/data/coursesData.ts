import { Course, Enrollment } from '@/types/membersArea';

export const mockCourses: Course[] = [
  {
    id: 'course_1',
    title: 'Marketing Digital Completo 2025',
    description: 'Domine todas as estratégias de marketing digital: tráfego pago, SEO, copywriting, funis de venda e muito mais.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    instructor: { name: 'Lucas Martins', avatar: '' },
    category: 'Marketing',
    totalLessons: 48,
    totalDuration: '32h',
    enrolledStudents: 2847,
    rating: 4.8,
    status: 'published',
    createdAt: '2024-06-01',
    modules: [
      {
        id: 'mod_1_1', courseId: 'course_1', title: 'Introdução ao Marketing Digital', description: 'Fundamentos essenciais', order: 1, isLocked: false,
        lessons: [
          { id: 'les_1_1_1', moduleId: 'mod_1_1', title: 'Bem-vindo ao curso', description: 'Apresentação do curso e metodologia', type: 'video', duration: '8:32', order: 1, isFree: true },
          { id: 'les_1_1_2', moduleId: 'mod_1_1', title: 'O cenário digital atual', description: 'Panorama do mercado digital em 2025', type: 'video', duration: '15:20', order: 2, isFree: true },
          { id: 'les_1_1_3', moduleId: 'mod_1_1', title: 'Planejamento estratégico', description: 'Como criar seu plano de marketing', type: 'video', duration: '22:45', order: 3, isFree: false },
          { id: 'les_1_1_4', moduleId: 'mod_1_1', title: 'Material complementar', description: 'PDF com templates de planejamento', type: 'pdf', duration: '10 min', order: 4, isFree: false },
        ],
      },
      {
        id: 'mod_1_2', courseId: 'course_1', title: 'Tráfego Pago', description: 'Facebook Ads, Google Ads e TikTok Ads', order: 2, isLocked: false,
        lessons: [
          { id: 'les_1_2_1', moduleId: 'mod_1_2', title: 'Fundamentos de tráfego pago', description: 'Como funciona a compra de mídia', type: 'video', duration: '18:10', order: 1, isFree: false },
          { id: 'les_1_2_2', moduleId: 'mod_1_2', title: 'Facebook Ads do zero', description: 'Criando suas primeiras campanhas', type: 'video', duration: '35:00', order: 2, isFree: false },
          { id: 'les_1_2_3', moduleId: 'mod_1_2', title: 'Google Ads avançado', description: 'Estratégias de search e display', type: 'video', duration: '28:15', order: 3, isFree: false },
        ],
      },
      {
        id: 'mod_1_3', courseId: 'course_1', title: 'Copywriting', description: 'A arte de escrever para vender', order: 3, isLocked: true,
        lessons: [
          { id: 'les_1_3_1', moduleId: 'mod_1_3', title: 'Princípios de persuasão', description: 'Os gatilhos mentais que vendem', type: 'video', duration: '20:00', order: 1, isFree: false },
          { id: 'les_1_3_2', moduleId: 'mod_1_3', title: 'Headlines que convertem', description: 'Como escrever títulos irresistíveis', type: 'video', duration: '16:30', order: 2, isFree: false },
        ],
      },
    ],
  },
  {
    id: 'course_2',
    title: 'Design UI/UX Profissional',
    description: 'Aprenda design de interfaces e experiência do usuário do zero ao avançado com projetos práticos.',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
    instructor: { name: 'Ana Silva', avatar: '' },
    category: 'Design',
    totalLessons: 36,
    totalDuration: '24h',
    enrolledStudents: 1523,
    rating: 4.9,
    status: 'published',
    createdAt: '2024-08-15',
    modules: [
      {
        id: 'mod_2_1', courseId: 'course_2', title: 'Fundamentos de Design', description: 'Teoria das cores, tipografia e grid', order: 1, isLocked: false,
        lessons: [
          { id: 'les_2_1_1', moduleId: 'mod_2_1', title: 'Teoria das cores', description: 'Como usar cores de forma estratégica', type: 'video', duration: '25:00', order: 1, isFree: true },
          { id: 'les_2_1_2', moduleId: 'mod_2_1', title: 'Tipografia digital', description: 'Escolhendo e combinando fontes', type: 'video', duration: '18:45', order: 2, isFree: false },
        ],
      },
      {
        id: 'mod_2_2', courseId: 'course_2', title: 'Figma Masterclass', description: 'Domine a ferramenta mais usada do mercado', order: 2, isLocked: false,
        lessons: [
          { id: 'les_2_2_1', moduleId: 'mod_2_2', title: 'Interface do Figma', description: 'Conhecendo a ferramenta', type: 'video', duration: '20:00', order: 1, isFree: false },
          { id: 'les_2_2_2', moduleId: 'mod_2_2', title: 'Auto Layout', description: 'Componentes responsivos', type: 'video', duration: '30:10', order: 2, isFree: false },
          { id: 'les_2_2_3', moduleId: 'mod_2_2', title: 'Design System no Figma', description: 'Criando um DS completo', type: 'video', duration: '45:00', order: 3, isFree: false },
        ],
      },
    ],
  },
  {
    id: 'course_3',
    title: 'Desenvolvimento Web Full-Stack',
    description: 'React, Node.js, TypeScript e banco de dados. Tudo que você precisa para se tornar um dev completo.',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop',
    instructor: { name: 'Pedro Costa', avatar: '' },
    category: 'Programação',
    totalLessons: 72,
    totalDuration: '56h',
    enrolledStudents: 4210,
    rating: 4.7,
    status: 'published',
    createdAt: '2024-03-10',
    modules: [
      {
        id: 'mod_3_1', courseId: 'course_3', title: 'HTML & CSS Moderno', description: 'Base sólida para qualquer dev', order: 1, isLocked: false,
        lessons: [
          { id: 'les_3_1_1', moduleId: 'mod_3_1', title: 'HTML semântico', description: 'Estrutura correta para a web', type: 'video', duration: '14:00', order: 1, isFree: true },
          { id: 'les_3_1_2', moduleId: 'mod_3_1', title: 'CSS Flexbox & Grid', description: 'Layouts modernos', type: 'video', duration: '32:00', order: 2, isFree: false },
        ],
      },
    ],
  },
];

export const mockEnrollments: Enrollment[] = [
  {
    id: 'enr_1',
    courseId: 'course_1',
    studentId: 'user_1',
    enrolledAt: '2024-12-01',
    progress: 35,
    lastLessonId: 'les_1_2_1',
    completedLessons: ['les_1_1_1', 'les_1_1_2', 'les_1_1_3', 'les_1_1_4'],
  },
  {
    id: 'enr_2',
    courseId: 'course_2',
    studentId: 'user_1',
    enrolledAt: '2025-01-10',
    progress: 20,
    lastLessonId: 'les_2_1_2',
    completedLessons: ['les_2_1_1'],
  },
];

// Store helpers
let enrollments = [...mockEnrollments];

export const getEnrollments = () => enrollments;

export const getEnrollmentByCourse = (courseId: string): Enrollment | undefined =>
  enrollments.find(e => e.courseId === courseId);

export const toggleLessonComplete = (courseId: string, lessonId: string) => {
  const enrollment = enrollments.find(e => e.courseId === courseId);
  if (!enrollment) return;

  const course = mockCourses.find(c => c.id === courseId);
  if (!course) return;

  if (enrollment.completedLessons.includes(lessonId)) {
    enrollment.completedLessons = enrollment.completedLessons.filter(id => id !== lessonId);
  } else {
    enrollment.completedLessons.push(lessonId);
  }

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  enrollment.progress = Math.round((enrollment.completedLessons.length / totalLessons) * 100);
  enrollment.lastLessonId = lessonId;
  enrollments = [...enrollments];
};

export const getCourseById = (id: string) => mockCourses.find(c => c.id === id);
