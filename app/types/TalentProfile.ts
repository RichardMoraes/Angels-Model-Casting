export interface TalentProfile {
  id: string;
  name: string;
  age: number;
  gender: "Female" | "Male" | "Non-binary";
  city: string;
  state: string;
  mainPhotoUrl: string;
  details: {
    ethnicity: string;
    heightCm: number;
    weightKg: number;
    hairType: string;
    hairColor: string;
    eyeColor: string;
    bio: string;
  };
  skills: string[];
  photos: string[];
  videos: {
    title: string;
    url: string;
  }[];
}
