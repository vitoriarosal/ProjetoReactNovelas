'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Pagina from "@/components/Pagina";
import { useRouter } from 'next/navigation'; 
import { useParams } from 'next/navigation'; 

export default function CriarEditarAtor() {
    const router = useRouter();
    const { id } = useParams(); 
    const [formData, setFormData] = useState({
        nome: '',
        dataNascimento: '',
        nacionalidade: '',
        foto: '',
    });

    useEffect(() => {
        if (id) {
            const atoresSalvos = JSON.parse(localStorage.getItem('atores')) || [];
            const atorParaEditar = atoresSalvos.find((ator) => ator.id === id);
            if (atorParaEditar) {
                setFormData(atorParaEditar); 
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

        let atoresSalvos = JSON.parse(localStorage.getItem('atores')) || [];

        if (id) {
            atoresSalvos = atoresSalvos.map((ator) => 
                ator.id === id ? formData : ator
            );
        } else {
            formData.id = new Date().getTime().toString(); 
            atoresSalvos.push(formData);
        }

        localStorage.setItem('atores', JSON.stringify(atoresSalvos));

        router.push('/novelas/atores');
    };

    return (
        <Pagina titulo={id ? "Editar Ator" : "Criar Ator"}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h1 className="text-center mb-4">{id ? "Editar Ator" : "Criar Ator"}</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome do Ator</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    placeholder="Digite o nome do ator"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="dataNascimento">
                                <Form.Label>Data de Nascimento</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dataNascimento"
                                    value={formData.dataNascimento}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="nacionalidade">
                                <Form.Label>Nacionalidade</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nacionalidade"
                                    value={formData.nacionalidade}
                                    onChange={handleChange}
                                    placeholder="Digite a nacionalidade do ator"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="foto">
                                <Form.Label>Foto do Ator</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                {formData.foto && <img src={formData.foto} alt="Foto do Ator" className="img-thumbnail mt-2" style={{ width: '100px' }} />}
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
