export const parseDateTime = (dateStr: string, timeStr: string): Date | null => {
  try {
    const months: Record<string, number> = { 
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5, 
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11 
    };
    const parts = dateStr.split(' ');
    if (parts.length < 3) return null;
    const day = parseInt(parts[0]);
    const month = months[parts[1]];
    const year = parseInt(parts[2]);
    const timeParts = timeStr.split(' ');
    let [hours, minutes] = timeParts[0].split(':').map(Number);
    if (timeParts[1] === 'PM' && hours < 12) hours += 12;
    if (timeParts[1] === 'AM' && hours === 12) hours = 0;
    return new Date(year, month, day, hours, minutes);
  } catch (e) {
    return null;
  }
};

export const formatTimeDiff = (ms: number): string => {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
};

export const formatTimeAgo = (ms: number): string => {
  const absMs = Math.abs(ms);
  const days = Math.floor(absMs / (1000 * 60 * 60 * 24));
  if (days > 0) return `${days} days ago`;
  const hours = Math.floor(absMs / (1000 * 60 * 60));
  if (hours > 0) return `${hours} hours ago`;
  return `Recently`;
};

export const getCategoryDefaultImage = (category: string): string => {
  const defaults: Record<string, string> = {
    'Competition': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    'Workshop': 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
    'Fest': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    'Seminar': 'https://images.unsplash.com/photo-1505373633560-fa5a52035f29?auto=format&fit=crop&q=80&w=800'
  };
  return defaults[category] || defaults['Competition'];
};
