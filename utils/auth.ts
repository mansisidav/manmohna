// project-root/utils/auth.ts
export const isAdminLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
};
