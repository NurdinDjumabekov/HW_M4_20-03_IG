import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import SendIcon from "@mui/icons-material/SendToMobile";
import PaymentsIcon from "@mui/icons-material/Payments";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "целый день",
    start: todayStr,
    total_price: "1000",
    agent: "Джумабеков Нурдин",
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr + "T12:00:00",
  },
];

export function createEventId() {
  return String(eventGuid++);
}

export const texts =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernaturbeatae eaque placeat necessitatibus, iste iure ipsa ad autem repellendusofficia commodi sequi optio rerum vero? Provident nemo illum autem utquae. Itaque magni illo fuga.";

export const confirmAllDay =
  "Нельзя добавить событие на весь день. Пожалуйста, выберите временной интервал.";

export const pointsTT = [
  {
    coordinates: [74.5573735, 42.8508586],
    text: "Marker 1",
  },
  {
    coordinates: [74.5593735, 42.8508586],
    text: "Marker 2",
  },
  {
    coordinates: [74.5173735, 42.8508586],
    text: "Marker 3",
  },
  {
    coordinates: [74.5373735, 42.8578586],
    text: "Marker 4",
  },
  {
    coordinates: [74.5573735, 42.8298586],
    text: "Marker 5",
  },
];

const segments = [
  {
    color: "#43e843",
    label: "A",
    coords: [
      [74.5907, 42.8765], // Пункт А (начало маршрута)
      [74.5922, 42.8751], // Дорога 1
      [74.5944, 42.874], // Дорога 2
    ],
  },

  {
    color: "#43e843",
    label: "B",
    coords: [
      [74.5944, 42.874], // Переход на другой сегмент
      [74.5966, 42.8725], // Дорога 3
      [74.5988, 42.871], // Дорога 4
      [74.5988, 42.871], // Пункт B (конец маршрута)
      [74.6009, 42.8695], // Дорога 5
    ],
  },
];

export const listRouteAllTAMy = [
  {
    id: 1,
    fio: "Бакытова Анара ПФБ - ТА",
    latitude: 42.874722,
    longitude: 74.612222,
    duty: 100,
  },
  {
    id: 2,
    fio: "Алдаянов Эрлан П-1 ТА",
    latitude: 42.8803,
    longitude: 74.595,
    duty: 1200,
  },
  {
    id: 3,
    fio: "Бакытова Анара ПФБ - ТА",
    latitude: 42.87,
    longitude: 74.6,
    duty: 9000,
  },
  {
    id: 4,
    fio: "Бейшекеева Анара (Сарманова) П-1 ТА",
    latitude: 42.8775,
    longitude: 74.59,
    duty: 7600,
  },
  {
    id: 5,
    fio: "Бейшекеева Анара (Сарманова) П-1 ТА",
    latitude: 42.885,
    longitude: 74.629876,
    duty: 87600,
  },
  {
    agent: "Джумабеков Нурдин",
    agent_guid: "B3120F36-3FCD-4CA0-8346-484881974846",
    lat: "42.8451084",
    lon: "74.6176045",
    date: "2024-09-24 12:46",
    codeid: "622",
    date_system: "2024-09-24T12:38:46.760Z",
    rn: "1",
  },
];

const coords = [
  {
    comment: "",
    end_time: "15:39",
    guid: "5CED9EA0-8F98-4221-9BF9-5B902AF84987",
    lat: "42.844673",
    lon: "74.619599",
    ordering: 3,
    point: "Джантошева 97A",
    point_guid: "74AE9AB8-1C3D-11E7-82A3-000C2986F897",
    route_sheet_guid: "F0AC18EE-2015-404C-A4B8-F2C847268C3A",
    start_time: "15:20",
    status: 1,
  },
  {
    comment: "",
    end_time: "15:39",
    guid: "5CED9EA0-8F98-4221-9BF9-5B902AF84987",
    lat: "42.85734168574616",
    lon: "74.5963286810956",
    ordering: 3,
    point: "к. Шота Руставели ",
    point_guid: "74AE9AB8-1C3D-11E7-82A3-000C2986F897",
    route_sheet_guid: "F0AC18EE-2015-404C-A4B8-F2C847268C3A",
    start_time: "15:20",
    status: 1,
  },
  {
    comment: "",
    end_time: "15:39",
    guid: "5CED9EA0-8F98-4221-9BF9-5B902AF84987",
    lat: "42.86142814852352",
    lon: "74.5873528201789",
    ordering: 3,
    point: "к. Шота Руставели ",
    point_guid: "74AE9AB8-1C3D-11E7-82A3-000C2986F897",
    route_sheet_guid: "F0AC18EE-2015-404C-A4B8-F2C847268C3A",
    start_time: "15:20",
    status: 1,
  },
  {
    comment: "",
    end_time: "15:39",
    guid: "5CED9EA0-8F98-4221-9BF9-5B902AF84987",
    lat: "42.86674719048398",
    lon: "74.63610611708658",
    ordering: 3,
    point: "к. Шота Руставели ",
    point_guid: "74AE9AB8-1C3D-11E7-82A3-000C2986F897",
    route_sheet_guid: "F0AC18EE-2015-404C-A4B8-F2C847268C3A",
    start_time: "15:20",
    status: 1,
  },
];

export const listActions_TA = [
  {
    id: 1,
    name: "Произвести выгрузку",
    icon: <SendIcon />,
    color: "#00ab55",
    link: "",
  },
  {
    id: 2,
    name: "Прикрепить фото и видео",
    icon: <AddAPhotoIcon />,
    color: "#2196f3",
    link: "/maps_camera",
  },
  {
    id: 3,
    name: "Забрать деньги",
    icon: <PaymentsIcon />,
    color: "#805dca",
    link: "",
  },
];
