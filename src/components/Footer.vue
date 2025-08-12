<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">تابعنا</h3>
          <div class="social-links">
            <a href="#" class="social-link">📘</a>
            <a href="#" class="social-link">📷</a>
            <a href="#" class="social-link">🐦</a>
          </div>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">تواصل معنا</h3>
          <p class="contact-info">support@example.com</p>
          <p class="contact-info">000 000 500 966+</p>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">روابط سريعة</h3>
          <div class="footer-links">
            <RouterLink to="/about" class="footer-link">من نحن</RouterLink>
            <RouterLink to="/contact" class="footer-link">تواصل معنا</RouterLink>
            <RouterLink to="/courses" class="footer-link">الدورات</RouterLink>
            <RouterLink to="/privacy" class="footer-link">سياسة الخصوصية</RouterLink>
            <RouterLink to="/terms" class="footer-link">الشروط والأحكام</RouterLink>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 جميع الحقوق محفوظة - منصتي التعليمية</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.footer {
  background: var(--gray-900);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  text-align: center;
}

.footer-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: var(--gray-800);
  border-radius: 50%;
  text-decoration: none;
  font-size: 1.25rem;
  transition: background-color 0.2s;
}

.social-link:hover {
  background: var(--primary-blue);
}

.contact-info {
  color: var(--gray-300);
  margin-bottom: 0.5rem;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: var(--gray-300);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: white;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--gray-800);
  color: var(--gray-400);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>