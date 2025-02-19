'use client';

import Pagina from '@/components/Pagina';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation'; 
export default function ListaPersonagens() {
    const [personagens, setPersonagens] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const personagensSalvos = JSON.parse(localStorage.getItem('personagens')) || [];
        setPersonagens(personagensSalvos);
    }, []);

    const excluirPersonagem = (id) => {
        if (confirm('Tem certeza que deseja excluir este personagem?')) {
            const novosPersonagens = personagens.filter(personagem => personagem.id !== id);
            setPersonagens(novosPersonagens);
            localStorage.setItem('personagens', JSON.stringify(novosPersonagens));
        }
    };

    return (
        <Pagina titulo="Lista de Personagens">
            <Container>
                <h1 className="text-center mb-4">Lista de Personagens</h1>

                <Link href="/novelas/personagens/create">
                    <Button variant="primary" className="mb-4">Adicionar Novo Personagem</Button>
                </Link>

                <Row>
                    {personagens.length === 0 ? (
                        <p>Nenhum personagem cadastrado ainda.</p>
                    ) : (
                        personagens.map((personagem, index) => (
                            <Col md={4} className="mb-4" key={index}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{personagem.nome}</Card.Title>
                                        <Card.Text>
                                            <strong>ID da Novela:</strong> {personagem.novelaId}<br />
                                            <strong>ID do Ator:</strong> {personagem.atorId}
                                        </Card.Text>
                                        <div className="d-flex justify-content-between">
                                            <Link href={`/novelas/personagens/edit/${personagem.id}`}>
                                                <Button variant="warning">Editar</Button>
                                            </Link>
                                            <Button variant="danger" onClick={() => excluirPersonagem(personagem.id)}>
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
