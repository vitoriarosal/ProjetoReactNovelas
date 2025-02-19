'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Pagina from "@/components/Pagina";
import { useRouter, useParams } from 'next/navigation'; 
export default function EditarCuriosidade() {
    const router = useRouter();
    const { id } = useParams(); 
    const [formData, setFormData] = useState({
        descricao: '',
    });

    useEffect(() => {
        const curiosidadesSalvas = JSON.parse(localStorage.getItem('curiosidades')) || [];
        const curiosidadeParaEditar = curiosidadesSalvas.find((curiosidade) => curiosidade.id === id);
        if (curiosidadeParaEditar) {
            setFormData(curiosidadeParaEditar); 
        } else {
            alert('Curiosidade não encontrada');
            router.push('/novelas/curiosidades');
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let curiosidadesSalvas = JSON.parse(localStorage.getItem('curiosidades')) || [];

        curiosidadesSalvas = curiosidadesSalvas.map((curiosidade) => 
            curiosidade.id === id ? { ...curiosidade, ...formData } : curiosidade
        );

        localStorage.setItem('curiosidades', JSON.stringify(curiosidadesSalvas));

        router.push('/novelas/curiosidades');
    };

    return (
        <Pagina titulo="Editar Curiosidade">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="text-center mb-4">Editar Curiosidade</h1>
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
