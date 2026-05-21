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
  methodology: string;
  rounds: ProjectRound[];
};

export const projects: Project[] = [
  {
    id: "startup-mvp",
    title: "Startup MVP Projesi",
    methodology: "Agile",
    rounds: [
      {
        roundNumber: 1,
        phase: "Planlama",
        scenario: "Musteri tum ozellikleri ilk surumde istiyor.",
        options: [
          {
            text: "MVP hedefini netlestirip en kritik ozellikleri sec.",
            score: 30,
            feedback:
              "Dogru yaklasim. Ilk surum icin odak korunur ve teslim riski azalir.",
            isBest: true,
            metricEffects: {
              projectHealth: 18,
              teamMorale: 8,
              stakeholderSatisfaction: 10,
              deliveryFocus: 20,
            },
          },
          {
            text: "Tum ozellikleri plana ekle ve tarihi degistirme.",
            score: 5,
            feedback:
              "Bu karar ekibi zorlar. Kapsam buyurken tarih sabit kalirsa kalite riski artar.",
            isBest: false,
            metricEffects: {
              projectHealth: -16,
              teamMorale: -18,
              stakeholderSatisfaction: 6,
              deliveryFocus: -12,
            },
          },
          {
            text: "Musteriye sadece teknik ekibin karar verecegini soyle.",
            score: 10,
            feedback:
              "Ekip gorusu onemli ama paydas beklentisini birlikte yonetmek gerekir.",
            isBest: false,
            metricEffects: {
              projectHealth: -8,
              teamMorale: 4,
              stakeholderSatisfaction: -14,
              deliveryFocus: 2,
            },
          },
          {
            text: "Ozellikleri onceliklendirip sonraki surumlere bol.",
            score: 25,
            feedback:
              "Iyi karar. Kapsami bolmek hem beklentiyi hem teslimati daha yonetilebilir yapar.",
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
        scenario: "Ekip sprintte fazla is aldi ve yetisemiyor.",
        options: [
          {
            text: "Sprint kapsaminda takas yapip en dusuk oncelikli isi cikar.",
            score: 30,
            feedback:
              "En saglikli secim. Kapasiteye gore kapsam ayarlamak ekibi ve teslimati korur.",
            isBest: true,
            metricEffects: {
              projectHealth: 16,
              teamMorale: 18,
              stakeholderSatisfaction: 8,
              deliveryFocus: 18,
            },
          },
          {
            text: "Herkesten hafta sonu calismasini iste.",
            score: 10,
            feedback:
              "Kisa vadede ise yarayabilir ama surdurulebilirlik ve moral zarar gorebilir.",
            isBest: false,
            metricEffects: {
              projectHealth: -6,
              teamMorale: -20,
              stakeholderSatisfaction: 4,
              deliveryFocus: 8,
            },
          },
          {
            text: "Durumu gizleyip sprint sonunda acikla.",
            score: 0,
            feedback:
              "Gec bilgi vermek riski buyutur. Sorunu erken gorunur yapmak daha dogru olur.",
            isBest: false,
            metricEffects: {
              projectHealth: -18,
              teamMorale: -12,
              stakeholderSatisfaction: -16,
              deliveryFocus: -10,
            },
          },
          {
            text: "Gunluk toplantida engelleri netlestirip yardim iste.",
            score: 20,
            feedback:
              "Iyi hamle. Ekip engelleri erken paylasirsa cozum sansi artar.",
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
        scenario: "Demo oncesi kritik bug cikti.",
        options: [
          {
            text: "Bugu onceliklendir, demo kapsamindan riskli bolumu cikar.",
            score: 30,
            feedback:
              "Dogru karar. Demo degerini korurken kritik kalite riskini azaltirsin.",
            isBest: true,
            metricEffects: {
              projectHealth: 20,
              teamMorale: 8,
              stakeholderSatisfaction: 10,
              deliveryFocus: 12,
            },
          },
          {
            text: "Bugu gormezden gel ve demoya aynen devam et.",
            score: 0,
            feedback:
              "Kritik hata demoda guven kaybina yol acabilir. Risk saklanmamali.",
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
              "Kaliteyi korumak iyi ama iletisim eksik kalirsa paydas guveni azalir.",
            isBest: false,
            metricEffects: {
              projectHealth: 6,
              teamMorale: -4,
              stakeholderSatisfaction: -16,
              deliveryFocus: -10,
            },
          },
          {
            text: "Paydaslara durumu acikla ve guvenli demo akisina gec.",
            score: 25,
            feedback:
              "Iyi secim. Seffaflik ve kontrollu demo akisi beklentiyi dengeler.",
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
];
