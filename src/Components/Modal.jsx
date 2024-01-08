import ReactModal from 'react-modal';
import './Modal.css'

const Modal = ({ isModalOpen, setModalOpen }) => (
  <ReactModal
    isOpen={isModalOpen}
    onRequestClose={() => setModalOpen(false)}
    contentLabel="Login Required"
    className="custom-modal"
    overlayClassName="custom-overlay"
  >
    <div className='custom-modal'>
      <h2>Login Required</h2>
      <p>Please login to trade.</p>
      <button onClick={() => setModalOpen(false)}>Close</button>
    </div>
  </ReactModal>
);

export default Modal;
