<template>
  <main class="course-details-page">
    <!-- Course Header -->
    <section class="course-header">
      <div class="container">
        <div class="breadcrumb">
          <RouterLink to="/">الرئيسية</RouterLink>
          <span>/</span>
          <RouterLink to="/courses">الدورات</RouterLink>
          <span>/</span>
          <span>{{ course.title }}</span>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="course-info md:col-span-2">
            <div class="course-badge">
              <span :class="`badge badge-${course.levelColor}`">{{ course.level }}</span>
            </div>
            <h1 class="course-title">{{ course.title }}</h1>
            <p class="course-description">{{ course.description }}</p>
            
            <div class="course-meta">
              <div class="instructor-info">
                <div class="instructor-avatar">{{ course.instructor.charAt(0) }}</div>
                <div>
                  <div class="instructor-name">{{ course.instructor }}</div>
                  <div class="instructor-title">مدرس معتمد</div>
                </div>
              </div>
              
              <div class="course-stats">
                <div class="stat">
                  <span class="stat-value">{{ course.rating }}</span>
                  <span class="stat-label">التقييم</span>
                </div>
                <div class="stat">
                  <span class="stat-value">{{ course.students }}</span>
                  <span class="stat-label">طالب</span>
                </div>
                <div class="stat">
                  <span class="stat-value">{{ course.lessons }}</span>
                  <span class="stat-label">درس</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="course-sidebar">
            <div class="price-card card">
              <div class="price">
                <span class="current-price">{{ course.price }} ر.س</span>
                <span v-if="course.originalPrice" class="original-price">{{ course.originalPrice }} ر.س</span>
              </div>
              <button class="btn btn-primary enroll-btn">التسجيل في الدورة</button>
              <div class="course-includes">
                <h4>تشمل الدورة:</h4>
                <ul>
                  <li>✓ {{ course.lessons }} درس تفاعلي</li>
                  <li>✓ شهادة معتمدة</li>
                  <li>✓ دعم فني مستمر</li>
                  <li>✓ وصول مدى الحياة</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Course Content -->
    <section class="section">
      <div class="container">
        <div class="grid md:grid-cols-3 gap-8">
          <div class="course-content md:col-span-2">
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
              <div v-if="activeTab === 'overview'" class="overview-content">
                <h3>نظرة عامة</h3>
                <p>{{ course.fullDescription }}</p>
                
                <h4>ما ستتعلمه:</h4>
                <ul class="learning-objectives">
                  <li v-for="objective in course.objectives" :key="objective">{{ objective }}</li>
                </ul>
              </div>
              
              <div v-if="activeTab === 'curriculum'" class="curriculum-content">
                <h3>المنهج الدراسي</h3>
                <div class="lessons-list">
                  <div v-for="lesson in course.curriculum" :key="lesson.id" class="lesson-item">
                    <div class="lesson-header">
                      <span class="lesson-number">{{ lesson.id }}</span>
                      <span class="lesson-title">{{ lesson.title }}</span>
                      <span class="lesson-duration">{{ lesson.duration }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-if="activeTab === 'reviews'" class="reviews-content">
                <h3>آراء الطلاب</h3>
                <div class="reviews-list">
                  <div v-for="review in course.reviews" :key="review.id" class="review-item">
                    <div class="review-header">
                      <div class="reviewer-avatar">{{ review.name.charAt(0) }}</div>
                      <div>
                        <div class="reviewer-name">{{ review.name }}</div>
                        <div class="review-rating">⭐ {{ review.rating }}</div>
                      </div>
                    </div>
                    <p class="review-text">{{ review.comment }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="related-courses">
            <h3>دورات ذات صلة</h3>
            <div class="related-list">
              <div v-for="related in relatedCourses" :key="related.id" class="related-item">
                <img :src="related.image" :alt="related.title" class="related-image">
                <div class="related-info">
                  <h4 class="related-title">{{ related.title }}</h4>
                  <p class="related-price">{{ related.price }} ر.س</p>
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

const activeTab = ref('overview')

const tabs = [
  { id: 'overview', label: 'نظرة عامة' },
  { id: 'curriculum', label: 'المنهج' },
  { id: 'reviews', label: 'التقييمات' }
]

const course = {
  id: 1,
  title: 'أساسيات البرمجة بلغة Python',
  description: 'تعلم أساسيات البرمجة بلغة Python من الصفر حتى الاحتراف',
  fullDescription: 'دورة شاملة لتعلم أساسيات البرمجة بلغة Python، تغطي جميع المفاهيم الأساسية والمتقدمة في البرمجة. ستتعلم كيفية كتابة البرامج، التعامل مع البيانات، إنشاء التطبيقات، والمزيد.',
  instructor: 'محمد سعيد',
  image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
  rating: 4.8,
  students: 1250,
  lessons: 24,
  price: 299,
  originalPrice: 399,
  level: 'مبتدئ',
  levelColor: 'green',
  objectives: [
    'فهم أساسيات البرمجة والمنطق البرمجي',
    'تعلم بناء الجمل في Python',
    'التعامل مع البيانات والمتغيرات',
    'إنشاء الدوال والكلاسات',
    'بناء مشاريع عملية'
  ],
  curriculum: [
    { id: 1, title: 'مقدمة في البرمجة', duration: '15 دقيقة' },
    { id: 2, title: 'تثبيت Python', duration: '10 دقائق' },
    { id: 3, title: 'المتغيرات وأنواع البيانات', duration: '20 دقيقة' },
    { id: 4, title: 'العمليات الحسابية', duration: '18 دقيقة' }
  ],
  reviews: [
    { id: 1, name: 'أحمد محمد', rating: 5, comment: 'دورة ممتازة وشرح واضح' },
    { id: 2, name: 'فاطمة علي', rating: 4, comment: 'استفدت كثيراً من هذه الدورة' }
  ]
}

const relatedCourses = [
  { id: 2, title: 'تطوير المواقع بـ HTML & CSS', price: 199, image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg' },
  { id: 3, title: 'JavaScript للمبتدئين', price: 249, image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg' }
]
</script>

<style scoped>
.course-header {
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

.course-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 1rem 0;
  color: var(--gray-900);
}

.course-description {
  font-size: 1.125rem;
  color: var(--gray-600);
  margin-bottom: 2rem;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.instructor-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.instructor-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--primary-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.instructor-name {
  font-weight: 600;
  color: var(--gray-900);
}

.instructor-title {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.course-stats {
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

.price-card {
  padding: 2rem;
  text-align: center;
}

.price {
  margin-bottom: 2rem;
}

.current-price {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-blue);
}

.original-price {
  font-size: 1.25rem;
  color: var(--gray-500);
  text-decoration: line-through;
  margin-right: 0.5rem;
}

.enroll-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.course-includes h4 {
  margin-bottom: 1rem;
  color: var(--gray-900);
}

.course-includes ul {
  list-style: none;
  padding: 0;
  text-align: right;
}

.course-includes li {
  padding: 0.5rem 0;
  color: var(--gray-600);
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

.learning-objectives {
  list-style: none;
  padding: 0;
}

.learning-objectives li {
  padding: 0.5rem 0;
  position: relative;
  padding-right: 1.5rem;
}

.learning-objectives li::before {
  content: '✓';
  position: absolute;
  right: 0;
  color: var(--secondary-green);
  font-weight: bold;
}

.lessons-list {
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  overflow: hidden;
}

.lesson-item {
  border-bottom: 1px solid var(--gray-200);
}

.lesson-item:last-child {
  border-bottom: none;
}

.lesson-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
}

.lesson-number {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--primary-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
}

.lesson-title {
  flex: 1;
  font-weight: 500;
}

.lesson-duration {
  font-size: 0.875rem;
  color: var(--gray-500);
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
}

.review-rating {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.review-text {
  color: var(--gray-600);
  line-height: 1.6;
}

.related-courses h3 {
  margin-bottom: 1.5rem;
  color: var(--gray-900);
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.related-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--gray-200);
  border-radius: 8px;
}

.related-image {
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  border-radius: 4px;
}

.related-title {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.related-price {
  color: var(--primary-blue);
  font-weight: 600;
}

@media (max-width: 768px) {
  .course-title {
    font-size: 2rem;
  }
  
  .course-meta {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .content-tabs {
    overflow-x: auto;
  }
  
  .tab-btn {
    white-space: nowrap;
  }
}
</style>
