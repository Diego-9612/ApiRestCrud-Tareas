import { useState } from "react";
import axios from "axios";

function CreateTareas({ onAddTarea }) {
    const [formData, setFormData] = useState({
        nombre: "",
        prioridad: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const validateForm = () => {
        const errors = {};

        if (formData.nombre.trim().length < 5) {
            errors.nombre = "El nombre debe tener al menos 5 caracteres.";
        }

        const prioridad = parseInt(formData.prioridad);
        if (isNaN(prioridad) || prioridad <= 0) {
            errors.prioridad = "El número de horas debe ser un número positivo.";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Limpiar errores cuando se modifica un campo
        if (validationErrors[name]) {
            setValidationErrors((prev) => ({
                ...prev,
                [name]: null,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage("");

        if (!validateForm()) return;

        setLoading(true);

        const dataToSend = {
            nombre: formData.nombre,
            prioridad: parseInt(formData.prioridad),
        };

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/tareas/`, dataToSend);
            setSuccessMessage("Tarea creado exitosamente.");
            setFormData({ nombre: "", prioridad: "" });
            if (onAddTarea) onAddTarea();
        } catch (err) {
            console.error("Error al crear un nuevo Tarea:", err);
            setError("No se pudo crear el Tarea. Inténtalo nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (

        <main className="flex flex-col items-center justify-center w-2/3 p-6 mx-auto space-y-4 text-orange-500 bg-white border rounded-lg shadow-md h-2/3">
            <span className="flex flex-col items-center justify-center">
                <h2 className="text-3xl font-black">CREA UNA TAREA</h2>
                <p className="text-xl font-medium">
                    Ingresa la información necesaria para crear una Tarea
                </p>
            </span>

            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6 bg-[#f3ead9] p-14 rounded-xl justify-center items-center">
                <div className="w-full">
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full p-3 px-10 rounded-xl placeholder:text-orange-300 focus:border-orange-500"
                        placeholder="Ingresa el nombre de la tarea"
                    />
                    {validationErrors.nombre && (
                        <p className="mt-2 text-sm text-center text-red-500">{validationErrors.nombre}</p>
                    )}
                </div>

                <div className="w-full">
                    <input
                        type="number"
                        name="prioridad"
                        value={formData.prioridad}
                        onChange={handleChange}
                        className="w-full p-3 px-10 rounded-xl placeholder:text-orange-300 focus:border-orange-500"
                        placeholder="Ingresa la prioridad de la tarea"
                    />
                    {validationErrors.prioridad && (
                        <p className="mt-2 text-sm text-center text-red-500">{validationErrors.prioridad}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-1/3 px-4 py-3 font-bold text-white duration-100 bg-orange-500 rounded-lg hover:bg-orange-700"
                >
                    {loading ? "Creando..." : "Crear Tarea"}
                </button>

                {error && <p className="mt-2 text-red-600">{error}</p>}
                {successMessage && <p className="mt-2 text-green-600">{successMessage}</p>}
            </form>
        </main>

    );
}

export { CreateTareas };