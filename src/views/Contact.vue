<template>
  <main class="contact-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">تواصل معنا</h1>
          <p class="hero-subtitle">
            نحن هنا للإجابة على جميع استفساراتك ومساعدتك في رحلتك التعليمية
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="section">
      <div class="container">
        <div class="grid md:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="contact-form-container">
            <h2 class="form-title">أرسل لنا رسالة</h2>
            <form @submit.prevent="submitForm" class="contact-form">
              <div class="form-group">
                <label for="name" class="form-label">الاسم الكامل</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name"
                  class="form-input"
                  required
                  placeholder="أدخل اسمك الكامل"
                >
              </div>

              <div class="form-group">
                <label for="email" class="form-label">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email"
                  class="form-input"
                  required
                  placeholder="أدخل بريدك الإلكتروني"
                >
              </div>

              <div class="form-group">
                <label for="phone" class="form-label">رقم الهاتف</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="form.phone"
                  class="form-input"
                  placeholder="أدخل رقم هاتفك"
                >
              </div>

              <div class="form-group">
                <label for="subject" class="form-label">الموضوع</label>
                <select 
                  id="subject" 
                  v-model="form.subject"
                  class="form-input"
                  required
                >
                  <option value="">اختر الموضوع</option>
                  <option value="general">استفسار عام</option>
                  <option value="courses">الدورات التعليمية</option>
                  <option value="technical">مشكلة تقنية</option>
                  <option value="billing">الفواتير والدفع</option>
                  <option value="partnership">شراكة</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message" class="form-label">الرسالة</label>
                <textarea 
                  id="message" 
                  v-model="form.message"
                  class="form-textarea"
                  rows="5"
                  required
                  placeholder="اكتب رسالتك هنا..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                class="btn btn-primary submit-btn"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة' }}
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="contact-info">
            <h2 class="info-title">معلومات التواصل</h2>
            
            <div class="contact-item">
              <div class="contact-icon">📍</div>
              <div class="contact-details">
                <h3 class="contact-label">العنوان</h3>
                <p class="contact-value">
                  الرياض، المملكة العربية السعودية<br>
                  شارع الملك فهد، حي العليا
                </p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">📞</div>
              <div class="contact-details">
                <h3 class="contact-label">الهاتف</h3>
                <p class="contact-value">+966 11 123 4567</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">📧</div>
              <div class="contact-details">
                <h3 class="contact-label">البريد الإلكتروني</h3>
                <p class="contact-value">info@myplatform.com</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">🕒</div>
              <div class="contact-details">
                <h3 class="contact-label">ساعات العمل</h3>
                <p class="contact-value">
                  الأحد - الخميس: 9:00 ص - 6:00 م<br>
                  الجمعة - السبت: مغلق
                </p>
              </div>
            </div>

            <!-- Social Media -->
            <div class="social-media">
              <h3 class="social-title">تابعنا على</h3>
              <div class="social-links">
                <a href="#" class="social-link">
                  <span class="social-icon">📘</span>
                  فيسبوك
                </a>
                <a href="#" class="social-link">
                  <span class="social-icon">📷</span>
                  إنستغرام
                </a>
                <a href="#" class="social-link">
                  <span class="social-icon">🐦</span>
                  تويتر
                </a>
                <a href="#" class="social-link">
                  <span class="social-icon">💼</span>
                  لينكد إن
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section bg-white">
      <div class="container">
        <h2 class="section-title">الأسئلة الشائعة</h2>
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
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const activeFaq = ref<number | null>(null)

const submitForm = async () => {
  isSubmitting.value = true
  
  // Simulate form submission
  setTimeout(() => {
    alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.')
    
    // Reset form
    Object.keys(form).forEach(key => {
      form[key as keyof typeof form] = ''
    })
    
    isSubmitting.value = false
  }, 2000)
}

const toggleFaq = (id: number) => {
  activeFaq.value = activeFaq.value === id ? null : id
}

const faqs = [
  {
    id: 1,
    question: 'كيف يمكنني التسجيل في المنصة؟',
    answer: 'يمكنك التسجيل بسهولة من خلال النقر على زر "حساب جديد" في أعلى الصفحة وملء البيانات المطلوبة.'
  },
  {
    id: 2,
    question: 'هل يمكنني الحصول على شهادة معتمدة؟',
    answer: 'نعم، نوفر شهادات معتمدة لجميع الدورات عند إكمالها بنجاح واجتياز الاختبارات المطلوبة.'
  },
  {
    id: 3,
    question: 'ما هي طرق الدفع المتاحة؟',
    answer: 'نقبل جميع طرق الدفع الرئيسية بما في ذلك البطاقات الائتمانية، التحويل البنكي، ومحافظ الدفع الإلكترونية.'
  },
  {
    id: 4,
    question: 'هل يمكنني الوصول للدورات من الهاتف المحمول؟',
    answer: 'نعم، منصتنا متوافقة مع جميع الأجهزة ويمكنك الوصول للدورات من الهاتف المحمول أو الجهاز اللوحي.'
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

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.contact-form-container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--gray-900);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--gray-700);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  text-align: right;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1.125rem;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.contact-info {
  padding: 2rem 0;
}

.info-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--gray-900);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
}

.contact-icon {
  font-size: 1.5rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-blue);
  color: white;
  border-radius: 50%;
  flex-shrink: 0;
}

.contact-label {
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.contact-value {
  color: var(--gray-600);
  line-height: 1.6;
}

.social-media {
  margin-top: 3rem;
}

.social-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--gray-900);
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--gray-600);
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s;
}

.social-link:hover {
  background: var(--gray-100);
  color: var(--primary-blue);
}

.social-icon {
  font-size: 1.25rem;
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

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .contact-form-container {
    padding: 1.5rem;
  }
  
  .social-links {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
