<template>
  <main class="courses-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">تصفح الدورات</h1>
        <p class="page-subtitle">اكتشف مجموعة واسعة من الدورات التعليمية المتاحة</p>
      </div>
      
      <div class="courses-layout">
        <!-- Sidebar Filters -->
        <aside class="filters-sidebar">
          <div class="filter-section">
            <h3 class="filter-title">المادة</h3>
            <div class="filter-options">
              <label v-for="subject in subjects" :key="subject" class="filter-option">
                <input 
                  type="checkbox" 
                  :value="subject" 
                  v-model="selectedSubjects"
                  @change="filterCourses"
                />
                <span>{{ subject }}</span>
              </label>
            </div>
          </div>
          
          <div class="filter-section">
            <h3 class="filter-title">المستوى</h3>
            <div class="filter-options">
              <label v-for="level in levels" :key="level" class="filter-option">
                <input 
                  type="checkbox" 
                  :value="level" 
                  v-model="selectedLevels"
                  @change="filterCourses"
                />
                <span>{{ level }}</span>
              </label>
            </div>
          </div>
          
          <div class="filter-section">
            <h3 class="filter-title">التقييم</h3>
            <div class="rating-filters">
              <label v-for="rating in [5, 4, 3]" :key="rating" class="rating-filter">
                <input 
                  type="checkbox" 
                  :value="rating" 
                  v-model="selectedRatings"
                  @change="filterCourses"
                />
                <div class="rating-display">
                  <span v-for="i in rating" :key="i" class="star filled">⭐</span>
                  <span v-for="i in (5 - rating)" :key="i + rating" class="star empty">⭐</span>
                  <span class="rating-text">{{ rating }} نجوم فأكثر</span>
                </div>
              </label>
            </div>
          </div>
          
          <div class="filter-section">
            <h3 class="filter-title">مدة الدورة</h3>
            <div class="filter-options">
              <label v-for="duration in durations" :key="duration" class="filter-option">
                <input 
                  type="checkbox" 
                  :value="duration" 
                  v-model="selectedDurations"
                  @change="filterCourses"
                />
                <span>{{ duration }}</span>
              </label>
            </div>
          </div>
        </aside>
        
        <!-- Main Content -->
        <div class="courses-content">
          <div class="content-header">
            <div class="results-info">
              <span class="results-count">{{ filteredCourses.length }} دورة متاحة</span>
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
            
            <div class="sort-options">
              <select v-model="sortBy" @change="sortCourses" class="sort-select">
                <option value="rating">الأعلى تقييماً</option>
                <option value="students">الأكثر شعبية</option>
                <option value="price-low">السعر من الأقل للأعلى</option>
                <option value="price-high">السعر من الأعلى للأقل</option>
                <option value="newest">الأحدث</option>
              </select>
            </div>
          </div>
          
          <div :class="['courses-grid', viewMode === 'list' ? 'list-view' : 'grid-view']">
            <CourseCard 
              v-for="course in paginatedCourses" 
              :key="course.id" 
              :course="course" 
            />
          </div>
          
          <!-- Pagination -->
          <div v-if="totalPages > 1" class="pagination">
            <button 
              @click="currentPage = 1" 
              :disabled="currentPage === 1"
              class="pagination-btn"
            >
              الأول
            </button>
            <button 
              @click="currentPage--" 
              :disabled="currentPage === 1"
              class="pagination-btn"
            >
              السابق
            </button>
            
            <div class="page-numbers">
              <button 
                v-for="page in visiblePages" 
                :key="page"
                @click="currentPage = page"
                :class="['page-btn', { active: currentPage === page }]"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              @click="currentPage++" 
              :disabled="currentPage === totalPages"
              class="pagination-btn"
            >
              التالي
            </button>
            <button 
              @click="currentPage = totalPages" 
              :disabled="currentPage === totalPages"
              class="pagination-btn"
            >
              الأخير
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CourseCard from '../components/CourseCard.vue'

