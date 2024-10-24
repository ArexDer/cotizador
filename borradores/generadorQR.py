import segno

# Función para crear un código QR
def crear_codigo_qr(direccion):
    # Crear el código QR
    qr = segno.make(direccion)

    # Guardar la imagen
    qr.save("contratoBorrador.png")

# Ejemplo de uso
direccion = "https://uceedu-my.sharepoint.com/:b:/g/personal/darivas_uce_edu_ec/EcRZi6OjnORMoPr-8YeZyf8BNdNZBYfw5iZwjwMX8U9m5g?e=8gFsTX"  # Reemplaza con la dirección que desees
crear_codigo_qr(direccion)
print("Código QR generado y guardado como 'contratoBorrador.png'")
