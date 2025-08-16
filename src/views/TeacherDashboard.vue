<template>
  <main class="teacher-dashboard">
    <!-- Dashboard Header -->
    <section class="dashboard-header">
      <div class="container">
        <div class="header-content">
          <div class="welcome-section">
            <h1 class="dashboard-title">مرحباً، {{ teacherName }}</h1>
            <p class="dashboard-subtitle">لوحة تحكم المعلم</p>
          </div>
          <div class="quick-actions">
            <button class="btn btn-primary" @click="createNewCourse">
              إضافة دورة جديدة
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
            <button class="btn btn-primary" @click="createNewCourse">
              إضافة دورة
            </button>
          </div>
          
          <div class="courses-grid">
            <div v-for="course in teacherCourses" :key="course.id" class="course-card card">
              <div class="course-image">
                <img :src="course.image" :alt="course.title">
                <div class="course-status">
                  <span :class="`status-badge ${course.status}`">{{ getStatusText(course.status) }}</span>
                </div>
              </div>
              
              <div class="course-content">
                <h3 class="course-title">{{ course.title }}</h3>
                <div class="course-meta">
                  <span>{{ course.lessons }} درس</span>
                  <span>{{ course.duration }}</span>
                </div>
                <div class="course-stats">
                  <div class="students-count">👥 {{ course.students }} طالب</div>
                  <div class="rating">⭐ {{ course.rating }}</div>
                </div>
                <div class="course-actions">
                  <button class="btn btn-outline btn-sm" @click="editCourse(course.id)">تعديل</button>
                  <button class="btn btn-outline btn-sm" @click="viewCourse(course.id)">عرض</button>
                  <button class="btn btn-danger btn-sm" @click="deleteCourse(course.id)">حذف</button>
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
            </div>
          </div>
        </div>

        <!-- Profile Tab -->
        <div v-if="activeTab === 'profile'" class="tab-content">
          <div class="section-header">
            <h2>الملف الشخصي</h2>
          </div>
          
          <div class="profile-card card">
            <form class="profile-form">
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
        </div>
      </div>
    </section>


  </main>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const teacherName = ref('أحمد محمد')
const activeTab = ref('courses')
const studentSearch = ref('')

const tabs = [
  { id: 'courses', label: 'دوراتي' },
  { id: 'students', label: 'الطلاب' },
  { id: 'profile', label: 'الملف الشخصي' }
]

const stats = reactive({
  totalStudents: 1250,
  totalCourses: 8,
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

const teacherProfile = reactive({
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  specialty: 'مدرس الرياضيات والفيزياء',
  bio: 'مدرس متخصص في الرياضيات والفيزياء مع أكثر من 12 عاماً من الخبرة'
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
  router.push(`/course-form/${courseId}`)
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

const createNewCourse = () => {
  router.push('/course-form/new')
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

.course-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
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

.course-content {
  padding: 1.5rem;
}

.course-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--gray-900);
}

.course-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--gray-600);
  margin-bottom: 1rem;
}

.course-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: var(--gray-700);
}

.course-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-danger {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.btn-danger:hover {
  background: #fecaca;
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

.profile-card {
  max-width: 600px;
  margin: 0 auto;
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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
  
  .search-input {
    width: 100%;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>