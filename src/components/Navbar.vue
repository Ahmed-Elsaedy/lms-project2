<template>
  <nav class="navbar">
    <div class="container">
      <div class="nav-content">
        <div class="nav-brand">
          <RouterLink to="/" class="brand-link">
            <div class="brand-icon">📚</div>
            <span class="brand-text">منصتي التعليمية</span>
          </RouterLink>
        </div>
        
        <div class="nav-links">
          <RouterLink to="/" class="nav-link">الرئيسية</RouterLink>
          <RouterLink to="/courses" class="nav-link">الدورات</RouterLink>
          <RouterLink to="/about" class="nav-link">حول</RouterLink>
          <RouterLink to="/contact" class="nav-link">تواصل معنا</RouterLink>
        </div>
        
        <div class="nav-actions">
          <RouterLink to="/login" class="btn btn-outline">دخول</RouterLink>
          <RouterLink to="/register" class="btn btn-primary">حساب جديد</RouterLink>
        </div>
        
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      
      <div v-if="showMobileMenu" class="mobile-menu">
        <div class="mobile-links">
          <RouterLink to="/" class="mobile-link">الرئيسية</RouterLink>
          <RouterLink to="/courses" class="mobile-link">الدورات</RouterLink>
          <RouterLink to="/about" class="mobile-link">حول</RouterLink>
          <RouterLink to="/contact" class="mobile-link">تواصل معنا</RouterLink>
        </div>
        <div class="mobile-actions">
          <RouterLink to="/login" class="btn btn-outline mobile-btn">دخول</RouterLink>
          <RouterLink to="/register" class="btn btn-primary mobile-btn">حساب جديد</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const showMobileMenu = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}
</script>

<style scoped>
.navbar {
  background: white;
  border-bottom: 1px solid var(--gray-200);
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}

.nav-brand {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--gray-900);
  font-weight: 700;
  font-size: 1.25rem;
}

.brand-icon {
  font-size: 1.5rem;
  margin-left: 0.5rem;
}

.brand-text {
  color: var(--primary-blue);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: var(--gray-600);
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary-blue);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--gray-600);
}

.menu-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.mobile-menu {
  display: none;
  padding: 1rem 0;
  border-top: 1px solid var(--gray-200);
}

.mobile-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.mobile-link {
  text-decoration: none;
  color: var(--gray-600);
  font-weight: 500;
  padding: 0.5rem 0;
}

.mobile-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mobile-btn {
  width: 100%;
}

@media (max-width: 768px) {
  .nav-links,
  .nav-actions {
    display: none;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .mobile-menu {
    display: block;
  }
}
</style>