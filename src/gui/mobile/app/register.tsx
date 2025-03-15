import { useState } from "react";
import { useRouter } from "expo-router";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebaseConfig";

const RegisterScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // const handleRegister = async () => {
    //     try {
    //         await createUserWithEmailAndPassword(auth, email, password);
    //         router.replace("/"); // Navigate to Home after successful registration
    //     } catch (error: any) {
    //         console.error("Registration Failed:", error.message);
    //     }
    // };

    return null; // UI components will be added separately
};

export default RegisterScreen;
