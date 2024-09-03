import { Roboto } from "next/font/google";

import "./app.css"; 
import "./app-phone.css"; 
import "./styles/style.css";

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"]
})

export const metadata = {
    title: "Яков Овчинников",
    description: "Галерея фото Якова Овчинникова",
}

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
            <body className={roboto.className}>
                {children}
            </body>
        </html>
    );
}
