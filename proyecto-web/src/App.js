import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//componentes
import RecoveryPassword from "./components/auth/RecoveryPassword";
import Login from "./components/auth/Login";
import NotFound from "./components/pages/NotFound";
import Inicio from "./components/pages/Inicio";
import Perfil from "./components/pages/Perfil";
import Activos from "./components/pages/activos/Activos";
import Reportes from "./components/pages/reportes/Reportes";
import Alertas from "./components/pages/alertas/Alertas";
import Ubicaciones from "./components/pages/ubicaciones/Ubicaciones";
import Usuarios from "./components/pages/usuarios/Usuarios";
//Autenticacion
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autentificacion/authState";
import UsuarioState from "./context/usuarios/usuarioState";
import UbicacionState from "./context/ubicaciones/ubicacionState";
import ActivosState from "./context/activos/activosState";
import AlertaActivoState from "./context/alertaActivos/alertaActivoState";
import ConfigDesingState from "./context/configDesing/configDesingState";
import Config from "./components/pages/Config";

function App() {
  return (
    <>
      {/* context */}
      <AlertaState>
        <AuthState>
          <UsuarioState>
            <UbicacionState>
              <ActivosState>
                <AlertaActivoState>
                  <ConfigDesingState>
                    {/* Rutas */}

                    <Router>
                      <Routes>
                        <Route exact path="/" element={<Login />} />
                        <Route
                          exact
                          path="/recovery-password"
                          element={<RecoveryPassword />}
                        />
                        <Route exact path="/inicio" element={<Inicio />} />
                        <Route exact path="/perfil" element={<Perfil />} />
                        <Route exact path="/activos" element={<Activos />} />
                        <Route exact path="/reportes" element={<Reportes />} />
                        <Route exact path="/alertas" element={<Alertas />} />
                        <Route
                          exact
                          path="/configuracion"
                          element={<Config />}
                        />
                        <Route
                          exact
                          path="/ubicaciones"
                          element={<Ubicaciones />}
                        />
                        <Route exact path="/usuarios" element={<Usuarios />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Router>
                    {/* fin Rutas */}
                  </ConfigDesingState>
                </AlertaActivoState>
              </ActivosState>
            </UbicacionState>
          </UsuarioState>
        </AuthState>
      </AlertaState>
      {/* fin context */}
    </>
  );
}

export default App;
