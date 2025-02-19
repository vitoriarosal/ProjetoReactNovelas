'use client';

import Pagina from '@/components/Pagina';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation'; 

export default function ListaEmissoras() {
    const [emissoras, setEmissoras] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const emissorasSalvas = JSON.parse(localStorage.getItem('emissoras')) || [];
        setEmissoras(emissorasSalvas);
    }, []);

    const excluirEmissora = (id) => {
        if (confirm('Tem certeza que deseja excluir esta emissora?')) {
            const novasEmissoras = emissoras.filter(emissora => emissora.id !== id);
            setEmissoras(novasEmissoras);
            localStorage.setItem('emissoras', JSON.stringify(novasEmissoras));
        }
    };

    return (
        <Pagina titulo="Lista de Emissoras">
            <Container>
                <h1 className="text-center mb-4">Lista de Emissoras</h1>

                <Link href="/novelas/emissoras/create">
                    <Button variant="primary" className="mb-4">Adicionar Nova Emissora</Button>
                </Link>

                <Row>
                    {emissoras.length === 0 ? (
                        <p>Nenhuma emissora cadastrada ainda.</p>
                    ) : (
                        emissoras.map((emissora, index) => (
                            <Col md={4} className="mb-4" key={index}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{emissora.nome}</Card.Title>
                                        <Card.Text>
                                            <strong>Ano de Fundação:</strong> {emissora.anoFundacao}<br />
                                            <strong>Categoria:</strong> {emissora.categoria}<br />
                                            <strong>Em Efeito:</strong> {emissora.emEfeito ? "Sim" : "Não"}
                                        </Card.Text>
                                        <div className="d-flex justify-content-between">
                                            <Link href={`/novelas/emissoras/edit/${emissora.id}`}>
                                                <Button variant="warning">Editar</Button>
                                            </Link>
                                            <Button variant="danger" onClick={() => excluirEmissora(emissora.id)}>
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
