import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Button, Modal } from "react-bootstrap";

import PaginationComponent from "../../Core/Pagination/PaginationComponent";

const Home = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [moreContent, setMoreContent] = useState("");
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getData`, { params: { page: page + 1 } })
      .then((res) => {
        setData(res.data.data);
        if (page + 1 < res.data.totalPages) setHasNextPage(true);
        else setHasNextPage(false);
      })
      .catch((e) => console.log(e));
  }, [page]);

  const handleClose = () => setShow(false);
  const handleShow = (detum) => {
    setShow(true);
    setMoreContent(detum);
  };
  return (
    <div
      style={{
        height: "100%",
        background:
          "url(https://motionarray.imgix.net/preview-141192-Mi0B7jCQQ8-high_0001.jpg)",
        backgroundSize: "100% 100%",
      }}
    >
      <Container>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>{moreContent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{moreContent.body}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <h3 style={{ color: "#facd00" }} className="text-center py-2">
          KOO POSTS
        </h3>
        <div className="row">
          {data.map((detum) => {
            return (
              <div className="col-lg-3 col-12">
                <Card
                  style={{ width: "16rem", height: "200px", borderRadius: "15px" }}
                  className="mx-2 my-4 shadow"
                >
                  <Card.Body>
                    <Card.Title>
                      {detum.title.slice(0, 20)}
                      {detum.title.length > 20 && <span>...</span>}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {" "}
                      {detum.body.slice(0, 170)}
                      {detum.body.length > 170 && (
                        <span>
                          ...{" "}
                          <span
                            onClick={() => handleShow(detum)}
                            style={{ cursor: "pointer" }}
                          >
                            <u>show more</u>
                          </span>
                        </span>
                      )}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PaginationComponent
            page={page + 1}
            setPage={setPage}
            hasNextPage={hasNextPage}
          />
        </div>
      </Container>
    </div>
  );
};

export default Home;
