import SplashCustom from "@/components/splash-custom";
import { authService } from "@/services";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function App() {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const isLoggedIn = await authService.isAuthenticated();

            setTimeout(() => {
                setIsChecking(false);
                if (isLoggedIn) {
                    router.replace("/(tabs)/home");
                } else {
                    router.replace("/auth/login");
                }
            }, 1300);
        } catch (error) {
            console.error("Lỗi kiểm tra auth:", error);
            setTimeout(() => {
                setIsChecking(false);
                router.replace("/auth/login");
            }, 1300);
        }
    };

    if (!isChecking) {
        return null;
    }

    return <SplashCustom />;
}
