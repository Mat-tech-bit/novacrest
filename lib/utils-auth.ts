export function generateMatricNumber(faculty: string, year: string) {
  const facultyCodes: Record<string, string> = {
    science: "SCI",
    engineering: "ENG",
    arts: "ART",
    medicine: "MED",
    law: "LAW",
    business: "BUS",
    education: "EDU",
    "social-sciences": "SSC",
  };

  const code = facultyCodes[faculty] || "GEN";
  const random = Math.floor(1000 + Math.random() * 9000); // 4 random digits
  const shortYear = year.slice(-2);

  return `${code}/${year}/${random}`; // e.g., SCI/2026/1234
}
