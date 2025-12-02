import React, { useEffect } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { Calendar, Users, Zap, ArrowRight, MapPin } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap');

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #0f172a;
    color: #f8fafc;
  }

  .hero-section {
    min-height: 90vh;
    background: radial-gradient(circle at top right, #6366f1 0%, transparent 40%),
                radial-gradient(circle at bottom left, #ec4899 0%, transparent 40%);
    overflow: hidden;
  }

  .hero-blob {
    position: absolute;
    width: 500px;
    height: 500px;
    background: linear-gradient(135deg, #6366f1, #ec4899);
    filter: blur(80px);
    opacity: 0.3;
    border-radius: 50%;
    z-index: -1;
  }

  .hero-title {
    font-weight: 800;
    background: linear-gradient(to right, #fff, #a5b4fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .feature-card {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    border-radius: 16px;
  }
`;

const Home = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <style>{styles}</style>

      <div className="pt-5">
        <div className="hero-blob" style={{ top: "-10%", right: "-10%" }}></div>
        <div className="hero-blob" style={{ bottom: "10%", left: "-10%", background: "#3b82f6" }}></div>

        <div className="hero-section d-flex align-items-center">
          <Container>
            <Row className="align-items-center gy-5">

              <Col lg={7}>
                <Badge className="border border-white text-white mb-3 px-3 py-2 rounded-pill">
                  🚀 The #1 Platform for Event Management
                </Badge>

                <h1 className="hero-title display-3 mb-4">
                  Unlock Unforgettable <br /> Experiences Today.
                </h1>

                <p className="opacity-75 fs-5" style={{ maxWidth: "600px" }}>
                  Discover amazing events, connect with like-minded people, and create memories that last a lifetime.
                </p>

                <div className="d-flex gap-3">
                  <Button className="btn-gradient" size="lg" href="/events">
                    Explore Events <ArrowRight size={20} className="ms-2" />
                  </Button>
                  
                </div>
              </Col>

              <Col lg={5}>
                <Card className="bg-dark text-white border-0 shadow-lg p-3">
                  <Card.Img 
                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Badge bg="danger" className="mb-2">MUSIC</Badge>
                    <h5>Neon Nights Festival</h5>
                    <div className="d-flex align-items-center gap-2 text-muted small">
                      <MapPin size={14} /> New York City
                    </div>
                  </Card.Body>
                </Card>
              </Col>

            </Row>
          </Container>
        </div>

      </div>
    </>
  );
};

export default Home;
