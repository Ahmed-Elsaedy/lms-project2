<template>
  <main class="student-dashboard">
    <!-- Dashboard Header -->
    <section class="dashboard-header">
      <div class="container">
        <div class="header-content">
          <div class="welcome-section">
            <h1 class="dashboard-title">مرحباً، {{ studentName }}</h1>
            <p class="dashboard-subtitle">لوحة تحكم الطالب - تتبع تقدمك التعليمي</p>
          </div>
          <div class="quick-actions">
            <button class="btn btn-primary" @click="browseCourses">
              تصفح الدورات
            </button>
            <button class="btn btn-outline">
              المساعدة
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Overview -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card card">
            <div class="stat-icon courses-icon">📚</div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.enrolledCourses }}</div>
              <div class="stat-label">الدورات المسجلة</div>
            </div>
          </div>
          
          <div class="stat-card card">
            <div class="stat-icon progress-icon">📈</div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.averageProgress }}%</div>
              <div class="stat-label">متوسط التقدم</div>
            </div>
          </div>
          
          <div class="stat-card card">
            <div class="stat-icon hours-icon">⏰</div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.totalHours }}</div>
              <div class="stat-label">ساعات التعلم</div>
            </div>
          </div>
          
          <div class="stat-card card">
            <div class="stat-icon certificates-icon">🏆</div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.completedCourses }}</div>
              <div class="stat-label">الدورات المكتملة</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Dashboard Content -->
    <section class="dashboard-content">
      <div class="container">
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

        <!-- My Courses Tab -->
        <div v-if="activeTab === 'courses'" class="tab-content">
          <div class="section-header">
            <h2>دوراتي</h2>
            <div class="view-options">
              <button 
                @click="viewMode = 'grid'" 
                :class="['view-btn', { active: viewMode === 'grid' }]"
              >
                ⊞
              </button>
              <button 
                @click="viewMode = 'list'" 
                :class="['view-btn', { active: viewMode === 'list' }]"
              >
                ☰
              </button>
            </div>
          </div>
          
          <!-- Grid View -->
          <div v-if="viewMode === 'grid'" class="courses-grid">
            <div v-for="course in enrolledCourses" :key="course.id" class="course-card card">
              <div class="course-image">
                <img :src="course.image" :alt="course.title">
                <div class="course-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: course.progress + '%' }"></div>
                  </div>
                  <span class="progress-text">{{ course.progress }}% مكتمل</span>
                </div>
              </div>
              
              <div class="course-content">
                <h3 class="course-title">{{ course.title }}</h3>
                <div class="instructor">
                  <span class="instructor-name">{{ course.instructor }}</span>
                </div>
                <div class="course-meta">
                  <span>{{ course.completedLessons }}/{{ course.totalLessons }} درس</span>
                  <span>{{ course.duration }}</span>
                </div>
                <div class="course-actions">
                  <button class="btn btn-outline btn-sm" @click="viewCourseDetails(course.id)">التفاصيل</button>
                </div>
              </div>
            </div>
          </div>

          <!-- List View -->
          <div v-else class="courses-list">
            <div class="list-header">
              <div class="list-cell">الدورة</div>
              <div class="list-cell">المدرس</div>
              <div class="list-cell">التقدم</div>
              <div class="list-cell">آخر درس</div>
              <div class="list-cell">الإجراءات</div>
            </div>
            
            <div v-for="course in enrolledCourses" :key="course.id" class="list-row">
              <div class="list-cell course-info">
                <img :src="course.image" :alt="course.title" class="course-thumbnail">
                <div>
                  <div class="course-title">{{ course.title }}</div>
                  <div class="course-meta">{{ course.completedLessons }}/{{ course.totalLessons }} درس</div>
                </div>
              </div>
              <div class="list-cell">{{ course.instructor }}</div>
              <div class="list-cell">
                <div class="progress-display">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: course.progress + '%' }"></div>
                  </div>
                  <span class="progress-text">{{ course.progress }}%</span>
                </div>
              </div>
              <div class="list-cell">{{ course.lastLesson }}</div>
              <div class="list-cell">
                <div class="action-buttons">
                  <button class="btn btn-outline btn-sm" @click="viewCourseDetails(course.id)">التفاصيل</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Tab -->
        <div v-if="activeTab === 'progress'" class="tab-content">
          <div class="section-header">
            <h2>تقدمي التعليمي</h2>
          </div>
          
          <div class="progress-overview">
            <div class="progress-card card">
              <h3>التقدم العام</h3>
              <div class="overall-progress">
                <div class="progress-circle">
                  <svg class="progress-ring" width="120" height="120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="#e5e7eb"
                      stroke-width="8"
                      fill="transparent"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="#3b82f6"
                      stroke-width="8"
                      fill="transparent"
                      stroke-dasharray="314"
                      :stroke-dashoffset="314 - (314 * stats.averageProgress) / 100"
                      stroke-linecap="round"
                    />
                  </svg>
                  <div class="progress-center">
                    <span class="progress-percentage">{{ stats.averageProgress }}%</span>
                  </div>
                </div>
                <div class="progress-stats">
                  <div class="stat-item">
                    <span class="stat-label">الدورات النشطة</span>
                    <span class="stat-value">{{ stats.activeCourses }}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">الدروس المكتملة</span>
                    <span class="stat-value">{{ stats.completedLessons }}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">ساعات التعلم</span>
                    <span class="stat-value">{{ stats.totalHours }} ساعة</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="recent-activity card">
              <h3>النشاط الأخير</h3>
              <div class="activity-list">
                <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
                  <div class="activity-icon">{{ activity.icon }}</div>
                  <div class="activity-content">
                    <div class="activity-title">{{ activity.title }}</div>
                    <div class="activity-time">{{ activity.time }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Schedule Tab -->
        <div v-if="activeTab === 'schedule'" class="tab-content">
          <div class="section-header">
            <h2>جدولي الدراسي</h2>
          </div>
          
          <div class="schedule-container">
            <div class="upcoming-lessons card">
              <h3>الدروس القادمة</h3>
              <div class="lessons-list">
                <div v-for="lesson in upcomingLessons" :key="lesson.id" class="lesson-item">
                  <div class="lesson-time">
                    <div class="time">{{ lesson.time }}</div>
                    <div class="date">{{ lesson.date }}</div>
                  </div>
                  <div class="lesson-content">
                    <div class="lesson-title">{{ lesson.title }}</div>
                    <div class="lesson-course">{{ lesson.course }}</div>
                    <div class="lesson-instructor">{{ lesson.instructor }}</div>
                  </div>
                  <div class="lesson-actions">
                    <button class="btn btn-primary btn-sm">انضم الآن</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="study-goals card">
              <h3>أهدافي الدراسية</h3>
              <div class="goals-list">
                <div v-for="goal in studyGoals" :key="goal.id" class="goal-item">
                  <div class="goal-checkbox">
                    <input type="checkbox" :checked="goal.completed" @change="toggleGoal(goal.id)">
                  </div>
                  <div class="goal-content">
                    <div class="goal-title" :class="{ completed: goal.completed }">{{ goal.title }}</div>
                    <div class="goal-deadline">{{ goal.deadline }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Tab -->
        <div v-if="activeTab === 'profile'" class="tab-content">
          <div class="section-header">
            <h2>الملف الشخصي</h2>
          </div>
          
          <div class="profile-container">
            <div class="profile-card card">
              <div class="profile-header">
                <div class="profile-avatar">{{ studentName.charAt(0) }}</div>
                <div class="profile-info">
                  <h3>{{ studentName }}</h3>
                  <p>{{ studentEmail }}</p>
                  <span class="member-since">عضو منذ {{ memberSince }}</span>
                </div>
              </div>
              
              <form class="profile-form">
                <div class="form-group">
                  <label class="form-label">الاسم الكامل</label>
                  <input type="text" v-model="studentProfile.name" class="form-input">
                </div>
                <div class="form-group">
                  <label class="form-label">البريد الإلكتروني</label>
                  <input type="email" v-model="studentProfile.email" class="form-input">
                </div>
                <div class="form-group">
                  <label class="form-label">رقم الهاتف</label>
                  <input type="tel" v-model="studentProfile.phone" class="form-input">
                </div>
                <div class="form-group">
                  <label class="form-label">المرحلة التعليمية</label>
                  <select v-model="studentProfile.educationLevel" class="form-input">
                    <option value="المرحلة الابتدائية">المرحلة الابتدائية</option>
                    <option value="المرحلة الإعدادية">المرحلة الإعدادية</option>
                    <option value="المرحلة الثانوية">المرحلة الثانوية</option>
                    <option value="المرحلة الجامعية">المرحلة الجامعية</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">حفظ التغييرات</button>
              </form>
            </div>
            
            <div class="achievements-card card">
              <h3>إنجازاتي</h3>
              <div class="achievements-list">
                <div v-for="achievement in achievements" :key="achievement.id" class="achievement-item">
                  <div class="achievement-icon">{{ achievement.icon }}</div>
                  <div class="achievement-content">
                    <div class="achievement-title">{{ achievement.title }}</div>
                    <div class="achievement-description">{{ achievement.description }}</div>
                    <div class="achievement-date">{{ achievement.date }}</div>
                  </div>
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const studentName = ref('سارة أحمد')
const activeTab = ref('courses')
const viewMode = ref('grid')

const tabs = [
  { id: 'courses', label: 'دوراتي' },
  { id: 'progress', label: 'التقدم' },
  { id: 'schedule', label: 'الجدول' },
  { id: 'profile', label: 'الملف الشخصي' }
]

const stats = reactive({
  enrolledCourses: 5,
  averageProgress: 78,
  totalHours: 45,
  completedCourses: 2,
  activeCourses: 3,
  completedLessons: 67
})

const enrolledCourses = ref([
  {
    id: 1,
    title: 'أساسيات الرياضيات',
    instructor: 'أحمد محمد',
    image: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=100',
    progress: 85,
    completedLessons: 17,
    totalLessons: 20,
    duration: '15 ساعة',
    lastLesson: 'المعادلات التربيعية'
  },
  {
    id: 2,
    title: 'الفيزياء المتقدمة',
    instructor: 'فاطمة حسن',
    image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=100',
    progress: 60,
    completedLessons: 12,
    totalLessons: 20,
    duration: '18 ساعة',
    lastLesson: 'قوانين نيوتن'
  },
  {
    id: 3,
    title: 'اللغة الإنجليزية',
    instructor: 'محمد علي',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100',
    progress: 90,
    completedLessons: 18,
    totalLessons: 20,
    duration: '12 ساعة',
    lastLesson: 'قواعد النحو المتقدمة'
  }
])

const recentActivity = ref([
  {
    id: 1,
    icon: '📚',
    title: 'أكملت درس "المعادلات التربيعية"',
    time: 'منذ ساعتين'
  },
  {
    id: 2,
    icon: '🏆',
    title: 'حصلت على شهادة إتمام دورة الرياضيات',
    time: 'أمس'
  },
  {
    id: 3,
    icon: '📝',
    title: 'أكملت الاختبار النهائي للفيزياء',
    time: 'منذ يومين'
  }
])

const upcomingLessons = ref([
  {
    id: 1,
    title: 'المعادلات التفاضلية',
    course: 'أساسيات الرياضيات',
    instructor: 'أحمد محمد',
    time: '14:00',
    date: 'اليوم'
  },
  {
    id: 2,
    title: 'الكهرومغناطيسية',
    course: 'الفيزياء المتقدمة',
    instructor: 'فاطمة حسن',
    time: '16:00',
    date: 'غداً'
  }
])

const studyGoals = ref([
  {
    id: 1,
    title: 'إكمال دورة الرياضيات',
    deadline: 'خلال أسبوع',
    completed: false
  },
  {
    id: 2,
    title: 'حل 50 مسألة فيزياء',
    deadline: 'خلال 3 أيام',
    completed: true
  },
  {
    id: 3,
    title: 'ممارسة اللغة الإنجليزية يومياً',
    deadline: 'مستمر',
    completed: false
  }
])

const studentProfile = reactive({
  name: 'سارة أحمد',
  email: 'sara@example.com',
  phone: '+966501234567',
  educationLevel: 'المرحلة الثانوية'
})

const achievements = ref([
  {
    id: 1,
    icon: '🏆',
    title: 'أول دورة مكتملة',
    description: 'أكملت أول دورة تعليمية بنجاح',
    date: 'منذ أسبوع'
  },
  {
    id: 2,
    icon: '⭐',
    title: 'طالب نشط',
    description: 'تعلمت لمدة 30 ساعة متواصلة',
    date: 'منذ 3 أيام'
  },
  {
    id: 3,
    icon: '📈',
    title: 'تحسن ملحوظ',
    description: 'حسنت معدل التقدم بنسبة 25%',
    date: 'منذ أسبوع'
  }
])

const studentEmail = ref('sara@example.com')
const memberSince = ref('يناير 2024')

const browseCourses = () => {
  router.push('/courses')
}

const viewCourseDetails = (courseId: number) => {
  router.push(`/course/${courseId}`)
}

const toggleGoal = (goalId: number) => {
  const goal = studyGoals.value.find(g => g.id === goalId)
  if (goal) {
    goal.completed = !goal.completed
  }
}
</script>

<style scoped>
.student-dashboard {
  background: var(--gray-50);
  min-height: 100vh;
}

.dashboard-header {
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-green) 100%);
  color: white;
  padding: 3rem 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.dashboard-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.dashboard-subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
}

