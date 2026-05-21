export type ProjectMethodology = "Agile" | "Waterfall";

export type ProjectOption = {
  text: string;
  score: number;
  feedback: string;
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

export type Project = {
  id: string;
  title: string;
  description: string;
  methodology: ProjectMethodology;
  rounds: ProjectRound[];
};

export const projects: Project[] = [
  {
    id: "startup-mvp",
    title: "Startup MVP Projesi",
    description:
      "MVP kapsamını koruyarak hızlı öğrenme, backlog önceliklendirme ve sprint riski yönetimi.",
    methodology: "Agile",
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
            text: "Sprint kapsamında takas yapıp en düşük öncelikli işi çıkar.",
            score: 30,
            feedback:
              "En sağlıklı seçim. Kapasiteye göre kapsam ayarlamak ekibi ve teslimatı korur.",
            isBest: true,
            metricEffects: {
              projectHealth: 16,
              teamMorale: 18,
              stakeholderSatisfaction: 8,
              deliveryFocus: 18,
            },
          },
          {
            text: "Herkesten hafta sonu çalışmasını iste.",
            score: 10,
            feedback:
              "Kısa vadede işe yarayabilir ama sürdürülebilirlik ve moral zarar görebilir.",
            isBest: false,
            metricEffects: {
              projectHealth: -6,
              teamMorale: -20,
              stakeholderSatisfaction: 4,
              deliveryFocus: 8,
            },
          },
          {
            text: "Durumu gizleyip sprint sonunda açıkla.",
            score: 0,
            feedback:
              "Geç bilgi vermek riski büyütür. Sorunu erken görünür yapmak daha doğru olur.",
            isBest: false,
            metricEffects: {
              projectHealth: -18,
              teamMorale: -12,
              stakeholderSatisfaction: -16,
              deliveryFocus: -10,
            },
          },
          {
            text: "Günlük toplantıda engelleri netleştirip yardım iste.",
            score: 20,
            feedback:
              "İyi hamle. Ekip engelleri erken paylaşırsa çözüm şansı artar.",
            isBest: false,
            metricEffects: {
              projectHealth: 8,
              teamMorale: 14,
              stakeholderSatisfaction: 2,
              deliveryFocus: 8,
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
            text: "Bugu önceliklendir, demo kapsamından riskli bölümü çıkar.",
            score: 30,
            feedback:
              "Doğru karar. Demo değerini korurken kritik kalite riskini azaltırsın.",
            isBest: true,
            metricEffects: {
              projectHealth: 20,
              teamMorale: 8,
              stakeholderSatisfaction: 10,
              deliveryFocus: 12,
            },
          },
          {
            text: "Bugu görmezden gel ve demoya aynen devam et.",
            score: 0,
            feedback:
              "Kritik hata demoda güven kaybına yol açabilir. Risk saklanmamalı.",
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
            isBest: false,
            metricEffects: {
              projectHealth: 14,
              teamMorale: 6,
              stakeholderSatisfaction: 16,
              deliveryFocus: 8,
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
    rounds: [
      {
        roundNumber: 1,
        phase: "Sprint Planning",
        scenario: "Product owner sprint ortasında yeni özellik eklemek istiyor.",
        options: [
          {
            text: "Yeni isteği backlog'a alıp sonraki sprint için önceliklendir.",
            score: 30,
            feedback:
              "Sprint odağı korundu. Değişiklik isteği görünür ve yönetilebilir hale geldi.",
            isBest: true,
            metricEffects: {
              projectHealth: 16,
              teamMorale: 12,
              stakeholderSatisfaction: 8,
              deliveryFocus: 18,
            },
          },
          {
            text: "Özelliği sprint kapsamına ekleyip aynı hedefi koru.",
            score: 5,
            feedback:
              "Bu karar sprint hedefini şişirir ve teslim odağını zayıflatır.",
            isBest: false,
            metricEffects: {
              projectHealth: -14,
              teamMorale: -16,
              stakeholderSatisfaction: 6,
              deliveryFocus: -14,
            },
          },
          {
            text: "Ekipten hızlıca tahmin alıp kapsam takası öner.",
            score: 25,
            feedback:
              "İyi karar. Tahmin ve takas sprint planını gerçekçi tutar.",
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
            text: "Velocity trendini görünür yapıp sprint hedefini yeniden netleştir.",
            score: 30,
            feedback:
              "Doğru hamle. Gerçek kapasiteyle hedefi hizalamak sprint sağlığını korur.",
            isBest: true,
            metricEffects: {
              projectHealth: 18,
              teamMorale: 14,
              stakeholderSatisfaction: 6,
              deliveryFocus: 16,
            },
          },
          {
            text: "Retrospective beklemeden engeller için hızlı aksiyon al.",
            score: 25,
            feedback:
              "İyi seçim. Engelleri erken kaldırmak iteration akışını güçlendirir.",
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
            isBest: false,
            metricEffects: {
              projectHealth: -10,
              teamMorale: -22,
              stakeholderSatisfaction: -4,
              deliveryFocus: -8,
            },
          },
          {
            text: "Eksik kalan işleri gizleyip sprint sonunda konuş.",
            score: 0,
            feedback:
              "Gecikmeyi saklamak paydaş iletişimini ve sprint güvenini zedeler.",
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
            text: "Tamamlanan akışı demo et, eksikleri backlog ve risk olarak paylaş.",
            score: 30,
            feedback:
              "Demo değeri korundu. Eksikler şeffaf biçimde backlog'a taşındı.",
            isBest: true,
            metricEffects: {
              projectHealth: 16,
              teamMorale: 10,
              stakeholderSatisfaction: 14,
              deliveryFocus: 12,
            },
          },
          {
            text: "Tamamlanmayan feature'ları demo dışında bırakıp sebebini açıklama.",
            score: 10,
            feedback:
              "Demo sadeleşti ama iletişim eksikliği paydaş güvenini azaltır.",
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
            isBest: false,
            metricEffects: {
              projectHealth: 8,
              teamMorale: 4,
              stakeholderSatisfaction: 12,
              deliveryFocus: 8,
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
            text: "Tek kaynak doküman oluşturup faz onayıyla ekipleri hizala.",
            score: 30,
            feedback:
              "Doğru karar. Ortak dokümantasyon entegrasyon riskini azaltır.",
            isBest: true,
            metricEffects: {
              projectHealth: 18,
              teamMorale: 8,
              stakeholderSatisfaction: 10,
              deliveryFocus: 16,
            },
          },
          {
            text: "Her ekibin kendi dokümanıyla devam etmesine izin ver.",
            score: 0,
            feedback:
              "Bu yaklaşım fazlar arası uyumsuzluğu ve yeniden iş yapmayı artırır.",
            isBest: false,
            metricEffects: {
              projectHealth: -20,
              teamMorale: -10,
              stakeholderSatisfaction: -8,
              deliveryFocus: -14,
            },
          },
          {
            text: "Doküman farklarını change log ile takip et.",
            score: 20,
            feedback:
              "İyi hamle. Değişiklik izlenir ama tek kaynak yaklaşımı kadar güçlü değildir.",
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
            text: "Eksikleri onaylı gereksinim matrisiyle karşılaştırıp change request aç.",
            score: 30,
            feedback:
              "Doğru Waterfall yaklaşımı. Kapsam, onay ve değişiklik yönetimi netleşti.",
            isBest: true,
            metricEffects: {
              projectHealth: 18,
              teamMorale: 8,
              stakeholderSatisfaction: 12,
              deliveryFocus: 14,
            },
          },
          {
            text: "Müşteri memnun olsun diye eksikleri ücretsiz ekle.",
            score: 5,
            feedback:
              "Kısa vadede olumlu görünür ama kontrolsüz kapsam artışı teslimatı zayıflatır.",
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
            isBest: false,
            metricEffects: {
              projectHealth: 12,
              teamMorale: 6,
              stakeholderSatisfaction: 14,
              deliveryFocus: 10,
            },
          },
        ],
      },
    ],
  },
];
