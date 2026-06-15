import type { WeddingConfig } from "./types";
const parseJson = <T,>(jsonString: string | undefined, defaultValue: T): T => {
  if (!jsonString) return defaultValue;
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    console.warn("Failed to parse JSON env:", e);
    return defaultValue;
  }
};
export const MAX_GUESTS = parseInt(
  import.meta.env.PUBLIC_RSVP_MAX_GUESTS ?? "5",
  10
);

export const MUSIC_URL = "/assets/music.mp3";

export const WEDDING_TEXT = {
  // 1. Salam Pembuka (Hero / Profile)
  opening: {
    salam: "Assalamu’alaikum Warahmatullahi Wabarakatuh",
    intro:
      "Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah, perkenankanlah kami merangkai kasih sayang yang Engkau ciptakan ini dalam ikatan suci pernikahan.",
  },

  // 2. Ayat Suci / Quotes (Ar-Rum: 21 adalah standar emas yang penuh doa)
  quote: {
    ar_rum: `"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."`,
    source: "QS. Ar-Rum: 21",
  },

  // 3. Kalimat Undangan (Sangat Rendah Hati)
  invitation:
    "Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, kawan, dan sahabat, untuk memberikan doa restu pada acara pernikahan kami:",

  // 4. Penutup (Footer)
  closing: {
    text: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.",
    salam: "Wassalamu’alaikum Warahmatullahi Wabarakatuh",
    signature: "Kami yang berbahagia,",
    family: "Kel. Bpk Ayat & Kel. Bpk Endang Cahya",
  },

  // 5. Disclaimer Kado (Halus & Sopan)
  gift: {
    title: "Tanda Kasih",
    desc: "Kehadiran dan doa restu Anda adalah hadiah terbaik bagi kami. Namun, jika Anda ingin memberikan tanda kasih dalam bentuk lain, kami menerimanya dengan segala kerendahan hati.",
  },
};

export const WEDDING_CONFIG: WeddingConfig = {
  couple: {
    bride: {
      name: "Megisa",
      fullName: "Megisa Ainun Fajriah",
      parents: "Putri ke-1 dari Bpk. Endang Cahya & Ibu Imas Marliah",
      instagram: "megisaaf_",
      image: "/assets/megisa.webp",
    },
    groom: {
      name: "Farhan",
      fullName: "Farhan Nasir",
      parents: "Putra ke-3 dari Bpk. Ayat & Ibu Een Rohaenah",
      instagram: "farhannasir_",
      image: "/assets/farhan.webp",
    },
  },
  venue: {
    name: "Lokasi Pernikahan",
    address: "Kp. Tanjakan Panjang RT 013 RW 15 Desa Panundaan, Kec. Ciwidey, Kab. Bandung",
    latitude: -7.0947,
    longitude: 107.4475,
  },
  events: {
    akad: {
      title: "Akad Nikah",
      day: "Minggu",
      date: "28 Juni 2026",
      startTime: "08:00",
      endTime: "10:00",
      startDateTime: new Date("2026-06-28T08:00:00+07:00"),
      endDateTime: new Date("2026-06-28T10:00:00+07:00"),
    },
    resepsi: {
      title: "Resepsi Pernikahan",
      day: "Minggu",
      date: "28 Juni 2026",
      startTime: "11:00",
      endTime: "14:00",
      startDateTime: new Date("2026-06-28T11:00:00+07:00"),
      endDateTime: new Date("2026-06-28T14:00:00+07:00"),
    },
  },
  hero: {
    image: "/assets/hero.webp",
    city: "Ciwidey, Kab. Bandung",
  },
};

export const LOVE_STORY = parseJson(import.meta.env.PUBLIC_LOVE_STORY, [
  {
    date: "Awal Pertemuan",
    title: "Pertama Bertemu",
    desc: "Momen istimewa saat kami pertama kali dipertemukan.",
  },
]);

export const BANK_ACCOUNTS = parseJson(import.meta.env.PUBLIC_BANK_ACCOUNTS, [
  { bank: "Bank BCA", number: "6768288845", name: "Farhan Nasir" },
  { bank: "Dana", number: "085169576637", name: "Megisa Ainun Fajriah" },
]);

export const GALLERY_IMAGES = [
  "/assets/galeri1.jpg",
  "/assets/galeri2.jpg",
  "/assets/galeri3.jpg",
  "/assets/galeri4.jpg",
  "/assets/galeri5.jpg",
  "/assets/galeri6.jpg",
  "/assets/galeri7.jpg",
  "/assets/galeri8.jpg",
  "/assets/galeri9.jpg",
];
