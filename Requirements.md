## 1. Contexto y objetivo

Proyecto de práctica para aprender **arquitectura hexagonal** en **NestJS**, mediante un ecommerce básico tipo Nike (catálogo de zapatillas con talla/color/stock). No incluye autenticación en esta primera entrega; el diseño debe dejar espacio para agregarla después sin reescribir el dominio.

## 2. Actores

| Actor | Descripción |
| --- | --- |
| Usuario | Navega el catálogo, arma carrito y genera un pedido, sin necesidad de cuenta. |
| Administrador | Gestiona catálogo, inventario y estado de pedidos. Rol funcional, no de seguridad (sin login por ahora). |

## 3. Requisitos funcionales (RF)

### Catálogo

- **RF01**: Listar productos con filtros (categoría, talla, color, rango de precio).
- **RF02**: Ver el detalle de un producto (variantes por talla/color, stock, imágenes, precio).
- **RF03**: Buscar productos por nombre.

### Carrito

- **RF04**: Agregar/quitar productos del carrito (talla/color específicos).
- **RF05**: Modificar cantidades y ver subtotal.

### Pedidos

- **RF06**: Confirmar compra (checkout) generando una orden — solo se pide nombre/email de contacto, sin cuenta.
- **RF07**: Ver el detalle de un pedido por su ID.
- **RF08**: Actualizar el estado de un pedido (pendiente → pagado → enviado → entregado) — endpoint administrativo.

### Administración (CRUD)

- **RF09**: CRUD de productos.
- **RF10**: CRUD de variantes (talla/color/stock) asociadas a un producto.
- **RF11**: Actualización de stock (manual, y automática al confirmar un pedido).

## 4. Requisitos no funcionales (RNF)

- **RNF01 – Mantenibilidad**: el dominio no depende de NestJS ni del ORM.
- **RNF03 – Documentación**: API documentada con Swagger, README claro de cómo levantar el proyecto.
- **RNF04 – Testabilidad**: la lógica de dominio debe poder testearse sin base de datos ni HTTP.
- **RNF05 – Consistencia de datos**: el stock no puede quedar negativo (regla validada en el dominio).

## 5. Historias de usuario

| # | Historia | RF relacionado | Prioridad | Estado |
| --- | --- | --- | --- | --- |
| HU01 | Como usuario, quiero filtrar zapatillas por talla y color, para encontrar rápido lo que me sirve. | RF01 | Alta | Backlog |
| HU02 | Como usuario, quiero ver el detalle de un producto con sus variantes, para elegir talla y color antes de comprar. | RF02 | Alta | Backlog |
| HU03 | Como usuario, quiero buscar productos por nombre, para encontrar un modelo específico. | RF03 | Media | Backlog |
| HU04 | Como usuario, quiero agregar productos a un carrito, para reunir lo que quiero comprar. | RF04 | Alta | Backlog |
| HU05 | Como usuario, quiero modificar cantidades en el carrito, para ajustar mi compra antes de pagar. | RF05 | Media | Backlog |
| HU06 | Como usuario, quiero confirmar mi compra sin crear una cuenta, para agilizar el proceso. | RF06 | Alta | Backlog |
| HU07 | Como usuario, quiero consultar mi pedido por su ID, para revisar su estado. | RF07 | Media | Backlog |
| HU08 | Como administrador, quiero actualizar el estado de un pedido, para reflejar el progreso del envío. | RF08 | Alta | Backlog |
| HU09 | Como administrador, quiero crear, editar y eliminar productos, para mantener el catálogo actualizado. | RF09 | Alta | Backlog |
| HU10 | Como administrador, quiero gestionar variantes de talla/color/stock, para controlar el inventario real. | RF10 | Alta | Backlog |
| HU11 | Como administrador, quiero que el stock se descuente automáticamente al confirmar un pedido, para evitar vender productos agotados. | RF11 | Alta | Backlog |
| HU12 | Como usuario, quiero que se simule un pago al hacer checkout, para completar el flujo de compra. | RF12 | Media | Backlog |

## 6. Alcance

### MVP (primera entrega)

Catálogo (listar/ver/buscar), carrito, checkout sin login, pedidos (crear/ver/cambiar estado), CRUD de productos y variantes.

### Backlog explícito (para después)

- Autenticación (JWT)
- Roles reales (cliente vs administrador vía login)
- Reviews / ratings
- Wishlist
- Múltiples direcciones de envío
- Notificaciones por email

## 7. Próximos pasos

- [ ]  Fase 2: Modelado del dominio y MER
- [ ]  Fase 3: Diseño de arquitectura hexagonal (puertos y adaptadores)
- [ ]  Fase 4: Persistencia y base de datos
- [ ]  Fase 5: Contratos de API (Swagger)
- [ ]  Fase 6: Estructura del proyecto en NestJS
- [ ]  Fase 7: Testing y calidad
- [ ]  Fase 8: Documentación y prácticas de equipo