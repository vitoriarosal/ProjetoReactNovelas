'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Pagina from "@/components/Pagina";
import { useRouter } from 'next/navigation'; 
import { useParams } from 'next/navigation'; 

export default function CriarEditarPremiacao() {
    const router = useRouter();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        titulo: '',
        ano: '',
        categoria: '',
        vencedor: false,
    });

    useEffect(() => {
        if (id) {
            const premiacoesSalvas = JSON.parse(localStorage.getItem('premiacoes')) || [];
            const premiacaoParaEditar = premiacoesSalvas.find((premiacao) => premiacao.id === id);
            if (premiacaoParaEditar) {
                setFormData(premiacaoParaEditar); 
            }
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let premiacoesSalvas = JSON.parse(localStorage.getItem('premiacoes')) || [];

        if (id) {
            premiacoesSalvas = premiacoesSalvas.map((premiacao) => 
                premiacao.id === id ? { ...premiacao, ...formData } : premiacao
            );
        } else {
            formData.id = new Date().getTime().toString(); // Gera um ID único
            premiacoesSalvas.push(formData);
        }

        localStorage.setItem('premiacoes', JSON.stringify(premiacoesSalvas));

        router.push('/novelas/premiacoes');
    };

    return (
        <Pagina titulo={id ? "Editar Premiação" : "Criar Premiação"}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="text-center mb-4">{id ? "Editar Premiação" : "Criar Premiação"}</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="titulo">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="titulo"
                                    value={formData.titulo}
                                    onChange={handleChange}
                                    placeholder="Digite o título da premiação"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="ano">
                                <Form.Label>Ano</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="ano"
                                    value={formData.ano}
                                    onChange={handleChange}
                                    placeholder="Digite o ano da premiação"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="categoria">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleChange}
                                    placeholder="Digite a categoria da premiação"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="vencedor">
                                <Form.Check
                                    type="checkbox"
                                    name="vencedor"
                                    label="Vencedor"
                                    checked={formData.vencedor}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit">
                                    {id ? "Salvar Alterações" : "Enviar"}
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Pagina>
    );
}
