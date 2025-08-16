<template>
  <main class="teacher-dashboard">
    <!-- Dashboard Header -->
    <section class="dashboard-header">
      <div class="container">
        <div class="header-content">
          <div class="welcome-section">
            <h1 class="dashboard-title">مرحباً، {{ teacherName }}</h1>
            <p class="dashboard-subtitle">لوحة تحكم المعلم - إدارة دوراتك وطلابك</p>
          </div>
          <div class="quick-actions">
            <button class="btn btn-primary" @click="showCreateCourse = true">
              إضافة دورة جديدة
            </button>
            <button class="btn btn-outline">
              عرض التقارير
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
            <div class="stat-icon students-icon">👥</div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.totalStudents }}</div>
              <div class="stat-label">إجمالي الطلاب</div>
            </div>
          </div>
          
          <div class="stat-card card">
            <div class="stat-icon courses-icon">📚</div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.totalCourses }}</div>
              <div class="stat-label">الدورات المنشورة</div>
            </div>
          </div>
          
          <div class="stat-card card">
            <div class="stat-icon revenue-icon">💰</div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.totalRevenue }} ر.س</div>
              <div class="stat-label">إجمالي الأرباح</div>
            </div>
          </div>
          
          <div class="stat-card card">
            <div class="stat-icon rating-icon">⭐</div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.averageRating }}</div>
              <div class="stat-label">متوسط التقييم</div>
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
            <button class="btn btn-primary" @click="showCreateCourse = true">
              إضافة دورة
            </button>
          </div>
          
          <div class="courses-table">
            <div class="table-header">
              <div class="table-cell">الدورة</div>
              <div class="table-cell">الطلاب</div>
              <div class="table-cell">التقييم</div>
              <div class="table-cell">الحالة</div>
              <div class="table-cell">الإجراءات</div>
            </div>
            
            <div v-for="course in teacherCourses" :key="course.id" class="table-row">
              <div class="table-cell course-info">
                <img :src="course.image" :alt="course.title" class="course-thumbnail">
                <div>
                  <div class="course-title">{{ course.title }}</div>
                  <div class="course-meta">{{ course.lessons }} درس • {{ course.duration }}</div>
                </div>
              </div>
              <div class="table-cell">{{ course.students }}</div>
              <div class="table-cell">
                <div class="rating-display">
                  ⭐ {{ course.rating }}
                </div>
              </div>
              <div class="table-cell">
                <span :class="`status-badge ${course.status}`">{{ getStatusText(course.status) }}</span>
              </div>
              <div class="table-cell">
                <div class="action-buttons">
                  <button class="action-btn edit-btn" @click="editCourse(course.id)">تعديل</button>
                  <button class="action-btn view-btn" @click="viewCourse(course.id)">عرض</button>
                  <button class="action-btn delete-btn" @click="deleteCourse(course.id)">حذف</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Students Tab -->
        <div v-if="activeTab === 'students'" class="tab-content">
          <div class="section-header">
            <h2>الطلاب</h2>
            <div class="search-box">
              <input 
                type="text" 
                v-model="studentSearch"
                placeholder="البحث عن طالب..."
                class="search-input"
              >
            </div>
          </div>
          
          <div class="students-grid">
            <div v-for="student in filteredStudents" :key="student.id" class="student-card card">
              <div class="student-avatar">{{ student.name.charAt(0) }}</div>
              <div class="student-info">
                <h3 class="student-name">{{ student.name }}</h3>
                <p class="student-email">{{ student.email }}</p>
                <div class="student-stats">
                  <span class="student-courses">{{ student.enrolledCourses }} دورة</span>
                  <span class="student-progress">{{ student.progress }}% مكتمل</span>
                </div>
              </div>
              <div class="student-actions">
                <button class="btn btn-outline btn-sm">عرض التفاصيل</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Analytics Tab -->
        <div v-if="activeTab === 'analytics'" class="tab-content">
          <div class="section-header">
            <h2>التحليلات</h2>
          </div>
          
          <div class="analytics-grid">
            <div class="analytics-card card">
              <h3>الطلاب الجدد هذا الشهر</h3>
              <div class="analytics-chart">
                <div class="chart-bar" v-for="day in monthlyStudents" :key="day.day" :style="{ height: day.height }">
                  <span class="bar-value">{{ day.students }}</span>
                </div>
              </div>
            </div>
            
            <div class="analytics-card card">
              <h3>أداء الدورات</h3>
              <div class="performance-list">
                <div v-for="course in coursePerformance" :key="course.id" class="performance-item">
                  <div class="performance-info">
                    <span class="performance-title">{{ course.title }}</span>
                    <span class="performance-completion">{{ course.completion }}% معدل الإكمال</span>
                  </div>
                  <div class="performance-bar">
                    <div class="performance-fill" :style="{ width: course.completion + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="analytics-card card">
              <h3>الأرباح الشهرية</h3>
              <div class="revenue-chart">
                <div class="revenue-amount">{{ monthlyRevenue }} ر.س</div>
                <div class="revenue-change positive">+15% من الشهر الماضي</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Messages Tab -->
        <div v-if="activeTab === 'messages'" class="tab-content">
          <div class="section-header">
            <h2>الرسائل</h2>
          </div>
          
          <div class="messages-container">
            <div class="messages-list">
              <div v-for="message in messages" :key="message.id" class="message-item" :class="{ unread: !message.read }">
                <div class="message-avatar">{{ message.senderName.charAt(0) }}</div>
                <div class="message-content">
                  <div class="message-header">
                    <span class="message-sender">{{ message.senderName }}</span>
                    <span class="message-time">{{ message.time }}</span>
                  </div>
                  <div class="message-subject">{{ message.subject }}</div>
                  <div class="message-preview">{{ message.preview }}</div>
                </div>
                <div class="message-actions">
                  <button class="action-btn reply-btn">رد</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Settings Tab -->
        <div v-if="activeTab === 'settings'" class="tab-content">
          <div class="section-header">
            <h2>الإعدادات</h2>
          </div>
          
          <div class="settings-sections">
            <div class="settings-card card">
              <h3>المعلومات الشخصية</h3>
              <form class="settings-form">
                <div class="form-group">
                  <label class="form-label">الاسم الكامل</label>
                  <input type="text" v-model="teacherProfile.name" class="form-input">
                </div>
                <div class="form-group">
                  <label class="form-label">البريد الإلكتروني</label>
                  <input type="email" v-model="teacherProfile.email" class="form-input">
                </div>
                <div class="form-group">
                  <label class="form-label">التخصص</label>
                  <input type="text" v-model="teacherProfile.specialty" class="form-input">
                </div>
                <div class="form-group">
                  <label class="form-label">نبذة شخصية</label>
                  <textarea v-model="teacherProfile.bio" class="form-textarea" rows="4"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">حفظ التغييرات</button>
              </form>
            </div>
            
            <div class="settings-card card">
              <h3>إعدادات الإشعارات</h3>
              <div class="notification-settings">
                <label class="notification-item">
                  <input type="checkbox" v-model="notifications.newStudents">
                  <span>إشعار عند تسجيل طلاب جدد</span>
                </label>
                <label class="notification-item">
                  <input type="checkbox" v-model="notifications.messages">
                  <span>إشعار عند وصول رسائل جديدة</span>
                </label>
                <label class="notification-item">
                  <input type="checkbox" v-model="notifications.reviews">
                  <span>إشعار عند إضافة تقييمات جديدة</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Create Course Modal -->
    <div v-if="showCreateCourse" class="modal-overlay" @click="showCreateCourse = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>إضافة دورة جديدة</h3>
          <button @click="showCreateCourse = false" class="modal-close">×</button>
        </div>
        <form @submit.prevent="createCourse" class="modal-form">
          <div class="form-group">
            <label class="form-label">عنوان الدورة</label>
            <input type="text" v-model="newCourse.title" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">الوصف</label>
            <textarea v-model="newCourse.description" class="form-textarea" rows="3"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">السعر (ر.س)</label>
              <input type="number" v-model="newCourse.price" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">المستوى</label>
              <select v-model="newCourse.level" class="form-input" required>
                <option value="">اختر المستوى</option>
                <option value="المرحلة الابتدائية">المرحلة الابتدائية</option>
                <option value="المرحلة الإعدادية">المرحلة الإعدادية</option>
                <option value="المرحلة الثانوية">المرحلة الثانوية</option>
                <option value="المرحلة الجامعية">المرحلة الجامعية</option>
              </select>
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" @click="showCreateCourse = false" class="btn btn-outline">إلغاء</button>
            <button type="submit" class="btn btn-primary">إنشاء الدورة</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const teacherName = ref('أحمد محمد')
