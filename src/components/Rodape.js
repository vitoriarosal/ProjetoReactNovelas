'use client'
import { FaInstagram, FaYoutube, FaLinkedin, FaTimes } from 'react-icons/fa';
import styles from './Rodape.module.css'; 

export default function Rodape() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.social}>
                    <FaTimes size={30} className={styles.icon} />
                    <FaInstagram size={30} className={styles.icon} />
                    <FaYoutube size={30} className={styles.icon} />
                    <FaLinkedin size={30} className={styles.icon} />
                </div>

                <div className={styles.menu}>
                    <p><a href="/">Página inicial</a></p>
                    <p><a href="/novelas">Novelas</a></p>
                    <p><a href="/personagens">Personagens</a></p>
                    <p><a href="/autores">Autores</a></p>
                </div>

                <div className={styles.contact}>
                    <p>Fale conosco: <a href="mailto:vitoria.rosa@iesb.edu.br">vitoria.rosa@iesb.edu.br</a></p>
                    <p>© 2024 [Nome do Projeto]. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
