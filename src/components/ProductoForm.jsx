import { useState, useEffect } from 'react';
import { productoService } from '../services/productoService';

const ProductoForm = ({ producto, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        costo: '',
        precio: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (producto) {
            setFormData({
                nombre: producto.nombre || '',
                costo: producto.costo || '',
                precio: producto.precio || ''
            });
        }
    }, [producto]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.nombre.trim()) {
            setError('El nombre es requerido');
            return false;
        }
        if (!formData.costo || formData.costo <= 0) {
            setError('El costo debe ser mayor a 0');
            return false;
        }
        if (!formData.precio || formData.precio <= 0) {
            setError('El precio debe ser mayor a 0');
            return false;
        }
        if (parseFloat(formData.precio) <= parseFloat(formData.costo)) {
            setError('El precio debe ser mayor al costo');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const productData = {
                nombre: formData.nombre.trim(),
                costo: parseFloat(formData.costo),
                precio: parseFloat(formData.precio)
            };

            if (producto && producto.id) {
                // Actualizar producto existente
                await productoService.updateProducto(producto.id, productData);
            } else {
                // Crear nuevo producto
                await productoService.createProducto(productData);
            }

            onSubmit();
        } catch (err) {
            setError('Error al guardar el producto');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="producto-form">
            <h2>{producto ? 'Editar Producto' : 'Crear Producto'}</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre del Producto:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="costo">Costo:</label>
                    <input
                        type="number"
                        id="costo"
                        name="costo"
                        value={formData.costo}
                        onChange={handleChange}
                        step="0.01"
                        min="0.01"
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="precio">Precio:</label>
                    <input
                        type="number"
                        id="precio"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        step="0.01"
                        min="0.01"
                        required
                        disabled={loading}
                    />
                </div>

                {formData.costo && formData.precio && (
                    <div className="ganancia-preview">
                        <strong>Ganancia estimada: ${(parseFloat(formData.precio) - parseFloat(formData.costo)).toFixed(2)}</strong>
                    </div>
                )}

                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : (producto ? 'Actualizar' : 'Crear')}
                    </button>
                    <button 
                        type="button" 
                        onClick={onCancel}
                        className="btn btn-secondary"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductoForm;