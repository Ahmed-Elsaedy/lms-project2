<template>
  <main class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="brand-logo">
            <div class="brand-icon">📚</div>
            <span class="brand-text">منصتي التعليمية</span>
          </div>
          <h1 class="login-title">تسجيل الدخول</h1>
          <p class="login-subtitle">مرحباً بك مرة أخرى! سجل دخولك للمتابعة</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">البريد الإلكتروني</label>
            <input 
              type="email" 
              id="email" 
              v-model="loginForm.email"
              class="form-input"
              :class="{ 'error': errors.email }"
              required
              placeholder="أدخل بريدك الإلكتروني"
            >
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">كلمة المرور</label>
            <div class="password-input">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="loginForm.password"
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
          </div>

          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" v-model="rememberMe" class="checkbox">
              <span class="checkbox-text">تذكرني</span>
            </label>
            <a href="#" class="forgot-password">نسيت كلمة المرور؟</a>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary login-btn"
            :disabled="isLoading"
          >
            {{ isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول' }}
          </button>
        </form>

        <div class="divider">
          <span class="divider-text">أو</span>
        </div>

        <div class="social-login">
          <button class="social-btn google-btn">
            <span class="social-icon">🔍</span>
            تسجيل الدخول بجوجل
          </button>
          <button class="social-btn facebook-btn">
            <span class="social-icon">📘</span>
            تسجيل الدخول بفيسبوك
          </button>
        </div>

        <div class="login-footer">
          <p class="signup-text">
            ليس لديك حساب؟ 
            <RouterLink to="/register" class="signup-link">إنشاء حساب جديد</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const loginForm = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const isLoading = ref(false)
const showPassword = ref(false)
const rememberMe = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const validateForm = () => {
  // Reset errors
  errors.email = ''
  errors.password = ''

  let isValid = true

  // Email validation
  if (!loginForm.email) {
    errors.email = 'البريد الإلكتروني مطلوب'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
    errors.email = 'البريد الإلكتروني غير صحيح'
    isValid = false
  }

  // Password validation
  if (!loginForm.password) {
    errors.password = 'كلمة المرور مطلوبة'
    isValid = false
  } else if (loginForm.password.length < 6) {
    errors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return

  isLoading.value = true

  // Simulate login API call
  setTimeout(() => {
    // Mock successful login
    alert('تم تسجيل الدخول بنجاح!')
    
    // Store user session (in real app, use proper state management)
    localStorage.setItem('user', JSON.stringify({
      email: loginForm.email,
      name: 'المستخدم',
      loggedIn: true
    }))

    // Redirect to home page
    router.push('/')
    
    isLoading.value = false
  }, 2000)
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-green) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.login-header {
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

.login-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: var(--gray-600);
  font-size: 1rem;
}

.login-form {
  margin-bottom: 2rem;
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

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
  text-align: right;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox {
  width: 1rem;
  height: 1rem;
}

.checkbox-text {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.forgot-password {
  color: var(--primary-blue);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
}

.login-btn:disabled {
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

.social-login {
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

.login-footer {
  text-align: center;
}

.signup-text {
  color: var(--gray-600);
  font-size: 0.875rem;
}

.signup-link {
  color: var(--primary-blue);
  text-decoration: none;
  font-weight: 500;
}

.signup-link:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-card {
    padding: 2rem 1.5rem;
  }
  
  .login-title {
    font-size: 1.75rem;
  }
}
</style>
