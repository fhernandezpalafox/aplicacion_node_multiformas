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
                tablaEmpleados += `<tr>
                                    <td>${empleado.id}</td>
                                    <td>${empleado.nombre}</td>
                                    <td>${empleado.puesto}</td>
                                    <td>${empleado.email}</td>
                                    <td><button class="eliminar-empleado" data-id="${empleado.id}">Eliminar</button></td>
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
