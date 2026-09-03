const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Amsterdam",
});

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeZone: "Europe/Amsterdam",
});

export function formatDateTime(iso: string | undefined): string {
  if (!iso) {
    return "not recorded";
  }
  return dateTimeFormat.format(new Date(iso));
}

export function formatDate(iso: string | undefined): string {
  if (!iso) {
    return "not recorded";
  }
  return dateFormat.format(new Date(iso));
}

export function formatDuration(startedAt: string, endedAt?: string): string {
  if (!endedAt) {
    return "in flight";
  }
  const ms = new Date(endedAt).getTime() - new Date(startedAt).getTime();
  if (ms < 1000) {
    return `${ms} ms`;
  }
  const seconds = ms / 1000;
  if (seconds < 60) {
    return `${seconds.toFixed(1)} s`;
  }
  const minutes = Math.floor(seconds / 60);
  return `${minutes} m ${Math.round(seconds - minutes * 60)} s`;
}

export function formatDurationMs(ms: number | undefined): string {
  if (ms === undefined) {
    return "not recorded";
  }
  if (ms < 1000) {
    return `${ms} ms`;
  }
  return `${(ms / 1000).toFixed(1)} s`;
}

export function shortId(id: string | undefined, length = 8): string {
  if (!id) {
    return "not recorded";
  }
  return id.slice(0, length);
}

export function formatCost(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    currency: "EUR",
    minimumFractionDigits: 2,
    style: "currency",
  }).format(amount);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-GB").format(value);
}
