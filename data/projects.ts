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
  isAdvanced?: boolean;
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
  {
    id: "fintech-core-banking-migration",
    title: "FinTech Core Banking Migration",
    description:
      "Regülasyon baskısı, vendor gecikmesi, Critical Path yönetimi ve Go-live sırasında veri bütünlüğü kararları.",
    methodology: "Waterfall",
    isAdvanced: true,
    briefing: {
      scenario:
        "Büyük bir FinTech kurumunda çekirdek bankacılık sisteminin yenilenmesinden sorumlusun. Analiz fazı tamamlandı, tasarım onayları alınmak üzere ve geçiş takvimi yönetim kuruluna duyuruldu.\n\nAncak proje, regülasyon, dış vendor bağımlılıkları ve veri taşınabilirliği açısından yüksek risk taşıyor. Her karar yalnızca teslim tarihini değil, denetim uyumunu, müşteri hesaplarının bütünlüğünü ve kurumun itibarını etkileyebilir.",
      stakes:
        "Doğru kararlar kurumun regülasyon denetiminden geçmesini ve kontrollü Go-live yapmasını sağlayabilir. Hatalı kararlar ise resmi yaptırım, maliyet patlaması, müşteri veri kaybı ve yönetim güveninin kaybedilmesiyle sonuçlanabilir.",
      rules: defaultBriefingRules,
    },
    rounds: [
      {
        roundNumber: 1,
        phase: "Scope & Regulation",
        scenario:
          "Regülatör kurum projenin ortasında yeni bir siber güvenlik standardı yayınlar ve 3 ay içinde uyum zorunluluğu getirir. Analiz fazı bitmiştir, kapsam dokümanları onaylanmak üzeredir ve sponsor ekip takvimin değişmemesi için baskı yapmaktadır.",
        options: [
          {
            text: "Yeni standardı mevcut Requirements içine sessizce ekleyip takvimi koru.",
            score: -10,
            feedback:
              "Bu yaklaşım kısa vadede yönetim baskısını azaltır gibi görünür; ancak Waterfall projede onaylı kapsamı gizlice değiştirmek Requirements izlenebilirliğini, bütçe kontrolünü ve denetim savunmasını zayıflatır.",
            learningNote:
              "Regülasyon kaynaklı kapsam değişiklikleri resmi Change Request olarak ele alınmalıdır; aksi halde Scope Creep teknik değil, yasal bir teslimat riskine dönüşür.",
            isBest: false,
            metricEffects: {
              projectHealth: -22,
              teamMorale: -10,
              stakeholderSatisfaction: 4,
              deliveryFocus: -18,
            },
          },
          {
            text: "Change Request sürecini resmi olarak başlat, etki analizini yap ve bütçe/zaman artışını yönetim kuruluna savun.",
            score: 20,
            feedback:
              "En güçlü seçenek bu. Maliyeti ve gecikmeyi göğüslüyorsun, fakat kararın denetlenebilirliği artıyor ve regülasyon uyumu proje kapsamının resmi bir parçası haline geliyor.",
            learningNote:
              "Waterfall ortamında regülasyon değişikliği bir istisna değil, yönetilmesi gereken resmi Change Request akışıdır; kararın bedeli vardır ama proje sağlığını korur.",
            isBest: true,
            metricEffects: {
              projectHealth: 14,
              teamMorale: -4,
              stakeholderSatisfaction: 12,
              deliveryFocus: 8,
            },
          },
          {
            text: "Yeni standardı proje dışı kabul edip uyumu operasyon ekibine devret.",
            score: 0,
            feedback:
              "Kapsamı korumaya çalışıyorsun; ancak canlıya çıkacak core banking sisteminde siber güvenlik standardını operasyona itmek kabul ve denetim aşamasında daha büyük blokaj yaratabilir.",
            learningNote:
              "Waterfall projelerde kapsam sınırı önemlidir, fakat yasal uyum gereksinimleri teslimat kabulünün parçasıysa dışarı atılamaz; kapsam savunması kanıtla desteklenmelidir.",
            isBest: false,
            metricEffects: {
              projectHealth: -12,
              teamMorale: 2,
              stakeholderSatisfaction: -16,
              deliveryFocus: 4,
            },
          },
          {
            text: "Analizi yeniden başlatıp tüm fazları dondur, sponsor onayı gelene kadar ekibi beklet.",
            score: 5,
            feedback:
              "Riskten kaçınan bir karar; fakat tüm fazları dondurmak Critical Path dışındaki işlerin de durmasına neden olur. Uyum analizi yapılırken etkilenmeyen iş paketleri ilerleyebilirdi.",
            learningNote:
              "İleri seviye Waterfall yönetiminde değişiklik kontrolü ile teslimat sürekliliği birlikte düşünülür; her belirsizlik tüm projeyi durdurmak zorunda değildir.",
            isBest: false,
            metricEffects: {
              projectHealth: 2,
              teamMorale: -12,
              stakeholderSatisfaction: -6,
              deliveryFocus: -10,
            },
          },
        ],
      },
      {
        roundNumber: 2,
        phase: "Critical Path & Vendor",
        scenario:
          "Dış vendor API entegrasyonlarını iki hafta geciktirir. Donanım ekibi beklemektedir, test laboratuvarı rezervasyonu pahalıdır ve Critical Path üzerindeki entegrasyon fazı tehlikededir.",
        options: [
          {
            text: "Ek maliyetle paralel bir test ortamı kur, vendor gecikmesini izole et ve donanım ekibinin doğrulama işlerini kısmen ilerlet.",
            score: 25,
            feedback:
              "Pahalı ama dengeli bir karar. Bütçe baskısı artar; buna rağmen Critical Path üzerindeki beklemeyi azaltır, vendor bağımlılığını görünür kılar ve test ekibinin tamamen boşa düşmesini engeller.",
            learningNote:
              "Critical Path riski yalnızca takvim kayması değildir; bekleyen uzman ekiplerin maliyeti de projeye zarar verir. Paralel ortam, maliyet karşılığında teslimat esnekliği yaratır.",
            isBest: true,
            metricEffects: {
              projectHealth: 12,
              teamMorale: 6,
              stakeholderSatisfaction: 6,
              deliveryFocus: 14,
            },
          },
          {
            text: "Vendor teslim edene kadar projeyi resmi olarak dondur ve tüm ekipleri başka işlere yönlendir.",
            score: 10,
            feedback:
              "Resmi dondurma mali disiplini koruyabilir; ancak yeniden başlatma maliyeti, kaynak kaybı ve yönetim güveni açısından ağır bir bedel üretir.",
            learningNote:
              "Vendor bağımlılığı güçlü olduğunda proje dondurma meşru bir seçenek olabilir; fakat Critical Path dışındaki doğrulama ve hazırlık işleri ayrıştırılmadan uygulanırsa teslimat odağı kaybolur.",
            isBest: false,
            metricEffects: {
              projectHealth: 2,
              teamMorale: -10,
              stakeholderSatisfaction: -10,
              deliveryFocus: -12,
            },
          },
          {
            text: "Vendor gecikmesini yönetimden sakla, test takvimini içeride yeniden düzenle ve resmi raporu değiştirme.",
            score: -15,
            feedback:
              "Bu karar raporlamayı kısa süreli temiz gösterir; fakat Critical Path riski gizlendiği için sponsor karar alamaz ve gecikme daha pahalı bir aşamada ortaya çıkar.",
            learningNote:
              "Waterfall raporlamasında kırmızı riskleri saklamak, planı korumaz; karar mekanizmasını körleştirir ve gecikmeyi kurumsal güven problemine dönüştürür.",
            isBest: false,
            metricEffects: {
              projectHealth: -24,
              teamMorale: -8,
              stakeholderSatisfaction: -20,
              deliveryFocus: -16,
            },
          },
          {
            text: "Vendor sözleşmesine ceza maddesi uygula, ancak teknik alternatif hazırlamadan teslimatı bekle.",
            score: 5,
            feedback:
              "Ticari baskı kuruyorsun ama teknik plan üretmiyorsun. Ceza maddesi mali zararı azaltabilir; teslimat bağımlılığını tek başına çözmez.",
            learningNote:
              "Tedarikçi yönetimi hukuki baskıdan ibaret değildir; Critical Path üzerindeki teknik bağımlılıklar için paralel doğrulama veya alternatif entegrasyon stratejisi gerekir.",
            isBest: false,
            metricEffects: {
              projectHealth: -6,
              teamMorale: -4,
              stakeholderSatisfaction: 2,
              deliveryFocus: -8,
            },
          },
        ],
      },
      {
        roundNumber: 3,
        phase: "Deployment/Cutover",
        scenario:
          "Go-live hafta sonunda hesap bakiyesi migrasyonunda veri uyuşmazlığı çıkar. Cutover penceresi daralıyor, operasyon ekibi baskı altında ve yönetim canlıya geçişin ertelenmesini istemiyor.",
        options: [
          {
            text: "Rollback planını anında işlet, veri uyuşmazlığını izole et ve Go-live kararını resmi kriz kuruluna taşı.",
            score: 25,
            feedback:
              "Zor ama profesyonel karar. Go-live gecikebilir; ancak müşteri hesap bütünlüğünü ve denetim savunmasını korursun. Kriz kuruluna taşımak kararı kişisel inisiyatiften çıkarır.",
            learningNote:
              "Cutover sırasında veri bütünlüğü şüphesi varsa teslimat hızı ikinci plandadır. Rollback planı, kullanılmadığında değil doğru anda kullanıldığında değer üretir.",
            isBest: true,
            metricEffects: {
              projectHealth: 16,
              teamMorale: 4,
              stakeholderSatisfaction: 8,
              deliveryFocus: 6,
            },
          },
          {
            text: "Uyuşmazlığı küçük kabul edip Go-live'a devam et, düzeltmeyi canlı ortamda operasyon ekibine bırak.",
            score: -20,
            feedback:
              "Core banking ortamında küçük veri farkı bile müşteri güveni ve regülasyon açısından kritik olabilir. Canlı ortamda düzeltme, hatanın yayılma alanını büyütür.",
            learningNote:
              "Finansal sistemlerde veri uyuşmazlığı yalnızca teknik hata değildir; müşteri varlığı, denetim izi ve itibar riski taşır.",
            isBest: false,
            metricEffects: {
              projectHealth: -28,
              teamMorale: -12,
              stakeholderSatisfaction: -24,
              deliveryFocus: -10,
            },
          },
          {
            text: "Sadece problemli müşteri segmentini dışarıda bırakıp kısmi Go-live yap, fakat Acceptance Criteria güncellemesini ertele.",
            score: 5,
            feedback:
              "Kısmi geçiş teknik olarak cazip görünebilir; ancak Acceptance Criteria ve kapsam onayı güncellenmeden yapılırsa denetimde savunması zayıf kalır.",
            learningNote:
              "Kısmi Go-live ancak kapsam, kabul kriteri ve operasyon prosedürü resmi olarak güncellendiğinde güvenli bir geçiş stratejisi olabilir.",
            isBest: false,
            metricEffects: {
              projectHealth: -8,
              teamMorale: 2,
              stakeholderSatisfaction: -6,
              deliveryFocus: 4,
            },
          },
          {
            text: "Teknik ekibe gece boyunca manuel düzeltme yaptır, sabah yönetim toplantısından önce Go-live raporunu yeşile çek.",
            score: -10,
            feedback:
              "Manuel müdahale kısa vadede ilerleme hissi verir; fakat yorgun ekip, zayıf denetim izi ve doğrulanmamış veri düzeltmeleri yeni hata zinciri oluşturabilir.",
            learningNote:
              "Yüksek riskli Waterfall teslimatlarında kahramanca manuel düzeltme yerine kontrollü rollback, kanıt ve resmi karar mekanizması tercih edilmelidir.",
            isBest: false,
            metricEffects: {
              projectHealth: -18,
              teamMorale: -20,
              stakeholderSatisfaction: -8,
              deliveryFocus: -6,
            },
          },
        ],
      },
    ],
  },
  {
    id: "autonomous-vehicle-ai-software",
    title: "Autonomous Vehicle AI Software",
    description:
      "Safety-critical Agile teslimat, Velocity baskısı, cross-functional bağımlılıklar ve Definition of Done disiplini.",
    methodology: "Agile",
    isAdvanced: true,
    briefing: {
      scenario:
        "Otonom araç yazılımı geliştiren bir ekipte Agile proje liderisin. Ürün radar simülasyonu, AI model doğrulaması ve gömülü sistem entegrasyonundan oluşuyor.\n\nSaha testi tarihi yaklaşırken Product Owner pazara hızlı çıkmak istiyor; teknik ekip ise güvenlik eşiği, veri kalitesi ve Definition of Done konularında ciddi çekinceler taşıyor.",
      stakes:
        "Doğru Agile kararlar ürün güvenliğini korurken öğrenme hızını sürdürebilir. Yanlış kararlar ise teknik borç, güvenlik açığı, saha testi başarısızlığı ve ekipler arası güven kaybı yaratabilir.",
      rules: defaultBriefingRules,
    },
    rounds: [
      {
        roundNumber: 1,
        phase: "Velocity vs Quality",
        scenario:
          "Field test öncesi radar simülasyonunda teknik bug'lar çıkar ve Velocity düşer. Product Owner testi ertelemek istemez, çünkü müşteri temsilcileri sahada hazır beklemektedir.",
        options: [
          {
            text: "Technical debt oluşturmamak için test kapsamını daralt, Product Owner ile açık çatışmayı göze al ve güvenlik açısından belirsiz modülü Sprint dışına çıkar.",
            score: 25,
            feedback:
              "En dengeli karar. Kısa vadede paydaş gerilimi yaratır; ancak Agile hızını güvenlik kalitesinden ayırır ve teknik borcun safety-critical alanda büyümesini engeller.",
            learningNote:
              "Agile ekipler değişime açıktır, fakat safety-critical ürünlerde Velocity kalite kapılarını aşmak için kullanılmaz. Sprint kapsamı daraltmak bazen en profesyonel teslimat kararıdır.",
            isBest: true,
            metricEffects: {
              projectHealth: 16,
              teamMorale: 8,
              stakeholderSatisfaction: -4,
              deliveryFocus: 10,
            },
          },
          {
            text: "Bug'ları known issue olarak işaretle, field test kapsamını değiştirmeden Velocity raporunu koru.",
            score: -15,
            feedback:
              "Velocity görünümü korunur ama güvenlik riski sahaya taşınır. Known issue etiketi, safety-critical doğrulama eksikliğini meşrulaştırmaz.",
            learningNote:
              "Agile şeffaflık yalnızca riskleri listelemek değildir; risk kabul edilemez seviyedeyse kapsam, tarih veya Definition of Done yeniden ele alınmalıdır.",
            isBest: false,
            metricEffects: {
              projectHealth: -26,
              teamMorale: -8,
              stakeholderSatisfaction: 4,
              deliveryFocus: -14,
            },
          },
          {
            text: "Ekibi hafta sonu çalıştırarak radar bug'larını kapatmaya zorla ve saha testini aynı kapsamla sürdür.",
            score: 0,
            feedback:
              "Teslimat baskısını ekibe yıkıyorsun. Karmaşık simülasyon hatalarında yorgunluk daha fazla yanlış pozitif ve yanlış negatif test sonucuna yol açabilir.",
            learningNote:
              "Agile sürdürülebilir hız, özellikle AI ve gömülü sistemlerde kalite sinyalinin güvenilirliği için gereklidir; fazla mesai teknik belirsizliği otomatik çözmez.",
            isBest: false,
            metricEffects: {
              projectHealth: -10,
              teamMorale: -24,
              stakeholderSatisfaction: 2,
              deliveryFocus: 4,
            },
          },
          {
            text: "Saha testini tamamen iptal et, ancak hangi hipotezlerin test edilemeyeceğini paydaşlara açıklama.",
            score: 5,
            feedback:
              "Güvenliği koruma niyeti doğru; fakat öğrenme hedefleri ve iptal gerekçesi şeffaf paylaşılmadığında Agile geri bildirim döngüsü zarar görür.",
            learningNote:
              "Agile'da test iptali bile öğrenme üretmelidir; hangi hipotezin neden ertelendiği açıkça paylaşılmazsa Continuous Feedback zayıflar.",
            isBest: false,
            metricEffects: {
              projectHealth: 4,
              teamMorale: -2,
              stakeholderSatisfaction: -18,
              deliveryFocus: -8,
            },
          },
        ],
      },
      {
        roundNumber: 2,
        phase: "Cross-Functional Conflict",
        scenario:
          "AI veri etiketleme ekibi ile Embedded sistem ekibi arasında dependency sorunu Sprint'i kilitler. AI ekibi veri formatının değiştiğini, Embedded ekip ise interface kararının Sprint başında netleştiğini savunur.",
        options: [
          {
            text: "İki ekibi kısa bir teknik workshop'a al, interface sözleşmesini aynı gün netleştir ve kritik parçayı pair-programming ile doğrulat.",
            score: 25,
            feedback:
              "Güçlü ve yoğun bir müdahale. Kısa vadede ekipleri zorlar; ancak dependency kilidini soyut tartışmadan çıkarıp çalışan entegrasyon kanıtına dönüştürür.",
            learningNote:
              "Cross-functional Agile ekiplerde bağımlılık sorunu bazen toplantı notuyla değil, ortak teknik artefact ve hızlı entegrasyon deneyiyle çözülür.",
            isBest: true,
            metricEffects: {
              projectHealth: 14,
              teamMorale: 4,
              stakeholderSatisfaction: 6,
              deliveryFocus: 16,
            },
          },
          {
            text: "Sorunu Scrum Master'a devret, ekiplerin Sprint sonunda retrospective içinde kök neden analizi yapmasını bekle.",
            score: 0,
            feedback:
              "Retrospective öğrenme için değerlidir; fakat Sprint'i kilitleyen canlı dependency problemi için çok geç kalır. Akış dururken yalnızca süreç ritüeline yaslanmak yeterli değildir.",
            learningNote:
              "Agile seremonileri problemi saklamak için değil, doğru anda doğru müdahaleyi seçmek için kullanılır; aktif bağımlılık kilidi hızlı koordinasyon ister.",
            isBest: false,
            metricEffects: {
              projectHealth: -12,
              teamMorale: -6,
              stakeholderSatisfaction: -4,
              deliveryFocus: -16,
            },
          },
          {
            text: "Embedded ekibin interface kararını tek doğru kabul et, AI ekibinden veri etiketlerini gece içinde yeniden üretmesini iste.",
            score: -10,
            feedback:
              "Tek taraflı karar dependency sorununu hızlı çözer gibi görünür; ancak veri kalitesi, model güvenilirliği ve ekip güveni üzerinde ağır hasar bırakır.",
            learningNote:
              "Agile liderlik teknik çatışmada hakemlik yaparken veri kalitesi ve sistem entegrasyonunu birlikte değerlendirir; tek ekibi ezmek sürdürülebilir çözüm değildir.",
            isBest: false,
            metricEffects: {
              projectHealth: -18,
              teamMorale: -22,
              stakeholderSatisfaction: 0,
              deliveryFocus: -8,
            },
          },
          {
            text: "Dependency çözülene kadar Sprint hedefini değiştirme, ekiplerin kendi Backlog maddelerini ayrı ayrı tamamlamasını iste.",
            score: 5,
            feedback:
              "Bireysel Backlog ilerlemesi görünebilir; ancak entegre değer üretmeyen işler Sprint sonunda çalışır ürün sağlamaz. Delivery Focus metrikte yanıltıcı biçimde iyi görünebilir.",
            learningNote:
              "Agile teslimatta yerel verimlilik, entegre ürün değerinin yerine geçmez. Dependency kilidi çözülmeden tamamlanan işler gerçek Sprint başarısı sayılmayabilir.",
            isBest: false,
            metricEffects: {
              projectHealth: -8,
              teamMorale: 0,
              stakeholderSatisfaction: -6,
              deliveryFocus: 2,
            },
          },
        ],
      },
      {
        roundNumber: 3,
        phase: "Definition of Done & Safety",
        scenario:
          "Demo aşamasında özellik çalışır görünür; ancak safety-critical Definition of Done kontrolleri yüzde 100 tamamlanmamıştır. Sponsor ekip demoda başarı mesajı vermeni ister.",
        options: [
          {
            text: "Özelliğin çalıştığını göster, fakat DoD karşılanmadığını açıkça söyle ve Sprint'i safety açısından başarısız kabul et.",
            score: 25,
            feedback:
              "Zor ama doğruya en yakın karar. Demo değerini tamamen yok etmiyorsun; ancak safety-critical DoD tamamlanmadan başarı ilan etmeyerek ürün güvenilirliğini koruyorsun.",
            learningNote:
              "Agile demo çalışan yazılımı gösterir; fakat Definition of Done özellikle güvenlik alanında pazarlık konusu değildir. Başarısız Sprint bazen doğru öğrenme çıktısıdır.",
            isBest: true,
            metricEffects: {
              projectHealth: 18,
              teamMorale: 6,
              stakeholderSatisfaction: -2,
              deliveryFocus: 8,
            },
          },
          {
            text: "Demo başarılı mesajı ver, eksik safety testlerini Sprint sonrasında teknik ekip içinde kapat.",
            score: -20,
            feedback:
              "Bu karar paydaş beklentisini kısa vadede yönetir; ancak DoD ihlali gizlenir ve safety-critical ürün güvenliği güven ilişkisine bağlı bir varsayıma dönüşür.",
            learningNote:
              "Definition of Done tamamlanmadan başarı ilan etmek Agile şeffaflığı bozar; güvenlik testleri sonradan kapatılacak teknik detay gibi ele alınamaz.",
            isBest: false,
            metricEffects: {
              projectHealth: -28,
              teamMorale: -10,
              stakeholderSatisfaction: 8,
              deliveryFocus: -18,
            },
          },
          {
            text: "Demoyu iptal et, güvenlik testleri bitene kadar hiçbir ara çıktı paylaşma.",
            score: 5,
            feedback:
              "Güvenlik hassasiyeti doğru; ancak tüm görünürlüğü kapatmak Continuous Feedback fırsatını yok eder. Paydaşlar çalışan kısım ile riskli kısım arasındaki ayrımı göremez.",
            learningNote:
              "Agile şeffaflığı, eksikliği saklamadan öğrenme üretmektir. Demo iptali yerine kapsamı ve riskleri açıkça çerçevelemek daha olgun bir yaklaşımdır.",
            isBest: false,
            metricEffects: {
              projectHealth: 6,
              teamMorale: -4,
              stakeholderSatisfaction: -16,
              deliveryFocus: -8,
            },
          },
          {
            text: "DoD kriterlerini demo sonrasında yeniden tanımla ve mevcut sonucu tamamlanmış kabul et.",
            score: -15,
            feedback:
              "Kriterleri sonuçtan sonra değiştirmek güvenlik kültürünü zedeler. Bu yöntem hız kazandırmaz; kalite kapısını siyasi bir araca dönüştürür.",
            learningNote:
              "Definition of Done Sprint başlamadan önce güvenilir bir anlaşma olmalıdır. Sonuç çıktıktan sonra gevşetilen DoD, Agile ölçüm sistemini bozar.",
            isBest: false,
            metricEffects: {
              projectHealth: -24,
              teamMorale: -8,
              stakeholderSatisfaction: -6,
              deliveryFocus: -12,
            },
          },
        ],
      },
    ],
  },
  {
    id: "nuclear-power-plant-scada-upgrade",
    title: "Nuclear Power Plant SCADA Upgrade",
    description:
      "Nükleer tesis SCADA modernizasyonunda Change Control Board, FAT, sözleşme belirsizliği ve handover riskleri.",
    methodology: "Waterfall",
    isAdvanced: true,
    briefing: {
      scenario:
        "Nükleer güç santralinde SCADA sisteminin yükseltilmesini yöneten proje liderisin. Proje Waterfall disiplininde ilerliyor; gereksinimler sıkı dokümante edilmiş, test fazları resmi kabul kapılarına bağlı ve güvenlik kültürü en yüksek öncelik.\n\nTeknik doğruluk kadar izlenebilir karar alma, resmi onay, eğitim ve operasyonel devralma da kritik önem taşıyor.",
      stakes:
        "Doğru kararlar tesis güvenliğini, denetim izini ve operasyonel kabulü korur. Yanlış kararlar ise lisanslama riski, sözleşme anlaşmazlığı, kabul gecikmesi ve güvenlik kültürünün zayıflamasıyla sonuçlanabilir.",
      rules: defaultBriefingRules,
    },
    rounds: [
      {
        roundNumber: 1,
        phase: "Change Management Crisis",
        scenario:
          "FAT aşamasında paydaş, güvenlik dışı ama büyük bir UI değişikliği ister. Değişiklik operatör ekranlarının yerleşimini etkiler, eğitim materyallerini geçersiz kılar ve teslim tarihine baskı oluşturur.",
        options: [
          {
            text: "Resmi Change Control Board sürecini tavizsiz işlet, etki analizi tamamlanmadan UI değişikliğini FAT kapsamına alma.",
            score: 20,
            feedback:
              "En güçlü seçenek. Paydaş memnuniyeti kısa vadede düşebilir; ancak CCB süreci Requirements, eğitim, test ve kabul etkilerini görünür kılar.",
            learningNote:
              "Yüksek güvenlikli Waterfall projelerde güvenlik dışı değişiklikler bile operasyonel güvenliği etkileyebilir. CCB, bürokrasi değil risk kontrol mekanizmasıdır.",
            isBest: true,
            metricEffects: {
              projectHealth: 16,
              teamMorale: 2,
              stakeholderSatisfaction: -4,
              deliveryFocus: 10,
            },
          },
          {
            text: "Paydaşı memnun etmek için UI değişikliğini hızlıca uygula ve FAT raporuna küçük iyileştirme olarak yaz.",
            score: -20,
            feedback:
              "Bu yaklaşım değişikliğin gerçek etkisini saklar. UI değişikliği eğitim, operasyon prosedürü ve test kanıtlarını etkilediği için küçük iyileştirme sayılamaz.",
            learningNote:
              "SCADA gibi kritik sistemlerde UI değişikliği insan faktörü riskidir; Change Request küçümsenirse kabul kanıtı ve güvenlik kültürü zarar görür.",
            isBest: false,
            metricEffects: {
              projectHealth: -28,
              teamMorale: -8,
              stakeholderSatisfaction: 8,
              deliveryFocus: -16,
            },
          },
          {
            text: "Değişikliği tamamen reddet, ancak teknik gerekçe ve alternatif karar yolu sunma.",
            score: 0,
            feedback:
              "Kapsamı koruyorsun; fakat paydaş talebini açıklamasız kapatmak güveni azaltır. Güçlü Waterfall yönetimi reddi de kanıt ve süreçle açıklar.",
            learningNote:
              "Change Control Board yalnızca onay mekanizması değildir; reddedilen talepler için de izlenebilir gerekçe ve alternatif plan üretir.",
            isBest: false,
            metricEffects: {
              projectHealth: 4,
              teamMorale: 0,
              stakeholderSatisfaction: -18,
              deliveryFocus: 6,
            },
          },
          {
            text: "UI değişikliğini ayrı bir faza taşı, fakat eğitim ve Acceptance Criteria etkisini analiz etmeden takvime ekle.",
            score: 5,
            feedback:
              "Değişikliği mevcut FAT kapsamından ayırmak doğruya yakın; ancak etki analizi olmadan yeni faz eklemek aynı belirsizliği sonraki aşamaya taşır.",
            learningNote:
              "Waterfall faz ayrımı ancak Requirements, eğitim, test ve kabul etkileri birlikte güncellendiğinde gerçek kontrol sağlar.",
            isBest: false,
            metricEffects: {
              projectHealth: -4,
              teamMorale: 2,
              stakeholderSatisfaction: 2,
              deliveryFocus: -6,
            },
          },
        ],
      },
      {
        roundNumber: 2,
        phase: "Requirement Ambiguity",
        scenario:
          "Şartnamedeki bir maddenin yoruma açık olduğu fark edilir. Vendor bu maddenin kapsam dışı olduğunu savunur, hukuk ekipleri devreye girmek üzeredir ve test fazı beklemeye başlamıştır.",
        options: [
          {
            text: "Vendor ile win-win sözleşme addendum'u için teknik taviz ver, kritik güvenlik etkisi olmayan alt kapsamı sadeleştir ve yoruma açık maddeyi netleştir.",
            score: 25,
            feedback:
              "Olgun bir trade-off. Her şeyi kazanmazsın; fakat hukuki çatışmayı azaltır, test fazını yeniden başlatır ve güvenlik açısından kritik olmayan alanda kontrollü taviz verirsin.",
            learningNote:
              "Waterfall sözleşmelerinde belirsizlik tamamen teknik zaferle çözülmeyebilir. Güvenlik etkisi ayrıştırılmış addendum, teslimat ve ilişki yönetimi arasında denge kurar.",
            isBest: true,
            metricEffects: {
              projectHealth: 12,
              teamMorale: 4,
              stakeholderSatisfaction: 10,
              deliveryFocus: 12,
            },
          },
          {
            text: "Hukuk sürecini başlat, teknik ekipleri beklemeye al ve vendor teslimatını tümden durdur.",
            score: 5,
            feedback:
              "Sözleşme hakkını koruyabilir; ancak tüm teknik akışı durdurmak test penceresini ve ekip moralini zedeler. Hukuki süreç teknik ayrıştırmayla birlikte yürütülebilirdi.",
            learningNote:
              "Sözleşme belirsizliğinde hukuk önemlidir, fakat Critical Path üzerindeki teknik işlerin tamamını durdurmak çoğu zaman maliyeti büyütür.",
            isBest: false,
            metricEffects: {
              projectHealth: 0,
              teamMorale: -12,
              stakeholderSatisfaction: -6,
              deliveryFocus: -14,
            },
          },
          {
            text: "Vendor yorumunu kabul et, Requirements matrisini geriye dönük değiştir ve test ekibine yeni kapsamı bildirmeden ilerle.",
            score: -20,
            feedback:
              "Bu karar görünürde çatışmayı bitirir; ancak geriye dönük kapsam değişikliği denetim izini bozar ve test ekibini yanlış kabul kriterleriyle çalıştırır.",
            learningNote:
              "Requirements matrisi geriye dönük sessizce değiştirilemez; Waterfall izlenebilirliği, kararların ne zaman ve kim tarafından onaylandığını kanıtlamalıdır.",
            isBest: false,
            metricEffects: {
              projectHealth: -26,
              teamMorale: -8,
              stakeholderSatisfaction: -12,
              deliveryFocus: -10,
            },
          },
          {
            text: "Belirsiz maddeyi teknik ekibin yorumuyla kesinleştir, vendor ve sponsor onayını daha sonra toplamayı planla.",
            score: 0,
            feedback:
              "Teknik netlik üretirsin; ancak resmi onay olmadan yapılan yorum ileride sözleşme ve kabul anlaşmazlığını daha da büyütebilir.",
            learningNote:
              "Waterfall projelerde teknik yorum tek başına yeterli değildir; belirsiz Requirements maddeleri sponsor, vendor ve kabul otoritesiyle hizalanmalıdır.",
            isBest: false,
            metricEffects: {
              projectHealth: -10,
              teamMorale: 2,
              stakeholderSatisfaction: -10,
              deliveryFocus: 0,
            },
          },
        ],
      },
      {
        roundNumber: 3,
        phase: "Final Acceptance & Handover",
        scenario:
          "Tesis yönetimi personeli yeni sistemi karmaşık bulur ve Go-live onayını imzalamaktan çekinir. Teknik kabul testleri geçmiştir, ancak operasyon ekibi gece vardiyasında hata yapmaktan endişe etmektedir.",
        options: [
          {
            text: "Bütçeden yiyerek ekstra eğitim ve shadowing fazı ekle, Go-live onayını operasyonel yeterlilik kanıtı tamamlanana kadar koşullu tut.",
            score: 25,
            feedback:
              "Maliyetli ama sağlam bir karar. Teknik kabulü operasyonel kabulden ayırmıyorsun; kullanıcı güveni ve tesis güvenliği için ek geçiş desteği sağlıyorsun.",
            learningNote:
              "Final Acceptance yalnızca sistemin çalışması değildir; operatörün güvenle devralması da teslimatın parçasıdır. Shadowing fazı bütçe yer ama Go-live riskini azaltır.",
            isBest: true,
            metricEffects: {
              projectHealth: 14,
              teamMorale: 6,
              stakeholderSatisfaction: 10,
              deliveryFocus: 6,
            },
          },
          {
            text: "Teknik kabul geçtiği için yönetimden imza al, operatör eğitimini Go-live sonrasına bırak.",
            score: -15,
            feedback:
              "Teknik olarak teslimatı kapatmış görünürsün; ancak kullanıcı hazırlığı eksikse canlı operasyonda hata riski artar ve kabul imzası güvenilirliğini kaybeder.",
            learningNote:
              "Yüksek güvenlikli sistemlerde handover, teknik Acceptance Criteria kadar insan faktörü ve operasyon prosedürleriyle de ölçülür.",
            isBest: false,
            metricEffects: {
              projectHealth: -22,
              teamMorale: -8,
              stakeholderSatisfaction: -14,
              deliveryFocus: -6,
            },
          },
          {
            text: "Go-live'ı süresiz ertele ve eğitim programı tamamen yeniden tasarlanana kadar proje kapanışını durdur.",
            score: 5,
            feedback:
              "Operasyonel riski ciddiye alıyorsun; fakat süresiz erteleme sponsor güvenini ve proje kapanış disiplinini zedeler. Ölçülebilir bir shadowing planı daha güçlü olurdu.",
            learningNote:
              "Risk azaltma açık uçlu olmamalıdır. Waterfall kapanışında ek fazlar süre, kapsam ve başarı kriteriyle tanımlanmalıdır.",
            isBest: false,
            metricEffects: {
              projectHealth: 2,
              teamMorale: -6,
              stakeholderSatisfaction: -8,
              deliveryFocus: -16,
            },
          },
          {
            text: "Operasyon ekibinin endişesini iletişim sorunu say, proje ekibinden daha basit bir sunum hazırlamasını iste.",
            score: 0,
            feedback:
              "Sunum yardımcı olabilir; fakat gerçek sorun vardiya güveni, prosedür alışkanlığı ve sistem karmaşıklığıysa tek yönlü anlatım yeterli olmaz.",
            learningNote:
              "Handover riski yalnızca iletişim problemi değildir; kullanıcı yeterliliği, pratik deneyim ve destek modeliyle birlikte yönetilmelidir.",
            isBest: false,
            metricEffects: {
              projectHealth: -8,
              teamMorale: -2,
              stakeholderSatisfaction: -6,
              deliveryFocus: -4,
            },
          },
        ],
      },
    ],
  },
];
