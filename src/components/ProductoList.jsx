import { useState, useEffect } from 'react';
import { productoService } from '../services/productoService';
import ProductoForm from './ProductoForm';
import './ProductoList.css';

const ProductoList = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProducto, setEditingProducto] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [gananciaTotal, setGananciaTotal] = useState(0);
    const [totalProductos, setTotalProductos] = useState(0);

    useEffect(() => {
        loadProductos();
        loadEstadisticas();
    }, []);

    const loadProductos = async () => {
        try {
            setLoading(true);
            const data = await productoService.getAllProductos();
            setProductos(data);
        } catch (err) {
            setError('Error al cargar los productos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadEstadisticas = async () => {
        try {
            const ganancia = await productoService.getGananciaTotal();
            const total = await productoService.getTotalProductos();
            setGananciaTotal(ganancia);
            setTotalProductos(total);
        } catch (err) {
            console.error('Error al cargar estadísticas:', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                await productoService.deleteProducto(id);
                await loadProductos();
                await loadEstadisticas();
            } catch (err) {
                setError('Error al eliminar el producto');
                console.error(err);
            }
        }
    };

    const handleEdit = (producto) => {
        setEditingProducto(producto);
        setShowForm(true);
    };

    const handleCreate = () => {
        setEditingProducto(null);
        setShowForm(true);
    };

    const handleFormSubmit = async () => {
        setShowForm(false);
        setEditingProducto(null);
        await loadProductos();
        await loadEstadisticas();
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingProducto(null);
    };

    if (loading) return <div className="loading">Cargando productos...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="producto-container">
            <h1>Gestión de Productos</h1>
            
            {/* Estadísticas */}
            <div className="estadisticas">
                <div className="stat-card">
                    <h3>Total Productos</h3>
                    <p>{totalProductos}</p>
                </div>
                <div className="stat-card">
                    <h3>Ganancia Total</h3>
                    <p>${gananciaTotal.toFixed(2)}</p>
                </div>
            </div>

            {/* Botón para crear producto */}
            <div className="actions">
                <button onClick={handleCreate} className="btn btn-primary">
                    Agregar Producto
                </button>
            </div>

            {/* Formulario modal */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <ProductoForm
                            producto={editingProducto}
                            onSubmit={handleFormSubmit}
                            onCancel={handleFormCancel}
                        />
                    </div>
                </div>
            )}

            {/* Lista de productos */}
            <div className="productos-grid">
                {productos.length === 0 ? (
                    <p>No hay productos registrados</p>
                ) : (
                    productos.map(producto => (
                        <div key={producto.id} className="producto-card">
                            <h3>{producto.nombre}</h3>
                            <div className="producto-info">
                                <p><strong>Costo:</strong> ${producto.costo}</p>
                                <p><strong>Precio:</strong> ${producto.precio}</p>
                                <p><strong>Ganancia:</strong> ${(producto.precio - producto.costo).toFixed(2)}</p>
                            </div>
                            <div className="producto-actions">
                                <button 
                                    onClick={() => handleEdit(producto)}
                                    className="btn btn-secondary"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => handleDelete(producto.id)}
                                    className="btn btn-danger"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductoList;