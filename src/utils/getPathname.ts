export const pathnames = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/clients",
    name: "Clientes",
  },
  {
    path: "/agenda",
    name: "Agenda",
  },
  {
    path: "/entries",
    name: "Cadastros",
  },
  {
    path: "/order",
    name: "Ordem de Serviço",
  },
];

export const getPathName = (pathname: string) => {
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const names = pathSegments.map((segment) => {
    const match = pathnames.find((item) => item.path.includes(segment));
    return match ? match.name : "";
  });

  return names.join(" > ");
};
