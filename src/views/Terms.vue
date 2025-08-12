<template>
  <main class="terms-page">
    <!-- Header -->
    <section class="page-header">
      <div class="container">
        <div class="breadcrumb">
          <RouterLink to="/">الرئيسية</RouterLink>
          <span>/</span>
          <span>الشروط والأحكام</span>
        </div>
        <h1 class="page-title">الشروط والأحكام</h1>
        <p class="page-subtitle">شروط استخدام منصتي التعليمية والخدمات المقدمة</p>
        <p class="last-updated">آخر تحديث: {{ lastUpdated }}</p>
      </div>
    </section>

    <!-- Content -->
    <section class="section">
      <div class="container">
        <div class="terms-content">
          <div class="content-section">
            <h2>مقدمة</h2>
            <p>
              مرحباً بك في منصتي التعليمية. هذه الشروط والأحكام تحكم استخدامك لموقعنا الإلكتروني ومنصتنا التعليمية. 
              باستخدام خدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام.
            </p>
          </div>

          <div class="content-section">
            <h2>التعريفات</h2>
            <ul>
              <li><strong>"المنصة":</strong> تشير إلى منصتي التعليمية وجميع خدماتها</li>
              <li><strong>"المستخدم":</strong> أي شخص يستخدم المنصة أو خدماتها</li>
              <li><strong>"المحتوى":</strong> جميع المواد التعليمية والنصوص والصور والفيديوهات</li>
              <li><strong>"الحساب":</strong> حساب المستخدم المسجل في المنصة</li>
              <li><strong>"الخدمات":</strong> جميع الخدمات التعليمية المقدمة عبر المنصة</li>
            </ul>
          </div>

          <div class="content-section">
            <h2>قبول الشروط</h2>
            <p>
              بالوصول إلى المنصة أو استخدامها، فإنك تؤكد أنك قد قرأت وفهمت ووافقت على الالتزام بهذه الشروط والأحكام. 
              إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام المنصة.
            </p>
          </div>

          <div class="content-section">
            <h2>التسجيل والحساب</h2>
            <h3>متطلبات التسجيل</h3>
            <ul>
              <li>يجب أن تكون 13 عاماً أو أكثر للتسجيل</li>
              <li>تقديم معلومات صحيحة ودقيقة</li>
              <li>الحفاظ على سرية كلمة المرور</li>
              <li>تحديث المعلومات عند الحاجة</li>
            </ul>

            <h3>مسؤولية الحساب</h3>
            <p>
              أنت مسؤول عن جميع الأنشطة التي تحدث تحت حسابك. يجب عليك إخطارنا فوراً بأي استخدام غير مصرح به لحسابك.
            </p>
          </div>

          <div class="content-section">
            <h2>استخدام المنصة</h2>
            <h3>الاستخدام المسموح</h3>
            <ul>
              <li>الوصول للمحتوى التعليمي المسجل به</li>
              <li>التفاعل مع المعلمين والطلاب الآخرين</li>
              <li>تحميل المواد التعليمية للاستخدام الشخصي</li>
              <li>المشاركة في المناقشات والأنشطة</li>
            </ul>

            <h3>الاستخدام المحظور</h3>
            <ul>
              <li>نسخ أو توزيع المحتوى دون إذن</li>
              <li>استخدام المنصة لأغراض تجارية غير مصرح بها</li>
              <li>التحايل على أنظمة الأمان</li>
              <li>نشر محتوى مسيء أو غير قانوني</li>
              <li>انتحال شخصية أخرى</li>
              <li>إرسال رسائل غير مرغوب فيها</li>
            </ul>
          </div>

          <div class="content-section">
            <h2>المحتوى والملكية الفكرية</h2>
            <h3>حقوق الملكية</h3>
            <p>
              جميع المحتويات في المنصة محمية بحقوق الطبع والنشر وحقوق الملكية الفكرية. 
              المحتوى مملوك للمنصة أو مرخص لها من أطراف ثالثة.
            </p>

            <h3>ترخيص الاستخدام</h3>
            <p>
              نمنحك ترخيصاً محدوداً وغير حصري وغير قابل للتحويل لاستخدام المحتوى للأغراض التعليمية الشخصية فقط.
            </p>

            <h3>المحتوى المقدم من المستخدمين</h3>
            <p>
              بتقديم أي محتوى للمنصة، فإنك تمنحنا ترخيصاً لاستخدام وعرض وتوزيع هذا المحتوى على المنصة.
            </p>
          </div>

          <div class="content-section">
            <h2>الدفع والاسترداد</h2>
            <h3>الرسوم</h3>
            <ul>
              <li>الرسوم محددة بوضوح لكل دورة</li>
              <li>الأسعار قابلة للتغيير دون إشعار مسبق</li>
              <li>جميع الرسوم غير قابلة للاسترداد ما لم ينص على خلاف ذلك</li>
            </ul>

            <h3>سياسة الاسترداد</h3>
            <ul>
              <li>يمكن طلب الاسترداد خلال 7 أيام من الشراء</li>
              <li>يجب عدم استكمال أكثر من 20% من الدورة</li>
              <li>الاسترداد يتم خلال 14 يوم عمل</li>
              <li>قد تطبق رسوم معالجة</li>
            </ul>
          </div>

          <div class="content-section">
            <h2>سلوك المستخدم</h2>
            <p>يجب على المستخدمين الالتزام بما يلي:</p>
            <ul>
              <li>احترام المعلمين والطلاب الآخرين</li>
              <li>عدم نشر محتوى مسيء أو غير لائق</li>
              <li>الحفاظ على بيئة تعليمية إيجابية</li>
              <li>عدم التدخل في تجربة المستخدمين الآخرين</li>
              <li>الإبلاغ عن أي سلوك غير مناسب</li>
            </ul>
          </div>

          <div class="content-section">
            <h2>إنهاء الخدمة</h2>
            <h3>إنهاء من قبل المستخدم</h3>
            <p>يمكنك إنهاء حسابك في أي وقت بإرسال طلب إلى فريق الدعم.</p>

            <h3>إنهاء من قبل المنصة</h3>
            <p>نحتفظ بالحق في إنهاء أو تعليق حسابك في حالة:</p>
            <ul>
              <li>انتهاك هذه الشروط والأحكام</li>
              <li>السلوك غير المناسب</li>
              <li>عدم دفع الرسوم المستحقة</li>
              <li>الاستخدام الاحتيالي للمنصة</li>
            </ul>
          </div>

          <div class="content-section">
            <h2>إخلاء المسؤولية</h2>
            <p>
              المنصة والمحتوى مقدمان "كما هما" دون أي ضمانات صريحة أو ضمنية. 
              لا نضمن دقة أو اكتمال أو موثوقية المحتوى التعليمي.
            </p>
            <ul>
              <li>لا نضمن النتائج التعليمية المحددة</li>
              <li>لا نتحمل مسؤولية الأخطاء التقنية</li>
              <li>لا نضمن توفر الخدمة بشكل مستمر</li>
            </ul>
          </div>

          <div class="content-section">
            <h2>تحديد المسؤولية</h2>
            <p>
              في أقصى الحدود المسموح بها قانونياً، لن تتجاوز مسؤوليتنا المبلغ المدفوع للخدمة المحددة 
              خلال الـ 12 شهراً السابقة للحادثة.
            </p>
          </div>

          <div class="content-section">
            <h2>القانون المطبق</h2>
            <p>
              تخضع هذه الشروط والأحكام لقوانين المملكة العربية السعودية. 
              أي نزاع ينشأ عن هذه الشروط سيتم حله في المحاكم المختصة في الرياض.
            </p>
          </div>

          <div class="content-section">
            <h2>تعديل الشروط</h2>
            <p>
              نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم إشعارك بالتغييرات المهمة 
              عبر البريد الإلكتروني أو من خلال إشعار على المنصة.
            </p>
          </div>

          <div class="content-section">
            <h2>التواصل</h2>
            <p>لأي استفسارات حول هذه الشروط والأحكام، يمكنك التواصل معنا:</p>
            <div class="contact-info">
              <p><strong>البريد الإلكتروني:</strong> legal@myplatform.com</p>
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

.terms-content {
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
