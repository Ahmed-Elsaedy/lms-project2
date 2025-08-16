<template>
  <main>
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title fadeIn">تعلم مباشر مع نخبة من المدرسين</h1>
          <p class="hero-subtitle fadeIn">
            منصة تعليمية احترافية تجمع بين الخبرة والجودة في التعلم
          </p>
          <div class="hero-buttons fadeIn">
            <RouterLink to="/courses" class="btn btn-primary">تصفح الدورات</RouterLink>
            <RouterLink to="/student-dashboard" class="btn btn-secondary">لوحة الطالب</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works Section -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">كيف تعمل المنصة؟</h2>
        <p class="section-subtitle">
          عملية التعلم بسيطة ومنظمة من خلال أربع خطوات أساسية
        </p>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4">
          <div v-for="step in steps" :key="step.id" class="step-card fadeIn">
            <div class="step-icon">{{ step.icon }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Teachers -->
    <section class="section bg-white">
      <div class="container">
        <h2 class="section-title">المدرسون المميزون</h2>
        <p class="section-subtitle">
          نخبة من أفضل المدرسين المؤهلين في مختلف المجالات
        </p>
        
        <div class="grid md:grid-cols-3">
          <div v-for="teacher in featuredTeachers" :key="teacher.id" class="teacher-card card fadeIn">
            <div class="teacher-avatar">{{ teacher.name.charAt(0) }}</div>
            <h3 class="teacher-name">{{ teacher.name }}</h3>
            <p class="teacher-specialty">{{ teacher.specialty }}</p>
            <div class="teacher-rating">
              <div class="rating">
                <span class="rating-value">({{ teacher.rating }})</span>
                <div class="stars">
                  <span v-for="i in 5" :key="i" :class="['star', i <= teacher.rating ? 'filled' : 'empty']">⭐</span>
                </div>
              </div>
            </div>
            <p class="teacher-students">{{ teacher.students }} طالب</p>
            <RouterLink :to="`/teacher/${teacher.id}`" class="btn btn-outline teacher-btn">عرض الملف</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Courses -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">الدورات المميزة</h2>
        <p class="section-subtitle">
          مجموعة مختارة من أفضل الدورات المتاحة للتعلم
        </p>
        
        <div class="grid md:grid-cols-3">
          <CourseCard v-for="course in featuredCourses" :key="course.id" :course="course" />
        </div>
        
        <div class="section-cta">
          <RouterLink to="/courses" class="btn btn-primary">عرض جميع الدورات</RouterLink>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="section bg-white">
      <div class="container">
        <h2 class="section-title">تصفح حسب المرحلة</h2>
        <p class="section-subtitle">
          اختر المرحلة التعليمية المناسبة لك
        </p>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4">
          <div v-for="category in categories" :key="category.id" class="category-card card fadeIn">
            <div class="category-icon">{{ category.icon }}</div>
            <h3 class="category-title">{{ category.title }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">آراء المستفيدين</h2>
        <p class="section-subtitle">
          تجارب حقيقية من طلاب وطالبات استفادوا من منصتنا
        </p>
        
        <div class="grid md:grid-cols-3">
          <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card card fadeIn">
            <div class="testimonial-content">
              <p class="testimonial-text">"{{ testimonial.text }}"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">{{ testimonial.author.charAt(0) }}</div>
              <div>
                <h4 class="author-name">{{ testimonial.author }}</h4>
                <p class="author-title">{{ testimonial.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section bg-white">
      <div class="container">
        <h2 class="section-title">الأسئلة الشائعة</h2>
        <p class="section-subtitle">
          أجوبة على أكثر الأسئلة تكراراً حول المنصة
        </p>
        
        <div class="faq-list">
          <div v-for="faq in faqs" :key="faq.id" class="faq-item">
            <button 
              @click="toggleFaq(faq.id)" 
              class="faq-question"
              :class="{ active: activeFaq === faq.id }"
            >
              {{ faq.question }}
              <span class="faq-icon">{{ activeFaq === faq.id ? '−' : '+' }}</span>
            </button>
            <div v-if="activeFaq === faq.id" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">ابدأ رحلة التعلم التفاعلي</h2>
          <p class="cta-subtitle">
            انضم إلى آلاف الطلاب واكتسب مهارات جديدة بطريقة تفاعلية وممتعة
          </p>
          <button class="btn btn-primary cta-btn">ابدأ الآن</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import CourseCard from '../components/CourseCard.vue'

const activeFaq = ref<number | null>(null)

const toggleFaq = (id: number) => {
  activeFaq.value = activeFaq.value === id ? null : id
}

const steps = [
  {
    id: 1,
    icon: '📝',
    title: 'إنشاء الحساب',
    description: 'سجل في المنصة واختر الخطة المناسبة'
  },
  {
    id: 2,
    icon: '🔍',
    title: 'اختر المحتوى',
    description: 'تصفح الدورات واختر ما يناسب احتياجاتك'
  },
  {
    id: 3,
    icon: '🎓',
    title: 'التعلم التفاعلي',
    description: 'ابدأ التعلم مع أفضل المدرسين'
  },
  {
    id: 4,
    icon: '📜',
    title: 'الحصول على الشهادة',
    description: 'احصل على شهادة معتمدة عند إتمام الدورة'
  }
]

const featuredTeachers = [
  {
    id: 1,
    name: 'أحمد محمود',
    specialty: 'خبير الرياضيات',
    rating: 4.9,
    students: 1250
  },
  {
    id: 2,
    name: 'سارة أحمد',
    specialty: 'معلمة اللغة العربية',
    rating: 4.8,
    students: 980
  },
  {
    id: 3,
    name: 'محمد علي',
    specialty: 'مدرس الفيزياء',
    rating: 4.7,
    students: 856
  }
]

const featuredCourses = [
  {
    id: 1,
    title: 'أساسيات البرمجة بلغة Python',
    instructor: 'محمد سعيد',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    students: 60,
    lessons: 8,
    price: 700,
    originalPrice: 1000,
    level: 'المرحلة الإعدادية',
    levelColor: 'blue'
  },
  {
    id: 2,
    title: 'الرياضيات الأساسية',
    instructor: 'أميرة الحسيني',
    image: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    students: 85,
    lessons: 12,
    price: 500,
    level: 'المرحلة الثانوية',
    levelColor: 'green'
  },
  {
    id: 3,
    title: 'مفاهيم الكيمياء الأساسية',
    instructor: 'د. سامي الشامي',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    students: 10,
    lessons: 10,
    price: 630,
    level: 'المرحلة الثانوية',
    levelColor: 'orange'
  }
]

const categories = [
  { id: 1, title: 'المرحلة الجامعية', icon: '🎓' },
  { id: 2, title: 'المرحلة الثانوية', icon: '📚' },
  { id: 3, title: 'المرحلة الإعدادية', icon: '✏️' },
  { id: 4, title: 'المرحلة الابتدائية', icon: '🔤' }
]

const testimonials = [
  {
    id: 1,
    text: 'منصة رائعة ساعدتني في تطوير مهاراتي بشكل كبير. المحتوى متميز والمدرسون محترفون',
    author: 'سارة العيد',
    title: 'طالبة جامعية'
  },
  {
    id: 2,
    text: 'تجربة تعلم ممتازة مع أساليب تدريس حديثة وتفاعلية. أنصح بها بشدة',
    author: 'أحمد سالم',
    title: 'مطور برمجيات'
  },
  {
    id: 3,
    text: 'استفدت كثيراً من الدورات المتاحة. المحتوى منظم والتقييمات مفيدة جداً',
    author: 'ريم الحميد',
    title: 'مهندسة'
  }
]

const faqs = [
  {
    id: 1,
    question: 'هل يمكنني الوصول للدورات في أي وقت؟',
    answer: 'نعم، يمكنك الوصول للدورات في أي وقت تشاء. المحتوى متاح على مدار الساعة.'
  },
  {
    id: 2,
    question: 'كيف يتم تقديم الدعم للطلاب؟',
    answer: 'نوفر دعماً فنياً متكاملاً من خلال فريق متخصص ومدرسين مؤهلين.'
  },
  {
    id: 3,
    question: 'هل تحصل على شهادة معتمدة بعد انتهاء الدورة؟',
    answer: 'نعم، ستحصل على شهادة معتمدة عند إكمال الدورة بنجاح.'
  }
]
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-green) 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.step-card {
  text-align: center;
  padding: 2rem 1rem;
}

.step-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.step-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--gray-900);
}

.step-description {
  color: var(--gray-600);
  line-height: 1.6;
}

.teacher-card {
  text-align: center;
  padding: 2rem 1.5rem;
}

.teacher-avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: var(--primary-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1rem;
}

.teacher-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--gray-900);
}

