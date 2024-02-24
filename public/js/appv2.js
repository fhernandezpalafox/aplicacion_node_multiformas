$(document).ready(function() {
    cargarEmpleados();

    // Manejar el envío del formulario para añadir o actualizar empleados
    $('form').on('submit', function(e) {
        e.preventDefault(); // Evitar el envío tradicional del formulario
        const empleadoData = {
            id: $('#id').val(), // Este campo es para identificar si es una actualización
            nombre: $('#nombre').val(),
            puesto: $('#puesto').val(),
            email: $('#email').val()
        };
        guardarEmpleado(empleadoData);
    });

    // Manejar el clic en el botón de eliminar (deberías adaptarlo a tu marcado HTML)
    // Suponiendo que tus botones de eliminar tienen una clase 'eliminar-empleado' y el ID del empleado como data-id
    $(document).on('click', '.eliminar-empleado', function() {
        const empleadoId = $(this).data('id');
        eliminarEmpleado(empleadoId);
    });
});

function cargarEmpleados() {
    $.ajax({
        url: '/empleadosv2/api',
        type: 'GET',
        success: function(response) {
            const empleados = response.empleados;
            let tablaEmpleados = '';
            empleados.forEach(function(empleado) {
                tablaEmpleados += `<tr class="bg-white border-b hover:bg-gray-100">
                        <td class="px-4 py-2 text-gray-800">${empleado.id}</td>
                        <td class="px-4 py-2 text-gray-800">${empleado.nombre}</td>
                        <td class="px-4 py-2 text-gray-800">${empleado.puesto}</td>
                        <td class="px-4 py-2 text-gray-800">${empleado.email}</td>
                        <td class="px-4 py-2 text-gray-800">
                          <button class="editar-empleado bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" data-id="${empleado.id}">Editar</button>
                          <button class="eliminar-empleado bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" data-id="${empleado.id}">Eliminar</button>
                        </td>
                    </tr>`;
            });
            $('table tbody').html(tablaEmpleados);
        },
        error: function(error) {
            console.error("Error al cargar los empleados:", error);
            toastr.error('Error al cargar los empleados.');
        }
    });
}

function guardarEmpleado(empleado) {
    $.ajax({
        url: '/empleadosv2/api/save',
        type: 'POST',
        data: empleado,
        success: function(response) {
            toastr.success(response.message);
            cargarEmpleados(); // Recargar la lista de empleados
            // Limpiar formulario
            $('#id').val('');
            $('#nombre').val('');
            $('#puesto').val('');
            $('#email').val('');
        },
        error: function(error) {
            console.error("Error al guardar el empleado:", error);
            toastr.error('Error al guardar el empleado.');
        }
    });
}

function eliminarEmpleado(id) {
    $.ajax({
        url: `/empleadosv2/api/delete/${id}`,
        type: 'DELETE',
        success: function(response) {
            toastr.success(response.message);
            cargarEmpleados(); // Recargar la lista de empleados
        },
        error: function(error) {
            console.error("Error al eliminar el empleado:", error);
            toastr.error('Error al eliminar el empleado.');
        }
    });
}


$(document).on('click', '.editar-empleado', function() {
    const empleadoId = $(this).data('id');
    $.ajax({
        url: `/empleadosv2/api/${empleadoId}`, // Asegúrate de tener esta ruta en el servidor para obtener los datos del empleado
        type: 'GET',
        success: function(response) {
            const empleado = response.empleado;
            $('#id').val(empleado.id); // Asegura que el campo 'id' se utilice para identificar la actualización
            $('#nombre').val(empleado.nombre);
            $('#puesto').val(empleado.puesto);
            $('#email').val(empleado.email);
        },
        error: function(error) {
            console.error("Error al obtener el empleado:", error);
            toastr.error('Error al cargar los datos del empleado para edición.');
        }
    });
});
