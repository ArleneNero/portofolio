export type Stat = { value: string; label: string };
export type SocialLink = { label: string; url: string };
export type Profile = {
  name: string;
  intro: string;
  headline: string;
  bio: string;
  location?: string;
  availability?: string;
  photo?: string;
  cv?: string;
  email?: string;
  stats: Stat[];
  socials: SocialLink[];
};
export type SkillGroup = { title: string; items: string[] };
export type ExperienceEntry = { id: string; role: string; organization: string; period: string; description: string; sample?: boolean };
export type AwardEntry = { id: string; title: string; organizer: string; year: string; description?: string; proof?: string; sample?: boolean };
