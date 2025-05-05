import { Button, Col, Row } from "react-bootstrap";
import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronLeft,
  ChevronRight,
} from "react-bootstrap-icons";
import { SetStateAction } from "react";

interface IPaginationComponentProps {
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

const PaginationComponent = ({
  page,
  setPage,
  totalPages,
  totalItems,
  itemsPerPage,
}: IPaginationComponentProps) => {
  const start = page * itemsPerPage + 1;
  const end = Math.min((page + 1) * itemsPerPage, totalItems);

  return (
    <Row className="mb-3 d-flex justify-content-between align-items-center">
      <Col xs="auto">
        <Button
          variant="outline-primary"
          disabled={page === 0}
          onClick={() => setPage(0)}
        >
          <ChevronDoubleLeft /> Start
        </Button>
        <Button
          className="mx-3"
          variant="outline-primary"
          disabled={page === 0}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        >
          <ChevronLeft /> Prev
        </Button>
      </Col>

      <Col xs="auto" className="text-center">
        <span>Showing {`${start}-${end} of ${totalItems}`}</span>
      </Col>

      <Col xs="auto">
        <Button
          variant="outline-primary"
          disabled={page >= totalPages - 1}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next <ChevronRight />
        </Button>
        <Button
          className="mx-3"
          variant="outline-primary"
          disabled={page >= totalPages - 1}
          onClick={() => setPage(totalPages - 1)}
        >
          Last <ChevronDoubleRight />
        </Button>
      </Col>
    </Row>
  );
};

export default PaginationComponent;
