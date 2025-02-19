'use client';

import Pagina from '@/components/Pagina';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation'; 

export default function ListaAutores() {
    const [autores, setAutores] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const autoresSalvos = JSON.parse(localStorage.getItem('autores')) || [];
        setAutores(autoresSalvos);
    }, []);

    const excluirAutor = (id) => {
        if (confirm('Tem certeza que deseja excluir este autor?')) {
            const novosAutores = autores.filter(autor => autor.id !== id);
            setAutores(novosAutores);
            localStorage.setItem('autores', JSON.stringify(novosAutores));
        }
    };

    return (
        <Pagina titulo="Lista de Autores">
            <Container>
                <h1 className="text-center mb-4">Lista de Autores</h1>

                <Link href="/novelas/autores/create">
                    <Button variant="primary" className="mb-4">Adicionar Novo Autor</Button>
                </Link>

                <Row>
                    {autores.length === 0 ? (
                        <p>Nenhum autor cadastrado ainda.</p>
                    ) : (
                        autores.map((autor, index) => (
                            <Col md={4} className="mb-4" key={index}>
                                <Card>
                                    {autor.foto && (
                                        <Card.Img variant="top" src={autor.foto} alt="Foto do Autor" /> // Exibe a imagem
                                    )}
                                    <Card.Body>
                                        <Card.Title>{autor.nomeAutor}</Card.Title>
                                        <Card.Text>
                                            <strong>Biografia:</strong> {autor.biografia}
                                        </Card.Text>
                                        <div className="d-flex justify-content-between">
                                            <Link href={`/novelas/autores/edit/${autor.id}`}>
                                                <Button variant="warning">Editar</Button>
                                            </Link>
                                            <Button variant="danger" onClick={() => excluirAutor(autor.id)}>
                                                Excluir
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </Pagina>
    );
}