interface Course {
  id: number
  title: string
  instructor: string
  image: string
  rating: number
  students: number
  lessons: number
  price: number
  originalPrice?: number
  level: string
  levelColor: string
  subject: string
  duration: string
}

const viewMode = ref<'grid' | 'list'>('grid')
const sortBy = ref('rating')
const currentPage = ref(1)
const coursesPerPage = 9

const selectedSubjects = ref<string[]>([])
const selectedLevels = ref<string[]>([])
const selectedRatings = ref<number[]>([])
const selectedDurations = ref<string[]>([])

const subjects = ['الرياضيات', 'الفيزياء', 'الكيمياء', 'البرمجة', 'اللغة العربية', 'اللغة الإنجليزية']
const levels = ['المرحلة الابتدائية', 'المرحلة الإعدادية', 'المرحلة الثانوية', 'المرحلة الجامعية']
const durations = ['أقل من ساعة', '1-3 ساعات', '3-6 ساعات', 'أكثر من 6 ساعات']

const allCourses = ref<Course[]>([
  {
    id: 1,
    title: 'مفاهيم الكيمياء الأساسية',
    instructor: 'د. سامي الشامي',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    students: 10,
    lessons: 10,
    price: 630,
    level: 'المرحلة الثانوية',
    levelColor: 'orange',
    subject: 'الكيمياء',
    duration: '3-6 ساعات'
  },
  {
    id: 2,
    title: 'أساسيات البرمجة بلغة Python',
    instructor: 'محمد سعيد',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 5.0,
    students: 60,
    lessons: 8,
    price: 700,
    originalPrice: 1000,
    level: 'المرحلة الإعدادية',
    levelColor: 'blue',
    subject: 'البرمجة',
    duration: '1-3 ساعات'
  },
  {
    id: 3,
    title: 'الرياضيات الأساسية',
    instructor: 'أميرة الحسيني',
    image: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    students: 85,
    lessons: 12,
    price: 500,
    level: 'المرحلة الثانوية',
    levelColor: 'green',
    subject: 'الرياضيات',
    duration: '3-6 ساعات'
  },
  {
    id: 4,
    title: 'مقدمة في العلوم البيئية',
    instructor: 'د. أحمد المدني',
    image: 'https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 5.0,
    students: 39,
    lessons: 9,
    price: 400,
    level: 'المرحلة الإعدادية',
    levelColor: 'green',
    subject: 'الفيزياء',
    duration: '1-3 ساعات'
  },
  {
    id: 5,
    title: 'اللغة الإنجليزية - المحادثة',
    instructor: 'منى الحديثي',
    image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.4,
    students: 48,
    lessons: 6,
    price: 800,
    level: 'المرحلة الثانوية',
    levelColor: 'purple',
    subject: 'اللغة الإنجليزية',
    duration: 'أكثر من 6 ساعات'
  },
  {
    id: 6,
    title: 'الفيزياء التطبيقية',
    instructor: 'حسام الطريف',
    image: 'https://images.pexels.com/photos/159806/science-formula-physics-school-159806.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    students: 92,
    lessons: 15,
    price: 300,
    level: 'المرحلة الجامعية',
    levelColor: 'blue',
    subject: 'الفيزياء',
    duration: 'أكثر من 6 ساعات'
  },
  {
    id: 7,
    title: 'قواعد اللغة العربية',
    instructor: 'فاطمة السلمي',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    students: 156,
    lessons: 14,
    price: 450,
    level: 'المرحلة الإعدادية',
    levelColor: 'orange',
    subject: 'اللغة العربية',
    duration: '3-6 ساعات'
  },
  {
    id: 8,
    title: 'الرياضيات المتقدمة',
    instructor: 'د. عبدالله النجار',
    image: 'https://images.pexels.com/photos/6238001/pexels-photo-6238001.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    students: 73,
    lessons: 18,
    price: 850,
    level: 'المرحلة الجامعية',
    levelColor: 'green',
    subject: 'الرياضيات',
    duration: 'أكثر من 6 ساعات'
  },
  {
    id: 9,
    title: 'برمجة مواقع الويب',
    instructor: 'سارة محمود',
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    students: 124,
    lessons: 22,
    price: 950,
    originalPrice: 1200,
    level: 'المرحلة الجامعية',
    levelColor: 'purple',
    subject: 'البرمجة',
    duration: 'أكثر من 6 ساعات'
  }
])

