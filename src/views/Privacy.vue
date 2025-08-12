<template>
  <main class="privacy-page">
    <!-- Header -->
    <section class="page-header">
      <div class="container">
        <div class="breadcrumb">
          <RouterLink to="/">الرئيسية</RouterLink>
          <span>/</span>
          <span>سياسة الخصوصية</span>
        </div>
        <h1 class="page-title">سياسة الخصوصية</h1>
        <p class="page-subtitle">نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية</p>
        <p class="last-updated">آخر تحديث: {{ lastUpdated }}</p>
      </div>
    </section>

    <!-- Content -->
    <section class="section">
      <div class="container">
        <div class="privacy-content">
          <div class="content-section">
            <h2>مقدمة</h2>
            <p>
              تحترم منصتي التعليمية خصوصية مستخدميها وتلتزم بحماية المعلومات الشخصية التي يتم جمعها من خلال موقعنا الإلكتروني ومنصتنا التعليمية. 
              توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية.
            </p>
          </div>

          <div class="content-section">
            <h2>المعلومات التي نجمعها</h2>
            <h3>المعلومات الشخصية</h3>
            <ul>
              <li>الاسم الكامل</li>
              <li>عنوان البريد الإلكتروني</li>
              <li>رقم الهاتف</li>
              <li>تاريخ الميلاد</li>
              <li>المستوى التعليمي</li>
            </ul>

            <h3>معلومات الاستخدام</h3>
            <ul>
              <li>سجل تصفح الموقع</li>
              <li>الدورات المسجل بها</li>
              <li>التقدم في التعلم</li>
              <li>النتائج والدرجات</li>
              <li>التفاعل مع المحتوى</li>
            </ul>

            <h3>المعلومات التقنية</h3>
            <ul>
              <li>عنوان IP</li>
              <li>نوع المتصفح</li>
              <li>نظام التشغيل</li>
              <li>ملفات تعريف الارتباط (Cookies)</li>
            </ul>
          </div>

          <div class="content-section">
            <h2>كيفية استخدام المعلومات</h2>
            <p>نستخدم المعلومات المجمعة للأغراض التالية:</p>
            <ul>
              <li>تقديم الخدمات التعليمية المطلوبة</li>
              <li>تخصيص تجربة التعلم</li>
              <li>التواصل معك بشأن الدورات والتحديثات</li>
              <li>تحسين جودة المنصة والخدمات</li>
              <li>إرسال النشرات الإخبارية (بموافقتك)</li>
              <li>الامتثال للمتطلبات القانونية</li>
            </ul>
          </div>

          <div class="content-section">
            <h2>مشاركة المعلومات</h2>
            <p>نحن لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك في الحالات التالية:</p>
            <ul>
              <li>مع المعلمين المعتمدين لتقديم الخدمة التعليمية</li>
              <li>مع مقدمي الخدمات التقنية الموثوقين</li>
              <li>عند الحاجة للامتثال للقوانين</li>
              <li>لحماية حقوقنا وسلامة المستخدمين</li>
            </ul>
          </div>

          <div class="content-section">
            <h2>حماية المعلومات</h2>
            <p>نتخذ إجراءات أمنية متقدمة لحماية معلوماتك:</p>
            <ul>
              <li>تشفير البيانات أثناء النقل والتخزين</li>
              <li>استخدام خوادم آمنة ومحمية</li>
              <li>تحديث أنظمة الأمان بانتظام</li>
              <li>تدريب الموظفين على أمان البيانات</li>
              <li>مراقبة الوصول للمعلومات الحساسة</li>
            </ul>
          </div>

          <div class="content-section">
            <h2>ملفات تعريف الارتباط (Cookies)</h2>
            <p>نستخدم ملفات تعريف الارتباط لتحسين تجربتك على المنصة:</p>
            <ul>
              <li><strong>ملفات ضرورية:</strong> لتشغيل الموقع بشكل صحيح</li>
              <li><strong>ملفات تحليلية:</strong> لفهم كيفية استخدام الموقع</li>
              <li><strong>ملفات وظيفية:</strong> لحفظ تفضيلاتك</li>
              <li><strong>ملفات تسويقية:</strong> لعرض محتوى مخصص (بموافقتك)</li>
            </ul>
            <p>يمكنك إدارة إعدادات ملفات تعريف الارتباط من خلال متصفحك.</p>
          </div>

          <div class="content-section">
            <h2>حقوقك</h2>
            <p>لديك الحقوق التالية فيما يتعلق بمعلوماتك الشخصية:</p>
            <ul>
              <li><strong>الوصول:</strong> طلب نسخة من معلوماتك المحفوظة</li>
              <li><strong>التصحيح:</strong> تحديث أو تصحيح معلوماتك</li>
              <li><strong>الحذف:</strong> طلب حذف معلوماتك (في حالات معينة)</li>
              <li><strong>التقييد:</strong> تقييد معالجة معلوماتك</li>
              <li><strong>النقل:</strong> الحصول على معلوماتك بصيغة قابلة للنقل</li>
              <li><strong>الاعتراض:</strong> الاعتراض على معالجة معلوماتك</li>
            </ul>
          </div>

          <div class="content-section">
            <h2>الاحتفاظ بالبيانات</h2>
            <p>
              نحتفظ بمعلوماتك الشخصية للمدة اللازمة لتقديم خدماتنا أو حسب ما تتطلبه القوانين المعمول بها. 
              عند انتهاء الحاجة لمعلوماتك، سيتم حذفها بشكل آمن.
            </p>
          </div>

          <div class="content-section">
            <h2>خصوصية الأطفال</h2>
            <p>
              منصتنا مخصصة للمستخدمين الذين تبلغ أعمارهم 13 عاماً فأكثر. إذا كان عمر المستخدم أقل من 18 عاماً، 
              يجب الحصول على موافقة ولي الأمر قبل التسجيل في المنصة.
            </p>
          </div>

          <div class="content-section">
            <h2>التحديثات على السياسة</h2>
            <p>
              قد نقوم بتحديث هذه السياسة من وقت لآخر. سيتم إشعارك بأي تغييرات مهمة عبر البريد الإلكتروني 
              أو من خلال إشعار على المنصة. ننصحك بمراجعة هذه السياسة بانتظام.
            </p>
          </div>

          <div class="content-section">
            <h2>التواصل معنا</h2>
            <p>إذا كان لديك أي أسئلة حول سياسة الخصوصية أو ترغب في ممارسة حقوقك، يمكنك التواصل معنا:</p>
            <div class="contact-info">
              <p><strong>البريد الإلكتروني:</strong> privacy@myplatform.com</p>
              <p><strong>الهاتف:</strong> +966 11 123 4567</p>
              <p><strong>العنوان:</strong> الرياض، المملكة العربية السعودية</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const lastUpdated = '1 يناير 2025'
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-green) 100%);
  color: white;
  padding: 4rem 0;
}

.breadcrumb {
  margin-bottom: 2rem;
  font-size: 0.875rem;
  opacity: 0.9;
}

.breadcrumb a {
  color: white;
  text-decoration: none;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.last-updated {
  font-size: 0.875rem;
  opacity: 0.8;
}

.privacy-content {
  max-width: 800px;
  margin: 0 auto;
}

.content-section {
  margin-bottom: 3rem;
}

.content-section h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--primary-blue);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-blue);
}

.content-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-900);
  margin: 1.5rem 0 1rem;
}

.content-section p {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--gray-700);
  margin-bottom: 1rem;
  text-align: justify;
}

.content-section ul {
  margin: 1rem 0;
  padding-right: 1.5rem;
}

.content-section li {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--gray-700);
  margin-bottom: 0.5rem;
}

.contact-info {
  background: var(--gray-50);
  padding: 1.5rem;
  border-radius: 8px;
  border-right: 4px solid var(--primary-blue);
}

.contact-info p {
  margin-bottom: 0.5rem;
  color: var(--gray-800);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .content-section h2 {
    font-size: 1.5rem;
  }
}
</style>
