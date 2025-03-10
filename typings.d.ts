interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updateAt: string;
}

interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}
export interface PageInfo extends SanityBody {
  _type: "pageInfo";
  address: string;
  backgroundInformation: string;
  experienceInformation: string;
  technicalInformation: string;
  creativeInformation: string;
  email: string;
  role: string;
  heroImage: Image;
  name: string;
  phoneNumber: string;
  profilePic: Image;
}
export interface Technology extends SanityBody {
  _type: "skill";
  image: image;
  progress: number;
  title: string;
}
export interface Skill extends SanityBody {
  _type: "skill";
  image: image;
  progress: number;
  title: string;
}
export interface Experience extends SanityBody {
  _type: "experiences";
  company: string;
  companyImage: Image;
  dateStarted: date;
  dateEnded: date;
  isCurrentlyWorkingHere: boolean;
  jobTitle: string;
  points: string[];
  technologies: Technology[];
}
export interface Project extends SanityBody {
  title: string;
  _type: "project";
  image: image;
  linkToBuild: string;
  summary: string;
  technologies: Techonology[];
}
export interface Social extends SanityBody {
  _type: "social";
  title: string;
  url: string;
}
