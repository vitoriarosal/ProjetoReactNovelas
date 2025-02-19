'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Pagina from "@/components/Pagina";
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function EditarEmissora() {
    const router = useRouter();
    const { id } = useParams(); 
    const [formData, setFormData] = useState({
        nome: '',
        anoFundacao: '',
        categoria: '',
        emEfeito: false,
    });

    useEffect(() => {
        const emissorasSalvas = JSON.parse(localStorage.getItem('emissoras')) || [];
        const emissoraParaEditar = emissorasSalvas.find(emissora => emissora.id === id);
        if (emissoraParaEditar) {
            setFormData(emissoraParaEditar); 
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const emissorasSalvas = JSON.parse(localStorage.getItem('emissoras')) || [];
        const novasEmissoras = emissorasSalvas.map(emissora => 
            emissora.id === id ? { ...emissora, ...formData } : emissora
        );

        localStorage.setItem('emissoras', JSON.stringify(novasEmissoras));
        router.push('/novelas/emissoras');
    };

    return (
        <Pagina titulo="Editar Emissora">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="text-center mb-4">Editar Emissora</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="anoFundacao">
                                <Form.Label>Ano de Fundação</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="anoFundacao"
                                    value={formData.anoFundacao}
                                    onChange={handleChange}
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
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="emEfeito">
                                <Form.Check
                                    type="checkbox"
                                    name="emEfeito"
                                    label="Em Efeito"
                                    checked={formData.emEfeito}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit">
                                    Salvar Alterações
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Pagina>
    );
}
