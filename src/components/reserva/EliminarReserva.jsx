import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eliminarReserva, getReservaById } from '../../services/apiReservas';

const EliminarReserva = ({ reservaId }) => {
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const data = await getReservaById(reservaId);
        setReserva(data);
      } catch (error) {
        alert('Error al obtener la reserva');
      } finally {
        setLoading(false);
      }
    };
    fetchReserva();
  }, [reservaId]);

  const handleEliminar = async () => {
    setError('');
    try {
      await eliminarReserva(reservaId);
      alert('Reserva eliminada exitosamente');
      navigate('/reservas'); // Redirige a la lista de reservas
    } catch (error) {
      const msg = error.response?.data?.message || 'Error al eliminar la reserva';
      setError(msg);
    }
  };

  if (loading) return <div>Cargando reserva...</div>;
  if (!reserva) return <div>No se encontró la reserva.</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-red-600">Eliminar Reserva</h2>
      <p className="mb-4">¿Estás seguro que deseas eliminar la siguiente reserva?</p>
      <ul className="text-sm text-gray-700 space-y-1 mb-4">
        <li><b>Check-in:</b> {reserva.fechaCheckin}</li>
        <li><b>Check-out:</b> {reserva.fechaCheckout}</li>
        <li><b>Número de personas:</b> {reserva.numPersonas}</li>
        <li><b>Notas:</b> {reserva.notas}</li>
        <li><b>Estado:</b> {reserva.estadoReserva}</li>
        <li><b>ID Habitación:</b> {reserva.habitacion?.id}</li>
        <li><b>ID Huésped:</b> {reserva.huesped?.id}</li>
        <li><b>ID Usuario:</b> {reserva.usuario?.id}</li>
      </ul>
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => navigate('/reservas')}
          className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          onClick={handleEliminar}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default EliminarReserva;
