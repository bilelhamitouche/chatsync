export function formatAvatarName(name?: string | null) {
  if (!name) return "?";
  const nameArray = name.split(" ");
  if (nameArray.length === 1) {
    return nameArray[0][0].toUpperCase();
  }
  const newArray = nameArray.map((item) => item[0]);
  return (newArray[0] + newArray[newArray.length - 1]).toUpperCase();
}