.teacher-specialty {
  color: var(--gray-600);
  margin-bottom: 1rem;
}

.teacher-rating {
  margin-bottom: 0.5rem;
}

.teacher-students {
  color: var(--gray-500);
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.teacher-btn {
  padding: 0.5rem 1.5rem;
}

.section-cta {
  text-align: center;
  margin-top: 3rem;
}

.category-card {
  text-align: center;
  padding: 2rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-card:hover {
  background: var(--primary-blue);
  color: white;
}

.category-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.category-title {
  font-size: 1.125rem;
  font-weight: 600;
}

.testimonial-card {
  padding: 2rem;
}

.testimonial-content {
  margin-bottom: 1.5rem;
}

.testimonial-text {
  font-style: italic;
  color: var(--gray-600);
  line-height: 1.7;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--secondary-green);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.author-name {
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.author-title {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid var(--gray-200);
}

.faq-question {
  width: 100%;
  padding: 1.5rem 0;
  background: none;
  border: none;
  text-align: right;
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--gray-900);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color 0.2s;
}

.faq-question:hover,
.faq-question.active {
  color: var(--primary-blue);
}

.faq-icon {
  font-size: 1.5rem;
  font-weight: 300;
}

.faq-answer {
  padding-bottom: 1.5rem;
  color: var(--gray-600);
  line-height: 1.7;
}

.cta-section {
  background: linear-gradient(135deg, var(--gray-900) 0%, var(--gray-800) 100%);
  color: white;
  padding: 5rem 0;
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: 1.125rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.cta-btn {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-title {
    font-size: 2rem;
  }
}
</style>