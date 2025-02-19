'use client';

import Pagina from '@/components/Pagina';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation'; 

export default function ListaPremiacoes() {
    const [premiacoes, setPremiacoes] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const premiacoesSalvas = JSON.parse(localStorage.getItem('premiacoes')) || [];
        setPremiacoes(premiacoesSalvas);
    }, []);

    const excluirPremiacao = (id) => {
        if (confirm('Tem certeza que deseja excluir esta premiação?')) {
            const novasPremiacoes = premiacoes.filter(premiacao => premiacao.id !== id);
            setPremiacoes(novasPremiacoes);
            localStorage.setItem('premiacoes', JSON.stringify(novasPremiacoes));
        }
    };

    return (
        <Pagina titulo="Lista de Premiações">
            <Container>
                <h1 className="text-center mb-4">Lista de Premiações</h1>

                <Link href="/novelas/premiacoes/create">
                    <Button variant="primary" className="mb-4">Adicionar Nova Premiação</Button>
                </Link>

                <Row>
                    {premiacoes.length === 0 ? (
                        <p>Nenhuma premiação cadastrada ainda.</p>
                    ) : (
                        premiacoes.map((premiacao, index) => (
                            <Col md={4} className="mb-4" key={index}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{premiacao.titulo}</Card.Title>
                                        <Card.Text>
                                            <strong>Ano:</strong> {premiacao.ano}<br />
                                            <strong>Categoria:</strong> {premiacao.categoria}<br />
                                            <strong>Vencedor:</strong> {premiacao.vencedor ? "Sim" : "Não"}
                                        </Card.Text>
                                        <div className="d-flex justify-content-between">
                                            <Link href={`/novelas/premiacoes/edit/${premiacao.id}`}>
                                                <Button variant="warning">Editar</Button>
                                            </Link>
                                            <Button variant="danger" onClick={() => excluirPremiacao(premiacao.id)}>
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
