'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Pagina from "@/components/Pagina";
import { useRouter } from 'next/navigation'; 
import { useParams } from 'next/navigation'; 

export default function CriarEditarEmissora() {
    const router = useRouter();
    const { id } = useParams(); 
    const [formData, setFormData] = useState({
        nome: '',
        anoFundacao: '',
        categoria: '',
        emEfeito: false,
    });

    useEffect(() => {
        if (id) {
            const emissorasSalvas = JSON.parse(localStorage.getItem('emissoras')) || [];
            const emissoraParaEditar = emissorasSalvas.find((emissora) => emissora.id === id);
            if (emissoraParaEditar) {
                setFormData(emissoraParaEditar); 
            }
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let emissorasSalvas = JSON.parse(localStorage.getItem('emissoras')) || [];

        if (id) {
            emissorasSalvas = emissorasSalvas.map((emissora) => 
                emissora.id === id ? { ...emissora, ...formData } : emissora
            );
        } else {
            formData.id = new Date().getTime().toString(); // Gera um ID único
            emissorasSalvas.push(formData);
        }

        localStorage.setItem('emissoras', JSON.stringify(emissorasSalvas));

        router.push('/novelas/emissoras');
    };

    return (
        <Pagina titulo={id ? "Editar Emissora" : "Criar Emissora"}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="text-center mb-4">{id ? "Editar Emissora" : "Criar Emissora"}</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    placeholder="Digite o nome da emissora"
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
                                    placeholder="Digite o ano de fundação da emissora"
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
                                    placeholder="Digite a categoria da emissora"
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
