import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

class usando_unittest(unittest.TestCase):

    def setUp(self):
        self.driver= webdriver.Chrome(executable_path=r"./chromedriver.exe")

    def test_AgregarYEliminar_Asistente_Correctamente(self):
        driver= self.driver
        driver.get("http://54.162.5.155/")

        driver.maximize_window()
        time.sleep(1)

        #login
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

        administrador=driver.find_element_by_id("2")
        administrador.click()
        time.sleep(3)

        buttonGestionarAsistentes=driver.find_element_by_id("buttonGestionarAsistentes")
        buttonGestionarAsistentes.click()
        time.sleep(3)

        tituloPagina=driver.find_element_by_id("tituloPagina")
        assert "Gestionar Asistentes" == tituloPagina.text
        time.sleep(1)

        buttonNuevo=driver.find_element_by_id("buttonNuevo")
        buttonNuevo.click()
        time.sleep(3)
        
        #cardAsistente=driver.find_element_by_id("00002822")
        btnSeleccionar=driver.find_element_by_id("00002822")
        btnSeleccionar.click()
        time.sleep(4)

        buttonNuevo=driver.find_element_by_id("buttonNuevo")
        buttonNuevo.click()
        time.sleep(3)
        
        #cardAsistente=driver.find_element_by_id("00002822")
        btnSeleccionar=driver.find_element_by_id("02001019")
        btnSeleccionar.click()
        time.sleep(4)

        inputBusquedaAsistentes=driver.find_element_by_id("inputBusqueda")
        inputBusquedaAsistentes.send_keys("donato")
        time.sleep(2)

        btnDelete=driver.find_element_by_id("btnDelete")
        btnDelete.click()
        time.sleep(3)

        inputBusquedaAsistentes=driver.find_element_by_id("inputBusqueda")
        inputBusquedaAsistentes.send_keys(Keys.CONTROL +'a')
        inputBusquedaAsistentes.send_keys(Keys.DELETE)        
        time.sleep(2)

        nombre=driver.find_element_by_id("nombre")
        assert "Blanca Silvia Rosas Lizarraga" == nombre.text
        time.sleep(2)

    def tearDown(self):
        self.driver.close()

if __name__ == '__main__':
    unittest.main()