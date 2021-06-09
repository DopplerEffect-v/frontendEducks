import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time


class usando_unittest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(executable_path=r"./chromedriver.exe")

    def test_Agregar_Facultad_Correctamente(self):
        driver = self.driver
        driver.get("http://54.162.5.155/")
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

        administrador = driver.find_element_by_id("3")
        administrador.click()
        time.sleep(3)

        buttonGestionarFacultades = driver.find_element_by_id(
            "buttonGestionarFacultades")
        buttonGestionarFacultades.click()
        time.sleep(1)

        buttonNuevo = driver.find_element_by_id("buttonNuevo")
        buttonNuevo.click()
        time.sleep(1)

        inputSiglas = driver.find_element_by_name("siglas")
        inputNombreFacultad = driver.find_element_by_name("nombreFacultad")
        inputCorreo = driver.find_element_by_name("correoElectronico")
        inputSiglas.send_keys("FDP")
        inputNombreFacultad.send_keys("Facultad De Prueba")
        inputCorreo.send_keys("prueba@pucp.edu.pe")
        time.sleep(3)

        buttonBuscar = driver.find_element_by_id("buttonBuscar")
        buttonBuscar.click()
        time.sleep(3)

        inputBusquedaUsuario = driver.find_element_by_name("title")
        inputBusquedaUsuario.send_keys("20171160")
        buttonSeleccionar = driver.find_element_by_id("buttonSeleccionar")
        buttonSeleccionar.click()
        time.sleep(2)

        buttonGuardar = driver.find_element_by_id("buttonGuardar")
        buttonGuardar.click()
        time.sleep(1)

        buttonAceptar = driver.find_element_by_id("buttonAceptar")
        buttonAceptar.click()
        time.sleep(3)

        inputBusquedaFacultad = driver.find_element_by_name("title")
        inputBusquedaFacultad.send_keys("FDP")
        time.sleep(5)

    def test_Editar_Facultad_Correctamente(self):
        driver = self.driver
        driver.get("http://54.162.5.155/")
        driver.maximize_window()
        time.sleep(1)

        usuario = driver.find_element_by_name("email")
        password = driver.find_element_by_name("password")
        usuario.send_keys("renzo.bedrinana@pucp.edu.pe")
        password.send_keys("renzo123")
        password.send_keys(Keys.RETURN)
        time.sleep(3)

        comboBoxRoles = driver.find_element_by_id("comboBoxRoles")
        comboBoxRoles.click()
        time.sleep(1)

        administrador = driver.find_element_by_id("3")
        administrador.click()
        time.sleep(3)

        buttonGestionarFacultades = driver.find_element_by_id(
            "buttonGestionarFacultades")
        buttonGestionarFacultades.click()
        time.sleep(1)

        inputBusquedaFacultad = driver.find_element_by_name("title")
        inputBusquedaFacultad.send_keys("FDP")
        time.sleep(1)

        buttonEditar = driver.find_element_by_id("buttonEditar")
        buttonEditar.click()
        time.sleep(1)

        inputSiglas = driver.find_element_by_name("siglas")
        inputNombreFacultad = driver.find_element_by_name("nombreFacultad")
        inputCorreo = driver.find_element_by_name("correoElectronico")
        inputSiglas.send_keys(Keys.CONTROL + 'a', Keys.BACKSPACE)
        inputSiglas.send_keys("FDP2")
        inputNombreFacultad.send_keys(Keys.CONTROL + 'a', Keys.BACKSPACE)
        inputNombreFacultad.send_keys("Facultad de Prueba 2")
        inputCorreo.send_keys(Keys.CONTROL + 'a', Keys.BACKSPACE)
        inputCorreo.send_keys("prueba2@pucp.edu.pe")
        time.sleep(3)

        buttonBuscar = driver.find_element_by_id("buttonBuscar")
        buttonBuscar.click()
        time.sleep(2)

        inputBusquedaUsuario = driver.find_element_by_name("title")
        inputBusquedaUsuario.send_keys("20204444")
        buttonSeleccionar = driver.find_element_by_id("buttonSeleccionar")
        buttonSeleccionar.click()
        time.sleep(2)

        buttonGuardar = driver.find_element_by_id("buttonGuardar")
        buttonGuardar.click()
        time.sleep(1)

        buttonAceptar = driver.find_element_by_id("buttonAceptar")
        buttonAceptar.click()
        time.sleep(3)

        inputBusquedaFacultad = driver.find_element_by_name("title")
        inputBusquedaFacultad.send_keys("FDP2")
        time.sleep(5)

    def test_Errores_Agregar_Facultad(self):
        driver = self.driver
        driver.get("http://54.162.5.155/")
        driver.maximize_window()
        time.sleep(1)

        usuario = driver.find_element_by_name("email")
        password = driver.find_element_by_name("password")
        usuario.send_keys("renzo.bedrinana@pucp.edu.pe")
        password.send_keys("renzo123")
        password.send_keys(Keys.RETURN)
        time.sleep(3)

        comboBoxRoles = driver.find_element_by_id("comboBoxRoles")
        comboBoxRoles.click()
        time.sleep(1)

        administrador = driver.find_element_by_id("3")
        administrador.click()
        time.sleep(3)

        buttonGestionarFacultades = driver.find_element_by_id(
            "buttonGestionarFacultades")
        buttonGestionarFacultades.click()
        time.sleep(1)

        buttonNuevo = driver.find_element_by_id("buttonNuevo")
        buttonNuevo.click()
        time.sleep(1)

        buttonGuardar = driver.find_element_by_id("buttonGuardar")
        buttonGuardar.click()
        time.sleep(1)

        buttonAceptar = driver.find_element_by_id("buttonAceptar")
        buttonAceptar.click()
        time.sleep(3)

        typographyErrorSiglas = driver.find_element_by_id(
            "typographyErrorSiglas")
        print(typographyErrorSiglas.text)
        assert "Por favor ingrese las siglas" == typographyErrorSiglas.text
        typographyErrorNombre = driver.find_element_by_id(
            "typographyErrorNombre")
        print(typographyErrorNombre.text)
        assert "Por favor complete el nombre de la facultad" == typographyErrorNombre.text
        typographyErrorCorreo = driver.find_element_by_id(
            "typographyErrorCorreo")
        print(typographyErrorCorreo.text)
        assert "Por favor complete el correo" == typographyErrorCorreo.text
        typographyErrorCoord = driver.find_element_by_id(
            "typographyErrorCoord")
        print(typographyErrorCoord.text)
        assert "Por favor seleccione un coordinador" == typographyErrorCoord.text

        inputSiglas = driver.find_element_by_name("siglas")
        inputNombreFacultad = driver.find_element_by_name("nombreFacultad")
        inputCorreo = driver.find_element_by_name("correoElectronico")

        # Errores Siglas
        inputSiglas.send_keys("a")
        print(typographyErrorSiglas.text)
        assert "Por favor ingrese las siglas en mayuscula" == typographyErrorSiglas.text
        time.sleep(1)
        inputSiglas.send_keys(Keys.CONTROL + 'a', Keys.BACKSPACE)
        inputSiglas.send_keys("AAAAAAAAAAAA")
        print(typographyErrorSiglas.text)
        assert "Las siglas no pueden superar los 10 caracteres." == typographyErrorSiglas.text
        time.sleep(1)
        inputSiglas.send_keys(Keys.CONTROL + 'a', Keys.BACKSPACE)

        # Errores Facultad
        inputNombreFacultad.send_keys(
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        print(typographyErrorNombre.text)
        assert "El nombre no puede superar los 100 caracteres." == typographyErrorNombre.text
        time.sleep(1)
        inputNombreFacultad.send_keys(Keys.CONTROL + 'a', Keys.BACKSPACE)

        # Errores Correo
        inputCorreo.send_keys("a")
        print(typographyErrorCorreo.text)
        assert "Por favor ingrese un correo válido" == typographyErrorCorreo.text
        time.sleep(1)
        inputCorreo.send_keys(Keys.CONTROL + 'a', Keys.BACKSPACE)
        inputCorreo.send_keys(
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        print(typographyErrorCorreo.text)
        assert "El correo no puede superar los 50 caracteres" == typographyErrorCorreo.text
        time.sleep(1)
        inputSiglas.send_keys(Keys.CONTROL + 'a', Keys.BACKSPACE)

        buttonCancelar = driver.find_element_by_id("buttonCancelar")
        buttonCancelar.click()
        time.sleep(3)

    def test_Errores_Editar_Facultad(self):
        driver = self.driver
        driver.get("http://54.162.5.155/")
        driver.maximize_window()
        time.sleep(1)

        usuario = driver.find_element_by_name("email")
        password = driver.find_element_by_name("password")
        usuario.send_keys("renzo.bedrinana@pucp.edu.pe")
        password.send_keys("renzo123")
        password.send_keys(Keys.RETURN)
        time.sleep(3)

        comboBoxRoles = driver.find_element_by_id("comboBoxRoles")
        comboBoxRoles.click()
        time.sleep(1)

        administrador = driver.find_element_by_id("3")
        administrador.click()
        time.sleep(3)

        buttonGestionarFacultades = driver.find_element_by_id(
            "buttonGestionarFacultades")
        buttonGestionarFacultades.click()
        time.sleep(1)

        inputBusquedaFacultad = driver.find_element_by_name("title")
        inputBusquedaFacultad.send_keys("FACI")
        time.sleep(1)

        buttonEditar = driver.find_element_by_id("buttonEditar")
        buttonEditar.click()
        time.sleep(1)

        inputSiglas = driver.find_element_by_name("siglas")
        inputNombreFacultad = driver.find_element_by_name("nombreFacultad")
        inputCorreo = driver.find_element_by_name("correoElectronico")

        # inputSiglas.send_keys("a")
        inputSiglas.send_keys(Keys.CONTROL + 'a', Keys.BACKSPACE)
        time.sleep(1)
        # inputNombreFacultad.send_keys("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        inputNombreFacultad.send_keys(Keys.CONTROL + 'a', Keys.BACKSPACE)
        time.sleep(1)
        # inputCorreo.send_keys("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        inputCorreo.send_keys(Keys.CONTROL + 'a', Keys.BACKSPACE)
        time.sleep(1)

        buttonGuardar = driver.find_element_by_id("buttonGuardar")
        buttonGuardar.click()
        time.sleep(1)

        buttonAceptar = driver.find_element_by_id("buttonAceptar")
        buttonAceptar.click()
        time.sleep(3)

        typographyErrorSiglas = driver.find_element_by_id(
            "typographyErrorSiglas")
        print(typographyErrorSiglas.text)
        assert "Por favor ingrese las siglas" == typographyErrorSiglas.text
        typographyErrorNombre = driver.find_element_by_id(
            "typographyErrorNombre")
        print(typographyErrorNombre.text)
        assert "Por favor complete el nombre de la facultad" == typographyErrorNombre.text
        typographyErrorCorreo = driver.find_element_by_id(
            "typographyErrorCorreo")
        print(typographyErrorCorreo.text)
        assert "Por favor complete el correo" == typographyErrorCorreo.text

        # Errores Siglas
        inputSiglas.send_keys("a")
        print(typographyErrorSiglas.text)
        assert "Por favor ingrese las siglas en mayuscula" == typographyErrorSiglas.text
        time.sleep(1)
        inputSiglas.send_keys(Keys.CONTROL + 'a', Keys.BACKSPACE)
        inputSiglas.send_keys("AAAAAAAAAAAA")
        print(typographyErrorSiglas.text)
        assert "Las siglas no pueden superar los 10 caracteres." == typographyErrorSiglas.text
        time.sleep(1)
        inputSiglas.send_keys(Keys.CONTROL + 'a', Keys.BACKSPACE)

        # Errores Facultad
        inputNombreFacultad.send_keys(
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        print(typographyErrorNombre.text)
        assert "El nombre no puede superar los 100 caracteres." == typographyErrorNombre.text
        time.sleep(1)
        inputNombreFacultad.send_keys(Keys.CONTROL + 'a', Keys.BACKSPACE)

        # Errores Correo
        inputCorreo.send_keys("a")
        print(typographyErrorCorreo.text)
        assert "Por favor ingrese un correo válido" == typographyErrorCorreo.text
        time.sleep(1)
        inputCorreo.send_keys(Keys.CONTROL + 'a', Keys.BACKSPACE)
        inputCorreo.send_keys(
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        print(typographyErrorCorreo.text)
        assert "El correo no puede superar los 50 caracteres" == typographyErrorCorreo.text
        time.sleep(1)
        inputSiglas.send_keys(Keys.CONTROL + 'a', Keys.BACKSPACE)

        buttonCancelar = driver.find_element_by_id("buttonCancelar")
        buttonCancelar.click()
        time.sleep(3)

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
