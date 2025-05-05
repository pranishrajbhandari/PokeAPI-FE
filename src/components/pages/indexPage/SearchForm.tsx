import { Form, Row } from "react-bootstrap";

interface ISearchFormProps {
  searchText: string | undefined;
  onChange: (value: string) => void;
}

const SearchForm = ({ searchText, onChange }: ISearchFormProps) => {
  return (
    <Row>
      <div className="mt-4 mb-4 d-flex justify-content-center">
        <Form.Control
          type="text"
          value={searchText}
          onChange={(e) => onChange(e.currentTarget.value)}
          className="w-50"
          placeholder="Search Here"
        />
      </div>
    </Row>
  );
};

export default SearchForm;