const filteredCourses = ref<Course[]>([...allCourses.value])

const filterCourses = () => {
  let filtered = [...allCourses.value]
  
  if (selectedSubjects.value.length > 0) {
    filtered = filtered.filter(course => selectedSubjects.value.includes(course.subject))
  }
  
  if (selectedLevels.value.length > 0) {
    filtered = filtered.filter(course => selectedLevels.value.includes(course.level))
  }
  
  if (selectedRatings.value.length > 0) {
    filtered = filtered.filter(course => 
      selectedRatings.value.some(rating => course.rating >= rating)
    )
  }
  
  if (selectedDurations.value.length > 0) {
    filtered = filtered.filter(course => selectedDurations.value.includes(course.duration))
  }
  
  filteredCourses.value = filtered
  currentPage.value = 1
  sortCourses()
}

const sortCourses = () => {
  const sorted = [...filteredCourses.value]
  
  switch (sortBy.value) {
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating)
      break
    case 'students':
      sorted.sort((a, b) => b.students - a.students)
      break
    case 'price-low':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      sorted.sort((a, b) => b.id - a.id)
      break
  }
  
  filteredCourses.value = sorted
}

const totalPages = computed(() => Math.ceil(filteredCourses.value.length / coursesPerPage))

const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * coursesPerPage
  const end = start + coursesPerPage
  return filteredCourses.value.slice(start, end)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const range = 2
  
  let start = Math.max(1, current - range)
  let end = Math.min(total, current + range)
  
  if (end - start < range * 2) {
    start = Math.max(1, end - range * 2)
  }
  
  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

onMounted(() => {
  sortCourses()
})
</script>

<style scoped>
.courses-page {
  padding: 2rem 0;
  min-height: calc(100vh - 200px);
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--gray-600);
}

.courses-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
}

.filters-sidebar {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  height: fit-content;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 1rem;
}

.filter-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--gray-200);
}

.filter-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.filter-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 1rem;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--gray-700);
}

.filter-option input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  accent-color: var(--primary-blue);
}

.rating-filters {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.rating-filter {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.rating-filter input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  accent-color: var(--primary-blue);
}

.rating-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rating-text {
  font-size: 0.875rem;
  color: var(--gray-700);
}

.courses-content {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--gray-200);
}

.results-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.results-count {
  font-weight: 500;
  color: var(--gray-700);
}

.view-options {
  display: flex;
  gap: 0.5rem;
}

.view-btn {
  padding: 0.5rem;
  border: 1px solid var(--gray-300);
  background: white;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.view-btn.active,
.view-btn:hover {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-select {
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  background: white;
  font-family: inherit;
  cursor: pointer;
}

.courses-grid.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.courses-grid.list-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
}

.pagination-btn,
.page-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray-300);
  background: white;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.2s;
  font-family: inherit;
}

.pagination-btn:hover:not(:disabled),
.page-btn:hover {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn.active {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

@media (max-width: 1024px) {
  .courses-layout {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .filters-sidebar {
    position: static;
    order: 2;
  }
  
  .courses-content {
    order: 1;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .content-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .results-info {
    justify-content: space-between;
  }
  
  .courses-grid.grid-view {
    grid-template-columns: 1fr;
  }
  
  .pagination {
    flex-wrap: wrap;
    gap: 0.25rem;
  }
  
  .pagination-btn,
  .page-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }
}
</style>