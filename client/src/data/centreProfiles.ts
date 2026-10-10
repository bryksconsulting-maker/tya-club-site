export const compositeTestimonials = [
  {
    quote: "Over the term, our daughter began explaining her ideas without waiting to be asked. The Growth Card helped us notice the smaller changes that can otherwise go unseen.",
    name: "Composite parent story",
    place: "Hyderabad · Class 10 to 12 family",
  },
  {
    quote: "The biggest change was not that he became louder. He started listening, making a choice and following through with the group.",
    name: "Composite parent story",
    place: "Surat · Class 6 to 9 family",
  },
  {
    quote: "Our graduate began talking about work choices with more clarity and ownership. TYA gave us a shared language without making us manage every decision.",
    name: "Composite parent story",
    place: "Hyderabad · Graduate family",
  },
] as const;

export interface CentreGalleryImage {
  label: string;
  image: string | null;
  alt: string;
}

export interface CentreTimetableEntry {
  day: string;
  programme: string;
  time: string;
  ageRange: string;
  seatsLeft: number | null;
}

export interface CentreTrialSlot {
  date: string;
  time: string;
  ageRange: string;
  seatsLeft: number | null;
  totalSeats: number | null;
}

export interface CentreProfile {
  city: string;
  locality: string;
  address: string;
  postalAddress: {
    streetAddress: string;
    addressRegion: string;
    postalCode: string;
  };
  detail: string;
  admissionsStatus: string;
  seats: string;
  lat: number;
  lng: number;
  openedYear: number | null;
  batchSize: number | null;
  timings: string | null;
  trialDays: string[];
  mentorCount: number | null;
  programmesThisTerm: number | null;
  gallery: CentreGalleryImage[];
  timetable: CentreTimetableEntry[];
  nextTrial: CentreTrialSlot | null;
}

// Keep location-specific facts here so dates, photos and timetables can be filled in
// as each centre confirms them, without changing the Find a Centre page layout.
export const centreProfiles: CentreProfile[] = [
  {
    city: "Hyderabad",
    locality: "Madhapur",
    address: "Plot 3-804, SS Chambers, 3rd Floor, Mega Hills, Ayyappa Society, Madhapur, Hyderabad – 500081, Telangana",
    postalAddress: {
      streetAddress: "Plot 3-804, SS Chambers, 3rd Floor, Mega Hills, Ayyappa Society",
      addressRegion: "Telangana",
      postalCode: "500081",
    },
    detail: "TYA Mission Pods · Introductory sessions available",
    admissionsStatus: "Open · introductory sessions available",
    seats: "Official centre",
    lat: 17.4483,
    lng: 78.3915,
    openedYear: null,
    batchSize: 30,
    timings: null,
    trialDays: [],
    mentorCount: null,
    programmesThisTerm: null,
    gallery: [
      { label: "The room · wide, clean, natural light", image: null, alt: "TYA Club room in Madhapur" },
      { label: "Mentor with students", image: null, alt: "TYA mentor working with students in Madhapur" },
      { label: "Entrance · pick-up point", image: null, alt: "TYA Club entrance and pick-up point in Madhapur" },
    ],
    timetable: [],
    nextTrial: null,
  },
  {
    city: "Surat",
    locality: "Vesu",
    address: "408-415, 4th Floor, Homeland City Mall, Opposite J.H. Ambani School, Vesu, Surat – 395007, Gujarat",
    postalAddress: {
      streetAddress: "408-415, 4th Floor, Homeland City Mall, Opposite J.H. Ambani School, Vesu",
      addressRegion: "Gujarat",
      postalCode: "395007",
    },
    detail: "TYA Mission Pods · Introductory sessions available",
    admissionsStatus: "Open · introductory sessions available",
    seats: "Official centre",
    lat: 21.1458,
    lng: 72.77,
    openedYear: null,
    batchSize: 30,
    timings: null,
    trialDays: [],
    mentorCount: null,
    programmesThisTerm: null,
    gallery: [
      { label: "The room · wide, clean, natural light", image: null, alt: "TYA Club room in Vesu" },
      { label: "Mentor with students", image: null, alt: "TYA mentor working with students in Vesu" },
      { label: "Entrance · pick-up point", image: null, alt: "TYA Club entrance and pick-up point in Vesu" },
    ],
    timetable: [],
    nextTrial: null,
  },
] as const;
