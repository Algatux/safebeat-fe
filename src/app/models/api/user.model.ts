
enum Language {
  IT = 'it',
  FR = 'fr',
  EN = 'en'
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  language: Language;
}
