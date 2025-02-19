'use client';

import Pagina from '@/components/Pagina';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation'; 
export default function ListaNovelas() {
    const [novelas, setNovelas] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const novelasSalvas = JSON.parse(localStorage.getItem('novelas')) || [];
        setNovelas(novelasSalvas);
    }, []);

    const excluirNovela = (id) => {
        if (confirm('Tem certeza que deseja excluir esta novela?')) {
            const novasNovelas = novelas.filter(novela => novela.id !== id);
            setNovelas(novasNovelas);
            localStorage.setItem('novelas', JSON.stringify(novasNovelas));
        }
    };

    return (
        <Pagina titulo="Lista de Novelas">
            <Container>
                <h1 className="text-center mb-4">Lista de Novelas</h1>

                <Link href="/novelas/novelas/create">
                    <Button variant="primary" className="mb-4">Adicionar Nova Novela</Button>
                </Link>

                <Row>
                    {novelas.length === 0 ? (
                        <p>Nenhuma novela cadastrada ainda.</p>
                    ) : (
                        novelas.map((novela, index) => (
                            <Col md={4} className="mb-4" key={index}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{novela.titulo}</Card.Title>
                                        <Card.Text>
                                            <strong>Gênero:</strong> {novela.genero}<br />
                                            <strong>Ano de Lançamento:</strong> {novela.anoLancamento}
                                        </Card.Text>
                                        <div className="d-flex justify-content-between">
                                            <Link href={`/novelas/novelas/edit/${novela.id}`}>
                                                <Button variant="warning">Editar</Button>
                                            </Link>
                                            <Button variant="danger" onClick={() => excluirNovela(novela.id)}>
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
