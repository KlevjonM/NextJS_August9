import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ConfirmDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleConfirm = () => {
    alert(`Deleted book with id: ${id}`);
    navigate('/');
  };

  return (
    <div>
      <h2 className="my-4">Confirm Delete</h2>
      <p>Are you sure you want to delete this book?</p>
      <button onClick={handleConfirm} className="btn btn-danger">
        <i className="fas fa-check"></i> Yes
      </button>
      <button onClick={() => navigate('/')} className="btn btn-secondary">
        <i className="fas fa-times"></i> No
      </button>
    </div>
  );
}

export default ConfirmDelete;
