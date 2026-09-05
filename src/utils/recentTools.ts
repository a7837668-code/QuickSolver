const STORAGE_KEY = 'quicksolve_recent_tools';
const MAX_RECENT = 6;

export function addRecentTool(toolSlug: string) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let list: string[] = raw ? JSON.parse(raw) : [];
    list = list.filter(slug => slug !== toolSlug);
    list.unshift(toolSlug);
    if (list.length > MAX_RECENT) {
      list = list.slice(0, MAX_RECENT);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to update recent tools', err);
  }
}

export function getRecentToolSlugs(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
