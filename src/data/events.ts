export type CampusEvent = {
  id: number;
  title: string;
  date: string;
  place: string;
  seats: number;
};

export const events: CampusEvent[] = [
  { id: 1, title: 'React study night', date: '2026-10-22', place: 'Room 302', seats: 20 },
  { id: 2, title: 'TypeScript workshop', date: '2026-10-25', place: 'Lab 101', seats: 2 },
  { id: 3, title: 'UI/UX Design meetup', date: '2026-10-28', place: 'Auditorium A', seats: 15 },
  { id: 4, title: 'AI & Cloud talk', date: '2026-11-02', place: 'Hall 4', seats: 30 },
];