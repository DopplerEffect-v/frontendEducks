import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

class usando_unittest(unittest.TestCase):
    def setUp(self):
        self.driver= webdriver.Chrome(executable_path=r"./chromedriver.exe")
	
    def test_IngresoErroneoCamposObligatorios(self):
        #log
        driver= self.driver
        driver.get("http://54.162.5.155/")
        driver.maximize_window()
        time.sleep(1)

        usuario=driver.find_element_by_name("email")
        password=driver.find_element_by_name("password")
        usuario.send_keys("renzo.bedrinana@pucp.edu.pe")
        password.send_keys("renzo123")
        password.send_keys(Keys.RETURN)
        time.sleep(3)
        #prueba
        comboBoxRoles=driver.find_element_by_id("comboBoxRoles")
        comboBoxRoles.click()
        time.sleep(1)

        responsablePrograma=driver.find_element_by_id("2")
        responsablePrograma.click()
        time.sleep(3)
        #gol
        btnNuevo=driver.find_element_by_id("botonNuevo")
        btnNuevo.click()
        time.sleep(3)

        btnGuardar=driver.find_element_by_id("btnGuardar")
        btnGuardar.click()
        time.sleep(1)

        btnAceptar=driver.find_element_by_id("btnAceptar")
        btnAceptar.click()
        time.sleep(1)
        #########################################
        #Comparacion de errores: Vacio
        errorCodigo=driver.find_element_by_id("errorCodigo")
        errorSumilla=driver.find_element_by_id("errorSumilla")
        errorDescripcion=driver.find_element_by_id("errorDescripcion")

        assert errorCodigo.text == "Por favor complete el código"
        assert errorSumilla.text == "Por favor complete la sumilla"
        assert errorDescripcion.text == "Por favor complete la descripción"

        #########################################
        #Comparacion de errores: Erroneos
        #campos de texto
        txtCodigo = driver.find_element_by_id("codigo")

        #inputs
        txtCodigo.send_keys("01234567891")
        errorCodigo=driver.find_element_by_id("errorCodigo")
        assert errorCodigo.text == "El código no puede superar los 10 caracteres"
    
    def test_IngresoCorrectoCamposObligatorios(self):
        #log
        driver= self.driver
        driver.get("http://54.162.5.155/")
        driver.maximize_window()
        time.sleep(1)

        usuario=driver.find_element_by_name("email")
        password=driver.find_element_by_name("password")
        usuario.send_keys("renzo.bedrinana@pucp.edu.pe")
        password.send_keys("renzo123")
        password.send_keys(Keys.RETURN)
        time.sleep(3)
        #prueba
        comboBoxRoles=driver.find_element_by_id("comboBoxRoles")
        comboBoxRoles.click()
        time.sleep(1)

        responsablePrograma=driver.find_element_by_id("2")
        responsablePrograma.click()
        time.sleep(3)
        #gol
        btnNuevo=driver.find_element_by_id("botonNuevo")
        btnNuevo.click()
        time.sleep(3)

        ########################################################
        #Nuevo

        #Llenar Campos Obligatorios
        txtCodigo = driver.find_element_by_id("codigo")
        txtSumilla  = driver.find_element_by_id("sumilla")
        txtDescripcion = driver.find_element_by_id("descripcion")
        #inputs
        txtCodigo.send_keys("OBJ_ED_09")
        txtSumilla.send_keys("Resolución de Problemas")
        txtDescripcion.send_keys("Identificar, formular y resolver problemas complejos de ingeniería aplicando principios de ingeniería, ciencias y matemáticas.")

        btnGuardar=driver.find_element_by_id("btnGuardar")
        btnGuardar.click()
        time.sleep(1)

        btnAceptar=driver.find_element_by_id("btnAceptar")
        btnAceptar.click()
        time.sleep(3)

        title = driver.find_element_by_id("title")
        assert title.text == "Objetivos Educacionales"

        ########################################################
        #Buscar Objetivo Ingresado
        inBusqueda=driver.find_element_by_id("inputBusqueda")
        inBusqueda.send_keys("OBJ_ED_09")
        time.sleep(2)
        codigo = driver.find_element_by_id("codigo")
        assert codigo.text == "OBJ_ED_09"


        ########################################################
        #Editar
        btnEditar=driver.find_element_by_id("btnEditar")
        btnEditar.click()
        time.sleep(4)

        #EditarOE
        titleEditar=driver.find_element_by_id("title")
        assert titleEditar.text == "Editar" + " OBJ_ED_09"

        #Inputs de Sumilla y Descripcion
        txtSumilla  = driver.find_element_by_id("sumilla")
        txtDescripcion = driver.find_element_by_id("descripcion")
        #inputs
        txtSumilla.send_keys(Keys.CONTROL + "a")
        txtSumilla.send_keys(Keys.DELETE)
        txtSumilla.send_keys("Comunicación efectiva")
        txtDescripcion.send_keys(Keys.CONTROL + "a")
        txtDescripcion.send_keys(Keys.DELETE)
        txtDescripcion.send_keys("Comunicarse de forma clara, directa, precisa, asertiva y sin ambigüedades de forma que el mensaje transmitido sea comprendido a cabalidad.")

        btnGuardar=driver.find_element_by_id("btnGuardar")
        btnGuardar.click()
        time.sleep(1)

        btnAceptar=driver.find_element_by_id("btnAceptar")
        btnAceptar.click()
        time.sleep(3)

        title = driver.find_element_by_id("title")
        assert title.text == "Objetivos Educacionales"


        ########################################################
        #Eliminar
        inBusqueda=driver.find_element_by_id("inputBusqueda")
        inBusqueda.send_keys("OBJ_ED_09")
        time.sleep(2)
        codigo = driver.find_element_by_id("codigo")
        assert codigo.text == "OBJ_ED_09"

        btnEliminar =driver.find_element_by_id("btnEliminar")
        btnEliminar.click()
        time.sleep(1)

        btnAceptar=driver.find_element_by_id("btnAceptar")
        btnAceptar.click()
        time.sleep(3)

        #de vuelta a Gestion Objetivos Educacionales
        title = driver.find_element_by_id("title")
        assert title.text == "Objetivos Educacionales"

    
    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()