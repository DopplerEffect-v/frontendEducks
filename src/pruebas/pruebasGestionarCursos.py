import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import platform


class usando_unittest(unittest.TestCase):

    def setUp(self):
        if (platform.system() == "Linux"):
            self.driver = webdriver.Chrome(executable_path=r"./chromedriver")
        else:
            self.driver = webdriver.Chrome(
                executable_path=r"./chromedriver.exe")

    def test_Ingreso_Correcto_Resultado_Estudiante(self):
        driver = self.driver
        # driver.get("http://54.162.5.155/")
        driver.get("http://localhost:3000/")

        driver.maximize_window()
        time.sleep(1)

        usuario = driver.find_element_by_name("email")
        password = driver.find_element_by_name("password")
        usuario.send_keys("renzo.bedrinana@pucp.edu.pe")
        password.send_keys("renzo123")
        password.send_keys(Keys.RETURN)
        time.sleep(3)
        # prueba
        comboBoxRoles = driver.find_element_by_id("comboBoxRoles")
        comboBoxRoles.click()
        time.sleep(1)

        responsableProg = driver.find_element_by_id("2")
        responsableProg.click()
        time.sleep(3)


        buttonGestionarCursos = driver.find_element_by_id("buttonGestionarCursos")
        buttonGestionarCursos.click()
        time.sleep(1)

        buttonNuevo = driver.find_element_by_id("botonNuevo")
        buttonNuevo.click()
        time.sleep(1)

        inputCodigo = driver.find_element_by_id("codigonuevo")
        inputNombre = driver.find_element_by_id("nombreCurso")
        
        inputCodigo.send_keys("INF240")
        inputNombre.send_keys("Sist Op")
        inputNombre.send_keys(Keys.ENTER)
        time.sleep(5)        
        
        buttonEditar = driver.find_element_by_id("btnEditar_INF240")
        buttonEditar.click()
        time.sleep(1)        

        inputNombre = driver.find_element_by_id("nomedit")
        driver.execute_script("arguments[0].scrollIntoView();", inputNombre)
        inputNombre.send_keys(Keys.CONTROL + "a")
        inputNombre.send_keys(Keys.DELETE)
        inputNombre.send_keys("Sistemas Operativos")
        inputNombre.send_keys(Keys.ENTER)
        time.sleep(5)

        inputBusqueda = driver.find_element_by_id("inputBusqueda")
        inputBusqueda.send_keys("INF240") 
        inputBusqueda.send_keys(Keys.ENTER)
        time.sleep(3)

        textoCurso = driver.find_element_by_id("nombre")
        assert textoCurso.text == "Sistemas Operativos"

        buttonEliminar= driver.find_element_by_id("btnEliminar_INF240")
        buttonEliminar.click()
        time.sleep(1)       

        buttonAceptar= driver.find_element_by_id("btnAceptar")
        buttonAceptar.click()
        time.sleep(1)

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
