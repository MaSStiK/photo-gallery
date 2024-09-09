import Header from "@/components/Header/Header"

import "./contacts.css"

export default function ContactsPage() {
    return (
        <article>
            <Header />

            <section className="contacts">
                <h1>Contacts</h1>
                <p>Email: email@example.com</p>
                <p>Instagram: inst.example.com</p>
                <p>Info: Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis iusto, dolore dolorum expedita sit omnis sequi mollitia ea quae laudantium?</p>
            </section>
        </article>
    )
}