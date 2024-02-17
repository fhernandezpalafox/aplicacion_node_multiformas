window.addEventListener('load', () => {
    function updateOnlineStatus(event) {
        if (navigator.onLine) {
            toastr.success('Estás en línea.');
        } else {
            toastr.error('No hay conexión a Internet.', 'Desconectado', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-full-width",
                timeOut: "0", // El toast permanecerá visible hasta que el usuario lo cierre
            });
        }

    }


    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Verificar al cargar si estamos desconectados
    updateOnlineStatus();
});
