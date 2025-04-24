import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useAuthGuard = () => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (!userData) {
      router.replace('/login');
    } else {
      try {
        const user = JSON.parse(userData);
        if (!user.token) {
          router.replace('/login');
        } else {
          setIsChecking(false);
        }
      } catch {
        // Si hay un error parseando, lo mandamos a login igual
        router.replace('/login');
      }
    }
  }, [router]);

  return { isChecking };
};
