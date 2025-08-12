<template>
  <div class="course-card card">
    <div class="course-image">
      <img :src="course.image" :alt="course.title" />
      <div class="course-level">
        <span :class="`badge badge-${course.levelColor}`">{{ course.level }}</span>
      </div>
    </div>
    
    <div class="course-content">
      <h3 class="course-title">{{ course.title }}</h3>
      
      <div class="instructor">
        <div class="instructor-avatar">{{ course.instructor.charAt(0) }}</div>
        <span class="instructor-name">{{ course.instructor }}</span>
      </div>
      
      <div class="course-meta">
        <div class="rating">
          <span class="rating-value">({{ course.rating }})</span>
          <div class="stars">
            <span v-for="i in 5" :key="i" :class="['star', i <= course.rating ? 'filled' : 'empty']">⭐</span>
          </div>
        </div>
      </div>
      
      <div class="course-stats">
        <span class="students-count">عدد الدروس: {{ course.lessons }}</span>
        <span class="duration">الطلاب المسجلين: {{ course.students }}</span>
      </div>
      
      <div class="course-footer">
        <div class="price">
          <span class="current-price">{{ course.price }} ر.س</span>
          <span v-if="course.originalPrice" class="original-price">{{ course.originalPrice }} ر.س</span>
        </div>
        <RouterLink :to="`/course/${course.id}`" class="btn btn-primary course-btn">تفاصيل الدورة</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
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
}

defineProps<{
  course: Course
}>()
</script>

<style scoped>
.course-card {
  overflow: hidden;
  transition: all 0.3s ease;
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

.course-level {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.course-content {
  padding: 1.5rem;
}

.course-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--gray-900);
  line-height: 1.4;
}

.instructor {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.instructor-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--primary-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.instructor-name {
  color: var(--gray-600);
  font-size: 0.875rem;
}

.course-meta {
  margin-bottom: 1rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rating-value {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.stars {
  display: flex;
  gap: 0.125rem;
}

.star {
  font-size: 0.875rem;
}

.star.filled {
  filter: grayscale(0);
}

.star.empty {
  filter: grayscale(1);
  opacity: 0.3;
}

.course-stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--gray-600);
  margin-bottom: 1.5rem;
}

.course-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.current-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-blue);
}

.original-price {
  font-size: 1rem;
  color: var(--gray-400);
  text-decoration: line-through;
}

.course-btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}
</style>