export interface Certification {
  name: string;
  issuer: string;
}

export interface IssuerLogo {
  src: string;
  alt: string;
}

export const certifications: Certification[] = [
  { name: "C# Programming", issuer: "Udemy" },
  { name: "ASP.NET Core MVC", issuer: "Udemy" },
  { name: "SQL Server & Database Design", issuer: "Udemy" },
  { name: "Docker", issuer: "Udemy" },
];

const issuerLogos: Record<string, IssuerLogo> = {
  udemy: {
    src: "/images/logos/udemy.svg",
    alt: "Udemy logo",
  },
};

function normalizeIssuer(issuer: string) {
  return issuer.trim().toLowerCase();
}

export function getIssuerLogo(issuer: string): IssuerLogo | null {
  return issuerLogos[normalizeIssuer(issuer)] ?? null;
}
