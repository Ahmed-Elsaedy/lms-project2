<template>
  <main class="course-form-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <div class="breadcrumb">
            <RouterLink to="/teacher-dashboard" class="breadcrumb-link">لوحة التحكم</RouterLink>
            <span class="breadcrumb-separator">/</span>
            <RouterLink to="/teacher-dashboard" class="breadcrumb-link">دوراتي</RouterLink>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">{{ isEditing ? 'تعديل الدورة' : 'إضافة دورة جديدة' }}</span>
          </div>
          <h1 class="page-title">{{ isEditing ? 'تعديل الدورة' : 'إضافة دورة جديدة' }}</h1>
          <p class="page-subtitle">{{ isEditing ? 'قم بتحديث معلومات الدورة' : 'أنشئ دورة جديدة لطلابك' }}</p>
        </div>
      </div>

      <!-- Course Form -->
      <div class="form-container">
        <form @submit.prevent="saveCourse" class="course-form">
          <!-- Basic Information Section -->
          <div class="form-section">
            <h2 class="section-title">المعلومات الأساسية</h2>
            
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">عنوان الدورة *</label>
                <input 
                  type="text" 
                  v-model="courseData.title" 
                  class="form-input" 
                  placeholder="أدخل عنوان الدورة"
                  required
                >
              </div>
              
              <div class="form-group">
                <label class="form-label">المادة *</label>
                <select v-model="courseData.subject" class="form-input" required>
                  <option value="">اختر المادة</option>
                  <option value="الرياضيات">الرياضيات</option>
                  <option value="الفيزياء">الفيزياء</option>
                  <option value="الكيمياء">الكيمياء</option>
                  <option value="الأحياء">الأحياء</option>
                  <option value="اللغة العربية">اللغة العربية</option>
                  <option value="اللغة الإنجليزية">اللغة الإنجليزية</option>
                  <option value="التاريخ">التاريخ</option>
                  <option value="الجغرافيا">الجغرافيا</option>
                  <option value="العلوم">العلوم</option>
                  <option value="الكمبيوتر">الكمبيوتر</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">وصف الدورة *</label>
              <textarea 
                v-model="courseData.description" 
                class="form-textarea" 
                rows="4"
                placeholder="اكتب وصفاً مفصلاً للدورة وأهدافها"
                required
              ></textarea>
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">المستوى التعليمي *</label>
                <select v-model="courseData.level" class="form-input" required>
                  <option value="">اختر المستوى</option>
                  <option value="المرحلة الابتدائية">المرحلة الابتدائية</option>
                  <option value="المرحلة الإعدادية">المرحلة الإعدادية</option>
                  <option value="المرحلة الثانوية">المرحلة الثانوية</option>
                  <option value="المرحلة الجامعية">المرحلة الجامعية</option>
                </select>
              </div>
              
              <div class="form-group">
                <label class="form-label">مدة الدورة (بالساعات) *</label>
                <input 
                  type="number" 
                  v-model="courseData.duration" 
                  class="form-input" 
                  placeholder="مثال: 20"
                  min="1"
                  required
                >
              </div>
            </div>
          </div>

          <!-- Pricing Section -->
          <div class="form-section">
            <h2 class="section-title">التسعير</h2>
            
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">السعر (ر.س) *</label>
                <input 
                  type="number" 
                  v-model="courseData.price" 
                  class="form-input" 
                  placeholder="0"
                  min="0"
                  required
                >
              </div>
              
              <div class="form-group">
                <label class="form-label">السعر الأصلي (اختياري)</label>
                <input 
                  type="number" 
                  v-model="courseData.originalPrice" 
                  class="form-input" 
                  placeholder="0"
                  min="0"
                >
                <small class="form-help">اتركه فارغاً إذا لم يكن هناك خصم</small>
              </div>
            </div>
          </div>

          <!-- Course Content Section -->
          <div class="form-section">
            <h2 class="section-title">محتوى الدورة</h2>
            
            <div class="form-group">
              <label class="form-label">أهداف الدورة</label>
              <textarea 
                v-model="courseData.objectives" 
                class="form-textarea" 
                rows="3"
                placeholder="اكتب أهداف الدورة وما سيتعلمه الطالب"
              ></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">متطلبات الدورة</label>
              <textarea 
                v-model="courseData.requirements" 
                class="form-textarea" 
                rows="3"
                placeholder="اكتب المتطلبات المسبقة للدورة"
              ></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">عدد الدروس *</label>
              <input 
                type="number" 
                v-model="courseData.lessons" 
                class="form-input" 
                placeholder="مثال: 15"
                min="1"
                required
              >
            </div>
          </div>

          <!-- Media Section -->
          <div class="form-section">
            <h2 class="section-title">الصور والفيديو</h2>
            
            <div class="form-group">
              <label class="form-label">صورة الدورة</label>
              <div class="image-upload">
                <div v-if="courseData.image" class="image-preview">
                  <img :src="courseData.image" alt="صورة الدورة" class="preview-image">
                  <button type="button" @click="courseData.image = ''" class="remove-image">×</button>
                </div>
                <div v-else class="upload-placeholder">
                  <input 
                    type="file" 
                    @change="handleImageUpload" 
                    accept="image/*"
                    class="file-input"
                    id="course-image"
                  >
                  <label for="course-image" class="upload-label">
                    <span class="upload-icon">📷</span>
                    <span>اختر صورة للدورة</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">رابط الفيديو التعريفي (اختياري)</label>
              <input 
                type="url" 
                v-model="courseData.videoUrl" 
                class="form-input" 
                placeholder="https://www.youtube.com/watch?v=..."
              >
              <small class="form-help">يمكنك إضافة رابط فيديو من YouTube أو Vimeo</small>
            </div>
          </div>

          <!-- Settings Section -->
          <div class="form-section">
            <h2 class="section-title">الإعدادات</h2>
            
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">حالة الدورة</label>
                <select v-model="courseData.status" class="form-input">
                  <option value="draft">مسودة</option>
                  <option value="published">منشورة</option>
                  <option value="archived">مؤرشفة</option>
                </select>
              </div>
              
              <div class="form-group">
                <label class="form-label">الحد الأقصى للطلاب</label>
                <input 
                  type="number" 
                  v-model="courseData.maxStudents" 
                  class="form-input" 
                  placeholder="غير محدد"
                  min="1"
                >
                <small class="form-help">اتركه فارغاً للسماح بعدد غير محدود</small>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">العلامات (Tags)</label>
              <input 
                type="text" 
                v-model="courseData.tags" 
                class="form-input" 
                placeholder="رياضيات، جبر، معادلات (افصل بين العلامات بفواصل)"
              >
              <small class="form-help">ساعد الطلاب في العثور على دورتك بسهولة</small>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <button type="button" @click="goBack" class="btn btn-outline">
              إلغاء
            </button>
            <button type="submit" class="btn btn-primary" :disabled="isSaving">
              {{ isSaving ? 'جاري الحفظ...' : (isEditing ? 'تحديث الدورة' : 'إنشاء الدورة') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isSaving = ref(false)
const isEditing = computed(() => route.params.id !== 'new')

// Course data structure
const courseData = reactive({
  title: '',
  subject: '',
  description: '',
  level: '',
  duration: 0,
  price: 0,
  originalPrice: 0,
  objectives: '',
  requirements: '',
  lessons: 0,
  image: '',
  videoUrl: '',
  status: 'draft',
  maxStudents: 0,
  tags: ''
})

// Load course data if editing
onMounted(() => {
  if (isEditing.value) {
    loadCourseData()
  }
})

const loadCourseData = () => {
  // In a real app, you would fetch course data from API
  // For now, we'll use mock data
  const mockCourse = {
    title: 'أساسيات الرياضيات',
    subject: 'الرياضيات',
    description: 'دورة شاملة في أساسيات الرياضيات للمرحلة الثانوية',
    level: 'المرحلة الثانوية',
    duration: 20,
    price: 150,
    originalPrice: 200,
    objectives: 'فهم المفاهيم الأساسية للرياضيات وحل المشكلات الرياضية',
    requirements: 'معرفة أساسية بالعمليات الحسابية',
    lessons: 15,
    image: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=100',
    videoUrl: '',
    status: 'published',
    maxStudents: 50,
    tags: 'رياضيات، جبر، معادلات'
  }
  
  Object.assign(courseData, mockCourse)
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      courseData.image = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const saveCourse = async () => {
  isSaving.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, you would send data to your API
    console.log('Saving course:', courseData)
    
    // Show success message
    alert(isEditing.value ? 'تم تحديث الدورة بنجاح!' : 'تم إنشاء الدورة بنجاح!')
    
    // Navigate back to dashboard
    router.push('/teacher-dashboard')
  } catch (error) {
    console.error('Error saving course:', error)
    alert('حدث خطأ أثناء حفظ الدورة')
  } finally {
    isSaving.value = false
  }
}

const goBack = () => {
  router.push('/teacher-dashboard')
}
</script>

<style scoped>
.course-form-page {
  padding: 2rem 0;
  background: var(--gray-50);
  min-height: 100vh;
}

.page-header {
  background: white;
  padding: 2rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--gray-200);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.breadcrumb-link {
  color: var(--primary-blue);
  text-decoration: none;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-separator {
  color: var(--gray-400);
}

.breadcrumb-current {
  color: var(--gray-600);
  font-weight: 500;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: var(--gray-600);
  font-size: 1.125rem;
}

.form-container {
  max-width: 800px;
  margin: 0 auto;
}

.course-form {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.form-section {
  padding: 2rem;
  border-bottom: 1px solid var(--gray-200);
}

.form-section:last-child {
  border-bottom: none;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
.form-textarea,
.form-select {
  padding: 0.75rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  font-family: inherit;
  text-align: right;
  transition: all 0.2s;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-help {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.image-upload {
  border: 2px dashed var(--gray-300);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s;
}

.image-upload:hover {
  border-color: var(--primary-blue);
}

.image-preview {
  position: relative;
  display: inline-block;
}

.preview-image {
  max-width: 200px;
  max-height: 150px;
  border-radius: 8px;
  object-fit: cover;
}

.remove-image {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: #dc2626;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.file-input {
  display: none;
}

.upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: var(--gray-600);
}

.upload-icon {
  font-size: 2rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 2rem;
  background: var(--gray-50);
  border-top: 1px solid var(--gray-200);
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: var(--primary-blue);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #1d4ed8;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-outline {
  background: white;
  color: var(--gray-700);
  border: 1px solid var(--gray-300);
}

.btn-outline:hover {
  background: var(--gray-50);
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
}
</style> 