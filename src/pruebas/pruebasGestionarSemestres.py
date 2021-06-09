import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

class usando_unittest(unittest.TestCase):

	def setUp(self):
		self.driver= webdriver.Chrome(executable_path=r"./chromedriver.exe")
	
	def test_Ingreso_Correcto_Semestres(self):
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

		administrador=driver.find_element_by_id("3")
		administrador.click()
		time.sleep(3)

		buttonGestionarSemestres=driver.find_element_by_id("buttonGestionarSemestres")
		buttonGestionarSemestres.click()
		time.sleep(1)
		
		inputAgno=driver.find_element_by_name("agno")
		inputAgno.send_keys("2024")
		time.sleep(1)
		
		inputCiclo=driver.find_element_by_name("ciclo")
		inputCiclo.send_keys("1")
		time.sleep(1)
		
		buttonAnadir=driver.find_element_by_id("buttonAnadir")
		buttonAnadir.click()
		time.sleep(1)
		
		buttonAceptar=driver.find_element_by_id("buttonAceptar")
		buttonAceptar.click()
		time.sleep(1)
		
		inputAgno2=driver.find_element_by_name("agno2")
		inputAgno2.send_keys("2023")
		time.sleep(1)
		
		inputCiclo2=driver.find_element_by_name("ciclo2")
		inputCiclo2.send_keys("1")
		time.sleep(1)
		
		buttonEliminar=driver.find_element_by_id("buttonEliminar")
		buttonEliminar.click()
		time.sleep(1)
		
		buttonAceptar=driver.find_element_by_id("buttonAceptar")
		buttonAceptar.click()
		time.sleep(1)

	def test_CamposVacios_Rangos_Erroneos_Anadir_Eliminar(self):
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

		administrador=driver.find_element_by_id("3")
		administrador.click()
		time.sleep(3)

		buttonGestionarSemestres=driver.find_element_by_id("buttonGestionarSemestres")
		buttonGestionarSemestres.click()
		time.sleep(1)
		
		buttonAnadir=driver.find_element_by_id("buttonAnadir")
		buttonAnadir.click()
		time.sleep(1)
		
		buttonAceptar=driver.find_element_by_id("buttonAceptar")
		buttonAceptar.click()
		time.sleep(1)
		
		buttonEliminar=driver.find_element_by_id("buttonEliminar")
		buttonEliminar.click()
		time.sleep(1)
		
		buttonAceptar=driver.find_element_by_id("buttonAceptar")
		buttonAceptar.click()
		time.sleep(1)
		
		errorAgno=driver.find_element_by_id("errorAgno")
		print(errorAgno.text)
		assert "Ingrese un año" == errorAgno.text
		errorCiclo=driver.find_element_by_id("errorCiclo")
		print(errorCiclo.text)
		assert "Ingrese un semestre" == errorCiclo.text
		
		errorAgno2=driver.find_element_by_id("errorAgno2")
		print(errorAgno2.text)
		assert "Ingrese un año" == errorAgno2.text
		errorCiclo2=driver.find_element_by_id("errorCiclo2")
		print(errorCiclo2.text)
		assert "Ingrese un semestre" == errorCiclo2.text
		
		inputAgno=driver.find_element_by_name("agno")
		inputAgno.send_keys("2022")
		time.sleep(1)
		
		inputCiclo=driver.find_element_by_name("ciclo")
		inputCiclo.send_keys("1")
		time.sleep(1)
		
		inputAgno2=driver.find_element_by_name("agno2")
		inputAgno2.send_keys("2020")
		time.sleep(1)
		
		inputCiclo2=driver.find_element_by_name("ciclo2")
		inputCiclo2.send_keys("1")
		time.sleep(1)
		
		buttonAnadir=driver.find_element_by_id("buttonAnadir")
		buttonAnadir.click()
		time.sleep(1)
		
		buttonAceptar=driver.find_element_by_id("buttonAceptar")
		buttonAceptar.click()
		time.sleep(1)
		
		buttonEliminar=driver.find_element_by_id("buttonEliminar")
		buttonEliminar.click()
		time.sleep(1)
		
		buttonAceptar=driver.find_element_by_id("buttonAceptar")
		buttonAceptar.click()
		time.sleep(1)
		
		errorRangoAnadir=driver.find_element_by_id("errorRangoAnadir")
		print(errorRangoAnadir.text)
		assert "Debe ser mayor a último agregado" == errorRangoAnadir.text
		
		errorRangoEliminar=driver.find_element_by_id("errorRangoEliminar")
		print(errorRangoEliminar.text)
		assert "Debe ser mayor a último programado y menor a último agregado" == errorRangoEliminar.text
	
	def test_Campos_Erroneos_Anadir_Eliminar(self):
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

		administrador=driver.find_element_by_id("3")
		administrador.click()
		time.sleep(3)

		buttonGestionarSemestres=driver.find_element_by_id("buttonGestionarSemestres")
		buttonGestionarSemestres.click()
		time.sleep(1)
		
		inputAgno=driver.find_element_by_name("agno")
		inputAgno.send_keys("jsjs")
		time.sleep(1)
		
		inputCiclo=driver.find_element_by_name("ciclo")
		inputCiclo.send_keys("j")
		time.sleep(1)
		
		buttonAnadir=driver.find_element_by_id("buttonAnadir")
		buttonAnadir.click()
		time.sleep(1)
		
		buttonAceptar=driver.find_element_by_id("buttonAceptar")
		buttonAceptar.click()
		time.sleep(1)
		
		errorAgno=driver.find_element_by_id("errorAgno")
		print(errorAgno.text)
		assert "Ingrese solo números" == errorAgno.text
		errorCiclo=driver.find_element_by_id("errorCiclo")
		print(errorCiclo.text)
		assert "Ingrese valores de 0-2" == errorCiclo.text
		
		inputAgno2=driver.find_element_by_name("agno2")
		inputAgno2.send_keys("jsjs")
		time.sleep(1)
		
		inputCiclo2=driver.find_element_by_name("ciclo2")
		inputCiclo2.send_keys("j")
		time.sleep(1)
		
		buttonEliminar=driver.find_element_by_id("buttonEliminar")
		buttonEliminar.click()
		time.sleep(1)
		
		buttonAceptar=driver.find_element_by_id("buttonAceptar")
		buttonAceptar.click()
		time.sleep(1)
		
		errorAgno2=driver.find_element_by_id("errorAgno2")
		print(errorAgno2.text)
		assert "Ingrese solo números" == errorAgno2.text
		errorCiclo2=driver.find_element_by_id("errorCiclo2")
		print(errorCiclo2.text)
		assert "Ingrese valores de 0-2" == errorCiclo2.text
	
	def test_Campos_Erroneos2_Anadir_Eliminar(self):
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

		administrador=driver.find_element_by_id("3")
		administrador.click()
		time.sleep(3)

		buttonGestionarSemestres=driver.find_element_by_id("buttonGestionarSemestres")
		buttonGestionarSemestres.click()
		time.sleep(1)
		
		inputAgno=driver.find_element_by_name("agno")
		inputAgno.send_keys("20201")
		time.sleep(1)
		
		inputCiclo=driver.find_element_by_name("ciclo")
		inputCiclo.send_keys("3")
		time.sleep(1)
		
		buttonAnadir=driver.find_element_by_id("buttonAnadir")
		buttonAnadir.click()
		time.sleep(1)
		
		buttonAceptar=driver.find_element_by_id("buttonAceptar")
		buttonAceptar.click()
		time.sleep(1)
		
		errorAgno=driver.find_element_by_id("errorAgno")
		print(errorAgno.text)
		assert "Ingrese un año menor a 2100" == errorAgno.text
		errorCiclo=driver.find_element_by_id("errorCiclo")
		print(errorCiclo.text)
		assert "Ingrese valores de 0-2" == errorCiclo.text
		
		inputAgno2=driver.find_element_by_name("agno2")
		inputAgno2.send_keys("20201")
		time.sleep(1)
		
		inputCiclo2=driver.find_element_by_name("ciclo2")
		inputCiclo2.send_keys("5")
		time.sleep(1)
		
		buttonEliminar=driver.find_element_by_id("buttonEliminar")
		buttonEliminar.click()
		time.sleep(1)
		
		buttonAceptar=driver.find_element_by_id("buttonAceptar")
		buttonAceptar.click()
		time.sleep(1)
		
		errorAgno2=driver.find_element_by_id("errorAgno2")
		print(errorAgno2.text)
		assert "El año debe ser mayor a 2000" == errorAgno2.text
		errorCiclo2=driver.find_element_by_id("errorCiclo2")
		print(errorCiclo2.text)
		assert "Ingrese valores de 0-2" == errorCiclo2.text
	
	def tearDown(self):
		self.driver.close()


if __name__ == '__main__':
	unittest.main()