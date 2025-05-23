import { useState, useEffect } from "react";
import axios from "axios";

function ListTareas() {
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/tareas/`);
                setTareas(response.data);
            } catch (err) {
                console.error("Error al obtener los cursos:", err);
                setError("No se pudo cargar la lista de cursos. Inténtalo nuevamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []); 

    if (loading) return <p className="text-center text-green-500">Cargando cursos....</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        
            <main className="flex flex-col items-center justify-center w-2/3 gap-5 p-6 mx-auto text-orange-500 bg-white border rounded-lg shadow-md h-2/3">
                <span className="flex flex-col items-center justify-center gap-2">
                    <h2 className="text-3xl font-black">Listar Tareas</h2>
                    <p className="text-xl font-medium"> Esta es nuestra lista de tareas pendientes </p>
                </span>
                {tareas.length === 0 ? (
                    <p className="text-center text-red-500">No hay tareas disponibles</p>
                ) : (
                    <ul className="flex flex-col items-center justify-center w-full space-y-4">
                        {tareas.map((tarea) => (
                            <li key={tarea.id} className="w-full flex items-center justify-between p-4 bg-[#f3ead9] shadow-sm rounded-xl">
                                <div>
                                    <p className="text-lg font-bold uppercase">{tarea.nombre}</p>
                                    <p className="text-sm font-light">Prioridad: {tarea.prioridad}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="px-4 py-2 text-white duration-100 bg-orange-500 rounded hover:bg-orange-700">
                                        Eliminar
                                    </button>
                                    <button className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">
                                        Editar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
    
    );
}

export { ListTareas };