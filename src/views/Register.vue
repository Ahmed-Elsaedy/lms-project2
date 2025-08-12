<template>
  <main class="register-page">
    <div class="register-container">
      <div class="register-card">
        <div class="register-header">
          <div class="brand-logo">
            <div class="brand-icon">📚</div>
            <span class="brand-text">منصتي التعليمية</span>
          </div>
          <h1 class="register-title">إنشاء حساب جديد</h1>
          <p class="register-subtitle">انضم إلينا وابدأ رحلتك التعليمية</p>
        </div>

        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName" class="form-label">الاسم الأول</label>
              <input 
                type="text" 
                id="firstName" 
                v-model="registerForm.firstName"
                class="form-input"
                :class="{ 'error': errors.firstName }"
                required
                placeholder="الاسم الأول"
              >
              <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
            </div>

            <div class="form-group">
              <label for="lastName" class="form-label">الاسم الأخير</label>
              <input 
                type="text" 
                id="lastName" 
                v-model="registerForm.lastName"
                class="form-input"
                :class="{ 'error': errors.lastName }"
                required
                placeholder="الاسم الأخير"
              >
              <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
            </div>
          </div>

          <div class="form-group">
            <label for="email" class="form-label">البريد الإلكتروني</label>
            <input 
              type="email" 
              id="email" 
              v-model="registerForm.email"
              class="form-input"
              :class="{ 'error': errors.email }"
              required
              placeholder="أدخل بريدك الإلكتروني"
            >
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="phone" class="form-label">رقم الهاتف</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="registerForm.phone"
              class="form-input"
              :class="{ 'error': errors.phone }"
              placeholder="رقم الهاتف (اختياري)"
            >
            <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">كلمة المرور</label>
            <div class="password-input">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="registerForm.password"
                class="form-input"
                :class="{ 'error': errors.password }"
                required
                placeholder="أدخل كلمة المرور"
              >
              <button 
                type="button" 
                @click="togglePassword"
                class="password-toggle"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
            <div class="password-strength">
              <div class="strength-bar">
                <div 
                  class="strength-fill" 
                  :class="passwordStrength.class"
                  :style="{ width: passwordStrength.width }"
                ></div>
              </div>
              <span class="strength-text">{{ passwordStrength.text }}</span>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword" class="form-label">تأكيد كلمة المرور</label>
            <div class="password-input">
              <input 
                :type="showConfirmPassword ? 'text' : 'password'" 
                id="confirmPassword" 
                v-model="registerForm.confirmPassword"
                class="form-input"
                :class="{ 'error': errors.confirmPassword }"
                required
                placeholder="أعد إدخال كلمة المرور"
              >
              <button 
                type="button" 
                @click="toggleConfirmPassword"
                class="password-toggle"
              >
                {{ showConfirmPassword ? '🙈' : '👁️' }}
              </button>
            </div>
            <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
          </div>

          <div class="form-group">
            <label for="userType" class="form-label">نوع المستخدم</label>
            <select 
              id="userType" 
              v-model="registerForm.userType"
              class="form-input"
              required
            >
              <option value="">اختر نوع المستخدم</option>
              <option value="student">طالب</option>
              <option value="teacher">معلم</option>
              <option value="parent">ولي أمر</option>
            </select>
            <span v-if="errors.userType" class="error-message">{{ errors.userType }}</span>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                v-model="registerForm.agreeToTerms" 
                class="checkbox"
                required
              >
              <span class="checkbox-text">
                أوافق على 
                <RouterLink to="/terms" class="terms-link">الشروط والأحكام</RouterLink>
                و
                <RouterLink to="/privacy" class="terms-link">سياسة الخصوصية</RouterLink>
              </span>
            </label>
            <span v-if="errors.agreeToTerms" class="error-message">{{ errors.agreeToTerms }}</span>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                v-model="registerForm.subscribeNewsletter" 
                class="checkbox"
              >
              <span class="checkbox-text">
                أرغب في تلقي النشرة الإخبارية والعروض الخاصة
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary register-btn"
            :disabled="isLoading"
          >
            {{ isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب' }}
          </button>
        </form>

        <div class="divider">
          <span class="divider-text">أو</span>
        </div>

        <div class="social-register">
          <button class="social-btn google-btn">
            <span class="social-icon">🔍</span>
            التسجيل بجوجل
          </button>
          <button class="social-btn facebook-btn">
            <span class="social-icon">📘</span>
            التسجيل بفيسبوك
          </button>
        </div>

        <div class="register-footer">
          <p class="login-text">
            لديك حساب بالفعل؟ 
            <RouterLink to="/login" class="login-link">تسجيل الدخول</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const registerForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  userType: '',
  agreeToTerms: false,
  subscribeNewsletter: false
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  userType: '',
  agreeToTerms: ''
})

