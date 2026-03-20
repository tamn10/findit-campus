export const timeAgo = (
  date: Date,
  options?: { upperCase?: boolean; recentLabel?: string },
): string => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const recent = options?.recentLabel ?? "just now";

  if (seconds < 60) {
    return options?.upperCase ? recent.toUpperCase() : recent;
  }

  let value = "";
  let unit = "";

  if (seconds < 3600) {
    value = `${Math.floor(seconds / 60)}`;
    unit = "m";
  } else if (seconds < 86400) {
    value = `${Math.floor(seconds / 3600)}`;
    unit = "h";
  } else if (seconds < 604800) {
    value = `${Math.floor(seconds / 86400)}`;
    unit = "d";
  } else {
    value = `${Math.floor(seconds / 604800)}`;
    unit = "w";
  }

  const result = `${value}${unit} ago`;

  return options?.upperCase ? result.toUpperCase() : result;
};
