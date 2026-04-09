//funkcje do formatowania daty i czasu, które są używane w całej aplikacji do wyświetlania dat i godzin w czytelny sposób dla użytkownika. Dzięki temu mamy spójny format daty i czasu w całej aplikacji, co poprawia jej użyteczność i estetykę.
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