const activeTab = ref('courses')
const showCreateCourse = ref(false)
const studentSearch = ref('')

const tabs = [
  { id: 'courses', label: 'دوراتي' },
  { id: 'students', label: 'الطلاب' },
  { id: 'analytics', label: 'التحليلات' },
  { id: 'messages', label: 'الرسائل' },
  { id: 'settings', label: 'الإعدادات' }
]

const stats = reactive({
  totalStudents: 1250,
  totalCourses: 8,
  totalRevenue: 45000,
  averageRating: 4.9
})

const teacherCourses = ref([
  {
    id: 1,
    title: 'أساسيات الرياضيات',
    image: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=100',
    students: 450,
    lessons: 20,
    duration: '15 ساعة',
    rating: 4.9,
    status: 'published'
  },
  {
    id: 2,
    title: 'الفيزياء المتقدمة',
    image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=100',
    students: 320,
    lessons: 25,
    duration: '20 ساعة',
    rating: 4.8,
    status: 'published'
  },
  {
    id: 3,
    title: 'الإحصاء والاحتمالات',
    image: 'https://images.pexels.com/photos/6238001/pexels-photo-6238001.jpeg?auto=compress&cs=tinysrgb&w=100',
    students: 180,
    lessons: 15,
    duration: '12 ساعة',
    rating: 4.7,
    status: 'draft'
  }
])

