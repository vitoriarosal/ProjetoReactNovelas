'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Pagina from "@/components/Pagina";
import { useRouter } from 'next/navigation'; 
import { useParams } from 'next/navigation'; 

export default function CriarEditarAutor() {
    const router = useRouter();
    const { id } = useParams(); 
    const [formData, setFormData] = useState({
        nomeAutor: '',
        biografia: '',
        foto: '',
    });

    useEffect(() => {
        if (id) {
            const autoresSalvos = JSON.parse(localStorage.getItem('autores')) || [];
            const autorParaEditar = autoresSalvos.find((autor) => autor.id === id);
            if (autorParaEditar) {
                setFormData(autorParaEditar); 
            }
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onloadend = () => {
            setFormData({ ...formData, foto: reader.result }); 
        };
        if (file) {
            reader.readAsDataURL(file); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let autoresSalvos = JSON.parse(localStorage.getItem('autores')) || [];

        if (id) {
            autoresSalvos = autoresSalvos.map((autor) => 
                autor.id === id ? formData : autor
            );
        } else {
            formData.id = new Date().getTime().toString(); 
            autoresSalvos.push(formData);
        }

        localStorage.setItem('autores', JSON.stringify(autoresSalvos));

        router.push('/novelas/autores');
    };

    return (
        <Pagina titulo={id ? "Editar Autor" : "Criar Autor"}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="text-center mb-4">{id ? "Editar Autor" : "Criar Autor"}</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="nomeAutor">
                                <Form.Label>Nome do Autor</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nomeAutor"
                                    value={formData.nomeAutor}
                                    onChange={handleChange}
                                    placeholder="Digite o nome do autor"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="biografia">
                                <Form.Label>Biografia</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="biografia"
                                    value={formData.biografia}
                                    onChange={handleChange}
                                    placeholder="Escreva uma breve biografia"
                                    required
                                />
                            </Form.Group>

                            {/* Campo para upload de foto */}
                            <Form.Group className="mb-3" controlId="foto">
                                <Form.Label>Foto do Autor</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
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
