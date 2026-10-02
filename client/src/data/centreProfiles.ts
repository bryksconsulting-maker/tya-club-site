export const compositeTestimonials = [
  {
    quote: "Over the term, our daughter began explaining her ideas without waiting to be asked. The Growth Card helped us notice the smaller changes that can otherwise go unseen.",
    name: "Composite parent story",
    place: "Hyderabad · Class 10 to 12 family",
    image: "/manus-storage/tya-parent-hyderabad_6694ea96.jpg",
    alt: "AI-generated representative portrait of an Indian parent in Hyderabad",
  },
  {
    quote: "The biggest change was not that he became louder. He started listening, making a choice and following through with the group.",
    name: "Composite parent story",
    place: "Surat · Class 6 to 9 family",
    image: "/manus-storage/tya-parent-surat_9ff152ff.svg",
    alt: "AI-generated illustrative portrait of an Indian parent in Surat",
  },
  {
    quote: "Our graduate began talking about work choices with more clarity and ownership. TYA gave us a shared language without making us manage every decision.",
    name: "Composite parent story",
    place: "Hyderabad · Graduate family",
    image: "/manus-storage/tya-parent-grad_fb84ef6a.svg",
    alt: "AI-generated illustrative portrait of an Indian parent in a graduate family",
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
  coach: {
    title: string;
    role: string;
    bio: string;
    image: string;
    alt: string;
  };
}

// Keep location-specific facts here so dates, photos and timetables can be filled in
// as each centre confirms them, without changing the Find a Centre page layout.
export const centreProfiles: CentreProfile[] = [
  {
    city: "Hyderabad",
    locality: "Madhapur",
    address: "Plot 3-804, SS Chambers, 3rd Floor, Mega Hills, Ayyappa Society, Madhapur, Hyderabad – 500081, Telangana",
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
    coach: {
      title: "Hyderabad learning coach",
      role: "Illustrative coach profile",
      bio: "A calm, observant facilitator who makes room for quieter voices, helps a Pod reflect after each Mission and keeps young people focused without taking over their decisions.",
      image: "/manus-storage/tya-coach-hyderabad_2b047ff0.jpg",
      alt: "AI-generated representative portrait of an Indian learning coach in Hyderabad",
    },
  },
  {
    city: "Surat",
    locality: "Vesu",
    address: "408-415, 4th Floor, Homeland City Mall, Opposite J.H. Ambani School, Vesu, Surat – 395007, Gujarat",
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
    coach: {
      title: "Surat learning coach",
      role: "Illustrative coach profile",
      bio: "An energetic, reflective facilitator who turns debate into better questions, encourages young people to test their ideas and helps the group turn setbacks into another attempt.",
      image: "/manus-storage/tya-coach-surat_fe14b60f.jpg",
      alt: "AI-generated representative portrait of an Indian learning coach in Surat",
    },
  },
] as const;
