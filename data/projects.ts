export type ProjectMethodology = "Agile" | "Waterfall";

export type ProjectOption = {
  text: string;
  score: number;
  feedback: string;
  learningNote: string;
  isBest: boolean;
  metricEffects: {
    projectHealth: number;
    teamMorale: number;
    stakeholderSatisfaction: number;
    deliveryFocus: number;
  };
};

export type ProjectRound = {
  roundNumber: number;
  phase: string;
  scenario: string;
  options: ProjectOption[];
};

export type ProjectBriefing = {
  scenario: string;
  stakes: string;
  rules: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  methodology: ProjectMethodology;
  briefing: ProjectBriefing;
  rounds: ProjectRound[];
};

const defaultBriefingRules =
  "Bu case 3 raunddan oluşur. Vereceğin kararlar ekip moralini, proje sağlığını, paydaş memnuniyetini ve kariyer sonucunu etkiler. Güçlü kararlar seni terfiye götürebilir; zayıf kararlar ise güven kaybına yol açabilir.";

export const projects: Project[] = [
  {
    id: "startup-mvp",
    title: "Startup MVP Projesi",
    description:
      "MVP kapsamını koruyarak hızlı öğrenme, Backlog önceliklendirme ve Sprint riski yönetimi.",
    methodology: "Agile",
    briefing: {
      scenario:
        "Yeni kurulan bir teknoloji girişiminin ilk ürün sürümünden sen sorumlusun. Şirket yatırımcı sunumuna yalnızca birkaç hafta uzaklıkta. Kurucu ekip sürekli yeni fikirler eklemek istiyor, geliştirici ekip ise Sprint kapsamının kontrolden çıktığını söylüyor.\n\nCEO dün gece sana mesaj attı:\n'Bu MVP yetişmezse yatırım turunu kaybedebiliriz.'\n\nMüşterilerden gelen geri bildirimler her gün değişiyor. Takım senden net öncelikler ve hızlı kararlar bekliyor.",
      stakes:
        "Başarılı bir teslimat yatırım turunu açabilir ve seni şirket içinde yükseltebilir. Yanlış öncelikler ise ekibin tükenmesine ve ürünün gecikmesine neden olabilir.",
      rules: defaultBriefingRules,
    },
    rounds: [
      {
        roundNumber: 1,
        phase: "Planlama",
        scenario: "Müşteri tüm özellikleri ilk sürümde istiyor.",
        options: [
          {
            text: "MVP hedefini netleştirip en kritik özellikleri seç.",
            score: 30,
            feedback:
              "Doğru yaklaşım. İlk sürüm için odak korunur ve teslim riski azalır.",
            learningNote:
              "Agile projelerde MVP tanımını netleştirmek, öğrenme döngüsünü hızlandırır ve kontrolsüz Scope Creep oluşmasını engeller.",
            isBest: true,
            metricEffects: {
              projectHealth: 18,
              teamMorale: 8,
              stakeholderSatisfaction: 10,
              deliveryFocus: 20,
            },
          },
          {
            text: "Tüm özellikleri plana ekle ve tarihi değiştirme.",
            score: 5,
            feedback:
              "Bu karar ekibi zorlar. Kapsam büyürken tarih sabit kalırsa kalite riski artar.",
            learningNote:
              "Agile projelerde tüm talepleri aynı sürüme eklemek odağı zayıflatır ve iterasyon kalitesini düşürür.",
            isBest: false,
            metricEffects: {
              projectHealth: -16,
              teamMorale: -18,
              stakeholderSatisfaction: 6,
              deliveryFocus: -12,
            },
          },
          {
            text: "Müşteriye sadece teknik ekibin karar vereceğini söyle.",
            score: 10,
            feedback:
              "Ekip görüşü önemli ama paydaş beklentisini birlikte yönetmek gerekir.",
            learningNote:
              "Agile ekipler teknik değerlendirmeyi paydaş iş birliğiyle dengeler; böylece öncelikler şeffaf kalır.",
            isBest: false,
            metricEffects: {
              projectHealth: -8,
              teamMorale: 4,
              stakeholderSatisfaction: -14,
              deliveryFocus: 2,
            },
          },
          {
            text: "Özellikleri önceliklendirip sonraki sürümlere böl.",
            score: 25,
            feedback:
              "İyi karar. Kapsamı bölmek hem beklentiyi hem teslimatı daha yönetilebilir yapar.",
            learningNote:
              "Backlog önceliklendirme, Agile ekiplerin bugünkü değeri teslim ederken gelecek seçeneklerini korumasını sağlar.",
            isBest: false,
            metricEffects: {
              projectHealth: 14,
              teamMorale: 6,
              stakeholderSatisfaction: 8,
              deliveryFocus: 16,
            },
          },
        ],
      },
      {
        roundNumber: 2,
        phase: "Uygulama",
        scenario: "Ekip Sprint içinde fazla iş aldı ve yetişemiyor.",
        options: [
          {
            text: "Herkesten hafta sonu çalışmasını iste.",
            score: 10,
            feedback:
              "Kısa vadede işe yarayabilir ama sürdürülebilirlik ve moral zarar görebilir.",
            learningNote:
              "Sürdürülebilir çalışma temposu Agile teslimatın temelidir; tükenmişlik gelecekteki Velocity değerini düşürür.",
            isBest: false,
            metricEffects: {
              projectHealth: -6,
              teamMorale: -20,
              stakeholderSatisfaction: 4,
              deliveryFocus: 8,
            },
          },
          {
            text: "Günlük toplantıda engelleri netleştirip yardım iste.",
            score: 20,
            feedback:
              "İyi hamle. Ekip engelleri erken paylaşırsa çözüm şansı artar.",
            learningNote:
              "Günlük kontrol, Agile ekiplerin engelleri teslimat riskine dönüşmeden görünür kılmasını sağlar.",
            isBest: false,
            metricEffects: {
              projectHealth: 8,
              teamMorale: 14,
              stakeholderSatisfaction: 2,
              deliveryFocus: 8,
            },
          },
          {
            text: "Sprint kapsamında takas yapıp en düşük öncelikli işi çıkar.",
            score: 30,
            feedback:
              "En sağlıklı seçim. Kapasiteye göre kapsam ayarlamak ekibi ve teslimatı korur.",
            learningNote:
              "Agile projelerde Sprint kapsamını korumak, takımın Velocity değerini dengede tutar ve kontrolsüz Scope Creep oluşmasını engeller.",
            isBest: true,
            metricEffects: {
              projectHealth: 16,
              teamMorale: 18,
              stakeholderSatisfaction: 8,
              deliveryFocus: 18,
            },
          },
          {
            text: "Durumu gizleyip Sprint sonunda açıkla.",
            score: 0,
            feedback:
              "Geç bilgi vermek riski büyütür. Sorunu erken görünür yapmak daha doğru olur.",
            learningNote:
              "Agile şeffaflığa dayanır; teslimat riskini gizlemek erken uyum sağlama fırsatını ortadan kaldırır.",
            isBest: false,
            metricEffects: {
              projectHealth: -18,
              teamMorale: -12,
              stakeholderSatisfaction: -16,
              deliveryFocus: -10,
            },
          },
        ],
      },
      {
        roundNumber: 3,
        phase: "Kriz",
        scenario: "Demo öncesi kritik bug çıktı.",
        options: [
          {
            text: "Bugu görmezden gel ve demoya aynen devam et.",
            score: 0,
            feedback:
              "Kritik hata demoda güven kaybına yol açabilir. Risk saklanmamalı.",
            learningNote:
              "Demo güven oluşturmalıdır; sorunlu olduğu bilinen işi göstermek paydaş güvenini zedeleyebilir.",
            isBest: false,
            metricEffects: {
              projectHealth: -24,
              teamMorale: -10,
              stakeholderSatisfaction: -18,
              deliveryFocus: -8,
            },
          },
          {
            text: "Demoyu tamamen iptal et ve kimseye detay verme.",
            score: 10,
            feedback:
              "Kaliteyi korumak iyi ama iletişim eksik kalırsa paydaş güveni azalır.",
            learningNote:
              "Agile paydaş iletişimi, görünürlüğü tamamen kaldırmak yerine karar takaslarını açıkça anlatmalıdır.",
            isBest: false,
            metricEffects: {
              projectHealth: 6,
              teamMorale: -4,
              stakeholderSatisfaction: -16,
              deliveryFocus: -10,
            },
          },
          {
            text: "Paydaşlara durumu açıkla ve güvenli demo akışına geç.",
            score: 25,
            feedback:
              "İyi seçim. Şeffaflık ve kontrollü demo akışı beklentiyi dengeler.",
            learningNote:
              "Şeffaf demo kapsamı, ürün güvenilirliğini korurken Continuous Feedback döngüsünü canlı tutar.",
            isBest: false,
            metricEffects: {
              projectHealth: 14,
              teamMorale: 6,
              stakeholderSatisfaction: 16,
              deliveryFocus: 8,
            },
          },
          {
            text: "Bugu önceliklendir, demo kapsamından riskli bölümü çıkar.",
            score: 30,
            feedback:
              "Doğru karar. Demo değerini korurken kritik kalite riskini azaltırsın.",
            learningNote:
              "Agile ekipler, acil kalite risklerini yönetirken demo kapsamını uyarlayarak sunulan değeri koruyabilir.",
            isBest: true,
            metricEffects: {
              projectHealth: 20,
              teamMorale: 8,
              stakeholderSatisfaction: 10,
              deliveryFocus: 12,
            },
          },
        ],
      },
    ],
  },
  {
    id: "mobile-app-sprint-crisis",
    title: "Mobil Uygulama Sprint Krizi",
    description:
      "Sprint ortasında değişen Backlog, düşen Velocity ve demo kapsamı kararları.",
    methodology: "Agile",
    briefing: {
      scenario:
        "Mobil uygulama ekibi büyük demo haftasına girerken Sprint planı bozulmaya başladı. Kritik özellikler hâlâ tamamlanmadı, QA ekibi hata listesinin büyüdüğünü söylüyor ve pazarlama departmanı son anda yeni talepler gönderiyor.\n\nÜrün yöneticisi sana şunu söyledi:\n'Bu demo başarısız olursa büyük müşteri anlaşmasını kaybedebiliriz.'\n\nTakım baskı altında ve herkes senden hangi işlerin gerçekten önemli olduğuna karar vermeni bekliyor.",
      stakes:
        "Doğru Sprint yönetimi ekibi toparlayabilir ve müşteriyi etkileyebilir. Kötü kararlar ise Velocity düşüşüne, teslimat krizine ve ekip motivasyonunun bozulmasına yol açabilir.",
      rules: defaultBriefingRules,
    },
    rounds: [
      {
        roundNumber: 1,
        phase: "Sprint Planning",
        scenario: "Product Owner Sprint ortasında yeni özellik eklemek istiyor.",
        options: [
          {
            text: "Özelliği Sprint kapsamına ekleyip aynı hedefi koru.",
            score: 5,
            feedback:
              "Bu karar Sprint hedefini şişirir ve teslim odağını zayıflatır.",
            learningNote:
              "Sprint ortasında büyüyen kapsam, Agile öngörülebilirliği zayıflatır ve teslimat baskısını artırır.",
            isBest: false,
            metricEffects: {
              projectHealth: -14,
              teamMorale: -16,
              stakeholderSatisfaction: 6,
              deliveryFocus: -14,
            },
          },
          {
            text: "Yeni isteği Backlog'a alıp sonraki Sprint için önceliklendir.",
            score: 30,
            feedback:
              "Sprint odağı korundu. Değişiklik isteği görünür ve yönetilebilir hale geldi.",
            learningNote:
              "Backlog yönetimi, Agile ekiplerin mevcut Sprint hedefini bozmadan değişimi yönetmesini sağlar.",
            isBest: true,
            metricEffects: {
              projectHealth: 16,
              teamMorale: 12,
              stakeholderSatisfaction: 8,
              deliveryFocus: 18,
            },
          },
          {
            text: "Ekipten hızlıca tahmin alıp kapsam takası öner.",
            score: 25,
            feedback:
              "İyi karar. Tahmin ve takas Sprint planını gerçekçi tutar.",
            learningNote:
              "Agile tahminleme, paydaş ihtiyaçları iterasyon sırasında değiştiğinde kapsam takaslarını destekler.",
            isBest: false,
            metricEffects: {
              projectHealth: 12,
              teamMorale: 10,
              stakeholderSatisfaction: 8,
              deliveryFocus: 14,
            },
          },
          {
            text: "Product Owner ile konuşmadan isteği reddet.",
            score: 10,
            feedback:
              "Sınır koydun ama paydaş iletişimi olmadan karar güven kaybettirebilir.",
            learningNote:
              "Agile ürün kararlarında Product Owner sürece dahil olmalıdır; böylece öncelik tercihleri ortak kalır.",
            isBest: false,
            metricEffects: {
              projectHealth: 2,
              teamMorale: 4,
              stakeholderSatisfaction: -14,
              deliveryFocus: 6,
            },
          },
        ],
      },
      {
        roundNumber: 2,
        phase: "Velocity Yönetimi",
        scenario: "Ekip Velocity düşmeye başladı ve Sprint hedefi risk altında.",
        options: [
          {
            text: "Retrospective beklemeden engeller için hızlı aksiyon al.",
            score: 25,
            feedback:
              "İyi seçim. Engelleri erken kaldırmak iterasyon akışını güçlendirir.",
            learningNote:
              "Sprint sırasında engelleri kaldırmak akışı korur ve daha sağlıklı Velocity oluşmasını destekler.",
            isBest: false,
            metricEffects: {
              projectHealth: 12,
              teamMorale: 16,
              stakeholderSatisfaction: 4,
              deliveryFocus: 12,
            },
          },
          {
            text: "Velocity düşüşünü ekip performans sorunu olarak duyur.",
            score: 5,
            feedback:
              "Bu yaklaşım morali düşürür ve problemi çözmek yerine savunma yaratır.",
            learningNote:
              "Velocity bir planlama sinyalidir, suçlama aracı değildir; yanlış kullanımı ekip güvenini zedeleyebilir.",
            isBest: false,
            metricEffects: {
              projectHealth: -10,
              teamMorale: -22,
              stakeholderSatisfaction: -4,
              deliveryFocus: -8,
            },
          },
          {
            text: "Velocity trendini görünür yapıp Sprint hedefini yeniden netleştir.",
            score: 30,
            feedback:
              "Doğru hamle. Gerçek kapasiteyle hedefi hizalamak Sprint sağlığını korur.",
            learningNote:
              "Velocity yönetimi, Agile ekiplerin taahhütlerini iyimserliğe değil kanıta göre ayarlamasını sağlar.",
            isBest: true,
            metricEffects: {
              projectHealth: 18,
              teamMorale: 14,
              stakeholderSatisfaction: 6,
              deliveryFocus: 16,
            },
          },
          {
            text: "Eksik kalan işleri gizleyip Sprint sonunda konuş.",
            score: 0,
            feedback:
              "Gecikmeyi saklamak paydaş iletişimini ve Sprint güvenini zedeler.",
            learningNote:
              "Agile ilerleme izlenebilir olmalıdır; ekip Sprint Review öncesinde uyum sağlayabilmelidir.",
            isBest: false,
            metricEffects: {
              projectHealth: -18,
              teamMorale: -10,
              stakeholderSatisfaction: -18,
              deliveryFocus: -14,
            },
          },
        ],
      },
      {
        roundNumber: 3,
        phase: "Demo Hazırlığı",
        scenario: "Demo öncesi bazı özellikler tamamlanamadı.",
        options: [
          {
            text: "Tamamlanmayan özellikleri demo dışında bırakıp sebebini açıklama.",
            score: 10,
            feedback:
              "Demo sadeleşti ama iletişim eksikliği paydaş güvenini azaltır.",
            learningNote:
              "Sprint Review, hangi öğrenimlerin elde edildiğini ve bazı işlerin neden Backlog'a döndüğünü netleştirmelidir.",
            isBest: false,
            metricEffects: {
              projectHealth: 2,
              teamMorale: -2,
              stakeholderSatisfaction: -16,
              deliveryFocus: 6,
            },
          },
          {
            text: "Eksik özellikleri aceleyle tamamlatıp testleri atla.",
            score: 0,
            feedback:
              "Kalite riski büyür. Demo öncesi testleri atlamak güvenilirliği düşürür.",
            learningNote:
              "Agile hız, kalite kontrollerini ortadan kaldırmamalıdır; tamamlanmamış iş Backlog'a dönmelidir.",
            isBest: false,
            metricEffects: {
              projectHealth: -22,
              teamMorale: -16,
              stakeholderSatisfaction: -10,
              deliveryFocus: -8,
            },
          },
          {
            text: "Paydaşlara demo kapsamını güncelleyen kısa bir not gönder.",
            score: 20,
            feedback:
              "İyi iletişim. Beklentiyi yönetir ama demo değerini de net göstermek gerekir.",
            learningNote:
              "Paydaş iletişimi, kapsam güncellemelerini çalışan görünür değerle birlikte sunduğunda güçlenir.",
            isBest: false,
            metricEffects: {
              projectHealth: 8,
              teamMorale: 4,
              stakeholderSatisfaction: 12,
              deliveryFocus: 8,
            },
          },
          {
            text: "Tamamlanan akışı demo et, eksikleri Backlog ve risk olarak paylaş.",
            score: 30,
            feedback:
              "Demo değeri korundu. Eksikler şeffaf biçimde Backlog'a taşındı.",
            learningNote:
              "Agile demolar tamamlanan değeri göstermeli, bitmemiş işleri açıkça Backlog planlamasına taşımalıdır.",
            isBest: true,
            metricEffects: {
              projectHealth: 16,
              teamMorale: 10,
              stakeholderSatisfaction: 14,
              deliveryFocus: 12,
            },
          },
        ],
      },
    ],
  },
  {
    id: "factory-automation-delivery",
    title: "Fabrika Otomasyonu Teslimatı",
    description:
      "Requirements doğrulama, Documentation uyumu ve Acceptance Criteria yönetimi.",
    methodology: "Waterfall",
    briefing: {
      scenario:
        "Bir fabrikanın otomasyon sistemi teslimatı için proje yöneticisi olarak görevlendirildin. Teknik Requirements yüzlerce sayfalık Documentation içinde tanımlı ve müşteri tüm Acceptance Criteria maddelerinin eksiksiz karşılanmasını bekliyor.\n\nFabrika müdürü toplantıda açıkça şunu söyledi:\n'Sistem teslim günü çalışmazsa üretim hattı durur.'\n\nMühendislik ekibi Documentation değişikliklerinden şikâyet ediyor, müşteri ise her faz sonunda resmi onay görmek istiyor.",
      stakes:
        "Doğru planlama ve Documentation teslimatı güvenli şekilde tamamlayabilir. Hatalı Requirements yönetimi ise maliyet artışına, kabul testlerinin başarısız olmasına ve müşteri güveninin kaybedilmesine neden olabilir.",
      rules: defaultBriefingRules,
    },
    rounds: [
      {
        roundNumber: 1,
        phase: "Upfront Planning",
        scenario:
          "Müşteri tüm Requirements maddelerini proje başında netleştirmek istiyor.",
        options: [
          {
            text: "Requirements atölyesi yapıp kapsamı onaylı Documentation'a bağla.",
            score: 30,
            feedback:
              "Doğru karar. Waterfall akışında erken gereksinim doğrulama teslimatı güçlendirir.",
            learningNote:
              "Waterfall projelerde Requirements maddelerini erken netleştirmek, geç fazlardaki yeniden işi ve kabul anlaşmazlıklarını azaltır.",
            isBest: true,
            metricEffects: {
              projectHealth: 18,
              teamMorale: 6,
              stakeholderSatisfaction: 16,
              deliveryFocus: 16,
            },
          },
          {
            text: "Requirements maddelerini hızlıca kabul edip tasarıma geç.",
            score: 5,
            feedback:
              "Eksik doğrulama sonraki fazlarda maliyetli değişikliklere yol açabilir.",
            learningNote:
              "Waterfall planlama, tasarım ve teslimat fazları başlamadan önce doğrulanmış Requirements üzerine kurulmalıdır.",
            isBest: false,
            metricEffects: {
              projectHealth: -16,
              teamMorale: -4,
              stakeholderSatisfaction: -8,
              deliveryFocus: -12,
            },
          },
          {
            text: "Belirsiz maddeler için varsayım listesi ve onay tarihi oluştur.",
            score: 25,
            feedback:
              "İyi seçim. Varsayımları belgelemek değişiklik yönetimini kolaylaştırır.",
            learningNote:
              "Belgelenmiş varsayımlar, Requirements olgunlaştığında Waterfall kapsam kararlarını denetlenebilir kılar.",
            isBest: false,
            metricEffects: {
              projectHealth: 14,
              teamMorale: 4,
              stakeholderSatisfaction: 12,
              deliveryFocus: 12,
            },
          },
          {
            text: "Tüm detayları teknik ekibin çözmesini iste.",
            score: 10,
            feedback:
              "Teknik analiz gerekli ama müşteri onayı olmadan kapsam yoruma açık kalır.",
            learningNote:
              "Waterfall Requirements yalnızca uygulama ekiplerince varsayılmamalı, müşteriyle birlikte doğrulanmalıdır.",
            isBest: false,
            metricEffects: {
              projectHealth: -8,
              teamMorale: -8,
              stakeholderSatisfaction: -6,
              deliveryFocus: 2,
            },
          },
        ],
      },
      {
        roundNumber: 2,
        phase: "Documentation",
        scenario:
          "Donanım ve yazılım ekipleri farklı teknik Documentation kaynakları kullanıyor.",
        options: [
          {
            text: "Her ekibin kendi Documentation kaynağıyla devam etmesine izin ver.",
            score: 0,
            feedback:
              "Bu yaklaşım fazlar arası uyumsuzluğu ve yeniden iş yapmayı artırır.",
            learningNote:
              "Waterfall teslimat kontrollü Documentation gerektirir; ayrı kaynaklar entegrasyon riskini artırır.",
            isBest: false,
            metricEffects: {
              projectHealth: -20,
              teamMorale: -10,
              stakeholderSatisfaction: -8,
              deliveryFocus: -14,
            },
          },
          {
            text: "Tek kaynak Documentation oluşturup Phase-Gate onayıyla ekipleri hizala.",
            score: 30,
            feedback:
              "Doğru karar. Ortak dokümantasyon entegrasyon riskini azaltır.",
            learningNote:
              "Phase-Gate onayı ve tek doğruluk kaynağı, uygulama sürmeden önce Waterfall ekiplerini hizalı tutar.",
            isBest: true,
            metricEffects: {
              projectHealth: 18,
              teamMorale: 8,
              stakeholderSatisfaction: 10,
              deliveryFocus: 16,
            },
          },
          {
            text: "Documentation farklarını change log ile takip et.",
            score: 20,
            feedback:
              "İyi hamle. Değişiklik izlenir ama tek kaynak yaklaşımı kadar güçlü değildir.",
            learningNote:
              "Change log izlenebilirliği destekler; yine de Waterfall ekipleri onaylı tek temel dokümandan daha fazla yarar sağlar.",
            isBest: false,
            metricEffects: {
              projectHealth: 8,
              teamMorale: 4,
              stakeholderSatisfaction: 8,
              deliveryFocus: 10,
            },
          },
          {
            text: "Sadece kritik modüller için entegrasyon Documentation'ı hazırla.",
            score: 15,
            feedback:
              "Riskli alanları azaltır ama tüm teslimat için dokümantasyon boşlukları kalabilir.",
            learningNote:
              "Kısmi Documentation yakın vadeli riski azaltabilir; ancak Waterfall projelerde kabul boşlukları bırakabilir.",
            isBest: false,
            metricEffects: {
              projectHealth: 4,
              teamMorale: 2,
              stakeholderSatisfaction: 4,
              deliveryFocus: 6,
            },
          },
        ],
      },
      {
        roundNumber: 3,
        phase: "Acceptance Test",
        scenario:
          "Kabul testlerinde müşteri bazı gereksinimlerin eksik olduğunu söylüyor.",
        options: [
          {
            text: "Müşteri memnun olsun diye eksikleri ücretsiz ekle.",
            score: 5,
            feedback:
              "Kısa vadede olumlu görünür ama kontrolsüz kapsam artışı teslimatı zayıflatır.",
            learningNote:
              "Waterfall değişiklik yönetimi, kabul aşamasında yeni kapsam ortaya çıktığında teslimat odağını korur.",
            isBest: false,
            metricEffects: {
              projectHealth: -16,
              teamMorale: -12,
              stakeholderSatisfaction: 8,
              deliveryFocus: -14,
            },
          },
          {
            text: "Eksiklerin kapsam dışı olduğunu kanıtlayıp iletişimi kapat.",
            score: 10,
            feedback:
              "Kapsamı korudun ama çözüm odaklı değişiklik yönetimi eksik kaldı.",
            learningNote:
              "Kabul anlaşmazlıkları, belgelenmiş kanıt ve Change Request için yapıcı bir ilerleme yolu gerektirir.",
            isBest: false,
            metricEffects: {
              projectHealth: 4,
              teamMorale: 2,
              stakeholderSatisfaction: -16,
              deliveryFocus: 8,
            },
          },
          {
            text: "Faz onaylarını ve test kriterlerini birlikte gözden geçir.",
            score: 25,
            feedback:
              "İyi seçim. Kabul kriterlerini ortak okumak güveni ve netliği artırır.",
            learningNote:
              "Acceptance Criteria, Waterfall ekiplerin onaylı kapsamı yeni Change Request taleplerinden ayırmasına yardımcı olur.",
            isBest: false,
            metricEffects: {
              projectHealth: 12,
              teamMorale: 6,
              stakeholderSatisfaction: 14,
              deliveryFocus: 10,
            },
          },
          {
            text: "Eksikleri onaylı Requirements matrisiyle karşılaştırıp Change Request aç.",
            score: 30,
            feedback:
              "Doğru Waterfall yaklaşımı. Kapsam, onay ve değişiklik yönetimi netleşti.",
            learningNote:
              "Requirements matrisi, Waterfall ekiplerine kabul kararları ve resmi değişiklikler için izlenebilirlik sağlar.",
            isBest: true,
            metricEffects: {
              projectHealth: 18,
              teamMorale: 8,
              stakeholderSatisfaction: 12,
              deliveryFocus: 14,
            },
          },
        ],
      },
    ],
  },
];
