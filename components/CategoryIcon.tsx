type IconName = 'rakhi' | 'kaleere' | 'baby' | 'charms' | 'friendship';

const paths: Record<IconName, string> = {
  rakhi:
    'M12 12 L4 6 C3 8 3 10 4 12 C3 14 3 16 4 18 L12 12 Z M12 12 L20 6 C21 8 21 10 20 12 C21 14 21 16 20 18 L12 12 Z',
  kaleere:
    'M12 3 C8 3 6 6 6 10 C6 14 4 15 4 16 H20 C20 15 18 14 18 10 C18 6 16 3 12 3 Z',
  baby: 'M12 3 L14.2 9.2 L20.8 9.2 L15.6 13 L17.6 19.2 L12 15.6 L6.4 19.2 L8.4 13 L3.2 9.2 L9.8 9.2 Z',
  charms:
    'M12 20 C6 15.5 3 12 3 8.5 C3 5.9 5 4 7.5 4 C9.2 4 10.7 5 12 6.8 C13.3 5 14.8 4 16.5 4 C19 4 21 5.9 21 8.5 C21 12 18 15.5 12 20 Z',
  friendship: '',
};

export default function CategoryIcon({ name, className }: { name: IconName; className?: string }) {
  if (name === 'friendship') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <ellipse cx="12" cy="6" rx="2.2" ry="3.2" />
        <ellipse cx="12" cy="18" rx="2.2" ry="3.2" />
        <ellipse cx="6" cy="12" rx="3.2" ry="2.2" />
        <ellipse cx="18" cy="12" rx="3.2" ry="2.2" />
        <circle cx="12" cy="12" r="1.6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={paths[name]} />
      {name === 'kaleere' && <circle cx="12" cy="19" r="1.3" />}
      {name === 'rakhi' && <circle cx="12" cy="12" r="1.6" />}
    </svg>
  );
}
