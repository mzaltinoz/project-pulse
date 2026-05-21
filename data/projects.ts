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
      "MVP kapsamını koruyarak hızlı öğrenme, backlog önceliklendirme ve sprint riski yönetimi.",
    methodology: "Agile",
    briefing: {
      scenario:
        "Yeni kurulan bir teknoloji girişiminin ilk ürün sürümünden sen sorumlusun. Şirket yatırımcı sunumuna yalnızca birkaç hafta uzaklıkta. Kurucu ekip sürekli yeni fikirler eklemek istiyor, geliştirici ekip ise sprint kapsamının kontrolden çıktığını söylüyor.\n\nCEO dün gece sana mesaj attı:\n'Bu MVP yetişmezse yatırım turunu kaybedebiliriz.'\n\nMüşterilerden gelen geri bildirimler her gün değişiyor. Takım senden net öncelikler ve hızlı kararlar bekliyor.",
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
              "In Agile projects, defining the MVP keeps learning fast and prevents uncontrolled scope creep.",
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
              "In Agile projects, adding every request to the same release usually lowers focus and weakens iteration quality.",
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
              "Agile teams balance technical judgment with stakeholder collaboration so priorities stay transparent.",
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
              "Backlog prioritization helps Agile teams deliver value now while preserving future options.",
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
        scenario: "Ekip sprintte fazla iş aldı ve yetişemiyor.",
        options: [
          {
            text: "Herkesten hafta sonu çalışmasını iste.",
            score: 10,
            feedback:
              "Kısa vadede işe yarayabilir ama sürdürülebilirlik ve moral zarar görebilir.",
            learningNote:
              "Sustainable pace is central to Agile delivery because burnout reduces future velocity.",
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
              "Daily inspection helps Agile teams surface blockers before they become delivery risks.",
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
              "In Agile projects, protecting sprint scope helps maintain team velocity and prevents uncontrolled scope creep.",
            isBest: true,
            metricEffects: {
              projectHealth: 16,
              teamMorale: 18,
              stakeholderSatisfaction: 8,
              deliveryFocus: 18,
            },
          },
          {
            text: "Durumu gizleyip sprint sonunda açıkla.",
            score: 0,
            feedback:
              "Geç bilgi vermek riski büyütür. Sorunu erken görünür yapmak daha doğru olur.",
            learningNote:
              "Agile relies on transparency; hiding delivery risk removes the chance to adapt early.",
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
              "A demo should build trust; knowingly showing unstable work can damage stakeholder confidence.",
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
              "Agile stakeholder communication should explain tradeoffs instead of simply removing visibility.",
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
              "Transparent demo scoping keeps feedback loops alive while protecting product credibility.",
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
              "Agile teams can adapt demo scope to preserve value while managing urgent quality risks.",
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
    title: "Mobile App Sprint Crisis",
    description:
      "Sprint ortasında değişen backlog, düşen velocity ve demo kapsamı kararları.",
    methodology: "Agile",
    briefing: {
      scenario:
        "Mobil uygulama ekibi büyük demo haftasına girerken sprint planı bozulmaya başladı. Kritik özellikler hâlâ tamamlanmadı, QA ekibi bug listesinin büyüdüğünü söylüyor ve pazarlama departmanı son anda yeni talepler gönderiyor.\n\nÜrün yöneticisi sana şunu söyledi:\n'Bu demo başarısız olursa büyük müşteri anlaşmasını kaybedebiliriz.'\n\nTakım baskı altında ve herkes senden hangi işlerin gerçekten önemli olduğuna karar vermeni bekliyor.",
      stakes:
        "Doğru sprint yönetimi ekibi toparlayabilir ve müşteriyi etkileyebilir. Kötü kararlar ise velocity düşüşüne, teslimat krizine ve ekip motivasyonunun bozulmasına yol açabilir.",
      rules: defaultBriefingRules,
    },
    rounds: [
      {
        roundNumber: 1,
        phase: "Sprint Planning",
        scenario: "Product owner sprint ortasında yeni özellik eklemek istiyor.",
        options: [
          {
            text: "Özelliği sprint kapsamına ekleyip aynı hedefi koru.",
            score: 5,
            feedback:
              "Bu karar sprint hedefini şişirir ve teslim odağını zayıflatır.",
            learningNote:
              "Mid-sprint scope growth often weakens Agile predictability and increases delivery stress.",
            isBest: false,
            metricEffects: {
              projectHealth: -14,
              teamMorale: -16,
              stakeholderSatisfaction: 6,
              deliveryFocus: -14,
            },
          },
          {
            text: "Yeni isteği backlog'a alıp sonraki sprint için önceliklendir.",
            score: 30,
            feedback:
              "Sprint odağı korundu. Değişiklik isteği görünür ve yönetilebilir hale geldi.",
            learningNote:
              "Backlog management lets Agile teams welcome change without disrupting the current sprint goal.",
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
              "İyi karar. Tahmin ve takas sprint planını gerçekçi tutar.",
            learningNote:
              "Agile estimation supports scope tradeoffs when stakeholder needs shift during an iteration.",
            isBest: false,
            metricEffects: {
              projectHealth: 12,
              teamMorale: 10,
              stakeholderSatisfaction: 8,
              deliveryFocus: 14,
            },
          },
          {
            text: "Product owner ile konuşmadan isteği reddet.",
            score: 10,
            feedback:
              "Sınır koydun ama paydaş iletişimi olmadan karar güven kaybettirebilir.",
            learningNote:
              "Agile product decisions should involve the product owner so priority choices remain shared.",
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
        scenario: "Ekip velocity düşmeye başladı ve sprint hedefi risk altında.",
        options: [
          {
            text: "Retrospective beklemeden engeller için hızlı aksiyon al.",
            score: 25,
            feedback:
              "İyi seçim. Engelleri erken kaldırmak iteration akışını güçlendirir.",
            learningNote:
              "Removing blockers during the sprint helps protect flow and supports healthier velocity.",
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
              "Velocity is a planning signal, not a blame tool; misuse can damage team trust.",
            isBest: false,
            metricEffects: {
              projectHealth: -10,
              teamMorale: -22,
              stakeholderSatisfaction: -4,
              deliveryFocus: -8,
            },
          },
          {
            text: "Velocity trendini görünür yapıp sprint hedefini yeniden netleştir.",
            score: 30,
            feedback:
              "Doğru hamle. Gerçek kapasiteyle hedefi hizalamak sprint sağlığını korur.",
            learningNote:
              "Velocity management helps Agile teams adjust commitments based on evidence, not optimism.",
            isBest: true,
            metricEffects: {
              projectHealth: 18,
              teamMorale: 14,
              stakeholderSatisfaction: 6,
              deliveryFocus: 16,
            },
          },
          {
            text: "Eksik kalan işleri gizleyip sprint sonunda konuş.",
            score: 0,
            feedback:
              "Gecikmeyi saklamak paydaş iletişimini ve sprint güvenini zedeler.",
            learningNote:
              "Agile progress should be inspectable so the team can adapt before the sprint review.",
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
        scenario: "Demo öncesi bazı feature'lar tamamlanamadı.",
        options: [
          {
            text: "Tamamlanmayan feature'ları demo dışında bırakıp sebebini açıklama.",
            score: 10,
            feedback:
              "Demo sadeleşti ama iletişim eksikliği paydaş güvenini azaltır.",
            learningNote:
              "A sprint review should clarify what was learned, including why some work moved back to the backlog.",
            isBest: false,
            metricEffects: {
              projectHealth: 2,
              teamMorale: -2,
              stakeholderSatisfaction: -16,
              deliveryFocus: 6,
            },
          },
          {
            text: "Eksik feature'ları aceleyle tamamlatıp testleri atla.",
            score: 0,
            feedback:
              "Kalite riski büyür. Demo öncesi testleri atlamak güvenilirliği düşürür.",
            learningNote:
              "Agile speed should not remove quality checks; unfinished work belongs in the backlog.",
            isBest: false,
            metricEffects: {
              projectHealth: -22,
              teamMorale: -16,
              stakeholderSatisfaction: -10,
              deliveryFocus: -8,
            },
          },
          {
            text: "Stakeholder'lara demo kapsamını güncelleyen kısa bir not gönder.",
            score: 20,
            feedback:
              "İyi iletişim. Beklentiyi yönetir ama demo değerini de net göstermek gerekir.",
            learningNote:
              "Stakeholder communication is strongest when it pairs scope updates with visible working value.",
            isBest: false,
            metricEffects: {
              projectHealth: 8,
              teamMorale: 4,
              stakeholderSatisfaction: 12,
              deliveryFocus: 8,
            },
          },
          {
            text: "Tamamlanan akışı demo et, eksikleri backlog ve risk olarak paylaş.",
            score: 30,
            feedback:
              "Demo değeri korundu. Eksikler şeffaf biçimde backlog'a taşındı.",
            learningNote:
              "Agile demos should show completed value while openly moving unfinished work back into backlog planning.",
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
    title: "Factory Automation Delivery",
    description:
      "Gereksinim doğrulama, dokümantasyon uyumu ve kabul testi yönetimi.",
    methodology: "Waterfall",
    briefing: {
      scenario:
        "Bir fabrikanın otomasyon sistemi teslimatı için proje yöneticisi olarak görevlendirildin. Teknik gereksinimler yüzlerce sayfalık dokümanda tanımlı ve müşteri tüm acceptance kriterlerinin eksiksiz karşılanmasını bekliyor.\n\nFabrika müdürü toplantıda açıkça şunu söyledi:\n'Sistem teslim günü çalışmazsa üretim hattı durur.'\n\nMühendislik ekibi dokümantasyon değişikliklerinden şikâyet ediyor, müşteri ise her faz sonunda resmi onay görmek istiyor.",
      stakes:
        "Doğru planlama ve dokümantasyon teslimatı güvenli şekilde tamamlayabilir. Hatalı gereksinim yönetimi ise maliyet artışına, kabul testlerinin başarısız olmasına ve müşteri güveninin kaybedilmesine neden olabilir.",
      rules: defaultBriefingRules,
    },
    rounds: [
      {
        roundNumber: 1,
        phase: "Upfront Planning",
        scenario:
          "Müşteri tüm gereksinimleri proje başında netleştirmek istiyor.",
        options: [
          {
            text: "Gereksinim atölyesi yapıp kapsamı onaylı dokümana bağla.",
            score: 30,
            feedback:
              "Doğru karar. Waterfall akışında erken gereksinim doğrulama teslimatı güçlendirir.",
            learningNote:
              "In Waterfall projects, clarifying requirements early reduces late-stage rework and acceptance conflicts.",
            isBest: true,
            metricEffects: {
              projectHealth: 18,
              teamMorale: 6,
              stakeholderSatisfaction: 16,
              deliveryFocus: 16,
            },
          },
          {
            text: "Gereksinimleri hızlıca kabul edip tasarıma geç.",
            score: 5,
            feedback:
              "Eksik doğrulama sonraki fazlarda maliyetli değişikliklere yol açabilir.",
            learningNote:
              "Waterfall planning depends on validated requirements before design and delivery phases begin.",
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
              "Documented assumptions make Waterfall scope decisions auditable when requirements mature.",
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
              "Waterfall requirements should be validated with the customer, not inferred only by implementation teams.",
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
          "Donanım ve yazılım ekipleri farklı teknik dokümanlar kullanıyor.",
        options: [
          {
            text: "Her ekibin kendi dokümanıyla devam etmesine izin ver.",
            score: 0,
            feedback:
              "Bu yaklaşım fazlar arası uyumsuzluğu ve yeniden iş yapmayı artırır.",
            learningNote:
              "Waterfall delivery needs controlled documentation because separate sources create integration risk.",
            isBest: false,
            metricEffects: {
              projectHealth: -20,
              teamMorale: -10,
              stakeholderSatisfaction: -8,
              deliveryFocus: -14,
            },
          },
          {
            text: "Tek kaynak doküman oluşturup faz onayıyla ekipleri hizala.",
            score: 30,
            feedback:
              "Doğru karar. Ortak dokümantasyon entegrasyon riskini azaltır.",
            learningNote:
              "Phase approval and a single source of truth keep Waterfall teams aligned before implementation continues.",
            isBest: true,
            metricEffects: {
              projectHealth: 18,
              teamMorale: 8,
              stakeholderSatisfaction: 10,
              deliveryFocus: 16,
            },
          },
          {
            text: "Doküman farklarını change log ile takip et.",
            score: 20,
            feedback:
              "İyi hamle. Değişiklik izlenir ama tek kaynak yaklaşımı kadar güçlü değildir.",
            learningNote:
              "Change logs support traceability, but Waterfall teams still benefit from one approved baseline.",
            isBest: false,
            metricEffects: {
              projectHealth: 8,
              teamMorale: 4,
              stakeholderSatisfaction: 8,
              deliveryFocus: 10,
            },
          },
          {
            text: "Sadece kritik modüller için entegrasyon dokümanı hazırla.",
            score: 15,
            feedback:
              "Riskli alanları azaltır ama tüm teslimat için dokümantasyon boşlukları kalabilir.",
            learningNote:
              "Partial documentation can reduce immediate risk but may leave acceptance gaps in Waterfall projects.",
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
              "Waterfall change management protects delivery focus when new scope appears during acceptance.",
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
              "Acceptance conflicts need documented evidence plus a constructive path for change requests.",
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
              "Acceptance criteria help Waterfall teams separate agreed scope from new change requests.",
            isBest: false,
            metricEffects: {
              projectHealth: 12,
              teamMorale: 6,
              stakeholderSatisfaction: 14,
              deliveryFocus: 10,
            },
          },
          {
            text: "Eksikleri onaylı gereksinim matrisiyle karşılaştırıp change request aç.",
            score: 30,
            feedback:
              "Doğru Waterfall yaklaşımı. Kapsam, onay ve değişiklik yönetimi netleşti.",
            learningNote:
              "A requirements matrix gives Waterfall teams traceability for acceptance decisions and formal changes.",
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
