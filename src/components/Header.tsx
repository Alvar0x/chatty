import Image from "next/image";
import { Menu } from "lucide-react";

export default function Header() {
    return (
        <header>
            <section>
                <button className="menu-button">
                    <Menu />
                </button>
            </section>
            <section className="logo">
                <h1>Chatty</h1>
                <Image src="/chat.png" alt="logo" width={50} height={50} />
            </section>
        </header>
    );
}
