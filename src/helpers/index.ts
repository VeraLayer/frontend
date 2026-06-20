
export const ARCHIVE_TYPE_LABEL: Record<number, string> = {
  0: "Talent",
  1: "Heritage",
  2: "Datasets",
};
 
export const ARCHIVE_TYPE_COLOR: Record<number, string> = {
  0: "#7C9EFF",
  1: "#F2A65A",
  2: "#6FEBA0",
};
 
export function shortAddr(addr: string) {
  if (!addr || addr === "0x0000000000000000000000000000000000000000") return "—";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}
 
export function tsToDate(ts: number) {
  if (!ts) return "—";
  return new Date(ts * 1000).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}