<template>
  <main class="about-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">حول منصتي التعليمية</h1>
          <p class="hero-subtitle">
            نحن نؤمن بأن التعليم حق للجميع، ونسعى لتوفير أفضل تجربة تعليمية عبر الإنترنت
          </p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="section">
      <div class="container">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div class="content">
            <h2 class="section-title text-right">رؤيتنا</h2>
            <p class="text-lg text-gray-600 mb-6 leading-relaxed">
              نسعى لأن نكون المنصة التعليمية الرائدة في المنطقة العربية، حيث نوفر تعليماً عالي الجودة 
              يمكن الوصول إليه من أي مكان وفي أي وقت. نؤمن بقوة التعليم في تغيير الحياة وبناء المستقبل.
            </p>
            <p class="text-lg text-gray-600 leading-relaxed">
              نهدف إلى ربط الطلاب بأفضل المعلمين والخبراء في مختلف المجالات، وتوفير بيئة تعليمية 
              تفاعلية ومحفزة للتعلم والنمو المستمر.
            </p>
          </div>
          <div class="image">
            <img src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600" 
                 alt="التعليم الإلكتروني" class="rounded-lg shadow-lg">
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="section bg-white">
      <div class="container">
        <h2 class="section-title">قيمنا</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="value-card card">
            <div class="value-icon">🎯</div>
            <h3 class="value-title">الجودة</h3>
            <p class="value-description">
              نلتزم بتقديم محتوى تعليمي عالي الجودة من خلال نخبة من أفضل المعلمين والخبراء
            </p>
          </div>
          <div class="value-card card">
            <div class="value-icon">🤝</div>
            <h3 class="value-title">الشراكة</h3>
            <p class="value-description">
              نؤمن بأهمية الشراكة بين المعلم والطالب لتحقيق أفضل النتائج التعليمية
            </p>
          </div>
          <div class="value-card card">
            <div class="value-icon">💡</div>
            <h3 class="value-title">الابتكار</h3>
            <p class="value-description">
              نسعى دائماً لتطوير طرق تعليمية مبتكرة تواكب التطور التكنولوجي
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">فريق العمل</h2>
        <p class="section-subtitle">
          فريق متخصص من الخبراء في التعليم والتكنولوجيا
        </p>
        <div class="grid md:grid-cols-4 gap-6">
          <div v-for="member in teamMembers" :key="member.id" class="team-card card">
            <div class="member-avatar">{{ member.name.charAt(0) }}</div>
            <h3 class="member-name">{{ member.name }}</h3>
            <p class="member-role">{{ member.role }}</p>
            <p class="member-description">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="section bg-white">
      <div class="container">
        <h2 class="section-title">إنجازاتنا</h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div v-for="stat in stats" :key="stat.id" class="stat-card">
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">انضم إلينا اليوم</h2>
          <p class="cta-subtitle">
            ابدأ رحلتك التعليمية معنا واكتشف إمكانياتك الحقيقية
          </p>
          <RouterLink to="/courses" class="btn btn-primary cta-btn">تصفح الدورات</RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const teamMembers = [
  {
    id: 1,
    name: 'أحمد محمد',
    role: 'المدير التنفيذي',
    description: 'خبير في التعليم الإلكتروني مع أكثر من 15 عاماً من الخبرة'
  },
  {
    id: 2,
    name: 'فاطمة علي',
    role: 'مديرة المحتوى',
    description: 'متخصصة في تطوير المناهج التعليمية والمحتوى الرقمي'
  },
  {
    id: 3,
    name: 'محمد سعد',
    role: 'مدير التقنية',
    description: 'مطور برمجيات متخصص في تطوير المنصات التعليمية'
  },
  {
    id: 4,
    name: 'نورا حسن',
    role: 'مديرة التسويق',
    description: 'خبيرة في التسويق الرقمي والتواصل مع الجمهور'
  }
]

const stats = [
  { id: 1, number: '10,000+', label: 'طالب مسجل' },
  { id: 2, number: '500+', label: 'دورة تعليمية' },
  { id: 3, number: '100+', label: 'معلم خبير' },
  { id: 4, number: '95%', label: 'معدل الرضا' }
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

.value-card {
  text-align: center;
  padding: 2rem;
}

.value-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.value-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--gray-900);
}

.value-description {
  color: var(--gray-600);
  line-height: 1.6;
}

.team-card {
  text-align: center;
  padding: 2rem 1rem;
}

.member-avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: var(--primary-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1rem;
}

.member-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--gray-900);
}

.member-role {
  color: var(--primary-blue);
  font-weight: 500;
  margin-bottom: 1rem;
}

.member-description {
  color: var(--gray-600);
  font-size: 0.875rem;
  line-height: 1.5;
}

.stat-card {
  text-align: center;
  padding: 2rem 1rem;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.125rem;
  color: var(--gray-600);
}

.cta-section {
  background: linear-gradient(135deg, var(--gray-900) 0%, var(--gray-800) 100%);
  color: white;
  padding: 5rem 0;
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: 1.125rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.cta-btn {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .cta-title {
    font-size: 2rem;
  }
}
</style>
