'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Pagina from "@/components/Pagina";
import { useRouter } from 'next/navigation'; 
import { useParams } from 'next/navigation'; 

export default function CriarEditarCuriosidade() {
    const router = useRouter();
    const { id } = useParams(); 
    const [formData, setFormData] = useState({
        descricao: '',
    });

    useEffect(() => {
        if (id) {
            const curiosidadesSalvas = JSON.parse(localStorage.getItem('curiosidades')) || [];
            const curiosidadeParaEditar = curiosidadesSalvas.find((curiosidade) => curiosidade.id === id);
            if (curiosidadeParaEditar) {
                setFormData(curiosidadeParaEditar); 
            }
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let curiosidadesSalvas = JSON.parse(localStorage.getItem('curiosidades')) || [];

        if (id) {
            curiosidadesSalvas = curiosidadesSalvas.map((curiosidade) => 
                curiosidade.id === id ? formData : curiosidade
            );
        } else {
            formData.id = new Date().getTime().toString();
            curiosidadesSalvas.push(formData);
        }

        localStorage.setItem('curiosidades', JSON.stringify(curiosidadesSalvas));

        router.push('/novelas/curiosidades');
    };

    return (
        <Pagina titulo={id ? "Editar Curiosidade" : "Criar Curiosidade"}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="text-center mb-4">{id ? "Editar Curiosidade" : "Criar Curiosidade"}</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="descricao">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="descricao"
                                    value={formData.descricao}
                                    onChange={handleChange}
                                    placeholder="Digite a descrição da curiosidade"
                                    required
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
