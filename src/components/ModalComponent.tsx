import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface Props {
    title : string,
    show : boolean,
    onHide : (value: number) => void,
    bodyContent : React.ReactNode
    message : string
}

export const ModalComponent = ({title, show, onHide, bodyContent, message } : Props) => {
    
    return (
        <Modal show={show} onHide={() => onHide(1)} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {bodyContent}

                {
                    message !== "" ? (
                        <div className="alert alert-warning" role="alert">
                        {message}
                      </div>
                    )
                    : null 
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onHide(1)}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={() => onHide(2)}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
