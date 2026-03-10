import { spirit } from './../globals/types/spirits';

export const initialSpirits: spirit[] = [
  {
    "id": 1,
    "name": "kitsune",
    "danger": "critical",
    "location": "Shibuya",
    "status": "active"
  },
  {
    "id": 2,
    "name": "oni",
    "danger": "high",
    "location": "Shinagawa",
    "status": "active"
  },
  {
    "id": 3,
    "name": "bakeneko",
    "danger": "critical",
    "location": "Ota",
    "status": "active"
  },
  {
    "id": 4,
    "name": "tanuki",
    "danger": "low",
    "location": "Chuo",
    "status": "active"
  },
  {
    "id": 5,
    "name": "yurei",
    "danger": "high",
    "location": "Minato",
    "status": "active"
  },
  {
    "id": 6,
    "name": "tengu",
    "danger": "critical",
    "location": "Taito",
    "status": "active"
  },
  {
    "id": 7,
    "name": "kappa",
    "danger": "medium",
    "location": "Sumida",
    "status": "active"
  },
  {
    "id": 8,
    "name": "rokurokubi",
    "danger": "high",
    "location": "Chiyoda",
    "status": "active"
  },
  {
    "id": 9,
    "name": "jorogumo",
    "danger": "critical",
    "location": "Bunkyo",
    "status": "active"
  },
  {
    "id": 10,
    "name": "nue",
    "danger": "critical",
    "location": "Koto",
    "status": "active"
  },
  {
    "id": 11,
    "name": "umibozu",
    "danger": "high",
    "location": "Edogawa",
    "status": "active"
  },
  {
    "id": 12,
    "name": "gashadokuro",
    "danger": "critical",
    "location": "Itabasi",
    "status": "active"
  },
  {
    "id": 13,
    "name": "kasa-obake",
    "danger": "low",
    "location": "Nerima",
    "status": "active"
  },
  {
    "id": 14,
    "name": "mokumokuren",
    "danger": "medium",
    "location": "Adati",
    "status": "active"
  },
  {
    "id": 15,
    "name": "nurikabe",
    "danger": "medium",
    "location": "Katsushika",
    "status": "active"
  },
  {
    "id": 16,
    "name": "ushi-oni",
    "danger": "high",
    "location": "Setagaya",
    "status": "active"
  },
  {
    "id": 17,
    "name": "wanyudo",
    "danger": "critical",
    "location": "Suginami",
    "status": "active"
  },
  {
    "id": 18,
    "name": "yuki-onna",
    "danger": "high",
    "location": "Toshima",
    "status": "active"
  },
  {
    "id": 19,
    "name": "zashiki-warashi",
    "danger": "low",
    "location": "Nakano",
    "status": "active"
  },
  {
    "id": 20,
    "name": "ikuchi",
    "danger": "medium",
    "location": "Shibuya",
    "status": "active"
  },
  {
    "id": 21,
    "name": "nuppeppo",
    "danger": "low",
    "location": "Shinagawa",
    "status": "active"
  },
  {
    "id": 22,
    "name": "amabie",
    "danger": "low",
    "location": "Ota",
    "status": "active"
  },
  {
    "id": 23,
    "name": "betobeto-san",
    "danger": "low",
    "location": "Chuo",
    "status": "active"
  },
  {
    "id": 24,
    "name": "dorotabo",
    "danger": "medium",
    "location": "Minato",
    "status": "active"
  },
  {
    "id": 25,
    "name": "enraenra",
    "danger": "high",
    "location": "Taito",
    "status": "active"
  },
  {
    "id": 26,
    "name": "futakuchi-onna",
    "danger": "high",
    "location": "Sumida",
    "status": "active"
  },
  {
    "id": 27,
    "name": "hyakume",
    "danger": "critical",
    "location": "Chiyoda",
    "status": "active"
  },
  {
    "id": 28,
    "name": "issun-boshi",
    "danger": "low",
    "location": "Bunkyo",
    "status": "active"
  },
  {
    "id": 29,
    "name": "jubokko",
    "danger": "medium",
    "location": "Koto",
    "status": "active"
  },
  {
    "id": 30,
    "name": "kamaitachi",
    "danger": "high",
    "location": "Edogawa",
    "status": "active"
  },
]


// 1. Список аномалий
// • Вывести список духов (набор карточек).
// • Данные мокать через Next.js Route Handlers.
// • Поля: Имя (напр. Kitsune), Уровень угрозы (цветовой код), Локация, Статус (Активен/Пойман).

// 2. Взаимодействие
// • В карточке духа должна быть кнопка «Capture» (Поймать).
// • При клике:
// — Отправляется мутация на API.
// — Применяется Optimistic updateTag (интерфейс обновляется мгновенно).
// — С вероятностью 30% API должно возвращать ошибку — интерфейс должен корректно откатиться назад и показать уведомление.