const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const passwordStrength = computed(() => {
  const password = registerForm.password
  if (!password) return { width: '0%', class: '', text: '' }

  let score = 0
  if (password.length >= 8) score++
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score < 2) return { width: '25%', class: 'weak', text: 'ضعيفة' }
  if (score < 4) return { width: '50%', class: 'medium', text: 'متوسطة' }
  if (score < 5) return { width: '75%', class: 'good', text: 'جيدة' }
  return { width: '100%', class: 'strong', text: 'قوية' }
})

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  let isValid = true

  // Name validation
  if (!registerForm.firstName.trim()) {
    errors.firstName = 'الاسم الأول مطلوب'
    isValid = false
  }

  if (!registerForm.lastName.trim()) {
    errors.lastName = 'الاسم الأخير مطلوب'
    isValid = false
  }

  // Email validation
  if (!registerForm.email) {
    errors.email = 'البريد الإلكتروني مطلوب'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
    errors.email = 'البريد الإلكتروني غير صحيح'
    isValid = false
  }

  // Password validation
  if (!registerForm.password) {
    errors.password = 'كلمة المرور مطلوبة'
    isValid = false
  } else if (registerForm.password.length < 8) {
    errors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'
    isValid = false
  }

  // Confirm password validation
  if (!registerForm.confirmPassword) {
    errors.confirmPassword = 'تأكيد كلمة المرور مطلوب'
    isValid = false
  } else if (registerForm.password !== registerForm.confirmPassword) {
    errors.confirmPassword = 'كلمة المرور غير متطابقة'
    isValid = false
  }

  // User type validation
  if (!registerForm.userType) {
    errors.userType = 'نوع المستخدم مطلوب'
    isValid = false
  }

  // Terms validation
  if (!registerForm.agreeToTerms) {
    errors.agreeToTerms = 'يجب الموافقة على الشروط والأحكام'
    isValid = false
  }

  return isValid
}

const handleRegister = async () => {
  if (!validateForm()) return

  isLoading.value = true

  // Simulate registration API call
  setTimeout(() => {
    // Mock successful registration
    alert('تم إنشاء الحساب بنجاح! مرحباً بك في منصتي التعليمية')
    
    // Store user session
    localStorage.setItem('user', JSON.stringify({
      email: registerForm.email,
      name: `${registerForm.firstName} ${registerForm.lastName}`,
      userType: registerForm.userType,
      loggedIn: true
    }))

    // Redirect to home page
    router.push('/')
    
    isLoading.value = false
  }, 2000)
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-green) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.register-container {
  width: 100%;
  max-width: 500px;
}

.register-card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.register-header {
  text-align: center;
  margin-bottom: 2rem;
}

.brand-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.brand-icon {
  font-size: 2rem;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-blue);
}

.register-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.register-subtitle {
  color: var(--gray-600);
  font-size: 1rem;
}

.register-form {
  margin-bottom: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--gray-700);
  text-align: right;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--gray-200);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  text-align: right;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input.error {
  border-color: #ef4444;
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
}

.password-strength {
  margin-top: 0.5rem;
}

.strength-bar {
  height: 4px;
  background: var(--gray-200);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s;
}

.strength-fill.weak { background: #ef4444; }
.strength-fill.medium { background: #f59e0b; }
.strength-fill.good { background: #10b981; }
.strength-fill.strong { background: #059669; }

.strength-text {
  font-size: 0.75rem;
  color: var(--gray-500);
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
  text-align: right;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox {
  width: 1rem;
  height: 1rem;
  margin-top: 0.125rem;
  flex-shrink: 0;
}

.checkbox-text {
  font-size: 0.875rem;
  color: var(--gray-600);
  line-height: 1.4;
}

.terms-link {
  color: var(--primary-blue);
  text-decoration: none;
  font-weight: 500;
}

.terms-link:hover {
  text-decoration: underline;
}

.register-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
}

.register-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.divider {
  position: relative;
  text-align: center;
  margin: 2rem 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--gray-200);
}

.divider-text {
  background: white;
  padding: 0 1rem;
  color: var(--gray-500);
  font-size: 0.875rem;
}

.social-register {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border: 2px solid var(--gray-200);
  border-radius: 8px;
  background: white;
  color: var(--gray-700);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.social-btn:hover {
  border-color: var(--gray-300);
  background: var(--gray-50);
}

.social-icon {
  font-size: 1.25rem;
}

.register-footer {
  text-align: center;
}

.login-text {
  color: var(--gray-600);
  font-size: 0.875rem;
}

.login-link {
  color: var(--primary-blue);
  text-decoration: none;
  font-weight: 500;
}

.login-link:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .register-card {
    padding: 2rem 1.5rem;
  }
  
  .register-title {
    font-size: 1.75rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
