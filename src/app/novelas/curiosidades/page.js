'use client';

import Pagina from '@/components/Pagina';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export default function ListaCuriosidades() {
    const [curiosidades, setCuriosidades] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const curiosidadesSalvas = JSON.parse(localStorage.getItem('curiosidades')) || [];
        setCuriosidades(curiosidadesSalvas);
    }, []);

    const excluirCuriosidade = (id) => {
        if (confirm('Tem certeza que deseja excluir esta curiosidade?')) {
            const novasCuriosidades = curiosidades.filter(curiosidade => curiosidade.id !== id);
            setCuriosidades(novasCuriosidades);
            localStorage.setItem('curiosidades', JSON.stringify(novasCuriosidades));
        }
    };

    return (
        <Pagina titulo="Lista de Curiosidades">
            <Container>
                <h1 className="text-center mb-4">Lista de Curiosidades</h1>

                <Link href="/novelas/curiosidades/create">
                    <Button variant="primary" className="mb-4">Adicionar Nova Curiosidade</Button>
                </Link>

                <Row>
                    {curiosidades.length === 0 ? (
                        <p>Nenhuma curiosidade cadastrada ainda.</p>
                    ) : (
                        curiosidades.map((curiosidade, index) => (
                            <Col md={4} className="mb-4" key={index}>
                                <Card>
                                    <Card.Body>
                                        <Card.Text>
                                            {curiosidade.descricao}
                                        </Card.Text>
                                        <div className="d-flex justify-content-between">
                                            <Link href={`/novelas/curiosidades/edit/${curiosidade.id}`}>
                                                <Button variant="warning">Editar</Button>
                                            </Link>
                                            <Button variant="danger" onClick={() => excluirCuriosidade(curiosidade.id)}>
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
