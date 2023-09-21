import { Redirect, useRouter } from "expo-router";

export default function Page() {

    if (true) {
        return <Redirect href="/(drawer)/home" />;
    } else {
        return <Redirect href="hero" />;
    }
    
}