.quick-actions {
  display: flex;
  gap: 1rem;
}

.stats-section {
  padding: 2rem 0;
  background: white;
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.courses-icon { background: #dbeafe; }
.progress-icon { background: #dcfce7; }
.hours-icon { background: #fef3c7; }
.certificates-icon { background: #fce7f3; }

.stat-number {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--gray-900);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.dashboard-content {
  padding: 2rem 0;
}

.content-tabs {
  display: flex;
  border-bottom: 1px solid var(--gray-200);
  margin-bottom: 2rem;
  overflow-x: auto;
}

.tab-btn {
  padding: 1rem 2rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: var(--gray-600);
  border-bottom: 2px solid transparent;
  white-space: nowrap;
}

.tab-btn.active {
  color: var(--primary-blue);
  border-bottom-color: var(--primary-blue);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-header h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--gray-900);
}

.view-options {
  display: flex;
  gap: 0.5rem;
}

.view-btn {
  padding: 0.5rem;
  border: 1px solid var(--gray-300);
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.view-btn.active {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.course-card {
  overflow: hidden;
  transition: all 0.3s ease;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.course-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.course-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.course-card:hover .course-image img {
  transform: scale(1.05);
}

.course-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.75rem;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: var(--secondary-green);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.875rem;
  font-weight: 500;
}

.course-content {
  padding: 1.5rem;
}

.course-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--gray-900);
}

.instructor {
  margin-bottom: 1rem;
}

.instructor-name {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.course-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--gray-600);
  margin-bottom: 1.5rem;
}

.course-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.courses-list {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.list-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
  background: var(--gray-50);
  padding: 1rem;
  font-weight: 600;
  color: var(--gray-700);
  border-bottom: 1px solid var(--gray-200);
}

.list-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
  padding: 1rem;
  border-bottom: 1px solid var(--gray-100);
  align-items: center;
}

.list-row:hover {
  background: var(--gray-50);
}

.course-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.course-thumbnail {
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 6px;
}

.progress-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.progress-overview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.progress-card {
  padding: 2rem;
  text-align: center;
}

.overall-progress {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 2rem;
}

.progress-circle {
  position: relative;
  display: inline-block;
}

.progress-ring {
  transform: rotate(-90deg);
}

.progress-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.progress-percentage {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-blue);
}

.progress-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  color: var(--gray-600);
}