const students = ref([
  {
    id: 1,
    name: 'سارة أحمد',
    email: 'sara@example.com',
    enrolledCourses: 3,
    progress: 85,
    joinDate: '2024-01-15'
  },
  {
    id: 2,
    name: 'محمد علي',
    email: 'mohamed@example.com',
    enrolledCourses: 2,
    progress: 92,
    joinDate: '2024-02-10'
  },
  {
    id: 3,
    name: 'فاطمة حسن',
    email: 'fatima@example.com',
    enrolledCourses: 1,
    progress: 67,
    joinDate: '2024-03-05'
  }
])

const messages = ref([
  {
    id: 1,
    senderName: 'سارة أحمد',
    subject: 'استفسار حول الدرس الثالث',
    preview: 'أستاذ أحمد، لدي سؤال حول المعادلات التفاضلية...',
    time: 'منذ ساعتين',
    read: false
  },
  {
    id: 2,
    senderName: 'محمد علي',
    subject: 'طلب موعد إضافي',
    preview: 'هل يمكن ترتيب جلسة إضافية لمراجعة المادة؟',
    time: 'أمس',
    read: true
  }
])

const monthlyStudents = ref([
  { day: 1, students: 12, height: '60%' },
  { day: 2, students: 8, height: '40%' },
  { day: 3, students: 15, height: '75%' },
  { day: 4, students: 20, height: '100%' },
  { day: 5, students: 10, height: '50%' }
])

const coursePerformance = ref([
  { id: 1, title: 'أساسيات الرياضيات', completion: 85 },
  { id: 2, title: 'الفيزياء المتقدمة', completion: 78 },
  { id: 3, title: 'الإحصاء والاحتمالات', completion: 92 }
])

const monthlyRevenue = ref(12500)

const teacherProfile = reactive({
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  specialty: 'مدرس الرياضيات والفيزياء',
  bio: 'مدرس متخصص في الرياضيات والفيزياء مع أكثر من 12 عاماً من الخبرة'
})

const notifications = reactive({
  newStudents: true,
  messages: true,
  reviews: false
})

const newCourse = reactive({
  title: '',
  description: '',
  price: 0,
  level: ''
})

const filteredStudents = computed(() => {
  if (!studentSearch.value) return students.value
  return students.value.filter(student => 
    student.name.includes(studentSearch.value) || 
    student.email.includes(studentSearch.value)
  )
})

const getStatusText = (status: string) => {
  const statusMap: { [key: string]: string } = {
    published: 'منشورة',
    draft: 'مسودة',
    archived: 'مؤرشفة'
  }
  return statusMap[status] || status
}

const editCourse = (courseId: number) => {
  console.log('Edit course:', courseId)
  // Navigate to course edit page
}

const viewCourse = (courseId: number) => {
  console.log('View course:', courseId)
  // Navigate to course details
}

const deleteCourse = (courseId: number) => {
  if (confirm('هل أنت متأكد من حذف هذه الدورة؟')) {
    teacherCourses.value = teacherCourses.value.filter(course => course.id !== courseId)
  }
}

