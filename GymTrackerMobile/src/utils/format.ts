export function formatDate(value: string) {
  const date = new Date(value);
  return date.toLocaleDateString('pl-PL');
}

export function formatDateTime(value: string) {
  const date = new Date(value);
  return `${date.toLocaleDateString('pl-PL')} ${date.toLocaleTimeString(
    'pl-PL',
    {
      hour: '2-digit',
      minute: '2-digit',
    },
  )}`;
}
