'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Pagina from "@/components/Pagina";
import { useRouter, useParams } from 'next/navigation'; 

export default function EditarPersonagem() {
    const router = useRouter();
    const { id } = useParams(); 
    const [formData, setFormData] = useState({
        nome: '',
        novelaId: '',
        atorId: '',
    });

    useEffect(() => {
        const personagensSalvos = JSON.parse(localStorage.getItem('personagens')) || [];
        const personagemParaEditar = personagensSalvos.find((personagem) => personagem.id === id);
        if (personagemParaEditar) {
            setFormData(personagemParaEditar); 
        } else {
            alert('Personagem não encontrado');
            router.push('/novelas/personagens');
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let personagensSalvos = JSON.parse(localStorage.getItem('personagens')) || [];

        personagensSalvos = personagensSalvos.map((personagem) => 
            personagem.id === id ? { ...personagem, ...formData } : personagem
        );

        localStorage.setItem('personagens', JSON.stringify(personagensSalvos));

        router.push('/novelas/personagens');
    };

    return (
        <Pagina titulo="Editar Personagem">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="text-center mb-4">Editar Personagem</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    placeholder="Digite o nome do personagem"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="novelaId">
                                <Form.Label>ID da Novela</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="novelaId"
                                    value={formData.novelaId}
                                    onChange={handleChange}
                                    placeholder="Digite o ID da novela"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="atorId">
                                <Form.Label>ID do Ator</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="atorId"
                                    value={formData.atorId}
                                    onChange={handleChange}
                                    placeholder="Digite o ID do ator"
                                    required
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
