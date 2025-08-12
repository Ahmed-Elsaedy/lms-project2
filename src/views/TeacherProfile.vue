<template>
  <main class="teacher-profile-page">
    <!-- Teacher Header -->
    <section class="teacher-header">
      <div class="container">
        <div class="breadcrumb">
          <RouterLink to="/">الرئيسية</RouterLink>
          <span>/</span>
          <span>ملف المعلم</span>
        </div>
        
        <div class="teacher-info-card">
          <div class="teacher-avatar-large">{{ teacher.name.charAt(0) }}</div>
          <div class="teacher-details">
            <h1 class="teacher-name">{{ teacher.name }}</h1>
            <p class="teacher-specialty">{{ teacher.specialty }}</p>
            <div class="teacher-stats">
              <div class="stat">
                <span class="stat-value">{{ teacher.rating }}</span>
                <span class="stat-label">التقييم</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ teacher.students }}</span>
                <span class="stat-label">طالب</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ teacher.courses }}</span>
                <span class="stat-label">دورة</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ teacher.experience }}</span>
                <span class="stat-label">سنة خبرة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Teacher Content -->
    <section class="section">
      <div class="container">
        <div class="grid md:grid-cols-3 gap-8">
          <div class="teacher-content md:col-span-2">
            <div class="content-tabs">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="['tab-btn', { active: activeTab === tab.id }]"
              >
                {{ tab.label }}
              </button>
            </div>
            
            <div class="tab-content">
              <div v-if="activeTab === 'about'" class="about-content">
                <h3>نبذة عن المعلم</h3>
                <p class="teacher-bio">{{ teacher.bio }}</p>
                
                <h4>المؤهلات:</h4>
                <ul class="qualifications">
                  <li v-for="qualification in teacher.qualifications" :key="qualification">
                    {{ qualification }}
                  </li>
                </ul>
                
                <h4>التخصصات:</h4>
                <div class="specializations">
                  <span v-for="spec in teacher.specializations" :key="spec" class="spec-tag">
                    {{ spec }}
                  </span>
                </div>
              </div>
              
              <div v-if="activeTab === 'courses'" class="courses-content">
                <h3>الدورات التي يدرسها</h3>
                <div class="teacher-courses">
                  <CourseCard v-for="course in teacherCourses" :key="course.id" :course="course" />
                </div>
              </div>
              
              <div v-if="activeTab === 'reviews'" class="reviews-content">
                <h3>آراء الطلاب</h3>
                <div class="reviews-list">
                  <div v-for="review in teacher.reviews" :key="review.id" class="review-item">
                    <div class="review-header">
                      <div class="reviewer-avatar">{{ review.studentName.charAt(0) }}</div>
                      <div>
                        <div class="reviewer-name">{{ review.studentName }}</div>
                        <div class="review-rating">
                          <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= review.rating }">⭐</span>
                        </div>
                      </div>
                    </div>
                    <p class="review-text">{{ review.comment }}</p>
                    <p class="review-course">الدورة: {{ review.courseName }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="teacher-sidebar">
            <div class="contact-card card">
              <h3>تواصل مع المعلم</h3>
              <button class="btn btn-primary contact-btn">إرسال رسالة</button>
              <button class="btn btn-outline schedule-btn">حجز جلسة</button>
            </div>
            
            <div class="schedule-card card">
              <h3>الأوقات المتاحة</h3>
              <div class="schedule-list">
                <div v-for="slot in teacher.availableSlots" :key="slot.id" class="schedule-item">
                  <span class="schedule-day">{{ slot.day }}</span>
                  <span class="schedule-time">{{ slot.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import CourseCard from '../components/CourseCard.vue'

const activeTab = ref('about')

const tabs = [
  { id: 'about', label: 'نبذة' },
  { id: 'courses', label: 'الدورات' },
  { id: 'reviews', label: 'التقييمات' }
]

const teacher = {
  id: 1,
  name: 'أحمد محمد',
  specialty: 'مدرس الرياضيات والفيزياء',
  rating: 4.9,
  students: 1250,
  courses: 8,
  experience: 12,
  bio: 'مدرس متخصص في الرياضيات والفيزياء مع أكثر من 12 عاماً من الخبرة في التدريس. حاصل على درجة الماجستير في الرياضيات التطبيقية من جامعة الملك سعود. أؤمن بأن التعليم هو مفتاح النجاح وأسعى لتبسيط المفاهيم المعقدة للطلاب.',
  qualifications: [
    'ماجستير في الرياضيات التطبيقية - جامعة الملك سعود',
    'بكالوريوس في الرياضيات - جامعة الإمام محمد بن سعود',
    'شهادة في طرق التدريس الحديثة',
    'دورة في التعليم الإلكتروني'
  ],
  specializations: ['الرياضيات', 'الفيزياء', 'الإحصاء', 'الجبر', 'الهندسة'],
  availableSlots: [
    { id: 1, day: 'الأحد', time: '4:00 - 6:00 م' },
    { id: 2, day: 'الثلاثاء', time: '5:00 - 7:00 م' },
    { id: 3, day: 'الخميس', time: '3:00 - 5:00 م' }
  ],
  reviews: [
    {
      id: 1,
      studentName: 'سارة أحمد',
      rating: 5,
      comment: 'معلم ممتاز، شرحه واضح ومبسط. استفدت كثيراً من دروسه.',
      courseName: 'أساسيات الرياضيات'
    },
    {
      id: 2,
      studentName: 'محمد علي',
      rating: 5,
      comment: 'أفضل معلم رياضيات! يجعل المادة سهلة ومفهومة.',
      courseName: 'الفيزياء المتقدمة'
    },
    {
      id: 3,
      studentName: 'فاطمة حسن',
      rating: 4,
      comment: 'معلم صبور ومتفهم، ساعدني كثيراً في فهم المادة.',
      courseName: 'الإحصاء والاحتمالات'
    }
  ]
}

const teacherCourses = [
  {
    id: 1,
    title: 'أساسيات الرياضيات',
    instructor: 'أحمد محمد',
    image: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    students: 450,
    lessons: 20,
    price: 199,
    level: 'مبتدئ',
    levelColor: 'green'
  },
  {
    id: 2,
    title: 'الفيزياء المتقدمة',
    instructor: 'أحمد محمد',
    image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    students: 320,
    lessons: 25,
    price: 299,
    level: 'متقدم',
    levelColor: 'red'
  }
]
</script>

<style scoped>
.teacher-header {
  background: var(--gray-50);
  padding: 2rem 0;
}

.breadcrumb {
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: var(--gray-600);
}

.breadcrumb a {
  color: var(--primary-blue);
  text-decoration: none;
}

.teacher-info-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.teacher-avatar-large {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: var(--primary-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  flex-shrink: 0;
}

.teacher-name {
  font-size: 2rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.teacher-specialty {
  font-size: 1.125rem;
  color: var(--gray-600);
  margin-bottom: 1.5rem;
}

.teacher-stats {
  display: flex;
  gap: 2rem;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-blue);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.content-tabs {
  display: flex;
  border-bottom: 1px solid var(--gray-200);
  margin-bottom: 2rem;
}

.tab-btn {
  padding: 1rem 2rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: var(--gray-600);
  border-bottom: 2px solid transparent;
}

.tab-btn.active {
  color: var(--primary-blue);
  border-bottom-color: var(--primary-blue);
}

.teacher-bio {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--gray-700);
  margin-bottom: 2rem;
}

.qualifications {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.qualifications li {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--gray-200);
  position: relative;
  padding-right: 1.5rem;
}

.qualifications li::before {
  content: '🎓';
  position: absolute;
  right: 0;
  font-size: 1.25rem;
}

.specializations {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.spec-tag {
  background: var(--primary-blue);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.teacher-courses {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.review-item {
  padding: 1.5rem;
  border: 1px solid var(--gray-200);
  border-radius: 8px;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.reviewer-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--secondary-green);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.reviewer-name {
  font-weight: 600;
  color: var(--gray-900);
}

.review-rating {
  display: flex;
  gap: 0.25rem;
}

.star {
  font-size: 0.875rem;
}

.star.filled {
  color: #fbbf24;
}

.review-text {
  color: var(--gray-600);
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.review-course {
  font-size: 0.875rem;
  color: var(--gray-500);
  font-style: italic;
}

.teacher-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-card,
.schedule-card {
  padding: 1.5rem;
}

.contact-card h3,
.schedule-card h3 {
  margin-bottom: 1.5rem;
  color: var(--gray-900);
}

.contact-btn,
.schedule-btn {
  width: 100%;
  margin-bottom: 1rem;
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.schedule-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--gray-50);
  border-radius: 6px;
}

.schedule-day {
  font-weight: 500;
  color: var(--gray-900);
}

.schedule-time {
  font-size: 0.875rem;
  color: var(--gray-600);
}

@media (max-width: 768px) {
  .teacher-info-card {
    flex-direction: column;
    text-align: center;
  }
  
  .teacher-stats {
    justify-content: center;
  }
  
  .content-tabs {
    overflow-x: auto;
  }
  
  .tab-btn {
    white-space: nowrap;
  }
  
  .teacher-courses {
    grid-template-columns: 1fr;
  }
}
</style>