const createCourse = () => {
  // Add new course logic
  const course = {
    id: Date.now(),
    ...newCourse,
    students: 0,
    lessons: 0,
    duration: '0 ساعة',
    rating: 0,
    status: 'draft',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
  
  teacherCourses.value.push(course)
  
  // Reset form
  Object.keys(newCourse).forEach(key => {
    newCourse[key as keyof typeof newCourse] = key === 'price' ? 0 : ''
  })
  
  showCreateCourse.value = false
  alert('تم إنشاء الدورة بنجاح!')
}
</script>

<style scoped>
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

.students-icon { background: #dbeafe; }
.courses-icon { background: #dcfce7; }
.revenue-icon { background: #fef3c7; }
.rating-icon { background: #fce7f3; }

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

.search-box {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 0.75rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  width: 300px;
  text-align: right;
}

.courses-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
  background: var(--gray-50);
  padding: 1rem;
  font-weight: 600;
  color: var(--gray-700);
  border-bottom: 1px solid var(--gray-200);
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
  padding: 1rem;
  border-bottom: 1px solid var(--gray-100);
  align-items: center;
}

.table-row:hover {
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

.course-title {
  font-weight: 500;
  color: var(--gray-900);
}

.course-meta {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-badge.published {
  background: #dcfce7;
  color: #166534;
}

.status-badge.draft {
  background: #fef3c7;
  color: #92400e;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.375rem 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.edit-btn {
  background: #dbeafe;
  color: var(--primary-blue);
}

.view-btn {
  background: #dcfce7;
  color: #166534;
}

.delete-btn {
  background: #fee2e2;
  color: #dc2626;
}

.action-btn:hover {
  opacity: 0.8;
}

.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.student-card {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.student-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--secondary-green);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.student-info {
  flex: 1;
}

.student-name {
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.student-email {
  font-size: 0.875rem;
  color: var(--gray-600);
  margin-bottom: 0.5rem;
}

.student-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--gray-500);
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.analytics-card {
  padding: 1.5rem;
}

.analytics-card h3 {
  margin-bottom: 1.5rem;
  color: var(--gray-900);
}

.analytics-chart {
  display: flex;
  align-items: end;
  gap: 0.5rem;
  height: 100px;
}

.chart-bar {
  flex: 1;
  background: var(--primary-blue);
  border-radius: 4px 4px 0 0;
  position: relative;
  min-height: 20px;
  display: flex;
  align-items: end;
  justify-content: center;
}

.bar-value {
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem;
}

.performance-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.performance-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.performance-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.performance-title {
  font-weight: 500;
  color: var(--gray-900);
}

.performance-completion {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.performance-bar {
  height: 8px;
  background: var(--gray-200);
  border-radius: 4px;
  overflow: hidden;
}

.performance-fill {
  height: 100%;
  background: var(--secondary-green);
  transition: width 0.3s;
}

.revenue-chart {
  text-align: center;
}

.revenue-amount {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
}

.revenue-change {
  font-size: 0.875rem;
  font-weight: 500;
}

.revenue-change.positive {
  color: var(--secondary-green);
}

.messages-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.message-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid var(--gray-100);
  transition: background 0.2s;
}

.message-item:hover {
  background: var(--gray-50);
}

.message-item.unread {
  background: #eff6ff;
}

.message-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--accent-orange);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.message-content {
  flex: 1;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.message-sender {
  font-weight: 600;
  color: var(--gray-900);
}

.message-time {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.message-subject {
  font-weight: 500;
  color: var(--gray-800);
  margin-bottom: 0.25rem;
}

.message-preview {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.reply-btn {
  background: var(--primary-blue);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

.settings-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.settings-card {
  padding: 2rem;
}

.settings-card h3 {
  margin-bottom: 1.5rem;
  color: var(--gray-900);
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

.form-input,
.form-textarea {
  padding: 0.75rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  font-family: inherit;
  text-align: right;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.notification-settings {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.notification-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.notification-item:hover {
  background: var(--gray-50);
}

.notification-item input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  accent-color: var(--primary-blue);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--gray-200);
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-900);
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--gray-500);
  padding: 0.25rem;
}

.modal-form {
  padding: 1.5rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
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
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .table-cell {
    padding: 0.5rem 0;
  }
  
  .course-info {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .action-buttons {
    justify-content: flex-start;
  }
  
  .search-input {
    width: 100%;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>