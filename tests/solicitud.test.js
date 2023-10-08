const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

describe('Pruebas para las rutas de solicitud', () => {
    // Prueba para la creación de una solicitud
    it('Debería crear una nueva solicitud', async () => {
      const response = await request.post('/saag/solicitud').send({
        tipoSolicitud: "vacaciones",
        asunto: "asunt",
        nomColaborador: "Nombre del colaborador",
        fechaSolicitud: "2023-10-10",
        firmaColaborador: "Base64FirmaColaborador",
        idColaborador: 5,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.asunto).toBe('asunt');
    });
    // Prueba para obtener todas las solicitudes
    it('Debería obtener todas las solicitudes', async () => {
      const response = await request.get('/saag/solicitudes');
      const numeroDeRegistros = response.body.length;
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(13);
      expect(numeroDeRegistros).toBeGreaterThan(1);
    });
    // Prueba para obtener una solicitud por ID
    it('Debería obtener una solicitud por ID', async () => {
      const solicitudId = 2;
      const response = await request.get(`/saag/solicitud/${solicitudId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.idSolicitud).toBe(solicitudId);
    });
  
  // Prueba para actualizar una solicitud por ID
  it('Debería actualizar una solicitud por ID', async () => {
    const solicitudId = 12;
    // Datos para la actualización
    const updatedData = {
        tipoSolicitud: "vacaciones",
        asunto: "asunt",
        nomColaborador: "Nombre del colaborador",
        fechaSolicitud: "2020-10-10",
        firmaColaborador: "Base64FirmaColaborador",
        idColaborador: 8,
    };
    const response = await request.put(`/saag/solicitud/${solicitudId}`).send(updatedData);
    expect(response.statusCode).toBe(200);
    expect(response.body.descripcion).toBe(updatedData.descripcion);
  });
  // Prueba para eliminar una solicitud por ID
  it('Debería eliminar una solicitud por ID', async () => {
    const solicitudId = 22;
    const response = await request.delete(`/saag/solicitud/${solicitudId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('La solicitud fue eliminada exitosamente');
  });
});
  