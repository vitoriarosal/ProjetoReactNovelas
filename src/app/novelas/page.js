'use client'; // Para habilitar a interatividade no cliente

import Pagina from "@/components/Pagina";
import { Carousel, Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/navigation';



export default function Page() {
    const router = useRouter();

    const handleCreateClick = (route) => {
        router.push(route); 
    };

    return (
        <Pagina titulo="Novelas e Cartões">
            {/* Carrossel de fotos */}
            <Container className="my-3">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://images.justwatch.com/backdrop/306773628/s640/a-forca-do-querer.%7Bformat%7D"
                            alt="A Força do Querer"
                        />
                        <Carousel.Caption>
                            <p>Novelas são uma forma de entretenimento popular que cativa milhões de espectadores em todo o mundo.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://www.otvfoco.com.br/wp-content/uploads/2017/04/getImageObj-17-horz.jpg"
                            alt="Segunda imagem do carrossel"
                        />
                        <Carousel.Caption>
                            <p>As histórias emocionantes e os personagens cativantes fazem das novelas um sucesso garantido.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://observatoriodatv.com.br/wp-content/uploads/2020/11/a-vida-da-gente.jpg"
                            alt="A Vida da Gente"
                        />
                        <Carousel.Caption>
                            <p>Cada novela traz uma nova perspectiva sobre a vida e o amor, sempre com reviravoltas surpreendentes.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>

            {/* Cards de Novelas */}
            <Container className="my-5">
                <Row xs={1} md={2} lg={3} className="g-4">
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="https://stcotvfoco.com.br/2017/04/281291.jpg" alt="A Força do Querer" />
                            <Card.Body>
                                <Card.Title>Novelas</Card.Title>
                                <Button variant="primary" className="me-2" onClick={() => handleCreateClick('/novelas/novelas')}>Ver novelas</Button>
                                <Button variant="success" onClick={() => handleCreateClick('/novelas/novelas/create')}>Criar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="https://ofuxico.com.br/img/upload/noticias/2017/05/21/os-dias-eram-assim-alice-e-renato-quase-se-encontram_294639_36.jpg" alt="Personagens" />
                            <Card.Body>
                                <Card.Title>Personagens</Card.Title>
                                <Button variant="primary" className="me-2" onClick={() => handleCreateClick('/novelas/personagens')}>Ver autores</Button>
                                <Button variant="success" onClick={() => handleCreateClick('/novelas/personagens/create')}>Criar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="https://cdn.statically.io/img/www.sobreavida.com.br/f=auto%2Cq=72/wp-content/uploads/2015/05/11256499_952660104779491_1525488535_n.jpg" alt="Autores" />
                            <Card.Body>
                                <Card.Title>Autores</Card.Title>
                                <Button variant="primary" className="me-2" onClick={() => handleCreateClick('/novelas/autores')}>Ver autores</Button>
                                <Button variant="success" onClick={() => handleCreateClick('/novelas/autores/create')}>Criar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="https://imagens.f5news.com.br/noticias/2023/01/ator-sergipano-e-o-p_2023-01-16154724.jpg" alt="Atores" />
                            <Card.Body>
                                <Card.Title>Atores</Card.Title>
                                <Button variant="primary" className="me-2" onClick={() => handleCreateClick('/novelas/atores')}>Ver autores</Button>
                                <Button variant="success" onClick={() => handleCreateClick('/novelas/atores/create')}>Criar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="https://bastidorestv.com/wp-content/uploads/2024/01/conheca-os-atores-mirins-da-primeira-fase-de-renascer-nova-novela-das-nove-da-globo-1024x708.jpg" alt="Curiosidades" />
                            <Card.Body>
                                <Card.Title>Curiosidades</Card.Title>
                                <Button variant="primary" className="me-2" onClick={() => handleCreateClick('/novelas/curiosidades')}>Ver autores</Button>
                                <Button variant="success" onClick={() => handleCreateClick('/novelas/curiosidades/create')}>Criar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/pt/c/cc/Melhores_do_Ano_%28Doming%C3%A3o_com_Huck%29.png" alt="Premiações" />
                            <Card.Body>
                                <Card.Title>Premiações</Card.Title>
                                <Button variant="primary" className="me-2" onClick={() => handleCreateClick('/novelas/premiacoes')}>Ver autores</Button>
                                <Button variant="success" onClick={() => handleCreateClick('/novelas/premiacoes/create')}>Criar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="https://n1entreter.com.br/wp-content/uploads/2019/04/emissorasflat.png" alt="Emissoras" />
                            <Card.Body>
                                <Card.Title>Emissoras</Card.Title>
                                <Button variant="primary" className="me-2" onClick={() => handleCreateClick('/novelas/emissoras')}>Ver emissoras</Button>
                                <Button variant="success" onClick={() => handleCreateClick('/novelas/emissoras/create')}>Criar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Pagina>
    );
}
