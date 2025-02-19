'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Pagina from "@/components/Pagina";
import { useRouter } from 'next/navigation'; 
import { useParams } from 'next/navigation'; 

export default function CriarEditarNovela() {
    const router = useRouter();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        titulo: '',
        genero: '',
        anoLancamento: '',
    });

    useEffect(() => {
        if (id) {
            const novelasSalvas = JSON.parse(localStorage.getItem('novelas')) || [];
            const novelaParaEditar = novelasSalvas.find((novela) => novela.id === id);
            if (novelaParaEditar) {
                setFormData(novelaParaEditar); 
            }
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let novelasSalvas = JSON.parse(localStorage.getItem('novelas')) || [];

        if (id) {
            novelasSalvas = novelasSalvas.map((novela) => 
                novela.id === id ? { ...novela, ...formData } : novela
            );
        } else {
            formData.id = new Date().getTime().toString(); 
            novelasSalvas.push(formData);
        }

        localStorage.setItem('novelas', JSON.stringify(novelasSalvas));

        router.push('/novelas/novelas');
    };

    return (
        <Pagina titulo={id ? "Editar Novela" : "Criar Novela"}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="text-center mb-4">{id ? "Editar Novela" : "Criar Novela"}</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="titulo">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="titulo"
                                    value={formData.titulo}
                                    onChange={handleChange}
                                    placeholder="Digite o título da novela"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="genero">
                                <Form.Label>Gênero</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="genero"
                                    value={formData.genero}
                                    onChange={handleChange}
                                    placeholder="Digite o gênero da novela"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="anoLancamento">
                                <Form.Label>Ano de Lançamento</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="anoLancamento"
                                    value={formData.anoLancamento}
                                    onChange={handleChange}
                                    placeholder="Digite o ano de lançamento"
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