.stat-value {
  font-weight: 600;
  color: var(--gray-900);
}

.recent-activity {
  padding: 2rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--gray-50);
  border-radius: 8px;
}

.activity-icon {
  font-size: 1.5rem;
}

.activity-title {
  font-weight: 500;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.activity-time {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.schedule-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.upcoming-lessons {
  padding: 2rem;
}

.lessons-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.lesson-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--gray-50);
  border-radius: 8px;
}

.lesson-time {
  text-align: center;
  min-width: 80px;
}

.time {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--primary-blue);
}

.date {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.lesson-content {
  flex: 1;
}

.lesson-title {
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.lesson-course {
  font-size: 0.875rem;
  color: var(--gray-600);
  margin-bottom: 0.25rem;
}

.lesson-instructor {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.study-goals {
  padding: 2rem;
}

.goals-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.goal-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--gray-50);
  border-radius: 8px;
}

.goal-checkbox input[type="checkbox"] {
  width: 1.25rem;
  height: 1.25rem;
  accent-color: var(--primary-blue);
}

.goal-title {
  font-weight: 500;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.goal-title.completed {
  text-decoration: line-through;
  color: var(--gray-500);
}

.goal-deadline {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.profile-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.profile-card {
  padding: 2rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--gray-200);
}

.profile-avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: var(--primary-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
}

.profile-info h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.profile-info p {
  color: var(--gray-600);
  margin-bottom: 0.5rem;
}

.member-since {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 500;
  color: var(--gray-700);
  text-align: right;
}

.form-input {
  padding: 0.75rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  font-family: inherit;
  text-align: right;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.achievements-card {
  padding: 2rem;
}

.achievements-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.achievement-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--gray-50);
  border-radius: 8px;
}

.achievement-icon {
  font-size: 1.5rem;
}

.achievement-title {
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.achievement-description {
  font-size: 0.875rem;
  color: var(--gray-600);
  margin-bottom: 0.25rem;
}

.achievement-date {
  font-size: 0.875rem;
  color: var(--gray-500);
}

@media (max-width: 768px) {
  .dashboard-title {
    font-size: 2rem;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
  }
  
  .list-header,
  .list-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .progress-overview {
    grid-template-columns: 1fr;
  }
  
  .schedule-container {
    grid-template-columns: 1fr;
  }
  
  .profile-container {
    grid-template-columns: 1fr;
  }
}
</style> 