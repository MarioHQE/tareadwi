import apiaxios from '../api/apiaxios';

const api = apiaxios();

export const productoService = {
    // Obtener todos los productos
    getAllProductos: async () => {
        try {
            const response = await api.get('/productos');
            return response.data;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    },

    // Obtener producto por ID
    getProductoById: async (id) => {
        try {
            const response = await api.get(`/productos/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener producto:', error);
            throw error;
        }
    },

    // Crear nuevo producto
    createProducto: async (producto) => {
        try {
            const response = await api.post('/productos', producto);
            return response.data;
        } catch (error) {
            console.error('Error al crear producto:', error);
            throw error;
        }
    },

    // Actualizar producto
    updateProducto: async (id, producto) => {
        try {
            const response = await api.put(`/productos/${id}`, producto);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            throw error;
        }
    },

    // Eliminar producto
    deleteProducto: async (id) => {
        try {
            await api.delete(`/productos/${id}`);
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    },

    // Obtener ganancia total
    getGananciaTotal: async () => {
        try {
            const response = await api.get('/productos/ganancia');
            return response.data;
        } catch (error) {
            console.error('Error al obtener ganancia:', error);
            throw error;
        }
    },

    // Obtener total de productos
    getTotalProductos: async () => {
        try {
            const response = await api.get('/productos/total');
            return response.data;
        } catch (error) {
            console.error('Error al obtener total:', error);
            throw error;
        }
    }
};