'use client';

import Pagina from '@/components/Pagina';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export default function ListaAtores() {
    const [atores, setAtores] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const atoresSalvos = JSON.parse(localStorage.getItem('atores')) || [];
        setAtores(atoresSalvos);
    }, []);

    const excluirAtor = (id) => {
        if (confirm('Tem certeza que deseja excluir este ator?')) {
            const novosAtores = atores.filter(ator => ator.id !== id);
            setAtores(novosAtores);
            localStorage.setItem('atores', JSON.stringify(novosAtores));
        }
    };

    return (
        <Pagina titulo="Lista de Atores">
            <Container>
                <h1 className="text-center mb-4">Lista de Atores</h1>

                <Link href="/novelas/atores/create">
                    <Button variant="primary" className="mb-4">Adicionar Novo Ator</Button>
                </Link>

                <Row>
                    {atores.length === 0 ? (
                        <p>Nenhum ator cadastrado ainda.</p>
                    ) : (
                        atores.map((ator, index) => (
                            <Col md={4} className="mb-4" key={index}>
                                <Card>
                                    {ator.foto && (
                                        <Card.Img variant="top" src={ator.foto} alt="Foto do Ator" />
                                    )}
                                    <Card.Body>
                                        <Card.Title>{ator.nome}</Card.Title>
                                        <Card.Text>
                                            <strong>Data de Nascimento:</strong> {ator.dataNascimento}<br />
                                            <strong>Nacionalidade:</strong> {ator.nacionalidade}
                                        </Card.Text>
                                        <div className="d-flex justify-content-between">
                                            <Link href={`/novelas/atores/edit/${ator.id}`}>
                                                <Button variant="warning">Editar</Button>
                                            </Link>
                                            <Button variant="danger" onClick={() => excluirAtor(ator.id)}>
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
